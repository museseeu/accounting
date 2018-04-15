<template>
  <div class="remoteBoard">
    <h1>遠端狀態</h1>
    <span v-for="(item, key) in itemlist" :key="item.id">
      {{key}}: {{item}}
    </span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RemoteData',
  data() {
    return {
      itemlist: [],
    };
  },
  created() {
    axios.get('https://accounting-4d0e7.firebaseio.com/data.json')
      .then((res) => {
        this.itemlist = res.data;
      })
      .catch((error) => {
        this.itemlist = {
          code: error,
          msg: 'no data',
        };
      });
  },
};
</script>

<style lang="scss">
  .remoteBoard{
    margin: 20px auto;
    width: 360px;
    padding: 20px;
    background-color: #efefef;
  }
</style>
