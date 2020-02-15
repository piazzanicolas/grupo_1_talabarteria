module.exports = (sequelize, dataTypes) => {
    const alias = "User"

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        } ,
        firstName: {
            type: dataTypes.STRING(25)
        },
        lastName: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        dob: {
            type: dataTypes.DATE,
            allowNull: false
        },
        street: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        address_number: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        floor: {
            type: dataTypes.STRING(10),
        },
        zip_code: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
        country: {
            type: dataTypes.INTEGER,
            references: 'Countries',
            referencesKey: id
        },
        province: {
            type: dataTypes.STRING(50)
        },
        avatar: {
            type: dataTypes.STRING
        }
    };

    config = {
        // tableName = "users",
        //timestamps
    };

    let User = sequelize.define(alias, cols, config);

    
}