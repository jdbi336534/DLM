<template>
  <div>
    <div>节点</div>
    <el-date-picker v-model="value1" type="daterange" placeholder="选择日期范围">
    </el-date-picker>
    <sys-button btnname="12345678" type="success" @click="btnclick"></sys-button>
  </div>
</template>
<script>
  import sysButton from '../common/ColorButton'
  export default {
    components: {
      sysButton
    },
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        value1: '',
      };
    },
    methods: {
      btnclick() {}
    }
  };

</script>
<style lang="scss">


</style>
