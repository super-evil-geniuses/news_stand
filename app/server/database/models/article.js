import mongoose from 'mongoose';

const { Schema } = mongoose;

const articleSchema = new Schema({
  urlToImage: String,
  title: String,
  description: String,
  source: {
    name: String,
  },
  author: String,
  url: String,
  body: [],
  comments: [], // {username: String, comment: String}
  favorites: { type: Number, default: 0 },
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
