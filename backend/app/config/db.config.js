var dbProperties = {
    database: 'vsn', // название базы данных
    username: 'root', // имя пользователя, для которого настроены права к базе данных, 'root' задаётся по умолчанию
    password: 'root', // пароль пользователя, по умолчанию пароль пустой
    host: 'localhost', // имя сервера, на котором расположена база данных
    dialect: 'mysql', // используемая СУБД
    pool: { // параметры соединения
        max: 5, // максимальное количество одновременно открытых соединений
        min: 0, // минимальное количество соединений
        acquire: 30000, // максимальное время в миллисекундах, в течение которого пул (набор соединений к БД) будет пытаться установить соединение, прежде чем выдаст ошибку
        idle: 10000 // время в миллисекундах, в течение которого соединение может простаивать, прежде чем оно будет удалено
    }
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    dbProperties.database, dbProperties.username, dbProperties.password,
    {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        sync: {
            force: false, // отключает принудительную синхронизацию, при которой Sequelize пересоздает таблицы при каждом запуске
        },
        define: {
            // имена таблиц не будут создаваться автоматически во множественном числе
            freezeTableName: true,

            // запрет на автоматическое создание полей createdAt и updatedAt (эти поля по умолчанию создаются ORM Sequalize во всех таблицах, при желании можете включить эту настройку)
            timestamps: false,
        }
    }
);

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Подключение моделей
// db.User = require('../model/user.model.js')(sequelize, Sequelize);
// db.Artist = require('../model/artist.model.js')(sequelize, Sequelize);
// db.Comment = require('../model/comment.model.js')(sequelize, Sequelize);
// db.Country = require('../model/country.model.js')(sequelize, Sequelize);
// db.ExtraArtist = require('../model/extraartist.model.js')(sequelize, Sequelize);
// db.Genre = require('../model/genre.model.js')(sequelize, Sequelize);
// db.RecordArtist = require('../model/record_artist.model.js')(sequelize, Sequelize);
// db.RecordGenre = require('../model/record_genres.model.js')(sequelize, Sequelize);
// db.Record = require('../model/record.model.js')(sequelize, Sequelize);
// db.Post = require('../model/post.model.js')(sequelize, Sequelize);
// db.Role = require('../model/role.model.js')(sequelize, Sequelize);
// db.Song = require('../model/song.model.js')(sequelize, Sequelize);
// db.UserCollection = require('../model/user_collection.model.js')(sequelize, Sequelize);
// db.UserInfo = require('../model/user_info.model.js')(sequelize, Sequelize);

// Связывание моделей без импорта файлов (то есть, чтобы в файле описания любой модели можно было
// обращаться к другим моделям по имени без необходимости импорта в виде require(...))
Object.keys(db).forEach(key => {
    if (db[key] && db[key].associate) {
        db[key].associate(db);
    }
});

module.exports = db;