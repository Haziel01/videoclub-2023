// modelos en singular controladores en prular

module.exports = (sequelize, type) => {
  const Copie = sequelize.define("copies", {
    id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    number: type.INTEGER,
    format: type.ENUM('VHS', 'DVD', 'BLU-RAY'),
    estatus: type.ENUM('AVAILABLE', 'LOST', 'DAMAGE'),
  });
  return Copie;
};
