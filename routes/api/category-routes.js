const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
    //include its associated Products
    include: [{model: Product}]
  }).catch((err)=>{
    res.status(500).json(err)
  });
  res.status(200).json(categories)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value params.id holds the value of the request ID
  try {const category = await Category.findByPk(req.params.id,{
    // be sure to include its associated Products
    include:[{model: Product}]
    });
    res.status(200).json(category)
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const newCat = await Category.create(req.body, {
    
    include:[{model: Product}]
    });
    res.status(200).json(newCat)
  }catch(err){
    res.status(500).json(err);
  
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCat = await Category.update(req.body, {
      // update a category by its `id` value
      where: {id :req.params.id},
      include:[{model: Product}]
      });
      res.status(200).json(updateCat)
    }catch(err){
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const delCat = await Category.destroy({
      // delete a category by its `id` value
      where: {id :req.params.id},
      include:[{model: Product}]
      });
      res.status(200).json(delCat)
    }catch(err){
      res.status(500).json(err);
    }
});

module.exports = router;
