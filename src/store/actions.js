const clearStore = ({ commit }, payload) => {
  commit('clearStore', payload);
};

const addStoreItem = ({ commit }, payload) => {
  commit('addStoreItem', payload);
};

const delStoreItem = ({ commit }, payload) => {
  commit('delStoreItem', payload);
};

const rollbackStoreItems = ({ commit }, payload) => {
  commit('rollbackStoreItems', payload);
};


export {
  clearStore,
  addStoreItem,
  delStoreItem,
  rollbackStoreItems,
};

