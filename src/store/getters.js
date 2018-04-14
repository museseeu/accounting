const storeShow = state => state.storeItems;
const storeBackupShow = state => state.storeBackupItems;
const totalStoreCost = state => state.storeItems.reduce((prevVal, el) => prevVal + el.cost, 0);

export {
  storeShow,
  storeBackupShow,
  totalStoreCost,
};
