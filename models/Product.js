import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    imageUrl: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    dietPreferences: {
      "Gluten free": {
        type: String,
        default: "assessment not possible",
      },
      "Lactose free": {
        type: String,
        default: "assessment not possible",
      },
      Vegan: {
        type: String,
        default: "assessment not possible",
      },
      Vegetarian: {
        type: String,
        default: "assessment not possible",
      },
    },
    environmentPreferences: {
      "silicone & Siloxane": {
        type: String,
        default: "assessment not possible",
      },
      Microplastic: {
        type: String,
        default: "assessment not possible",
      },
      "Palm oil": {
        type: String,
        default: "assessment not possible",
      },
    },
    nutritionPreferences: {
      Fat: {
        type: Number,
      },
      "Saturated fat": {
        type: Number,
      },
      Cholesterol: {
        type: Number,
      },
      Carbohydrates: {
        type: Number,
      },
      Sugar: {
        type: Number,
      },
      Salt: {
        type: Number,
      },
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        delete ret.__v;
      },
    },
    toObject: {
      transform(_, ret) {
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("Product", ProductSchema);
