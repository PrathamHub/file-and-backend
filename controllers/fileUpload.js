const File = require("../models/fileSchema");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(file);
    var data = file.name.split(".");
    let path = __dirname + "/files/" + Date.now() + "." + data[1];
    file.mv(path, (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Failed to upload file",
        });
      }
    });

    res.json({
      success: true,
      message: "Local File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

function supportedFile(supportTypes, fileType) {
  if (supportTypes.includes(fileType)) {
    return true;
  } else {
    return false;
  }
}
async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  console.log(file.tempFilePath);
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imagefile;
    console.log(file);

    //validation
    const supportTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log(fileType);

    if (!supportedFile(supportTypes, fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }
    console.log(fileType);
    //file format supported hai
    const response = await uploadFileToCloudinary(file, "pratham");
    console.log(response);

    //DB ENtry
    const fileData = File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error while uploading file",
    });
  }
};

//video uplload
exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, email, tags } = req.body;
    console.log(name.email, tags);

    const file = req.files.videoFile;

    //validation
    const supportTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log(fileType);

    if (!supportedFile(supportTypes, fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds the 5 MB limit",
      });
    }
    console.log("Uploading to cloudinary");
    const response = await uploadFileToCloudinary(file, "pratham");
    console.log(response);

    const dataEntry = File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      message: "Video uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
