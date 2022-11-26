const { Sequelize, DataTypes, Model, Op, literal, fn } = require('sequelize');
const { dbName, dbUser, dbPw } = require('./config.json');

const sequelize = new Sequelize(dbName, dbUser, dbPw, {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */


const data = sequelize.define('data', {
	id: {
		type: Sequelize.DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	  },
	  textString: Sequelize.TEXT,
	username: Sequelize.STRING,
},
{
	tableName: 'data',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deletedAt',
    paranoid: true,
    timestamps: true,
}
);

const sync = ()=> {data.sync()};

module.exports = {sequelize,data,sync,Op};