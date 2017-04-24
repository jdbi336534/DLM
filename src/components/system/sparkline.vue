<template>
    <div class="sparkline">
        <p>
            Inline Sparkline: <span class="inlinesparkline">1,4,4,7,5,9,10</span>.
        </p>
        <p>
            Sparkline with dynamic data: <span class="dynamicsparkline">Loading..</span>
        </p>
        <p>
            Bar chart with dynamic data: <span class="dynamicbar">Loading..</span>
        </p>
        <p>
            Bar chart with inline data: <span class="inlinebar">1,3,4,5,3,5</span>
        </p>
    </div>
</template>
<script>
import '../../assets/js/jquery.sparkline.min'
export default {
    data() {
            return {}
        },
        computed: {},
        watch: {},
        methods: {},
        mounted() {},
        created() {
            setTimeout(() => {
                $('.inlinesparkline').sparkline();
                // 给定值
                var myvalues = [10, 8, 5, 7, 4, 4, 1];
                $('.dynamicsparkline').sparkline(myvalues);
                // 给定值和参数，可以制定画图的类型以及颜色
                $('.dynamicbar').sparkline(myvalues, {
                    type: 'line',
                    lineColor: '#00e3ef',
                    fillColor: '#ffffff',
                    drawNormalOnTop: false
                });
                // 使用'html' 参数的话是制定数据在标签中，代替一个数组值
                $('.inlinebar').sparkline('html', {
                    type: 'bar',
                    barColor: 'red'
                });
            }, 0);
        }
}
</script>
<style lang="scss" scoped>
.sparkline {
    height: 100%;
    width: 100%;
}
</style>
