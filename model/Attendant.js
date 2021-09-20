const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const attendantSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    employeeId: {
      type: ObjectId,
      ref: "Employee",
    },
    start: {
      type: Date,
      default: Date.now,
    },
    end: {
      type: Date,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

attendantSchema.path("end").required(function () {
  return this.status === "cuti" || this.status === "izin";
});

module.exports = mongoose.model("Attendant", attendantSchema);
