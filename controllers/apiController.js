const Attendant = require("../model/Attendant");
const Employee = require("../model/Employee");
const moment = require("moment");

module.exports = {
  absen: async (req, res) => {
    try {
      const { username, keterangan, start, end } = req.body;

      // Find Employee
      const employee = await Employee.findOne({ username: username });

      // Checking employee if exist or not
      if (!employee) {
        return res.status(422).json({ message: `User ${username} not found` });
      }

      // Init start of day
      const today = moment().startOf("day");

      // Find attendance exist or not for this day
      const attendance = await Attendant.find({
        employeeId: employee.id,
        isApproved: true,
        createdAt: {
          $gte: today,
          $lte: moment(today).endOf("day").toDate(),
        },
      });

      // Checking if attendance exist
      if (attendance.length > 0) {
        return res.status(406).json({ message: `Sudah melakukan absen` });
      }

      let attendant;

      if (
        keterangan.toLowerCase() === "cuti" ||
        keterangan.toLowerCase() === "izin"
      ) {
        // Create new attendance record for CUTI dan IZIN
        attendant = await Attendant.create({
          status: keterangan.toLowerCase(),
          employeeId: employee.id,
          start: start,
          end: end,
          isApproved: false,
        });
      } else {
        // Create new attendance record
        attendant = await Attendant.create({
          status: keterangan.toLowerCase(),
          employeeId: employee.id,
        });
      }

      // Push new attendant id to employee fid column
      employee.attendantId.push({ _id: attendant._id });

      // Saving
      await employee.save();

      // return success response
      return res.status(201).json({ message: "Absensi Sukses", attendant });
    } catch (error) {
      // if error return error response
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.errors });
    }
  },
  checkOut: async (req, res) => {
    try {
      const { username } = req.body;

      const employee = await Employee.findOne({ username: username });

      if (!employee) {
        return res
          .status(500)
          .json({ message: "Internal Server Error", employee });
      }

      // Init start of day
      const today = moment().startOf("day");

      const attendance = await Attendant.findOne({
        employeeId: employee._id,
        createdAt: {
          $gte: today,
          $lte: moment(today).endOf("day").toDate(),
        },
        status: "hadir",
      });

      if (attendance && attendance.end === null) {
        attendance.end = moment().format();
        await attendance.save();
        return res
          .status(200)
          .json({ message: "Checkout Success", attendance });
      } else {
        return res
          .status(406)
          .json({ message: "Sudah melakukan checkout", attendance });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  },
  laporan: (req, res) => {
    Employee.aggregate([
      {
        $lookup: {
          from: "attendants",
          let: { employeeId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$employeeId", "$$employeeId"] },
                isApproved: true,
              },
            },
            {
              $group: { _id: "$status", jumlah: { $sum: 1 } },
            },
            { $sort: { _id: 1 } },
          ],
          as: "absensi",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          name: 1,
          absensi: "$absensi",
        },
      },
    ]).exec((err, result) => {
      if (err) {
        res.status(500).json({ message: "Error", err });
        return;
      }
      if (result) {
        res.status(200).json({ message: "Success Getting Data", result });
        return;
      }
    });
  },
  laporanTelat: (req, res) => {
    Employee.aggregate([
      {
        $lookup: {
          from: "attendants",
          let: { employeeId: "$_id" },
          pipeline: [
            {
              $match: {
                $and: [
                  { $expr: { $eq: ["$employeeId", "$$employeeId"] } },
                  { status: "hadir" },
                ],
              },
            },
            {
              $project: {
                status: 1,
                tanggal: {
                  $dateToString: {
                    date: { $add: ["$start", 7 * 60 * 60 * 1000] },
                    format: "%Y-%m-%d",
                  },
                },
                start: {
                  $dateToString: {
                    date: { $add: ["$start", 7 * 60 * 60 * 1000] },
                    format: "%H:%M",
                  },
                },
                end: {
                  $dateToString: {
                    date: { $add: ["$end", 7 * 60 * 60 * 1000] },
                    format: "%H:%M",
                  },
                },
              },
            },
            {
              $match: { start: { $gte: "08:30", $lte: "24:00" } },
            },
          ],
          as: "jumlah",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          name: 1,
          jumlah: { $size: "$jumlah" },
          absensi: "$jumlah",
        },
      },
    ]).exec((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error", err });
      }
      if (result) {
        return res
          .status(200)
          .json({ message: "Success Getting Data", result });
      }
    });
  },
  laporanCustom: (req, res) => {
    const keterangan = req.params.keterangan;

    Employee.aggregate([
      {
        $lookup: {
          from: "attendants",
          let: { employeeId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$employeeId", "$$employeeId"] },
                status: keterangan,
                isApproved: true,
              },
            },
            {
              $project: {
                status: 1,
                start: {
                  $dateToString: {
                    date: { $add: ["$start", 7 * 60 * 60 * 1000] },
                    format: "%Y-%m-%d %H:%M:%S",
                  },
                },
                end: {
                  $dateToString: {
                    date: { $add: ["$end", 7 * 60 * 60 * 1000] },
                    format: "%Y-%m-%d %H:%M:%S",
                  },
                },
                createdAt: {
                  $dateToString: {
                    date: { $add: ["$createdAt", 7 * 60 * 60 * 1000] },
                    format: "%Y-%m-%d %H:%M:%S",
                  },
                },
              },
            },
          ],
          as: "jumlah",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          name: 1,
          jumlah: { $size: "$jumlah" },
          absensi: "$jumlah",
        },
      },
    ]).exec((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error", err });
      }
      if (result) {
        return res
          .status(200)
          .json({ message: "Success Getting Data", result });
      }
    });
  },

  detail: (req, res) => {
    Employee.aggregate([
      {
        $lookup: {
          from: "attendants",
          let: { employeeId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$employeeId", "$$employeeId"] },
              },
            },
            {
              $project: {
                _id: 1,
                status: 1,
                isApproved: 1,
                start: {
                  $dateToString: {
                    date: { $add: ["$start", 7 * 60 * 60 * 1000] },
                    format: "%Y-%m-%d %H:%M:%S",
                  },
                },
                end: {
                  $dateToString: {
                    date: { $add: ["$end", 7 * 60 * 60 * 1000] },
                    format: "%Y-%m-%d %H:%M:%S",
                  },
                },
              },
            },
            {
              $sort: { start: 1 },
            },
          ],
          as: "absensi",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          name: 1,
          absensi: 1,
        },
      },
    ]).exec((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error", err });
      }
      if (result) {
        return res
          .status(200)
          .json({ message: "Success Getting Data", result });
      }
    });
  },

  addUser: async (req, res) => {
    const { username, name } = req.body;
    try {
      const employee = await Employee.create({
        username: username.replace(/\s/g, ""),
        name: name,
      });
      return res.status(201).json({ message: "Success Add User", employee });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: "Username already exist ",
        });
      }
    }
  },

  apporveIzin: async (req, res) => {
    try {
      const { id } = req.body;

      const attendant = await Attendant.findOne({ _id: id });

      if (!attendant) {
        return res.status(500).json({ message: `Attendance ${id} not found` });
      }

      attendant.isApproved = true;
      await attendant.save();

      return res.status(200).json({ message: "Success Approved", attendant });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  tes: (req, res) => {
    const today = moment().startOf("day").add("d", 5);
    const tes = moment().format();
    res.status(200).json({ tes });
  },
};
