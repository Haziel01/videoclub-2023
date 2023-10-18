const Sequelize = require('sequelize');

const direcotrModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require("./models/actor");
const movieActorModel = require('./models/movieActor');
const copieModel = require('./models/copie');
const memberModel = require('./models/member');
const bookingModel = require('./models/booking');

// 1) Nombre base de datos
// 2) Usuario
// 3) Contraseña
// 4) Objeto de configuración ORM

const sequelize = new Sequelize("videoclub-2023", 'root', 'HazielCB010801', {
    host: 'localhost',
    dialect: 'mysql'
});

const Director = direcotrModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Copie = copieModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);

// Relaciones
// Un genero puede tener muchas peliculas
Genre.hasMany(Movie, { as:'movies' });
// Una pelicula tiene un genero
Movie.belongsTo(Genre, { as:'genre' });

// Un director puede tener muchas peliculas
Director.hasMany(Movie, { as:'movies' });
// Una pelicula tiene un directro
Movie.belongsTo(Director, { as:'director' });

// Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, { foreignKey:'movieId' });
// En una pelicula participan muchos actores
MovieActor.belongsTo(Actor, { foreignKey:'actorId' });

Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'movie_actors'
});

Actor.belongsToMany(Movie, {
    foreignKey: 'movieId',
    as: 'movies',
    through: 'movie_actors'
});

//Una pelicula puede tener muchas copias
Copie.hasMany(Movie, { as:'movies' });
//Una copia tiene una pelicula
Movie.belongsTo(Copie, { as:'copie' });

//Una copia puede apartarce para muchos miembros
Booking.belongsTo(Member, { foreignKey: "memberId" });
//Una miembro puede tener muchas copias
Booking.belongsTo(Copie, { foreignKey: "copieId" });

Member.belongsToMany(Copie, {
  foreignKey: "copieId",
  as: "copies",
  through: "bookings",
});

Copie.belongsToMany(Member, {
  foreignKey: "memberId",
  as: "members",
  through: "bookings",
});


sequelize.sync({
    force: true
}).then(()=>{
    console.log('Base de datos actualizada');
});

module.exports = { Director, Genre, Movie, Actor, MovieActor, Copie, Member, Booking };