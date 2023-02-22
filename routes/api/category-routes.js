const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    console.log(categoryData);

    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: "Not Found" });
    } else {
      const categories = categoryData.get({ plain: true });
        res.status(200).json(categories);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const { categoryName } = req.body;
    await Category.create({ category_name: categoryName});
    req.status(200).json({message: " Category Created!" });
    }catch (error) {
      res.status(500).json(error);
   }
});

router.put('/:id', async (req, res) => {
  try {
    const { categoryName } =  req.body;
    await Category.update(
      { category_name: categoryName },
      { where: { id: req.params.id } }  
    );
    res.status(200).json({ message: "Category updated!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deletedCategory) { 
      res.status(404).json({ message: "Category doesn't exist!" });
    } else {
      res.status(200).json({ message: "Category deleted!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
