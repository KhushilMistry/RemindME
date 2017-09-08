const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

const db = new Sequelize({
	host:process.env.DB_HOST,
	username:process.env.DB_USER,
	database:process.env.DB_DATABASE,
	password:process.env.DB_PASS,
	dialect:process.env.DB_DIALECT
});


const users = db.define('userdb',{
	id:{
		type:Sequelize.DataTypes.INTEGER,
		autoIncrement:true,
		primaryKey : true
	},
	firstname:{type:Sequelize.DataTypes.STRING , allowNull: false},
	lastname:{type:Sequelize.DataTypes.STRING , allowNull: false},
	username:{type:Sequelize.DataTypes.STRING , unique: true , allowNull: false},
	email:{type:Sequelize.DataTypes.STRING , unique: true , allowNull: false},
	passwordhash:{type:Sequelize.DataTypes.STRING , allowNull: false},
	sex:Sequelize.DataTypes.STRING,
	dob:{type:Sequelize.DataTypes.DATEONLY ,allowNull: false}, 
},{
	timestamps: false
});

const userData = db.define('userDataDb',{
	userListName:{type:Sequelize.DataTypes.TEXT},
	userListCounter:{type:Sequelize.DataTypes.TEXT},
    userListData:{type:Sequelize.DataTypes.TEXT },
	userStats:{type:Sequelize.DataTypes.TEXT},
	userListTaskCounter:{type:Sequelize.DataTypes.TEXT}
})

userData.belongsTo(users);

db.sync().then(function () {
	console.log("database is ready");
});

module.exports = {
	users,
	userData
}
