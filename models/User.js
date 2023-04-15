// import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Email address already taken"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    products: [],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    settings: [
      {
        dietPreferences: {
          "Gluten free": {
            type: Boolean,
            default: false,
          },
          "Lactose free": {
            type: Boolean,
            default: false,
          },
          Vegan: {
            type: Boolean,
            default: false,
          },
          Vegetarian: {
            type: Boolean,
            default: false,
          },
        },
      },
      {
        environmentPreferences: {
          "silicone & Siloxane": {
            type: Boolean,
            default: false,
          },
          Microplastic: {
            type: Boolean,
            default: false,
          },
          "Palm oil": {
            type: Boolean,
            default: false,
          },
        },
      },
      {
        nutritionPreferences: {
          Fat: {
            type: String,
            enum: ["Off", "Zero", "Low", "Moderate"],
            default: "Off",
          },
          "Saturated fat": {
            type: String,
            enum: ["Off", "Zero", "Low", "Moderate"],
            default: "Off",
          },
          Cholesterol: {
            type: String,
            enum: ["Off", "Zero", "Low", "Moderate"],
            default: "Off",
          },
          Carbohydrates: {
            type: String,
            enum: ["Off", "Zero", "Low", "Moderate"],
            default: "Off",
          },
          Sugar: {
            type: String,
            enum: ["Off", "Zero", "Low", "Moderate"],
            default: "Off",
          },
          Salt: {
            type: String,
            enum: ["Off", "Zero", "Low", "Moderate"],
            default: "Off",
          },
        },
      },
    ],
  },
  {
    toJSON: {
      transform(_, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    toObject: {
      transform(_, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  // If the password has not been modified proceed to next middleware
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// // Instance method to sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    // Optional: expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// // Generate and hash password token
// UserSchema.methods.getResetPasswordToken = function () {
//   // Generate token - it returns a buffer, so we need to convert it to a string
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hash token and set to resetPasswordToken field
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // Set expire to 10 minutes
//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

export default mongoose.model("User", UserSchema);
