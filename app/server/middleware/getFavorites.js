import Promise from 'bluebird';

import User from '../database/models/user';
import Articles from '../database/models/article';

const getFavorites = (request, response, next) => {
  if (request.user) {
    const findCriteria = { googleId: request.user.googleId };

    User.find(findCriteria)
      .then((doc) => {
        const articles = [];
        return Promise.each(doc[0].articles, (url) => {
          return Articles.find({ url })
            .then((article) => {
              articles.push(article[0]);
            });
        }).then(() => {
          return articles;
        });
      })
      .then((articles) => {
        request.favorites = articles;
        next();
      });
  } else {
    next();
  }
};

export default getFavorites;
