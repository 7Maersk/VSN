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
var PostType = require('./PostType.model')
var Message = require('./Message.model')
var Room = require('./Room.model')
const Ticket = require('./Ticket.model')

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

Artist.belongsToMany(Song, {
    through: ExtraArtist,
    foreignKey: 'artist_id'
})
Song.belongsToMany(Artist, {
    through: ExtraArtist,
    foreignKey: 'song_id'
})

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

Post.belongsTo(PostType, { foreignKey: 'type_id' });
PostType.hasMany(Post, { foreignKey: 'type_id' });

Record.belongsToMany(User, { through: UserCollection })
User.belongsToMany(Record, { through: UserCollection })

//!!!
RecordArtist.belongsTo(Record)
Song.belongsTo(Record)

Song.hasMany(ExtraArtist, { foreignKey: 'song_id' });
ExtraArtist.belongsTo(Song, { foreignKey: 'song_id' });

ExtraArtist.belongsTo(Artist, { foreignKey: 'artist_id' });
Artist.hasMany(ExtraArtist, { foreignKey: 'artist_id' });

Message.belongsTo(Room, { foreignKey: 'room_id' });
Room.hasMany(Message, { foreignKey: 'room_id' });

Message.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Message, { foreignKey: 'user_id' });

Message.belongsTo(UserInfo, { foreignKey: 'user_id', as: 'user_info' });
UserInfo.hasMany(Message, { foreignKey: 'user_id', as: 'messages' });

User.hasMany(Ticket, { foreignKey: 'user_id' });
Ticket.belongsTo(User, { foreignKey: 'user_id' });

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
    UserCollection,
    PostType,
    Room,
    Message,
    Ticket
}