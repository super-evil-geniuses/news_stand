import axios from 'axios';
import moment from 'moment';
import Article from '../database/models/article.js'

const searchArticles = (request, response, next) => {

  const { sortBy, topics, selectedSources } = request.query;

  const beginDate = moment().subtract(3, 'weeks').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
  let url = `https://newsapi.org/v2/everything/?from=${beginDate}&to=${endDate}&sortBy=${sortBy}&language=en&apiKey=${process.env.NEWS_KEY}`;

  if (topics) {
    const formattedTopic = topics.join('%20OR%20').split(' ').join('%20');
    url += `&q=${formattedTopic}`;
  }
  if (selectedSources) {
    const formattedSource = selectedSources.map((source) => {
      let parsedSource = source;
      if (typeof parsedSource === 'string') {
        parsedSource = JSON.parse(parsedSource);
      }
      return parsedSource.id;
    }).join(',');
    url += `&sources=${formattedSource}`;
  } else if (!selectedSources && !topics) {
    url += '&sources=techcrunch';
  }

  // Request information from newsAPI`
  axios
    .get(url)
    .then((newsResponse) => {
      ///////////////////////////////
      // here is where we need to  //
      // check db                  //
      // if it's not in the db {   //
      // send the web crawler      //
      //     store into the db     //
      // and store locally  }      //
      // and store locally  }      //
      ///////////////////////////////
      request.articles = newsResponse.data.articles;
    })
    .catch((err) => {
      console.log('error newsAPI: ', err);
    })
    .then(() => next());
};

export default searchArticles;

