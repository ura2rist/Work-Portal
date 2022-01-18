const Sequelize = require('sequelize');
const { db_name, db_user, db_password, db_host } = require('../config');
const sequelize = new Sequelize(db_name, db_user, db_password, {
  dialect: 'mysql',
  host: db_host,
});

const menu = sequelize.define('menu', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
});

const user = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  personId: {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: {
      model: 'person',
      key: 'id'
    }
  }
},{
  timestamps: false,
  freezeTableName: true
});

const person = sequelize.define('person', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  }
},{
  timestamps: false,
  freezeTableName: true
});

const news = sequelize.define('news', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
});

const events = sequelize.define('events', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  content: {
    type: Sequelize.STRING(170),
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
});

const rank = sequelize.define('rank', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  rank: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
});

const mainPhone = sequelize.define('mainPhone', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  mainPhone: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  }
},{
  timestamps: false,
  freezeTableName: true
});

const phone = sequelize.define('phone', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  }
},{
  timestamps: false,
  freezeTableName: true
});

const category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
});

const subCategory = sequelize.define('subCategory', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  subCategory: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
});

const categorySubcategory = sequelize.define("categorySubcategory", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
});

const employe = sequelize.define('employe', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  personRankId: {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: {
      model: 'personRank',
      key: 'id'
    }
  },
  phoneId: {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: {
      model: 'phone',
      key: 'id'
    }
  },
  mainPhoneId: {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: {
      model: 'mainPhone',
      key: 'id'
    }
  },
  categorySubcategoryId: {
    allowNull: true,
    type: Sequelize.INTEGER,
    references: {
      model: 'categorySubcategory',
      key: 'id'
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
});

const personRank = sequelize.define("personRank", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
},{
  timestamps: false,
  freezeTableName: true
});

user.belongsTo(person);
news.belongsTo(user);
employe.belongsTo(categorySubcategory);
employe.belongsTo(personRank);
employe.belongsTo(phone);
employe.belongsTo(mainPhone);
personRank.belongsTo(person);
personRank.belongsTo(rank);
categorySubcategory.belongsTo(category);
categorySubcategory.belongsTo(subCategory);
category.belongsToMany(subCategory, { through: categorySubcategory });
person.belongsToMany(rank, { through: personRank });

sequelize.sync().then(result=>{
  console.log(result);
})
.catch(err=> console.log(err));


module.exports = {
  sequelize,
  menu,
  news,
  person,
  user,
  events,
  category,
  subCategory,
  categorySubcategory,
  employe,
  rank,
  phone,
  mainPhone,
  personRank
}