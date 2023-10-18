// modelos en singular controladores en prular

module.exports = (sequelize, type) => {
    const Director = sequelize.define('direcotrs', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        lastName: type.STRING
    });
    return Director;
}