const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    const tags = tagData.map((tag) =>
      tag.get({ plain: true })
    );
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(404).json({ message: "Not Found" });
    } else {
      const tag = tagData.get({ plain: true });
      res.status(200).json(tag);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const { tagName } = req.body;
    await Tag.create({ tag_name: tagName });
    req.status(200).json({ message: "Tag Created!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const { tagName } =  req.body;
    await Tag.update(
      { tag_name: tagName },
      { where: { id: req.params.id } }  
    );
    res.status(200).json({ message: "Tag updated!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!deletedTag) { 
      res.status(404).json({ message: "Tag doesn't exist!" });
    } else {
      res.status(200).json({ message: "Tag deleted!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
