<template>
    <div style="width:100%;height:100%;" v-loading='loading2'>
        <div class="echarts" id="network-chart-box">
        </div>
    </div>
</template>
<script>
import echarts from 'echarts';
import {

} from '../../assets/js/mUtils';
import {
    nodechart
} from '../../assets/js/queryData';
export default {
    name: 'view',
    components: {},
    props: {
        networkdata: null,
    },
    data() {
        return {
            loading2: false,
            option: {
                title: {
                    text: '网络',
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
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#505765'
                        }
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    realtime: true,
                }],
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        onZero: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                    },
                    data: ['1:00', '2:00', '3:00', '4:00', '5:00']
                }],
                yAxis: [{
                    name: '',
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                        formatter: '{value}GB'
                    },
                    min: 'dataMin',
                }],
                series: [{
                    name: '网络',
                    type: 'line',
                    animation: false,
                    symbol: 'none',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(160, 42,108,0.7)'
                            }, {
                                offset: 1,
                                color: 'rgba(160, 42,108,0.3)'
                            }], false)
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: 'rgba(160,42,108,1)'
                        }
                    },
                    data: [5, 2, 8, 4, 6]
                }]
            },
        }
    },
    beforeUpdate() {

    },
    updated() {},
    created() {
        // for (var i = 0; i < 5; i++) {
        //     this.dataShadow.push(500);
        // }
    },
    mounted() {
        this.drew({
            id: 'network-chart-box',
            option: this.option
        })
    },
    computed: {},
    methods: {
        drew(obj) {
            // console.log('renetwork')
            var that = this;
            this.loading2 = false;
            console.log('this.loading', this.loading2)
            let mynetworkChart = echarts.init(document.getElementById(obj.id));
            if (this.networkdata.type === 'all') {
                mynetworkChart.setOption(obj.option);
                this.loading2 = false;
                console.log('drew-loading', this.loading2)
                this.$emit('networkresize', mynetworkChart);
                // // mycpuChart.showLoading();
                // nodeclusterchart(this.networkdata.networkobj).then(res => {
                //     that.changedata(res, obj.option);
                //     //  mycpuChart.hideLoading();
                //     mynetworkChart.setOption(obj.option);
                //     this.$emit('networkresize', mynetworkChart);
                // })
            } else if (this.networkdata.type === 'one') {
                // mycpuChart.showLoading();
                // console.log('进入one函数')
                nodechart(this.networkdata.networkobj).then(res => {
                    // console.log('network', res)
                    that.changedata(res, obj.option);
                    mynetworkChart.setOption(obj.option);
                    this.loading = false;
                    this.$emit('networkresize', mynetworkChart);
                })
            }
        },
        changedata(resdata, chartdata) {
            // console.log('node-resdata', resdata)
            let xAxisdata = [];
            let seriesdata = [];
            for (let i in resdata.metrics) {
                var timestring = resdata.metrics[i].timestamp.substring(11, 16);
                xAxisdata.push(timestring);
                var valueGB = (resdata.metrics[i].value / (1024 * 1024)).toFixed(9);
                seriesdata.push(valueGB);
            }
            chartdata.xAxis[0].data = xAxisdata;
            chartdata.series[0].data = seriesdata;
            // console.log('node-this.cpuchartdata', chartdata)
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
