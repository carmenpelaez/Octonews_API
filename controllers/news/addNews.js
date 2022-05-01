const getDB = require("../../database/config");
const { processAndSaveImage, generateError } = require("../../helpers");
const { addNewsSchema } = require("../../validators/newsValidators");

const addNews = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    await addNewsSchema.validateAsync(req.body);

    const { title, introduction, text, category } = req.body;

    //given category name, we search for the id on the categories table
    const [resultCategory] = await connection.query(
      `
              SELECT id FROM categories WHERE name = ?
              `,
      [category]
    );

    if (resultCategory.length === 0) {
      throw generateError("This category doesn't exist", 404);
    }
    const idCategory = resultCategory[0].id;

    // We process an image if it's uploaded
    let processedImage = [];
    let result;

    if (req.files && Object.keys(req.files).length > 0) {
      const imageData = req.files.image;

      if (imageData.mimetype.includes("image")) {
        try {
          processedImage = await processAndSaveImage(imageData, 800, "news");
        } catch (error) {
          throw generateError("Couldn't process the image. Try again.", 400);
        }
        //Create the news with all the values given
        [result] = await connection.query(
          `
          INSERT INTO news(title, introduction_text, image, news_text, creation_date, last_update_date,id_user, id_category)
          VALUES(?,?,?,?, UTC_TIMESTAMP, UTC_TIMESTAMP, ?,?)
            `,
          [title, introduction, processedImage, text, req.user.id, idCategory]
        );
      } else {
        throw generateError("File is not an image.", 403);
      }
    } else {
      //Create the news with all the values given
      [result] = await connection.query(
        `
              INSERT INTO news(title, introduction_text, news_text, creation_date, last_update_date, id_user,id_category)
              VALUES(?,?,?, UTC_TIMESTAMP, UTC_TIMESTAMP, ?,?)
              `,
        [title, introduction, text, req.user.id, idCategory]
      );
    }

    //Owner automatically votes himself, so "votes" in DB can be shown correctly.
    await connection.query(
      `INSERT INTO news_votes (id_user, id_news, vote, date, lastUpdate)
       VALUES (?,?,?,UTC_TIMESTAMP, UTC_TIMESTAMP);`,
      [req.user.id, result.insertId, 1]
    );

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
