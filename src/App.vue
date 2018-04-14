<template>
  <div id="app">
    <FamilyList/>
  </div>
</template>

<script>
import FamilyList from './components/FamilyList';

export default {
  name: 'App',
  components: {
    FamilyList,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
