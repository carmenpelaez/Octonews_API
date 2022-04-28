const fs = require("fs").promises;
const path = require("path");

const deleteImage = async (imageToDelete) => {
  // we define the path were the images is present
  const imagePath = path.join(
    __dirname,
    process.env.UPLOADS_DIR,
    imageToDelete
  );
  //delete image
  fs.unlink(imagePath);
};

module.exports = {
  deleteImage,
};
