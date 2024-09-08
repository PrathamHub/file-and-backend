const express = require("express");
const {
  localFileUpload,
  imageUpload,
  videoUpload,
} = require("../controllers/fileUpload");
const router = express.Router();

router.post("/uploadfile", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
module.exports = router;
