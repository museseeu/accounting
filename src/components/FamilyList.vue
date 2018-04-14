<template>
  <div id="familylist" class="family-container">
    <h1>能算算</h1>
    <div class="family-container-action family-container-action--header">
      <button class="family-container-action__edit"
        @click="rollbackfamilyItem"
        v-if="familylistBackup.length > 0 ">還原上一步</button>
      <button class="family-container-action__edit"
        @click="clearfamilyItem"
        v-if="familylist.length > 0 ">全部清除</button>
    </div>
    <div class="family-container-board" v-if="familylist.length > 0 ">
      <div class="familylist-item" v-for="(item, key) in familylist" :key="item.id">
        <ul>
          <li class="familylist-item__des">
            <button @click="delfamilyItem(key)">x</button> {{item.name}}
          </li>
          <li>
            費用：<input v-model.number="item.cost"
                  type="number" class="familylist-item__currency"
                  min="0" max="1000000"> {{item.cost | dollarStyle}}
          </li>
        </ul>
      </div>
    </div>
    <div class="family-container-board" v-else>
      <p>沒有項目，新增一個吧。</p>
    </div>

    <div class="familylist-total">
      <ul>
        <li>未稅總計：{{ countTotal(totalCost) | dollarStyle}} 稅金：{{taxesOnly | dollarStyle}}</li>
        <li>含稅：{{taxes | dollarStyle}} </li>
      </ul>
    </div>

    <div class="family-container-action">
      <h4>新增計算項目</h4>
      <input v-model="familyName" type="text" placeholder="ex. 爆米花">
      <input v-model.number="familyPayCost" type="number" placeholder="ex. 80">
      <button @click="addfamilyItem" >新增項目</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FamilyList',
  data() {
    return {
      familyName: '',
      familyPayCost: '',
      familylist: [{
        name: '電影票', cost: 320,
      }, {
        name: '爆米花', cost: 80,
      }, {
        name: '飲料', cost: 120,
      }],
      familylistBackup: [],
      totalCost: 0,
    };
  },
  methods: {
    addfamilyItem() {
      if (!this.familyName || !this.familyPayCost) return;
      const item = {
        name: this.familyName,
        cost: Number(this.familyPayCost),
      };
      this.backupfamilyItem();
      this.familylist.push(item);
      this.clearData();
    },
    delfamilyItem(key) {
      this.backupfamilyItem();
      this.familylist.splice(key, 1);
    },
    rollbackfamilyItem() {
      this.familylist = this.familylistBackup.slice(0);
      this.familylistBackup = [];
    },
    clearfamilyItem() {
      this.backupfamilyItem();
      this.familylist = [];
    },
    backupfamilyItem() {
      this.familylistBackup = this.familylist.slice(0);
    },
    clearData() {
      this.familyName = '';
      this.familyPayCost = '';
    },
    countTotal() {
      this.totalCost = this.familylist.reduce((prevVal, el) => prevVal + el.cost, 0);
      return this.totalCost;
    },
  },
  computed: {
    taxes() {
      return Math.round(this.totalCost * 1.05);
    },
    taxesOnly() {
      return this.taxes - this.totalCost;
    },
  },
  filters: {
    dollarStyle(val) {
      return String('$') + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style lang="scss">

.family-container {
  max-width: 460px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background: #efefef;

  &-board{
    margin: 0;
    padding: 20px 0;
    background-color: rgb(228, 226, 226);
    border-radius: 5px;
  }
}
.family-container-action{
  padding: 10px 20px;
  &--header{
    text-align: left;
    padding: 0px;
  }

  input[type="text"],input[type="number"]{
    margin: 0;
    padding: 0 10px;
    height: 36px;
    border-width: 1px;
    border-color: #c8ccd0;
    border-radius: 3px;
    color: #3b4045;
    background: #FFF;
    border: 1px solid #c8ccd0;
    width: 100%;
    font-size: 14px;
    box-shadow: none;
  }
  input[type="submit"],button{
    line-height: 1;
    text-align: center;
    text-decoration: none;
    background-color: transparent;
    border-radius: 2px;
    border: 1px solid transparent;
    cursor: pointer;
    outline: none;
    touch-action: manipulation;
    color: #FFF;
    padding: 10px 30px;
    margin: 20px;
    background-color: #4e89ec;
  }
  &__edit{
    background-color: #999 !important;
    padding: 5px 8px !important;
  }
}
.familylist-item{
  clear: both;
  text-align: left;
  &__currency{
    width: 60px;
    height: 20px;
    padding: 2px 6px;
  }
  &__des{
    width: 180px;
    display: inline-block;
    float: left;
  }
  ul {
    list-style: none;
  }
}
.familylist-total{
  text-align: right;
  ul {
    list-style: none;
  }
}
.familylist-item p{
    display: block;
    float: left;
}
</style>

