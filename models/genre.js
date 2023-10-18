module.exports = (squelize, type) =>{
    const Genre = squelize.define("genres", {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      description: type.STRING,
      status: type.BOOLEAN
    });
    return Genre;
}