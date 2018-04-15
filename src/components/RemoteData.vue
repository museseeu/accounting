<template>
  <div class="remoteBoard">
    <h1>遠端狀態</h1>
    <div>
      <div v-if="loading !== true">
        <table>
          <tr align="left" v-for="(item, key) in remoteDB" :key="item.id">
            <button @click="delUser(key)">x</button> {{item.name}}
            {{key}}: {{item}}
          </tr>
        </table>
      </div>
      <div v-else>
        <p>loading...</p>
      </div>
    </div>
    <div >
      <h4>用戶名單</h4>
      <p>總和：{{total}}</p>
      <input v-model="username" type="text" placeholder="ex. user001">
      <input v-model.number="codes" type="number" placeholder="ex. 00000">
      <button @click="addUser">新增用戶</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import { fireConnect, fireStaticUrl } from '../dbConnect';

firebase.initializeApp(fireConnect);
const fireDB = firebase.database().ref('data');

export default {
  name: 'RemoteData',
  data() {
    return {
      loading: true,
      username: '',
      codes: '',
      remoteStaticList: [],
      remoteDB: {},
      total: '',
    };
  },
  created() {
    axios.get(fireStaticUrl)
      .then((res) => {
        this.remoteStaticList = res.data;
      })
      .catch((error) => {
        this.remoteStaticList = {
          code: error,
          msg: 'no data',
        };
      });
  },
  mounted() {
    const self = this;
    fireDB.once('value', (res) => {
      self.remoteDB = res.val();
      self.loading = false;
      self.calTotal();
    });
  },
  methods: {
    addUser() {
      if (!this.username || !this.codes) return;
      this.remoteDB[this.username] = Number(this.codes);
      this.username = '';
      this.codes = '';
      this.saveRemoteData();
    },
    delUser(key) {
      if (Object.keys(this.remoteDB).length <= 1) return;
      this.$delete(this.remoteDB, key);
      this.saveRemoteData();
    },
    saveRemoteData() {
      fireDB.set(this.remoteDB);
      this.calTotal();
    },
    calTotal() {
      const sumObj = obj => Object.keys(obj).reduce((sum, next) => sum + obj[next], 0);
      this.total = sumObj(this.remoteDB);
    },
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
