module.exports = {
  up: (queryInterface) => {
    return queryInterface.renameTable('deliverymen', 'deliverymans');
  },

  down: (queryInterface) => {
    return queryInterface.renameTable('deliverymans', 'deliverymen');
  },
};
