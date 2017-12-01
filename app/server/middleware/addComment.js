import moment from 'moment';

import Article from '../database/models/article';

const addComment = (request, response, next) => {
  if (request.user) {
    const comment = {
      username: request.user.username,
      comment: request.body.comment,
      profileImg: request.user.profileImg,
      commentedAt: moment(),
    };

    const findCriteria = { url: request.body.article.url };
    const toUpdate = { $push: { comments: { $each: [comment], $position: 0 } } };

    Article.findOneAndUpdate(findCriteria, toUpdate, { new: true })
      .then((doc) => {
        request.article = doc;
        console.log('response from database: ', doc);
      })
      .catch((err) => {
        console.log('Error adding comment to database: ', err);
      })
      .then(() => {
        next();
      });
  } else {
    next();
  }
};

export default addComment;
