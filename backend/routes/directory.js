const express = require('express');
const router = express.Router();
const models = require('../models');
const cors = require('cors');
const Op = models.db.Sequelize.Op;

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

router.get('/search', cors(), (request, response, next) => {
  let statusSearch = request.query.allSearch;
  let data = request.query.data;

  if(statusSearch) {
    models.db.employe.findAll({
      order: [['position', 'ASC']],
      include: [{
        model: models.db.categorySubcategory,
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
        model: models.db.phone,
      },
      {
        model: models.db.mainPhone,
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
            id: item.personRank.person.id,
            name: item.personRank.person.fullName,
            rank: item.personRank.rank.rank,
            phone: item.phone.phone,
            mainPhone: item.mainPhone.mainPhone,
            description: item.description,
            position: item.position,
            category: {
              id: item.categorySubcategory.categoryId,
              name: item.categorySubcategory.category.category,
              address: item.categorySubcategory.category.address,
              position: item.categorySubcategory.category.position
            },
            subCategory: {
              id: item.categorySubcategory.subCategoryId,
              name: item.categorySubcategory.subCategory.subCategory,
              position: item.categorySubcategory.position
            }
          })
        });
  
        result = result.filter(function(item){
          return item.name.includes(data) || item.phone.includes(data) || item.mainPhone.includes(data);
        })
        
        result = result.reduce((accum, current) => {
          let category = current.category.name;
          let subCategory = current.subCategory.name;
          
          if(!accum.some(item => item.category === category)) {
            accum.push({
              id: current.category.id,
              category: category,
              pos: current.category.position,
              subCategory: []
            })
           }
          
          accum.map((item, index) => {
            if(item.category === category && !item.subCategory.some(sub => sub.name === subCategory)) {
              accum[index].subCategory.push({
                id: current.subCategory.id,
                name: subCategory,
                pos: current.subCategory.position,
                data: [
                  {
                    id: current.id,
                    name: current.name,
                    rank: current.rank,
                    phone: current.phone,
                    mainPhone: current.mainPhone,
                    description: current.description,
                    pos: current.position
                  }
                ]
              })
            } else if (item.category === category && item.subCategory.some(sub => sub.name === subCategory)) {
                accum[index].subCategory.map((item, indexSub) => {
                  if(accum[index].subCategory[indexSub].name === subCategory) {
                    accum[index].subCategory[indexSub].data.push({id: current.id, name: current.name, rank: current.rank, phone: current.phone, mainPhone: current.mainPhone, description: current.description, pos: current.position})
                  }
                })
            }
          })
          
          return accum;
        }, [])
        
        result = result.sort((a, b) => { return a.pos - b.pos });
        result.map((item, index) => {
          result[index].subCategory = item.subCategory.sort((a, b) => { 
            return a.pos - b.pos;
          });
          result[index].subCategory.map((itemSub, indexSub) => {
            result[index].subCategory[indexSub].data = itemSub.data.sort((a, b) => {
              return a.pos - b.pos;
            })
          })
        });
  
        response.json(result)
      })
      .catch(err => console.log(err));
  } else {
    models.db.employe.findAll({
      order: [['position', 'ASC']],
      include: [{
        model: models.db.categorySubcategory,
        include: [{
          model: models.db.category,
          where: {
            id: request.query.category
          }
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
        model: models.db.phone,
      },
      {
        model: models.db.mainPhone,
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
            id: item.personRank.person.id,
            name: item.personRank.person.fullName,
            rank: item.personRank.rank.rank,
            phone: item.phone.phone,
            mainPhone: item.mainPhone.mainPhone,
            description: item.description,
            position: item.position,
            category: {
              id: item.categorySubcategory.categoryId,
              name: item.categorySubcategory.category.category,
              address: item.categorySubcategory.category.address,
              position: item.categorySubcategory.category.position
            },
            subCategory: {
              id: item.categorySubcategory.subCategoryId,
              name: item.categorySubcategory.subCategory.subCategory,
              position: item.categorySubcategory.position
            }
          })
        });
  
        result = result.filter(function(item){
          return item.name.includes(data) || item.phone.includes(data) || item.mainPhone.includes(data);
        })
        
        result = result.reduce((accum, current) => {
          let category = current.category.name;
          let subCategory = current.subCategory.name;
          
          if(!accum.some(item => item.category === category)) {
            accum.push({
              id: current.category.id,
              category: category,
              pos: current.category.position,
              subCategory: []
            })
           }
          
          accum.map((item, index) => {
            if(item.category === category && !item.subCategory.some(sub => sub.name === subCategory)) {
              accum[index].subCategory.push({
                id: current.subCategory.id,
                name: subCategory,
                pos: current.subCategory.position,
                data: [
                  {
                    id: current.id,
                    name: current.name,
                    rank: current.rank,
                    phone: current.phone,
                    mainPhone: current.mainPhone,
                    description: current.description,
                    pos: current.position
                  }
                ]
              })
            } else if (item.category === category && item.subCategory.some(sub => sub.name === subCategory)) {
                accum[index].subCategory.map((item, indexSub) => {
                  if(accum[index].subCategory[indexSub].name === subCategory) {
                    accum[index].subCategory[indexSub].data.push({id: current.id, name: current.name, rank: current.rank, phone: current.phone, mainPhone: current.mainPhone, description: current.description, pos: current.position})
                  }
                })
            }
          })
          
          return accum;
        }, [])
        
        result = result.sort((a, b) => { return a.pos - b.pos });
        result.map((item, index) => {
          result[index].subCategory = item.subCategory.sort((a, b) => { 
            return a.pos - b.pos;
          });
          result[index].subCategory.map((itemSub, indexSub) => {
            result[index].subCategory[indexSub].data = itemSub.data.sort((a, b) => {
              return a.pos - b.pos;
            })
          })
        });
  
        response.json(result)
      })
      .catch(err => console.log(err));
  }
  
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
      let result = [];
      people.map((item) => {
        result.push({
          id: item.personRank.person.id,
          name: item.personRank.person.fullName,
          rank: item.personRank.rank.rank,
          phone: item.phone.phone,
          mainPhone: item.mainPhone.mainPhone,
          description: item.description,
          position: item.position,
          category: {
            id: item.categorySubcategory.categoryId,
            name: item.categorySubcategory.category.category,
            address: item.categorySubcategory.category.address,
            position: item.categorySubcategory.category.position
          },
          subCategory: {
            id: item.categorySubcategory.subCategoryId,
            name: item.categorySubcategory.subCategory.subCategory,
            position: item.categorySubcategory.position
          }
        })
      });

      result = result.reduce((accum, current) => {
        let category = current.category.name;
        let subCategory = current.subCategory.name;
        
        if(!accum.some(item => item.category === category)) {
          accum.push({
            id: current.category.id,
            category: category,
            pos: current.category.position,
            subCategory: []
          })
         }
        
        accum.map((item, index) => {
          if(item.category === category && !item.subCategory.some(sub => sub.name === subCategory)) {
            accum[index].subCategory.push({
              id: current.subCategory.id,
              name: subCategory,
              pos: current.subCategory.position,
              data: [
                {
                  id: current.id,
                  name: current.name,
                  rank: current.rank,
                  phone: current.phone,
                  mainPhone: current.mainPhone,
                  description: current.description,
                  pos: current.position
                }
              ]
            })
          } else if (item.category === category && item.subCategory.some(sub => sub.name === subCategory)) {
              accum[index].subCategory.map((item, indexSub) => {
                if(accum[index].subCategory[indexSub].name === subCategory) {
                  accum[index].subCategory[indexSub].data.push({id: current.id, name: current.name, rank: current.rank, phone: current.phone, mainPhone: current.mainPhone, description: current.description, pos: current.position})
                }
              })
          }
        })
        
        return accum;
      }, [])
      
      result = result.sort((a, b) => { return a.pos - b.pos });
      result.map((item, index) => {
        result[index].subCategory = item.subCategory.sort((a, b) => { 
          return a.pos - b.pos;
        });
        result[index].subCategory.map((itemSub, indexSub) => {
          result[index].subCategory[indexSub].data = itemSub.data.sort((a, b) => {
            return a.pos - b.pos;
          })
        })
      });

      response.json(result)
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
          id: item.personRank.person.id,
          name: item.personRank.person.fullName,
          rank: item.personRank.rank.rank,
          phone: item.phone.phone,
          mainPhone: item.mainPhone.mainPhone,
          description: item.description,
          position: item.position,
          category: {
            id: item.categorySubcategory.categoryId,
            name: item.categorySubcategory.category.category,
            address: item.categorySubcategory.category.address,
            position: item.categorySubcategory.category.position
          },
          subCategory: {
            id: item.categorySubcategory.subCategoryId,
            name: item.categorySubcategory.subCategory.subCategory,
            position: item.categorySubcategory.position
          }
        })
      });

      result = result.reduce((accum, current) => {
        let category = current.category.name;
        let subCategory = current.subCategory.name;
        
        if(!accum.some(item => item.category === category)) {
          accum.push({
            id: current.category.id,
            category: category,
            pos: current.category.position,
            subCategory: []
          })
         }
        
        accum.map((item, index) => {
          if(item.category === category && !item.subCategory.some(sub => sub.name === subCategory)) {
            accum[index].subCategory.push({
              id: current.subCategory.id,
              name: subCategory,
              pos: current.subCategory.position,
              data: [
                {
                  id: current.id,
                  name: current.name,
                  rank: current.rank,
                  phone: current.phone,
                  mainPhone: current.mainPhone,
                  description: current.description,
                  pos: current.position
                }
              ]
            })
          } else if (item.category === category && item.subCategory.some(sub => sub.name === subCategory)) {
              accum[index].subCategory.map((item, indexSub) => {
                if(accum[index].subCategory[indexSub].name === subCategory) {
                  accum[index].subCategory[indexSub].data.push({id: current.id, name: current.name, rank: current.rank, phone: current.phone, mainPhone: current.mainPhone, description: current.description, pos: current.position})
                }
              })
          }
        })
        
        return accum;
      }, [])
      
      result = result.sort((a, b) => { return a.pos - b.pos });
      result.map((item, index) => {
        result[index].subCategory = item.subCategory.sort((a, b) => { 
          return a.pos - b.pos;
        });
        result[index].subCategory.map((itemSub, indexSub) => {
          result[index].subCategory[indexSub].data = itemSub.data.sort((a, b) => {
            return a.pos - b.pos;
          })
        })
      });

      response.json(result)
    })
    .catch(err => console.log(err));
  }
});

module.exports = router;