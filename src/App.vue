<template>
  <div id="app">
    <remoteData/>
    <calculator/>
  </div>
</template>

<script>
import calculator from './components/Calculator';
import remoteData from './components/RemoteData';

export default {
  name: 'App',
  components: {
    calculator,
    remoteData,
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
