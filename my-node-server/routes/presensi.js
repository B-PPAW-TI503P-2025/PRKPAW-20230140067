const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { authenticateToken, isAdmin } = require("../middleware/permissionMiddleware");
router.use(authenticateToken);
router.post('/check-in', presensiController.CheckIn);
router.post('/check-out', presensiController.CheckOut);
router.put("/:id", presensiController.updatePresensi);
router.delete("/:id", presensiController.deletePresensi);
router.get("/", authenticateToken, (req, res) => {
  res.json({ message: "Presensi OK" });
});
module.exports = router;
