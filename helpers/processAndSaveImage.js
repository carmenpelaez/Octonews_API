const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

// We define the path were we'll upload the images

const processAndSaveImage = async (uploadedImage, resize, folder) => {
  const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR, folder);
  // Make dir
  await fs.mkdir(imageUploadPath, { recursive: true });
  // Read image uploaded
  const image = sharp(uploadedImage.data);

  // Get data from image
  const imageInfo = await image.metadata();

  // Resize if necessary
  if (imageInfo.width > resize) {
    image.resize(resize);
  }

  // Save image on directory wit a new name
  const imageFileName = `${uuid.v4()}.jpg`;
  await image.toFile(path.join(imageUploadPath, imageFileName));

  // Return new image name
  return imageFileName;
};

module.exports = {
  processAndSaveImage,
};
