import Article from '../database/models/article';

const addComment = (request, response, next) => {
  if (request.user) {
    const comment = {
      username: request.user.username,
      comment: request.body.comment,
    };

    const findCriteria = { url: request.body.article.url };
    const toUpdate = { $push: { comments: { $each: [comment], $position: 0 } } };

    const dummyData = {
      "source": {
          "id": null,
          "name": "Salesforce.com"
      },
      "author": null,
      "title": "Data Manager - Import Data",
      "description": "Hello,<br><br>I am trying to import data to saleforce. I have done twice but when I checked the challenge. It still shows that &quot;All the contact records from the CSV file were not found in the Org.&quot;<br>The Recent Import Jobs shows both of my import&#…",
      "url": "https://success.salesforce.com/answers?id=9063A000000lCJhQAM",
      "urlToImage": null,
      "publishedAt": "2017-11-15T22:33:06Z",
      "favorites": 0,
      "comments": [],
    };

    const artToSave = new Article(dummyData);
    artToSave.save()
      .then(() => {
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
      });

  } else {
    next();
  }
};

export default addComment;
