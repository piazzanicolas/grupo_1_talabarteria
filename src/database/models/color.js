module.exports = (sequelize, DataTypes) => {
    let alias = 'colors';

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
    };
    
    let config = {
        tableName: 'colors',
        timestamps: false
    };

    const color = sequelize.define(alias,columns,config);

    color.associate = (models) => {    
        color.belongsToMany(models.products, {
			as: 'products',
			through: 'color_product',
			foreignKey: 'color_id',
			otherKey: 'product_id',
			timestamps: false
		});
	}

    return color;
}