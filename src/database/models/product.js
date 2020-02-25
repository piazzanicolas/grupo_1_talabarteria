module.exports = (sequelize, DataTypes) => {
    let alias = 'products';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.TEXT,
        image: DataTypes.TEXT,
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    };
    
    let config = {
        tableName: 'products',
        timestamps: false
    };

    const product = sequelize.define(alias,columns,config);

    product.associate = (models) => {
		product.belongsTo(models.brands, {
			as: 'brand',
			foreignKey: 'brand_id'
        });

        product.belongsTo(models.categories, {
			as: 'category',
			foreignKey: 'category_id'
        });

        product.belongsToMany(models.colors, {
			as: 'colors',
			through: 'color_product',
			foreignKey: 'product_id',
			otherKey: 'color_id',
			timestamps: false
		});
	}

    return product;
}