<template>
  <div class="security">安全
   <!-- <div class="echart">
    <chart id="scatter" :options="scatter" auto-resize></chart>
</div>
<div class="echart">
    <chart id="scatter" :options="scatter" auto-resize></chart>
</div>
<div class="echart">
    <chart id="scatter" :options="scatter" auto-resize></chart>
</div>
 -->
  </div>
</template>
<script>
  import scatter from './data/scatter'
  export default {
    data() {
      return {
        scatter
      }
    },
    mounted() {
      //   console.log(this.scatter);
    }
  }

</script>
<style lang="scss">
  .security {
    height: 100%;
    width: 100%;
    overflow: scroll;
    .echart {
      width: 500px;
      height: 400px;
    }
  }

</style>
