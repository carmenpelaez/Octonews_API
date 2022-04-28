const getDB = require("../../database/config");
const { generateError } = require("../../helpers/generateError");

async function getNews(req, res, next) {
  let connection;

  try {
    connection = await getDB();
    console.log(req.query);
    /* REVISAR SI TODO ESTO SE PUEDE CAMBIAR CON UN SWITCH */
    const { date, category } = req.query;

    if (date) {
      const [result] = await connection.query(
        `SELECT title,introduction_text,news_text,image, COUNT(nv.vote) AS votos
       FROM news n
       INNER JOIN news_votes nv ON nv.id_news = n.id
       WHERE n.creation_date = ? ${
         category
           ? `AND id_category =(SELECT id_category FROM categories WHERE name="${category}")`
           : ``
       }
       GROUP BY title 
       ORDER BY votos DESC; `,
        [date]
      );

      if (result.length === 0) {
        if (category) {
          throw generateError(
            "No se han encontrado noticias con esta fecha o categoría. Pruebe a cambiar los filtros",
            409
          );
        } else {
          throw generateError(
            "No se han encontrado noticias con esta fecha. Intente buscar noticias de otro día",
            409
          );
        }
      }

      return res.send({ status: "OK", noticias: result });

      /* REVISAR SI ESTE ES EL CODIGO DE ERROR CORRECTO */
    } else {
      const [result] = await connection.query(
        `SELECT title,introduction_text,news_text,image, COUNT(nv.vote) AS votos
     FROM news n
     INNER JOIN news_votes nv ON nv.id_news = n.id
     WHERE n.creation_date = current_date() ${
       category
         ? `AND id_category =(SELECT id_category FROM categories WHERE name="${category}")`
         : ``
     }
     GROUP BY title
     ORDER BY votos DESC; `
      );

      return res.send({ status: "OK", noticias: result });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = getNews;
