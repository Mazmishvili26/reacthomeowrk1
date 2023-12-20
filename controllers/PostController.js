const PostModel = require("../models/Post");
const CategoryModel = require("../models/Category");

const addPost = async (req, res) => {
  const { title, description, category, timestamp } = req.body;

  if (!title || !description || !category || !timestamp) {
    return res.status(400).json({ errorMessage: "All fields are required." });
  }

  let categoryId;
  if (category.name) {
    const existingCategory = await CategoryModel.findOne({
      name: category.name,
    });

    if (existingCategory) {
      categoryId = existingCategory._id;
    } else {
      const newCategory = new CategoryModel({
        name: category.name,
      });

      const savedCategory = await newCategory.save();
      categoryId = savedCategory._id;
    }
  } else {
    return res
      .status(400)
      .json({ errorMessage: "Category should include a name." });
  }

  const post = {
    title,
    description,
    category: categoryId,
    timestamp,
  };

  // Assuming 'posts' is a variable defined elsewhere in your code
  // and it represents an array of posts

  // Replace the following line with the logic to save the post in your database
  // For example, if you are using a PostModel, you might do something like:
  // const savedPost = await PostModel.create(post);

  // posts.push(post);

  res
    .status(201)
    .json({ success: true, message: "Post created successfully." });
};

module.exports = {
  addPost,
};
