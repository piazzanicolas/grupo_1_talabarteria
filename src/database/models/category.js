module.exports = (sequelize, DataTypes) => {
    let alias = 'categories';

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
        tableName: 'categories',
        timestamps: false
    };

    const category = sequelize.define(alias,columns,config);

    category.associate = (models) => {
		category.hasMany(models.products, {
			as: 'product',
			foreignKey: 'category_id'
		})
	}

    return category;
}