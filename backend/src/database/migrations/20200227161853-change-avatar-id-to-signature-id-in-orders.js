module.exports = {
  up: (queryInterface) => {
    return queryInterface.renameColumn('orders', 'avatar_id', 'signature_id');
  },

  down: (queryInterface) => {
    return queryInterface.renameColumn('orders', 'signature_id', 'avatar_id');
  },
};
