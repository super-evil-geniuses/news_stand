import Article from '../database/models/article';

const findArticle = (request, response, next) => {
  Article.findById(request.params.id)
    .then((doc) => {
      let favorited = false;
      request.favorites.forEach((favorite) => {
        if (favorite.url === doc.url) {
          favorited = true;
        }
      });
      request.article = doc;
      request.favorited = favorited;
      console.log('response from database: ', doc);
    })
    .catch((err) => {
      console.log('Error not able to find article: ', err);
    })
    .then(() => {
      next();
    });
};

export default findArticle;
