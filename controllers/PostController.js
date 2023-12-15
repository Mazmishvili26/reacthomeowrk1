const Category = require('../models/Category');

const createPost = async (req, res) => {
  const { title, description, category, timestamp } = req.body;

  if (!title || !description || !category || !timestamp) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  let categoryId;
  if (category.name) {
    const existingCategory = await Category.findOne({ name: category.name });
    if (existingCategory) {
      categoryId = existingCategory._id;
    } else {
      const newCategory = new Category({
        name: category.name,
      });
      const savedCategory = await newCategory.save();
      categoryId = savedCategory._id;
    }
  } else {
    return res.status(400).json({ error: 'Category should include a name.' });
  }
  const post = {
    title,
    description,
    category: categoryId,
    timestamp,
  };

  posts.push(post);

  res.status(201).json({ message: 'Post created successfully.' });
};

module.exports = {
  createPost,
};
