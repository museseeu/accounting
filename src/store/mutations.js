const backStoreItems = (state) => {
  state.storeBackupItems = state.storeItems.slice(0);
};

const clearStore = (state) => {
  backStoreItems(state);
  state.storeItems = [];
};

const delStoreItem = (state, key) => {
  backStoreItems(state);
  state.storeItems.splice(key, 1);
};

const addStoreItem = (state, item) => {
  backStoreItems(state);
  state.storeItems.push(item);
};

const rollbackStoreItems = (state) => {
  state.storeItems = state.storeBackupItems.slice(0);
  state.storeBackupItems = [];
};

export {
  clearStore,
  addStoreItem,
  delStoreItem,
  rollbackStoreItems,
};
