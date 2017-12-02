const getPreferences = (request, response, next) => {
  if (request.user) {
    request.query = {
      topics: request.user.topics,
      sources: request.user.selectedSources,
      sortBy: 'publishedAt',
    };

    request.preferences = {
      topics: request.user.topics,
      sources: request.user.selectedSources,
    };
  }
  next();
};

export default getPreferences;
