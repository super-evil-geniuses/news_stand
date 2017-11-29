import axios from 'axios';
import moment from 'moment';
import Article from '../database/models/article.js';
import noodle from 'noodlejs';

const searchArticles = (request, response, next) => {

  const { sortBy, topics, selectedSources } = request.query;

  const beginDate = moment().subtract(3, 'weeks').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
  let url = `https://newsapi.org/v2/everything/?from=${beginDate}&to=${endDate}&sortBy=${sortBy}&language=en&apiKey=${process.env.NEWS_KEY}`;

  if (topics) {
    console.log('topics', topics)
    const formattedTopic = topics.join('%20OR%20').split(' ').join('%20');
    console.log('formatted topics', formattedTopic)
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

      let artsToSend = [];
      newsResponse.data.articles.forEach((art) => {
        Article.find({ url: art.url})
        .then((res) => {
          if (res.length) {
            artsToSend.push(res);
          } else {

            let query = {
              url: art.url,
              selector: 'p',
              extract: 'text',
            }

            noodle.query(query).then((results) => {
              console.log('from noodle', results.results[0].results);
              let vals = Object.assign({}, art)
              vals.body =  results.results[0].results;
              let artToSave = new Article(vals);
              artsToSend.push(artToSave);
              artToSave.save()
              .then((saved) => {
                console.log('Saved', saved);
              })
            })



          }
        })
        
      })
      ///////////////////////////////
      // here is where we need to  //
      // check db                  //
      // if it's not in the db {   //
      // send the web crawler      //
      //     store into the db     //
      // and store locally  }      //
      // else { store locally }    //
      ///////////////////////////////
      request.articles = artsToSend;
    })
    .catch((err) => {
      console.log('error newsAPI: ', err);
    })
    .then(() => next());
};

export default searchArticles;

