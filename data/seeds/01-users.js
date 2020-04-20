
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'myname' , password: 'password1'},
        {id: 2, username: 'yourname' , password: 'password2'},
        {id: 3, username: 'hisname' , password: 'password3'},
        {id: 4, username: 'hername' , password: 'password4'}
      
      ]);
    });
};
