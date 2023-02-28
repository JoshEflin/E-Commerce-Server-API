// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false

    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
     validate: {
      is:/^(0(?!\.00)|[1-9]\d{0,6})\.\d{2}$/
       }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate:{
      isNumeric: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
      
    }
  },
  {
    // hooks: {
    //   beforeCreate: async (potentialPrice) => {
    //     // https://stackoverflow.com/questions/35130115/regex-for-price-requiring-decimal-point-and-2-decimal-places
    //     const price = potentialPrice.match(/^(0(?!\.00)|[1-9]\d{0,6})\.\d{2}$/)
    //     if (price){
    //       return potentialPrice;
    //     }
    //     return console.log('price format must containt exactly 2 decimal places')
    //   }
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
