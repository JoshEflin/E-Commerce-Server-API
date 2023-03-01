const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {const tags = await Tag.findAll({
    //  include its associated Product data
    include: {model: Product}
  });
  
  res.status(200).json(tags)
} catch(err) {
  console.log(req)
  res.status(500).json(err)
}
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const tag = await Tag.findByPk(req.params.id, {
    // include its associated Product data
    include: {model: Product}
  });
  res.status(200).json(tag)
} catch(err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  try {
    // create a new tag
    const newTag = await Tag.create(req.body, {
    include: {model: Product}
  })
  res.status(200).json(newTag)
} catch(err) {
  res.status(500).json(err)
}
});

router.put('/:id', async (req, res) => {
  try {const update = await Tag.update(req.body, {
    where: {id: req.params.id},
    include: {model: Product}
  })
  res.status(200).json(update)
} catch(err) {
  res.status(500).json(err);
}// update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {const delTag = await Tag.destroy({
    where: {id: req.params.id},
    include: {model: Product}
  });
  res.status(200).json(delTag)
} catch(err) {
  res.status(500).json(err)
}// delete on tag by its `id` value
});

module.exports = router;
