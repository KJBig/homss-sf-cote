import { Sequelize } from 'sequelize';
import * as configFile from '../config/config.js'
import Member from './member.js';
import Post from './post.js';
import Request from './request.js';

const env = process.env.NODE_ENV || 'development';
const config = configFile.default[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config, {
  pool: {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
}});

db.sequelize = sequelize;
db.Member = Member;
db.Post = Post;
db.Request = Request;


Member.init(sequelize);
Post.init(sequelize);
Request.init(sequelize);

Member.associate(db);
Post.associate(db);
Request.associate(db);

export default db;