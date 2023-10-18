module.exports = (sequelze, type) => {
    const MovieActor = sequelze.define('movie_actors', {
        id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
        movieId: type.INTEGER,
        actorId: type.INTEGER
    })
    
    return MovieActor;
}