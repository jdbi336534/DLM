<template>
  <i class="dotted" :class="{'dotted--wrong':classDefault,'dotted--warning':clasWarning,'dotted--success':classSuccess}"></i>
</template>
<script>
  export default {
    data() {
      return {
        clasWarning: false,
        classSuccess: false,
        classDefault: false
      }
    },
    props: {
      type: {
        type: String,
        default: 'success'
      }
    },
    computed: {},
    watch: {
      type(val) {
        if (val === 'warning') {
          this.clasWarning = true;
        } else if (val === 'success') {
          this.classSuccess = true;
        } else if (val === 'wrong') {
          this.classDefault = true;
        }
      }
    },
    methods: {},
    mounted() {},
    created() {
      if (this.type === 'warning') {
        this.clasWarning = true;
      } else if (this.type === 'success') {
        this.classSuccess = true;
      } else if (this.type === 'wrong') {
        this.classDefault = true;
      }
    }
  }

</script>
<style lang="scss" scoped>
  .dotted {
    border-radius: 50%;
    height: 7px;
    width: 7px;
    display: inline-block;
    vertical-align: middle;
  }

  .dotted--wrong {
    background: #E43F24;
  }

  .dotted--warning {
    background: #F5B53E;
  }

  .dotted--success {
    background: #25CD6B;
  }

</style>
