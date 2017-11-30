import User from '../database/models/user';
import Article from '../database/models/article';

const addFavorite = (request, response, next) => {
  if (request.user) {
    const favorited = new Article({
      urlToImage: request.body.urlToImage,
      title: request.body.title,
      description: request.body.description,
      source: {
        name: request.body.source.name,
      },
      author: request.body.author,
      url: request.body.url,
    });

    const articleFindCriteria = { url: request.body.url };
    const userFindCriteria = { googleId: request.user.googleId };

    let articleToUpdate;
    let userToUpdate;

    if (!request.body.favorited) {
      articleToUpdate = { $inc: { favorites: 1 } };
      userToUpdate = { $addToSet: { articles: favorited } };
    } else {
      articleToUpdate = { $inc: { favorites: -1 } };
      userToUpdate = { $pull: { articles: { url: request.body.url } } };
    }

    Article.findOneAndUpdate(articleFindCriteria, articleToUpdate, { new: true })
      .then((doc) => {
        request.article = doc;
      })
      .then(() => {
        User.findOneAndUpdate(userFindCriteria, userToUpdate)
          .exec()
          .then((doc) => {
            console.log(doc);
          })
          .catch((err) => {
            console.log('error adding favorite to the database: ', err);
          });
      })
      .then(() => {
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default addFavorite;
