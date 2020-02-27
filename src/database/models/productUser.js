module.exports = (sequelize, DataTypes) => {
    let alias = 'productUser';

    let columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        purchaseDate: DataTypes.DATE,
        ticket: DataTypes.INTEGER,
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    };
    
    let config = {
        tableName: 'product_user',
        timestamps: false
    };

    const productUser = sequelize.define(alias,columns,config);

    productUser.associate = (models) => {
		productUser.belongsTo(models.products, {
			as: 'products',
			foreignKey: 'product_id'
        });

        productUser.belongsTo(models.users, {
			as: 'users',
			foreignKey: 'user_id'
        });
	}

    return productUser;
}