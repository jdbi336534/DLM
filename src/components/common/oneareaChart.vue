<template>
    <div class="echarts onearea-chart-box">
    </div>
</template>
<script>
import echarts from 'echarts';
import {

} from '../../assets/js/mUtils';
import {

} from '../../assets/js/queryData';
export default {
    name: 'view',
    components: {},
    props: {
        optionarg: null,
        // optionnetworkarg: null,
    },
    data() {
        return {
            option: null,
            optionnetwork: null,
        }
    },
    beforeUpdate() {

    },
    updated() {},
    created() {
        // for (var i = 0; i < 5; i++) {
        //     this.dataShadow.push(500);
        // }
        // console.log('optionarg', this.optionarg)
        this.option = this.optionarg
            // this.optionnetwork = this.optionnetworkarg
            //  console.log('this.optionnetwork', this.optionnetwork)
    },
    mounted() {
        this.drew({
            id: 'onearea-chart-box',
            option: this.option
        })
    },
    computed: {},
    methods: {
        drew(obj) {
            // console.log('renetwork')
            var myoneareaChart = echarts.init(document.getElementsByClassName(obj.id)[0]);
            myoneareaChart.setOption(obj.option);
            this.$emit('nodeval', myoneareaChart);
        },
    }
}
</script>
<style lang="scss">
@import '../../assets/css/systemcommon/common.scss';
</style>
<style lang="scss" scoped>
.echarts {
    width: 100%;
    height: 100%;
}
</style>
