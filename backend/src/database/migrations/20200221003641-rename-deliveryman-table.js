module.exports = {
  up: (queryInterface) => {
    return queryInterface.renameTable('deliveryman', 'deliverymen');
  },

  down: (queryInterface) => {
    return queryInterface.renameTable('deliverymen', 'deliveryman');
  },
};
