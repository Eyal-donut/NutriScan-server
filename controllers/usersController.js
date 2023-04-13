import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// @desc    Get all users, or a single user by email
// @route   GET /api/v1/products-scanner/users
// @access  dev
export const getUsers = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const filter = {};

  if (email !== undefined) {
    filter.email = email;
  }

  const users = await User.find(filter);

  if (!users || users.length === 0) {
    return next(new ErrorResponse("No users found."));
  }
  res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc    Get a single user
// @route   GET /api/v1/products-scanner/users/:id
// @access  dev
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`User with ID ${req.params.id} not found`, 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Create a User
// @route   POST /api/v1/products-scanner/users
// @access  dev
export const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  if (!user) {
    return next(new ErrorResponse("Error, user not created!"));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Create many users
// @route   POST /api/v1/auth/register/many
// @access  dev
export const CreateManyUsers = asyncHandler(async (req, res, next) => {
  const usersArray = req.body;

  if (!usersArray) {
    return next(new Error("Error, pass an array of users."));
  }
  let resultArray = [];
  for (let user of usersArray){
    const { name, email, password, role } = user;
    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });
    resultArray.push(newUser);
  }
  res.status(200).json({
    success: true,
    data: resultArray,
  });
});

// @desc    Update a single user
// @route   PUT /api/v1/products-scanner/users/:id
// @access  dev
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
  const user = await User.findByIdAndUpdate(req.params.id, updateObj, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new ErrorResponse(`User with ID ${req.params.id} not found`, 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    DELETE a single user
// @route   DELETE /api/v1/products-scanner/users/:id
// @access  dev
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`User with ID ${req.params.id} not found`, 404));
  }
  user.deleteOne();
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Delete all users
// @route   DELETE /api/v1/products-scanner/users
// @access  dev
export const deleteUsers = asyncHandler(async (req, res, next) => {
  await User.deleteMany();
  res.status(200).json({
    success: true,
    data: {},
  });
});
