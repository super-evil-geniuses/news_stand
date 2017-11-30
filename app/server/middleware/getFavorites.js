import User from '../database/models/user';

const getFavorites = (request, response, next) => {
  if (request.user) {
    const findCriteria = { googleId: request.user.googleId };

    User.find(findCriteria)
      .then((doc) => {
        request.favorites = doc[0].articles;
        next();
      });
  } else {
    next();
  }
};

export default getFavorites;
