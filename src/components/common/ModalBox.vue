<template>
    <div class="jdbmodalbox">
        <el-dialog :title="titlename" v-model="visible" :close-on-click-modal="false">
            <div style="position:absolute;right:4px;top:-32px;width:30px;height:30px;cursor:pointer" @click="closeModal"></div>
            <slot name='jdb'></slot>
            <div class="first_step">
                <el-button v-if="dispcancel" class="databtn laststep" @click="cancel">取消</el-button>
                <el-button v-if="dispconfirm" class="databtn" :loading="btnloading" @click="confirm">{{btnname}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
            return {

            }
        },
        props: ['btnloading', 'visible', 'titlename', 'btnname', 'dispcancel', 'dispconfirm'],
        computed: {

        },
        watch: {

        },
        methods: {
            closeModal() {
                this.$emit('click-close');
            },
            cancel() {
                this.$emit('click-cancel');
            },
            confirm() {
                this.$emit('click-ok');
            }
        },
        mounted() {

        },
        beforeUpdate() {

        },
        updated() {

        },
}
</script>
<style lang="scss">
.jdbmodalbox {
    padding: 10px;
    position: relative;
    .position {
        position: absolute;
        bottom: 18px;
        right: 36px;
    }
    .el-dialog {
        width: 1034px;
        height: 630px;
        background: url(../../assets/img/modal/border.png);
        background-size: 100% 100%;
        padding: 10px;
        margin-bottom: 0;
        background-color: #0c2642!important;
    }
    .el-dialog__body {
        padding: 26px 15px 10px;
        height: 526px;
        position: relative;
        color: rgba(0, 187, 236, 0.9);
    }
    .el-dialog__header {
        font-size: 16px;
        padding: 0;
        margin: 0;
        height: 36px;
        text-align: center;
    }
    .el-dialog__title {
        font-size: 20px;
        line-height: 36px;
        font-family: '微软雅黑';
        color: #00bbec;
    }
    .el-dialog__close {
        color: #06bfe7;
        text-shadow: 0 0 0.2em #06bfe7,
    }
    .el-dialog__headerbtn {
        padding-right: 11px;
        padding-top: 6px;
    }
    .dialog-footer {
        font-size: 0px;
        padding-right: 60px;
    }
    .databtn {
        padding: 0;
        color: #fff;
        width: 60px;
        height: 25px;
        background: #0C1A34;
        border-radius: 0px;
        border-color: #0C1A34;
    }
    .databtn:hover {
        border-color: #05bde6;
        color: #fff;
        box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
    }
    .laststep {
        margin-right: 10px;
    }
    .first_step {
        position: absolute;
        bottom: 0;
        right: 54px;
    }
    .el-button+.el-button {
        margin-left: 0;
    }
    .el-select .el-input {
        width: 110px;
    }
}

.v-modal {
    opacity: 0.7 !important;
    background: rgba(13, 21, 47, 1) !important;
}

//当屏幕高度小于749px的时候，改变弹框的top值
@media screen and (max-height: 749px) {
    .jdbmodalbox .el-dialog {
        top: 2%!important;
    }
}
</style>
