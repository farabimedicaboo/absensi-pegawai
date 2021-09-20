const router = require("express").Router();
const apiController = require("../controllers/apiController");

router.post("/user/add", apiController.addUser);
router.post("/absen", apiController.absen);
router.get("/laporan", apiController.laporan);
router.get("/laporan/telat", apiController.laporanTelat);
router.get("/laporan/detail", apiController.detail);
router.get("/laporan/:keterangan", apiController.laporanCustom);
router.put("/absen/checkout", apiController.checkOut);
router.put("/approve/izin", apiController.apporveIzin);
router.get("/tes", apiController.tes);

module.exports = router;
