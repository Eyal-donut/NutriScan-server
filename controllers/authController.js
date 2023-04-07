// import crypto from 'crypto';
// import ErrorResponse from '../utils/errorResponse.js';
// import sendEmail from '../utils/sendEmail.js';
import sendTokenResponse from "../utils/sendTokenResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendTokenResponse(user, 200, res);
});


// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});


// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: true, // if you are using HTTPS
    sameSite: 'strict' // to prevent CSRF (Cross-Site Request Forgery) attacks
    /*
       CSRF is a type of web security vulnerability that allows an attacker to perform unwanted actions on behalf of an authenticated user. The attack occurs when a malicious website or script makes a request to a legitimate website where the user is already authenticated.
    */
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get current logged in user
// @route   POST /api/v1/auth/current-user
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// // @desc    Forgot password
// // @route   POST /api/v1/auth/forgot-password
// // @access  Public
// export const forgotPassword = asyncHandler(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return next(new ErrorResponse('There is no user with that email', 404));
//   }

//   // Get reset token
//   const resetToken = user.getResetPasswordToken();

//   await user.save({ validateBeforeSave: false });

//   // Create reset url
//   const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;

//   const message = `You are receiving this email because you (or someone else) has requested the reset of a password. If you did not make this request, please ignore this email. Otherwise, please make a PUT request to: \n\n ${resetUrl}`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'Password reset token',
//       message
//     });

//     res.status(200).json({
//       success: true,
//       data: `Email sent successfully to ${user.email}`
//     });
//   } catch (error) {
//     console.log(error);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save({ validateBeforeSave: false });

//     return next(new ErrorResponse('Email could not be sent', 500));
//   }

//   res.status(200).json({
//     success: true,
//     data: user
//   });
// });

// // @desc    Reset password
// // @route   PUT /api/v1/auth/reset-password/:resettoken
// // @access  Public
// export const resetPassword = asyncHandler(async (req, res, next) => {
//   // Get hashed token
//   const resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(req.params.resettoken)
//     .digest('hex');

//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() }
//   });

//   if (!user) {
//     return next(new ErrorResponse('Invalid token', 400));
//   }

//   // Set new password
//   user.password = req.body.password;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;
//   await user.save();

//   sendTokenResponse(user, 200, res);
// });

// @desc    Update user details
// @route   PUT /api/v1/auth/update-details
// @access  Private
export const updateUser = asyncHandler(async (req, res, next) => {
  const { dietPreferences, environmentPreferences, nutritionPreferences, name, email } =
    req.body;
  const updateObj = {};

  if (dietPreferences !== undefined) {
    updateObj.dietPreferences = dietPreferences;
  }
  if (environmentPreferences !== undefined) {
    updateObj.environmentPreferences = environmentPreferences;
  }
  if (nutritionPreferences !== undefined) {
    updateObj.nutritionPreferences = nutritionPreferences;
  }
  if (name !== undefined) {
    updateObj.name = name;
  }
  if (email !== undefined) {
    updateObj.email = email;
  }
  const user = await User.findByIdAndUpdate(req.user.id, updateObj, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new Error(`User with ID ${req.params.id} not found`));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// // @desc    Update user password
// // @route   PUT /api/v1/auth/update-password
// // @access  Private
// export const updatePassword = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     return next(new ErrorResponse('Invalid token', 400));
//   }

//   // Check current password
//   if (!(await user.matchPassword(req.body.currentPassword))) {
//     return next(new ErrorResponse('Password is incorrect', 401));
//   }

//   user.password = req.body.newPassword;

//   await user.save();

//   sendTokenResponse(user, 200, res);
// });
