import User from '../database/models/user';

const setPreferences = (request, response, next) => {
  if (request.user) {
    console.log(request.body)
    User.findOneAndUpdate(
      { googleId: request.user.googleId },
      { $set: { topics: request.body.topics, selectedSources: request.body.sources } },
      {new: true},
      (err, doc) => {
        if (err) {
          console.log('There was an error updating preferences: ', err);
        } else {
          request.updatedUser = doc;
          console.log('Successfully updated doc: ', doc);
        }
        next();
      },
    );
  }

  // TODO: add feature notifying user needs to be logged in
};

export default setPreferences;
