const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const employeeSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    attendantId: [
      {
        type: ObjectId,
        ref: "Attendant",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// employeeSchema.post("save", function (error, doc, next) {
//   if (error.name === "MongoServerError" && error.code === 11000) {
//     next(new Error("There was a duplicate key error"));
//   } else {
//     next();
//   }
// });

module.exports = mongoose.model("Employee", employeeSchema);
