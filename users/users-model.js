const db = require('../data/db-config.js');

module.exports = {
    getUsers,
    createUser,
    findUserById,
    findBy
}

function getUsers(){
    return db('users')
}

function createUser(user){
    return db('users')
    .insert(user)
}

function findUserById(id){
    return db('users').where({id : id}).first()
}

function findBy(username){
    return db('users').where({username});
}