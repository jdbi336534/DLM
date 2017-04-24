<template>
    <div style="width:100%;height:100%;" v-loading='loading'>
        <div class="echarts" id="cpu-chart-box">
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
        cpudata: null,
    },
    data() {
        return {
            loading: true,
            getcpuchartdata: {},
            option: {
                title: {
                    text: 'cpu',
                    textStyle: {
                        color: 'rgba(250,250,250,0.6)',
                        fontSize: 12,
                    },
                    borderColor: 'rgba(36,202,243,1)',
                    borderWidth: 1,
                    left: '12',
                    top: '0',
                },
                grid: {
                    left: '100',
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
                    interval: 0,
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
                        formatter: '{value}'
                    },
                    min: 'dataMin',
                },
                series: [{
                    name: 'cpu',
                    type: 'line',
                    data: [],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            width: 1,
                            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //     offset: 0,
                            //     color: 'rgba(48, 120,192,1)'
                            // }, {
                            //     offset: 1,
                            //     color: 'rgba(48, 120,192,0.5)'
                            // }], false)
                            color: 'rgba(48, 120,192,1)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(48, 120,192,0.4)'
                            }, {
                                offset: 1,
                                color: 'rgba(48, 120,192,0.16)'
                            }], false)
                        }
                    },
                }]
            },
        }
    },
    beforeUpdate() {

    },
    updated() {},
    created() {

    },
    watch: {},
    beforeMount() {

    },
    mounted() {
        // console.log('cpudata', this.cpudata)
        this.drew({
            id: 'cpu-chart-box',
            option: this.option
        })
    },
    computed: {},
    methods: {
        drew(obj) {
            var that = this;
            let mycpuChart = echarts.init(document.getElementById(obj.id));
            if (this.cpudata.type === 'all') {
                nodeclusterchart(this.cpudata.cpuobj).then(res => {
                    that.changedata(res, obj.option);
                    mycpuChart.setOption(obj.option);
                    this.loading = false;
                    that.$emit('cpuresize', mycpuChart);
                })
            } else if (this.cpudata.type === 'one') {
                if (this.cpudata.pagetype === 'virtualnode') {
                    virnodeone(this.cpudata.cpuobj).then(res => {
                        console.log('virtualnode-one-res', res)
                        that.changedata(res, obj.option);
                        mycpuChart.setOption(obj.option);
                        this.loading = false;
                        that.$emit('cpuresize', mycpuChart);
                    })
                } else if (this.cpudata.pagetype === 'node') {
                    nodechart(this.cpudata.cpuobj).then(res => {
                        that.changedata(res, obj.option);
                        mycpuChart.setOption(obj.option);
                        this.loading = false;
                        that.$emit('cpuresize', mycpuChart);
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
                seriesdata.push(resdata.metrics[i].value)
            }
            chartdata.xAxis.data = xAxisdata;
            chartdata.series[0].data = seriesdata;
            // console.log('node-this.cpuchartdata', chartdata)
        },
        assignment(assignment) {
            this.cpudata = assignment;
            var that = this;
            console.log('this.cpudata', this.cpudata)
            this.drew({
                id: 'cpu-chart-box',
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
