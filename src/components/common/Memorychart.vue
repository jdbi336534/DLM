<template>
    <div style="width:100%;height:100%;" v-loading='loading'>
        <div class="echarts" id="memory-chart-box">
        </div>
    </div>
</template>
<script>
import echarts from 'echarts';
import {

} from '../../assets/js/mUtils';
import {
    nodeclusterchart,
    nodechart,
    virnodeone,
} from '../../assets/js/queryData';
export default {
    name: 'view',
    components: {},
    props: {
        memorydata: {
            type: Object,
            default: function() {
                return {
                    memoryobj: {
                        type: 'memory',
                        name: 'usage'
                    },
                    type: 'all',
                    pagetype: 'node',
                }
            }
        }
    },
    data() {
        return {
            loading: true,
            option: {
                title: {
                    text: '内存',
                    textStyle: {
                        color: 'rgba(250,250,250,0.6)',
                        fontSize: 12,
                    },
                    borderColor: 'rgba(36,202,243,1)',
                    borderWidth: 1,
                    left: '52',
                    top: '0',
                },
                grid: {
                    left: '150',
                    right: '40',
                    top: '36',
                    bottom: '32',
                    borderWidth: 1
                },
                tooltip: {
                    trigger: 'axis'
                },
                dataZoom: [{
                    type: 'inside',
                    realtime: true,
                }],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                    },
                    data: []
                },
                yAxis: {
                    splitLine: {
                        show: false,
                    },
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                        formatter: '{value}GB'
                    },
                    min: 'dataMin',
                },
                series: [{
                    name: '内存使用率',
                    type: 'line',
                    data: [],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: 'rgba(145,40,102,1)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(145,40,102,0.4)'
                        }
                    }
                }]
            },
        }
    },
    beforeUpdate() {

    },
    updated() {},
    created() {
        //  // console.log('memory-prpps', this.data)
    },
    mounted() {
        // console.log('memorydata', this.memorydata)
        this.drew({
            id: 'memory-chart-box',
            option: this.option
        })
    },
    computed: {},
    methods: {
        drew(obj) {
            var that = this;
            let mymemoryChart = echarts.init(document.getElementById(obj.id));
            if (this.memorydata.type === 'all') {
                // mymemoryChart.showLoading({
                //     text: 'loading',
                //     effect: {
                //         backgroundColor: 'rgba(250,250,250,0)'
                //     }
                // });
                nodeclusterchart(this.memorydata.memoryobj).then(res => {
                    that.changedata(res, obj.option);
                    mymemoryChart.setOption(obj.option);
                    this.loading = false;
                    that.$emit('memoryresize', mymemoryChart);
                })
            } else if (this.memorydata.type === 'one') {
                if (this.memorydata.pagetype === 'virtualnode') {
                    virnodeone(this.memorydata.memoryobj).then(res => {
                        // console.log(res)
                        that.changedata(res, obj.option);
                        // console.log('obj.option', obj.option)
                        mymemoryChart.setOption(obj.option);
                        this.loading = false;
                        that.$emit('memoryresize', mymemoryChart);
                    })
                } else if (this.memorydata.pagetype === 'node') {
                    nodechart(this.memorydata.memoryobj).then(res => {
                        // console.log('res', res)
                        that.changedata(res, obj.option);
                        mymemoryChart.setOption(obj.option);
                        // console.log('obj.option', obj.option)
                        this.loading = false;
                        that.$emit('memoryresize', mymemoryChart);
                    })
                }
            }
        },
        changedata(resdata, chartdata) {
            // console.log('node-resdata', resdata)
            let xAxisdata = [];
            let seriesdata = [];
            for (let i in resdata.metrics) {
                var timestring = resdata.metrics[i].timestamp.substring(11, 16);
                xAxisdata.push(timestring);
                var valueGB = (resdata.metrics[i].value / (1024 * 1024));
                seriesdata.push(valueGB);
            }
            chartdata.xAxis.data = xAxisdata;
            chartdata.yAxis.min = Math.floor(seriesdata.sort(function(a, b) {
                return a - b;
            })[0])
            chartdata.series[0].data = seriesdata;
        },
        assignment(assignment) {
            this.memorydata = assignment;
            // console.log('this.memorydata', this.memorydata);
            var that = this;
            this.drew({
                id: 'memory-chart-box',
                option: that.option
            })
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
