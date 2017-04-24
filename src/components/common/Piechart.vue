<template>
    <div class="echarts" id="pie-chart-box">
    </div>
</template>
<script>
import echarts from 'echarts';
import {

} from '../../assets/js/mUtils';
import {
    getNode
} from '../../assets/js/queryData';
export default {
    name: 'view',
    components: {},
    props: {},
    data() {
        return {
            pieData: null,
            option: {
                title: {
                    text: '节点数量',
                    textStyle: {
                        color: 'rgba(36,202,243,1)',
                        fontSize: 12,
                    },
                    left: '28%',
                    top: '32%',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    x: 'center',
                    y: '72%',
                    data: ['活动', '停止'],
                    textStyle: {
                        color: 'rgba(250,250,250,0.7)'
                    }
                },
                color: ['rgba(84,32,76,0.9)', 'rgba(46,124,120,0.9)'],
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['30%', '60%'],
                    center: ['40%', '35%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}: {c} ({d}%)',
                            position: 'inner'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                            },
                            labelLine: {
                                show: true
                            }
                        }
                    },
                    data: [{
                        value: 20,
                        name: '活动',
                    }, {
                        value: 20,
                        name: '停止'
                    }]
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
            id: 'pie-chart-box',
            option: this.option
        })
    },
    computed: {},
    methods: {
        drew(obj) {
            var myChart = echarts.init(document.getElementById(obj.id));
            getNode('').then(res => {
                let activedata = 0;
                let stop = 0;
                for (let i in res.items) {
                    if (res.items[i].status.conditions[0].status === 'Running') {
                        activedata++;
                    } else {
                        stop++;
                    }
                }
                obj.option.series[0].data[0].value = activedata;
                obj.option.series[0].data[1].value = stop;
                myChart.setOption(obj.option);
                this.$emit('pieresize', myChart);
            });
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
