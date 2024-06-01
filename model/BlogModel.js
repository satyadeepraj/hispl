import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: [{
    type: String,
  }],
});

const blogPostSchema = new mongoose.Schema({
  maintitle: {
    type: String,
  },
  maincontent: {
    type: String,
  },

  author: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
  datePublished: {
    type: Date,
  },
  images: [{ type: String }],
  sections: [sectionSchema],
});

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
