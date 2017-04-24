<template>
    <div class="echarts moreline-chart-box">
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
    },
    data() {
        return {
            option: [],
            optionlist: [],
        }
    },
    beforeUpdate() {

    },
    updated() {},
    created() {
        // console.log('created-optionarg', this.optionarg)
        this.option.push(this.optionarg);
        // console.log('created-this.option', this.option)
    },
    mounted() {
        console.log('mounted')
        console.log('this.option', this.option)
        this.drew({
            classname: 'moreline-chart-box',
            option: this.option
        })
    },
    watch: {
        option: {
            handler(curval, oldval) {
                console.log('curval', curval)
                console.log('oldval', oldval)
                console.log('this.drew', this.drew)
                this.optionlist.push(curval);
                console.log('this.optionlist.push(curval)', this.optionlist)
                this.drew({
                    classname: 'moreline-chart-box',
                    option: curval
                })
            },
            deep: true
        },
    },
    computed: {},
    methods: {
        drew(obj) {
            console.log('methods-renetwork')
            var morelinelist = document.getElementsByClassName(obj.classname);
            console.log('morelinelist.length', morelinelist.length)
            var echartlist = [];
            for (var l = 0; l < morelinelist.length; l++) {
                var mymorelineChart = echarts.init(document.getElementsByClassName(obj.classname)[l]);
                echartlist.push(mymorelineChart)
                mymorelineChart.setOption(obj.option[0]);
            }
            this.$emit('nodeval', mymorelineChart);
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
