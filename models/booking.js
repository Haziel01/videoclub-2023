// modelos en singular controladores en prular

module.exports = (sequelize, type) => {
  const Booking = sequelize.define("bookings", {
    id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    date: type.DATE,
    memberId: type.INTEGER,
    copieId: type.INTEGER
  });
  return Booking;
};
