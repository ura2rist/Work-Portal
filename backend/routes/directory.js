const express = require('express');
const router = express.Router();
const models = require('../models');
const cors = require('cors');

router.get('/category', cors(), (request, response, next) => {
  models.db.category.findAll({
    order: [['position', 'ASC']], 
    include: {
      model: models.db.subCategory
    }
  })
  .then((category) => {
    function getCategory(category) {
      let result = [];

      category.forEach(function(item){
        let content = {
          id: item.id,
          category: item.category,
          subCategories: []
        }

        if(item.subCategories) {
          item.subCategories.map(sub => {
            content.subCategories.push({id: sub.id, category: sub.subCategory, position: sub.categorySubcategory.position})
          });
          content.subCategories.sort((a, b) => a.position - b.position);
        }

        result.push(content)
      })

      return result;
    }

    response.json(getCategory(category));
  })
  .catch(err=>console.log(err));
});

router.get('/people', cors(), (request, response, next) => {
  const { category, subCategory } = request.query;
  if(subCategory) {
    models.db.employe.findAll({
      order: [['position', 'ASC']],
      include: [{
        model: models.db.categorySubcategory,
        where: {
          categoryId: category,
          subCategoryId: subCategory 
        },
        include: [{
          model: models.db.category
        },
        {
          model: models.db.subCategory
        }]
      },
      {
        model: models.db.personRank,
        include: [{
          model: models.db.person
        },
        {
          model: models.db.rank
        }]
      },
      {
        model: models.db.phone
      },
      {
        model: models.db.mainPhone
      }]
    })
    .then(people => {
      if(people.length <= 0) {
        response.json(false);
        return;
      }
      response.json(people);
    })
    .catch(err => console.log(err));
  } else {
    models.db.employe.findAll({
      order: [['position', 'ASC']],
      include: [{
        model: models.db.categorySubcategory,
        where: {
          categoryId: category
        },
        include: [{
          model: models.db.category
        },
        {
          model: models.db.subCategory
        }]
      },
      {
        model: models.db.personRank,
        include: [{
          model: models.db.person
        },
        {
          model: models.db.rank
        }]
      },
      {
        model: models.db.phone
      },
      {
        model: models.db.mainPhone
      }]
    })
    .then(people => {
      if(people.length <= 0) {
        response.json(false);
        return;
      }
      let result = [];
      people.map((item) => {
        result.push({
          name: item.personRank.person.fullName,
          rank: item.personRank.rank.rank,
          phone: item.phone.phone,
          mainPhone: item.mainPhone.mainPhone,
          description: item.description,
          category: {
            name: item.categorySubcategory.category.category,
            address: item.categorySubcategory.category.address,
            position: item.categorySubcategory.category.position
          },
          subCategory: {
            name: item.categorySubcategory.subCategory.subCategory,
            position: item.categorySubcategory.position
          }
        })
      });
      response.json(result)
    })
    .catch(err => console.log(err));
  }
});

module.exports = router;