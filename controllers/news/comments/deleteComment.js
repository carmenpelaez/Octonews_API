const getDB = require("../../../database/config");
const { generateError } = require("../../../helpers");

const deleteComment = async (req, res, next) => {
  let connection;

  try {
    //Check if the auth user is the same as the owner of the news(We get news from isNews middleware)
    if (req.user.id !== req.comment.id_user) {
      throw generateError("You have no permission to delete this comment", 403);
    }

    connection = await getDB();
    const { idComment } = req.params;

    //We delete the comment
    await connection.query(
      `
          DELETE FROM news_comments WHERE id = ?
        `,
      [idComment]
    );

    res.send({
      status: "ok",
      message: "Comment deleted.",
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
  deleteComment,
};
