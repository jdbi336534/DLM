<template>
    <div style="width:100%;height:100%;" v-loading='loadingcpuline' class="echartbox">
        <div class="echarts linecpu-chart-box">
        </div>
    </div>
</template>
<script>
import echarts from 'echarts';
import {

} from '../../assets/js/mUtils';
import {
    virnodeone,
    getPods,
} from '../../assets/js/queryData';
export default {
    name: 'view',
    components: {},
    props: {
        linedata: {},
    },
    data() {
        return {
            loadingcpuline: true,
            datatest: [],
            linecpuobj: {
                linecpuobj: {
                    ip: '',
                    type: 'cpu',
                    name: 'usage'
                },
                type: 'one',
                pagetype: 'virtualnode',
            },
            option: {
                grid: {
                    left: '5',
                    right: '5',
                    top: '5',
                    bottom: '5',
                    borderWidth: 1
                },
                tooltip: {
                    show: false,
                },
                dataZoom: [{
                    type: 'inside',
                    realtime: true,
                }],
                xAxis: {
                    show: false,
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
                    show: false,
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    min: 'dataMin',
                },
                series: [{
                    name: '模拟数据',
                    type: 'line',
                    showSymbol: false,
                    roam: true,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(98, 255,208,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(15, 112,225,1)'
                            }])
                        }
                    },
                    data: []
                }]
            },
        }
    },
    beforeUpdate() {

    },
    updated() {},
    created() {

    },
    mounted() {
        console.log('linelinedata', this.linedata)
        this.drew({
            classname: 'linecpu-chart-box',
            option: this.option
        })
    },
    computed: {},
    methods: {
        drew(obj) {
            console.log('relinecpu')
            var that = this;
            let mylinecpuChartlist = document.getElementsByClassName(obj.classname)
            let mylinecpuChartarraylist = [];
            getPods('kube-system', '').then(res => {
                let temparr = res.items;
                for (let k = 0; k < temparr.length; k++) {
                    let mylinecpuChart = echarts.init(mylinecpuChartlist[k]);
                    mylinecpuChartarraylist.push(mylinecpuChart);
                    this.linecpuobj.linecpuobj.ip = temparr[k].metadata.name;
                    virnodeone(this.linecpuobj.linecpuobj).then(res => {
                        console.log('virtualnode-one-res-cccc', res)
                        that.changedata(res, obj.option);
                        mylinecpuChart.setOption(obj.option);
                    }).then(() => {
                        this.loadingcpuline = false;
                    })
                }
                that.$emit('linecpuresize', mylinecpuChartarraylist);
            });
        },
        drewtwo(temparrarg) {
            console.log('进入dwo')
            var that = this;
            let mylinecpuChartlist = document.getElementsByClassName('linecpu-chart-box')
            let mylinecpuChartarraylisttwo = [];
            for (let k = 0; k < temparrarg.length; k++) {
                let mylinecpuChart = echarts.init(mylinecpuChartlist[k]);
                mylinecpuChartarraylisttwo.push(mylinecpuChart);
                this.linecpuobj.linecpuobj.ip = temparrarg[k].name;
                virnodeone(this.linecpuobj.linecpuobj).then(res => {
                    console.log('virtualnode-one-res-nt', res)
                    that.changedata(res, that.option);
                    mylinecpuChart.setOption(that.option);
                }).then(() => {
                    this.loadingcpuline = false;
                })
            }
            that.$emit('linecpuresize', mylinecpuChartarraylisttwo);
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
    }
}
</script>
<style lang="scss">
@import '../../assets/css/systemcommon/common.scss';
</style>
<style lang="scss">
.echartbox {
    .echarts {
        width: 100%;
        height: 100%;
    }
    .el-loading-spinner .circular {
        width: 22px;
        height: 32px;
    }
}
</style>
