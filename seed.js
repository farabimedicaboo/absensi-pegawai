var seeder = require("mongoose-seed");
const moment = require("moment-timezone");
var mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect("mongodb://localhost:27017/absensi_pegawai", function () {
  // Load Mongoose models
  seeder.loadModels(["./model/Employee", "./model/Attendant"]);

  // Clear specified collections
  seeder.clearModels(["Employee", "Attendant"], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});

var data = [
  // start Epmloyee
  {
    model: "Employee",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        username: "farabiandrika",
        name: "Muhammad Farabi Andrika",
        attendantId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902224") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902225") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901112"),
        username: "ilhamurniawan",
        name: "Ilham Kurniawan",
        attendantId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902226") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902228") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902229") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901113"),
        username: "john",
        name: "John Doe",
        attendantId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902230") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902231") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902232") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902233") },
        ],
      },
    ],
  },
  // end Employee
  // start Attendant
  {
    model: "Attendant",
    documents: [
      // Hadir
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
        status: "hadir",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        },
        start: moment
          .tz("2021-09-10 00:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        end: moment
          .tz("2021-09-10 09:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      //   Izin
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
        status: "izin",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        },
        start: moment
          .tz("2021-09-11 08:00:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        end: moment
          .tz("2021-09-11 17:00:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902224"),
        status: "hadir",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        },
        start: moment
          .tz("2021-09-12 08:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        start: moment
          .tz("2021-09-12 17:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902225"),
        status: "hadir",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        },
        start: moment
          .tz("2021-09-13 00:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        start: moment
          .tz("2021-09-13 08:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902226"),
        status: "hadir",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901112"),
        },
        start: moment
          .tz("2021-09-10 00:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        end: moment
          .tz("2021-09-10 08:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227"),
        status: "hadir",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901112"),
        },
        start: moment
          .tz("2021-09-11 08:00:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        start: moment
          .tz("2021-09-11 16:00:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902228"),
        status: "hadir",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901112"),
        },
        start: moment
          .tz("2021-09-12 08:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        start: moment
          .tz("2021-09-12 016:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902229"),
        status: "hadir",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901112"),
        },
        start: moment
          .tz("2021-09-13 00:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        end: moment
          .tz("2021-09-13 08:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902230"),
        status: "cuti",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901113"),
        },
        start: moment
          .tz("2021-09-10 00:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        end: moment
          .tz("2021-09-10 00:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902231"),
        status: "cuti",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901113"),
        },
        start: moment
          .tz("2021-09-11 00:00:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        end: moment
          .tz("2021-09-13 00:00:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902232"),
        status: "cuti",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901113"),
        },
        start: moment
          .tz("2021-09-12 00:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        end: moment
          .tz("2021-09-21 00:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902233"),
        status: "hadir",
        employeeId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901113"),
        },
        start: moment
          .tz("2021-09-13 00:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
        end: moment
          .tz("2021-09-15 00:30:00", "YYYY-MM-DD HH:mm:ss", "UTC")
          .format(),
      },
    ],
  },
];
