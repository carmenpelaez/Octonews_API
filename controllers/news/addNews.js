const getDB = require("../../database/config");
const { generateError } = require("../../helpers/generateError");
const { processAndSaveImage } = require("../../helpers/processAndSaveImage");

const addNews = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { title, introduction, text, category } = req.body;

    //given category name, we search for the id on the categories table
    const [resultCategory] = await connection.query(
      `
              SELECT id FROM categories WHERE name = ?
              `,
      [category]
    );
    const idCategory = resultCategory[0].id;

    //   We process an image if it's uploaded
    let processedImage = [];
    let result;

    if (req.files && Object.keys(req.files).length > 0) {
      for (const [, imageData] of Object.entries(req.files).slice(0, 1)) {
        try {
          processedImage = await processAndSaveImage(imageData);
        } catch (error) {
          throw generateError("Couldn't process the image. Try again.", 400);
        }
        //Create the news with all the values given
        [result] = await connection.query(
          `
          INSERT INTO news(title, introduction_text, image, news_text, id_category, creation_date, last_update_date,id_user)
          VALUES(?,?,?,?,?, UTC_TIMESTAMP, UTC_TIMESTAMP, ?)
            `,
          [title, introduction, processedImage, text, idCategory, req.user]
        );
      }
    } else {
      //Create the news with all the values given
      [result] = await connection.query(
        `
              INSERT INTO news(title, introduction_text, news_text, id_category, creation_date, last_update_date,id_user)
              VALUES(?,?,?,?, UTC_TIMESTAMP, UTC_TIMESTAMP, ?)
              `,
        [title, introduction, text, idCategory, req.user]
      );
    }

    // send result

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        title,
        image: processedImage,
        introduction,
        text,
        category,
      },
    });
  } catch (error) {
    //if there is an error, we send it to the next middleware/function
    //eventually the checkErrors function will handle it.
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  addNews,
};
