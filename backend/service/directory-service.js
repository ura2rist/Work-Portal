const models = require('../models');

class DirectoryService {
  async addCategory(title) {
    const maxPosition = await models.db.category.findOne({
      order: [ [ 'position', 'DESC' ] ]
    });

    const category = await models.db.category.create({
      category: title,
      position: maxPosition ? maxPosition.dataValues.position + 10 : 0
    });

    return;
  }

  async removeCategory(id) {
    const category = await models.db.category.destroy({ where: { id: id } });

    return category;
  }

  async changeCategory({ id, title, position }) {
    const category = await models.db.category.update({ category: title, position: position }, { where: { id: id } });

    return category;
  }

  async addSubCategory({ id, title }) {
    const searchSubCat = await models.db.subCategory.findOne({ where: { subCategory: title } });
    const category = await models.db.category.findOne({ where: { id: id } });
    const max = await models.db.categorySubcategory.findOne({ where: { categoryId: id }, order: [ [ 'position', 'DESC' ] ] });

    if(searchSubCat) {
      const bundle = await models.db.categorySubcategory.findOne({ where: { categoryId: id, subCategoryId: searchSubCat.id } });

      if(!bundle) category.addSubCategory(searchSubCat, { through: { position: max ? max.position + 10 : 0 } });
    } else {
      const addSubCat = await models.db.subCategory.create({subCategory: title});

      category.addSubCategory(addSubCat, { through: { position: max ? max.position + 10 : 0 } });
    }

    return;
  }

  async removeSubCategory({ catId, subCatId }) {
    const catSubCat = await models.db.categorySubcategory.destroy({ where: { categoryId: catId, subCategoryId: subCatId } });

    return catSubCat;
  }

  async changeSubCategory({ id, title, position, catId }) {
    const category = await models.db.subCategory.update({ subCategory: title }, { where: { id: id } });

    const catSubCat = await models.db.categorySubcategory.update({ position: position }, { where: { categoryId: catId, subCategoryId: id } });

    return category;
  }

  async addPeople({ idCat: selectCat, idSubCat: selectSubCat, text }) {
    const arrText = text.split(';');

    const catSubCat = await models.db.categorySubcategory.findOne({ where: { categoryId: selectCat, subCategoryId: selectSubCat } });
    const arrResult = [];
    
    arrText.forEach((item) => {
      const text = item.replaceAll('\n','').split(':');

      if(text.length == 5) arrResult.push(text);
    });

    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    const add = async () => {
      await asyncForEach(arrResult, async (item) => {
        const people = await models.db.person.create({fullName: item[0]});
        let rank = await models.db.rank.findOne({ where: { rank: item[1] } });
        const employeMax = await models.db.employe.findOne({ where: { categorySubcategoryId: catSubCat.id }, order: [ [ 'position', 'DESC' ] ] });
        
        rank = rank ? rank : await models.db.rank.create({ rank: item[1] });

        let linkRank = await people.addRank(rank);

        const phone = await models.db.phone.findOne({ where: { phone: item[2] } }) ? await models.db.phone.findOne({ where: { phone: item[2] } }) : await models.db.phone.create({phone: item[2]});
        const mainPhone = await models.db.mainPhone.findOne({ where: { mainPhone: item[3] } }) ? await models.db.mainPhone.findOne({ where: { mainPhone: item[3] } }) : await models.db.mainPhone.create({mainPhone: item[3]});

        const employe = await models.db.employe.create({ personRankId: linkRank[0].dataValues.id, phoneId: phone.id, mainPhoneId: mainPhone.id, categorySubcategoryId: catSubCat.id, description: item[4], position: employeMax ? employeMax.position + 10 : 0 });
      });
    }
    await add();
  }

  async removePeople({ id, employe }) {
    const findEmploye = await models.db.employe.findOne({ where: { id: employe } });
    const personRankFind = await models.db.personRank.findOne({ where: { id: findEmploye.dataValues.personRankId } });
    const personRank = await models.db.personRank.destroy({ where: { id: personRankFind.dataValues.id } });
    const removeEmploye = await models.db.employe.destroy({ where: { id: employe } });
    const removePeople = await models.db.person.destroy({ where: { id: personRankFind.dataValues.personId } });

    return;
  }

  async getInfo({ id }) {
    const findEmploye = await models.db.employe.findOne({ where: { id: id }, include: [{
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
      }] });

    const info = {
      fio: {
        id: findEmploye.dataValues.personRank.dataValues.person.dataValues.id,
        name: findEmploye.dataValues.personRank.dataValues.person.dataValues.fullName
      },
      rank: {
        id: findEmploye.dataValues.personRank.dataValues.rank.dataValues.id,
        name: findEmploye.dataValues.personRank.dataValues.rank.dataValues.rank
      },
      phone: {
        id: findEmploye.dataValues.phone.dataValues.id,
        name: findEmploye.dataValues.phone.dataValues.phone
      },
      mainPhone: {
        id: findEmploye.dataValues.mainPhone.dataValues.id,
        name: findEmploye.dataValues.mainPhone.dataValues.mainPhone
      },
      description: findEmploye.dataValues.description,
      position: findEmploye.dataValues.position,
      employe: id
    }

    return info;
  }

  async editPeople(info) {
    const findEmploye = await models.db.employe.findOne({ where: { id: info.employe }, include: [{
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
      }] });

    const person = await models.db.person.update({ fullName: info.fio }, { where: { id: findEmploye.dataValues.personRank.dataValues.person.dataValues.id } });
    const phone = await models.db.phone.update({ phone: info.phone }, { where: { id: findEmploye.dataValues.phone.dataValues.id } });
    const mainPhone = await models.db.mainPhone.update({ mainPhone: info.mainPhone }, { where: { id: findEmploye.dataValues.mainPhone.dataValues.id } });
    
    const rank = await models.db.rank.findOne({ where: { rank: info.rank } });

    if(rank) {
      const personRank = await models.db.personRank.update({ rankId: rank.dataValues.id }, { where: { id: findEmploye.dataValues.personRank.dataValues.id } });
    } else {
      const rankAdd = await models.db.rank.create({ rank: info.rank });
      const personRank = await models.db.personRank.update({ rankId: rankAdd.dataValues.id }, { where: { id: findEmploye.dataValues.personRank.dataValues.id } });
    }
    
    const employe = await models.db.employe.update({ description: info.description, position: info.position }, { where: { id: info.employe } });
    
    return;
  }
}

module.exports = new DirectoryService();