const sw = require('stopword');
const _ = require('underscore');
const WordPOS = require('wordpos'),

wordpos = new WordPOS();

const createEdge = (article1, article2) => {
  if (!article1.edges[article2._id]) {
    let count = 0;
    Object.keys(article1.wordMap).forEach((word) => {
      if (article2.wordMap[word]) {
        count += 1;
      }
    });
    article1.edges[article2._id] = count;
    article2.edges[article1._id] = count;
  }
};

const createRecommendedList = (favArray, allArticles) => {
  debugger;
  const recommendedEdges = {};
  const reccommendedList = [];
  favArray.forEach((article) => {
    Object.keys(article.edges).forEach((articleId) => {
      if(recommendedEdges[articleId] !== 'favorite') {
        recommendedEdges[articleId] = {
          article: allArticles.find((article) => {
            return article.id === articleId;
          }),
          proximity: recommendedEdges[articleId] ? recommendedEdges[articleId].proximity + article.edges[articleId] : article.edges[articleId]
        };
      }
    });
    recommendedEdges[article.id] = 'favorite';
  });
  Object.keys(recommendedEdges).forEach((articleId) => {
    if(recommendedEdges[articleId] !== 'favorite') {
      reccommendedList.push(recommendedEdges[articleId]);
    }
  });
  return reccommendedList.sort((a,b) => {
    return b.proximity - a.proximity;
  });
};

const getRecommended = (request, response, next) => {
  debugger;
  const addedEdges = request.allArticles.map((article) => {
    const wordMap = {};
    const wordsArray = article.body.join(' ').replace(/[.,\/#!?'"$%\^&\*;:{}=\-_`~()]/g, '').split(' ').map(word => word.toLowerCase());
    return new Promise((resolve, reject) => {
      wordpos.getNouns(wordsArray.join(' '), (result) => {
        result.forEach((word) => {
          wordMap[word] = 1; // we could weight this using frequency * inverse appearance
        });
        article.edges = {};
        article.wordMap = wordMap;
        resolve(article);
      });
    });
  });

  Promise.all(addedEdges)
    .then((articleObjArr) => {    
      articleObjArr;
      for (let i = 0; i < articleObjArr.length - 1; i++) {
        for (let j = i + 1; j < articleObjArr.length; j++) {
          createEdge(articleObjArr[i], articleObjArr[j]);
        }
      }

      const favWordMappedArray = [];
      request.favorites.forEach((favArticle) => {
        const favWordMappedArticle = articleObjArr.find((article) => {
          return article.id === favArticle.id
        });
        favWordMappedArray.push(favWordMappedArticle);
      });
      request.recommendations = createRecommendedList(favWordMappedArray, request.allArticles).slice(0, 6); // THIS NEEDS TO SHOW ACTUAL FAVORITES!
      next();
    });
};

export default getRecommended;