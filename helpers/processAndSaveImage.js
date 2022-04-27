const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

// we define the path were we'll upload the images
const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

const processAndSaveImage = async (uploadedImage) => {
  // Make dir
  await fs.mkdir(imageUploadPath, { recursive: true });

  // Read image uploaded
  const image = sharp(uploadedImage.data);

  // Get data from image
  const imageInfo = await image.metadata();

  // resize if necessary
  if (imageInfo.width > 400) {
    image.resize(400);
  }

  // Save image on directory wit a new name
  const imageFileName = `${uuid.v4()}.jpg`;
  await image.toFile(path.join(imageUploadPath, imageFileName));

  // return new image name
  return imageFileName;
};

module.exports = {
  processAndSaveImage,
};
