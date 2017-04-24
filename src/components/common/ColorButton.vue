<template>
    <div class="colorbutton">
        <el-button :class="{'sys-button--default':classDefault,'sys-button--warning':clasWarning,'sys-button--success':classSuccess}" :loading="btnloading" @click="click">{{btnname}}</el-button>
    </div>
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
            btnloading: {
                type: Boolean,
                default: false
            },
            btnname: {
                type: String,
                defalut: '确定'
            },
            type: {
                type: String,
                default: 'default'
            }
        },
        computed: {

        },
        watch: {
            type(val) {
                if (val === 'warning') {
                    this.clasWarning = true;
                } else if (val === 'success') {
                    this.classSuccess = true;
                } else if (val === 'default') {
                    this.classDefault = true;
                }
            }
        },
        methods: {
            click() {
                this.$emit('click');
            }
        },
        mounted() {

        },
        created() {
            // console.log('created', this.btnname);
            if (this.type === 'warning') {
                this.clasWarning = true;
            } else if (this.type === 'success') {
                this.classSuccess = true;
            } else if (this.type === 'default') {
                this.classDefault = true;
            }
        }
}
</script>
<style lang="scss" scoped>
.colorbutton {
    display: inline-block;
    .el-button.is-loading {
        padding: 5px 8px;
    }
    .sys-button--warning {
        color: #FF4949;
        background: transparent;
        font-size: 12px;
        border-radius: 0;
        line-height: 2px;
        padding: 10px 8px;
        border: 1px solid rgba(255, 73, 73, 0.50);
        box-shadow: inset 0 0 5px 0 rgba(255, 73, 73, 0.50);
    }
    .sys-button--warning:hover {
        border: 1px solid rgba(255, 73, 73, 0.90);
        box-shadow: inset 0 0 5px 0 rgba(255, 73, 73, 0.70);
    }
    .sys-button--success {
        color: #10AD57;
        border-radius: 0;
        background: transparent;
        font-size: 12px;
        line-height: 2px;
        padding: 10px 8px;
        border: 1px solid rgba(18, 206, 102, 0.50);
        box-shadow: inset 0 0 5px 0 rgba(18, 206, 102, 0.50);
    }
    .sys-button--success:hover {
        border: 1px solid rgba(18, 206, 102, 0.90);
        box-shadow: inset 0 0 5px 0 rgba(18, 206, 102, 0.70);
    }
    .sys-button--default {
        color: #24CAF3;
        border-radius: 0;
        background: transparent;
        font-size: 12px;
        line-height: 2px;
        padding: 10px 8px;
        border: 1px solid rgba(32, 159, 255, 0.50);
        box-shadow: inset 0 0 5px 0 rgba(32, 159, 255, 0.50);
    }
    .sys-button--default:hover {
        border: 1px solid rgba(32, 159, 255, 0.90);
        box-shadow: inset 0 0 5px 0 rgba(32, 159, 255, 0.70);
    }
}
</style>
