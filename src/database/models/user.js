module.exports = (sequelize, DataTypes) => {
    const alias = "users" // igual al nombre de la tabla

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        } ,
        firstName: DataTypes.STRING(25),
        lastName: DataTypes.STRING(25),
        email: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        password: DataTypes.STRING,
        phone:  DataTypes.STRING(25),
        dob: DataTypes.DATE,
        street: DataTypes.STRING(50),
        address_number: DataTypes.INTEGER,
        floor: DataTypes.STRING(10),
        zip_code: DataTypes.STRING(10),
        countryId: DataTypes.INTEGER,
        province: DataTypes.STRING(50),
        avatar: DataTypes.STRING,
        admin: DataTypes.INTEGER
    };


    let user = sequelize.define(alias, cols);

  user.associate = (models) => {
        user.belongsTo(models.countries, {
            as: 'country',
            foreignKey: 'countryId'
        })
  }

  return user;
    
};