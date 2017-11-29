import Article from '../database/models/article.js';
import noodle from 'noodlejs';
import Promise from 'bluebird';


const scraper = (req, res, next) => {
  
  let articles = req.articles.map((article) => {
    if (article.source.name === 'TechCrunch') {
      return tcScrape(article);
    } else if (article.source.name === 'ABC News') {
      return abcScrape(article);
    } 
    return article;
  })
  Promise.all(articles)
  .then((arr) => {    
    req.articles = arr.filter((e) => !!e );
    next();
  })
};

const tcScrape = (article) => {
  console.log('running TechCrunch Scrape')
  return new Promise((resolve, reject) => {

    Article.find({ url: article.url})
    .then((res) => {
      if (res.length) {
        resolve(res[0])
      } else {
        let query = {
          url: article.url,
          selector: 'p',
          extract: 'text',
        };
        noodle.query(query)
        .then((results) => {
          article.body = results.results[0].results.slice(3);
          let artToSave = new Article(article);
          artToSave.save()
          .then((saved) => {
            resolve(saved);
          })
        })

      }
    })
    
  })
};

const abcScrape = (article) => {
  console.log('running ABC Scrape')
  return new Promise((resolve, reject) => {

  if (article.title.includes('WATCH')) {
    resolve(null);
  }
  Article.find({ url: article.url})
  .then((res) => {
    if (res.length) {
      resolve(res[0]);
    } else {
      let query = {
        url: article.url,
        selector: 'p',
      };
      noodle.query(query)
      .then((results) => {
        article.body = results.results[0].results;
        let artToSave = new Article(article);
        artToSave.save()
        .then((saved) => {
          resolve(saved);
        })
      })

    }
  })
    
  })
};



export default scraper;