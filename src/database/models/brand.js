module.exports = (sequelize, DataTypes) => {
    let alias = 'brands';

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
        tableName: 'brands',
        timestamps: false
    };

    const brand = sequelize.define(alias,columns,config);

    brand.associate = (models) => {
		brand.hasMany(models.products, {
			as: 'product',
			foreignKey: 'brand_id'
		})
	}

    return brand;
}