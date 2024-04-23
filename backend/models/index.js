var User = require('./User.model')
var Role = require('./Role.model')
var UserInfo = require('./UserInfo.model')
var Country = require('./Country.model')
var Genre = require('./Genre.model')
var Post = require('./Post.model')
var Artist = require('./Artist.model')
var Record = require('./Record.model')
var Song = require('./Song.model')
var ExtraArtist = require('./ExtraArtist.model')
var RecordArtist = require('./RecordArtist.model')
var RecordGenre = require('./RecordGenre.model')
var Comment = require('./Comment.model')
var UserCollection = require('./UserCollection.model')

Role.hasMany(User)
User.belongsTo(Role)

User.hasOne(UserInfo)
UserInfo.belongsTo(User)

User.hasMany(Post)
Post.belongsTo(User)

Country.hasMany(Record)
Record.belongsTo(Country)

Song.belongsTo(Record)
Record.hasMany(Song)

Artist.belongsToMany(Song, { through: ExtraArtist })
Song.belongsToMany(Artist, { through: ExtraArtist })

Record.belongsToMany(Artist, {
    through: RecordArtist,
    foreignKey: 'record_id'
});
Artist.belongsToMany(Record, {
    through: RecordArtist,
    foreignKey: "artist_id"
});

Record.belongsToMany(Genre, { through: RecordGenre })
Genre.belongsToMany(Record, { through: RecordGenre })

User.hasOne(Comment)
Comment.belongsTo(User)
Post.hasMany(Comment)
Comment.belongsTo(Post)
Record.hasMany(Comment)
Comment.belongsTo(Record)

Record.belongsToMany(User, { through: UserCollection })
User.belongsToMany(Record, { through: UserCollection })


module.exports = {
    User,
    Role,
    UserInfo,
    Country,
    Genre,
    Post,
    Artist,
    Record,
    Song,
    ExtraArtist,
    RecordArtist,
    RecordGenre,
    Comment,
    UserCollection
}