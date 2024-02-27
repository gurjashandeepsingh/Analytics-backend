// Import Sequelize
import { DataTypes, Sequelize } from "sequelize";

// Define the Sequelize model
module.exports = (sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sold: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      dateOfSale: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      sold: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      // Other options
    }
  );

  return Product;
};
