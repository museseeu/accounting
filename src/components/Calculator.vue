<template>
  <div id="goodslist" class="goods-container">
    <h1>能算算</h1>
    <div class="goods-container-action goods-container-action--header">
      <button class="goods-container-action__edit"
        @click="rollbackStoreItems"
        v-if="storeBackupShow.length > 0 ">還原上一步</button>
      <button class="goods-container-action__edit"
        @click="clearStore"
        v-if="storeShow.length > 0 ">全部清除</button>
    </div>
    <div class="goods-container-board" v-if="storeShow.length > 0 ">
      <div class="goodslist-item" v-for="(item, key) in storeShow" :key="item.id">
        <ul>
          <li class="goodslist-item__des">
            <button @click="delStoreItem(key)">x</button> {{item.name}}
          </li>
          <li>
            費用：<input v-model.number="item.cost"
                  type="number" class="goodslist-item__currency"
                  min="0" max="1000000"> {{item.cost | dollarStyle}}
          </li>
        </ul>
      </div>
    </div>
    <div class="goods-container-board" v-else>
      <p>沒有項目，新增一個吧。</p>
    </div>

    <div class="goodslist-total">
      <ul>
        <li>未稅總計：{{totalStoreCost | dollarStyle}} 稅金：{{taxesOnly | dollarStyle}}</li>
        <li>含稅：{{taxes | dollarStyle}} </li>
      </ul>
    </div>

    <div class="goods-container-action">
      <h4>新增計算項目</h4>
      <input v-model="goodsName" type="text" placeholder="ex. 爆米花">
      <input v-model.number="payCost" type="number" placeholder="ex. 80">
      <button @click="addGoodsItem" >新增項目</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Calculator',
  data() {
    return {
      goodsName: '',
      payCost: '',
    };
  },
  methods: {
    ...mapActions([
      'addStoreItem',
      'delStoreItem',
      'clearStore',
      'rollbackStoreItems',
    ]),
    addGoodsItem() {
      if (!this.goodsName || !this.payCost) return;
      const item = {
        name: this.goodsName,
        cost: Number(this.payCost),
      };
      this.addStoreItem(item);
      this.goodsName = '';
      this.payCost = '';
    },
  },
  computed: {
    ...mapGetters([
      'storeShow',
      'storeBackupShow',
      'totalStoreCost',
    ]),
    taxes() {
      return Math.round(this.totalStoreCost * 1.05);
    },
    taxesOnly() {
      return this.taxes - this.totalStoreCost;
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

.goods-container {
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
.goods-container-action{
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
.goodslist-item{
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
.goodslist-total{
  text-align: right;
  ul {
    list-style: none;
  }
}
.goodslist-item p{
    display: block;
    float: left;
}
</style>

