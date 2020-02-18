module.exports = {
  up: (queryInterface) => {
    return queryInterface.renameTable('users', 'admin');
  },

  down: (queryInterface) => {
    return queryInterface.renameTable('admin', 'users');
  },
};
