import Article from '../database/models/article';

const findArticle = (request, response, next) => {

  Article.findById(request.params.id)
    .then((doc) => {
      request.article = doc;
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
