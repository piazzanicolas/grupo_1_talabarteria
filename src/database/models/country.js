module.exports = (sequelize, DataTypes) => {
    const alias = "countries" // igual al nombre de la tabla

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        } ,
        code: DataTypes.STRING(2),
        name: DataTypes.STRING(100),
    };

    const config = {
        timestamps: false
    }

    let country = sequelize.define(alias, cols, config);

    country.associate = (models) => {
		// hasMany
		country.hasMany(models.users, {
			as: 'users',
			foreignKey: 'countryId'
        })
        
	}

    return country;
    
};