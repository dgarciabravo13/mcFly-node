const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: {
      type: String,
      required: [true, "Password is required"],
      // match: [PASSWORD_PATTERN, "Invalid password pattern"],
    },
    notesFavourites: {
      type: [{ type: Schema.Types.ObjectId, ref: "Note" }],
      default: [],
    },
    notesCreated: {
      type: [{ type: Schema.Types.ObjectId, ref: "Note" }],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;