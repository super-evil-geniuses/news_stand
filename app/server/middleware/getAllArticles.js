import Articles from '../database/models/article';

const getAllArticles = (request, response, next) => {
  Articles.find({})
    .then((articles) => {
      request.allArticles = articles;
      next();
    })
    .catch((err) => {
      console.log('ERROR GETTING ALL ARTICLES', err);
    });
};

export default getAllArticles;
