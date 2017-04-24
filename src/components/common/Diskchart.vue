<template>
    <div class="echarts" id="disk-chart-box">
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
    props: {},
    data() {
        return {
            // datatest: [],
            // dataone: {
            //     now: null,
            //     oneDay: null,
            //     value: null,
            // },
            option: {
                title: {
                    text: '磁盘',
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
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                    },
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
                        formatter: '{value} °C'
                    }
                },
                series: [{
                    name: '最高气温',
                    type: 'line',
                    data: [10, 10, 10, 10, 10, 10, 14],
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
                }, {
                    name: '最低气温',
                    type: 'line',
                    symbol: 'none',
                    data: [6, 6, 6, 6, 6, 6, 5],
                    lineStyle: {
                        normal: {
                            color: 'rgba(48,120,192,1)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(48,120,192,0.5)'
                        }
                    }
                }]
            },
        }
    },
    beforeUpdate() {

    },
    updated() {},
    created() {},
    mounted() {
        this.drew({
            id: 'disk-chart-box',
            option: this.option
        })
    },
    computed: {},
    methods: {
        drew(obj) {
            console.log('重回disk');
            var mydiskChart = echarts.init(document.getElementById(obj.id));
            mydiskChart.setOption(obj.option);
            this.$emit('diskresize', mydiskChart);
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
