<template>
    <div class='zero-node-box'>
        <div class="zeronode-chart">
            <div class="zeronode-chart-left">
                <div class="cpu-chart chart-one-box">
                    <cpu-chart @cpuresize='cpuresize' ref='cpu' :cpudata="cpuchartdata"></cpu-chart>
                </div>
                <div class="memory-chart chart-one-box">
                    <memory-chart @memoryresize='memoryresize' ref='memory' :memorydata="memorychartdata"></memory-chart>
                </div>
                <div class="network-chart chart-one-box">
                    <network-chart @networkresize='networkresize' ref='network' :networkdata="networkchartdata"></network-chart>
                </div>
                <div class="disk-chart chart-one-box">
                    <disk-chart @diskresize='diskresize' ref='disk'></disk-chart>
                </div>
            </div>
            <div class="zeronode-chart-right">
                <pie-chart @pieresize='pieresize' ref='pie'></pie-chart>
            </div>
        </div>
        <div class="zeronode-table systemdlm-table-column">
            <p class="title">节点</p>
            <el-table :data="tableData" style="width: 100%;" height='300' v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column label="名称" show-overflow-tooltip>
                    <template scope="scope">
                        <status :type="scope.row.status.conditions[0].namestatus"></status>
                        <span style="margin-left: 10px"><router-link class="router" :to="{path:'/dcp/system/nodedetails/'+scope.row.metadata.name}">{{scope.row.metadata.name}}</router-link></span>
                    </template>
                </el-table-column>
                <el-table-column prop="metadata" label="标签" :formatter="formatter" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="状态" show-overflow-tooltip>
                    <template scope="scope">{{scope.row.status.conditions[0].status}}</template>
                </el-table-column>
                <el-table-column label="创建日期" show-overflow-tooltip>
                    <template scope="scope">{{scope.row.metadata.creationTimestamp}}</template>
                </el-table-column>
            </el-table>
            <!-- <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage3" :page-size="20" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
import cpuChart from '../common/Cpuchart';
import memoryChart from '../common/Memorychart';
import networkChart from '../common/Networkchart';
import diskChart from '../common/Diskchart';
import pieChart from '../common/Piechart';
import status from '../common/Status';
import {
    getNode,
    //   nodeclusterchart,
} from '../../assets/js/queryData';
export default {
    name: 'view',
    components: {
        cpuChart,
        memoryChart,
        networkChart,
        diskChart,
        pieChart,
        status
    },
    props: {},
    data() {
        return {
            tableloading: true,
            currentPage3: 1,
            total: 1,
            resizelist: [],
            tableData: [],
            cpuchartdata: {
                cpuobj: {
                    type: 'cpu',
                    name: 'usage_rate'
                },
                type: 'all',
                pagetype: 'node',
            },
            memorychartdata: {
                memoryobj: {
                    type: 'memory',
                    name: 'usage'
                },
                type: 'all',
                pagetype: 'node',
            },
            networkchartdata: {
                networkobj: {
                    type: 'network',
                    name: 'rx'
                },
                type: 'all',
                pagetype: 'node',
            },
        }
    },
    beforeUpdate() {},
    updated() {},
    created() {
        var that = this;
        window.onresize = function() {
            for (var k = 0; k < that.resizelist.length; k++) {
                // console.log('k', that.resizelist[k])
                that.resizelist[k].resize();
            }
        }
    },
    mounted() {
        getNode('').then(res => {
            for (let i in res.items) {
                if (res.items[i].status.conditions[0].status === 'Unknown') {
                    res.items[i].status.conditions[0].namestatus = 'warning';
                } else if (res.items[i].status.conditions[0].status === 'True') {
                    res.items[i].status.conditions[0].namestatus = 'success';
                } else {
                    res.items[i].status.conditions[0].namestatus = 'wrong';
                }
            }
            // console.log('res.data:', res);
            this.tableData = res.items;
            this.tableloading = false;
        });
    },
    computed: {},
    methods: {
        cpuresize(nodeval) {
            this.resizelist.push(nodeval);
        },
        memoryresize(nodeval) {
            this.resizelist.push(nodeval);
        },
        networkresize(nodeval) {
            this.resizelist.push(nodeval);
        },
        diskresize(nodeval) {
            this.resizelist.push(nodeval);
        },
        pieresize(nodeval) {
            this.resizelist.push(nodeval);
        },
        formatter(row, column) {
            for (let i in row.metadata.labels) {
                return (`${i}:${row.metadata.labels[i]}`);
            }
        },
    }
}
</script>
<style lang="scss">
@import '../../assets/css/systemcommon/common.scss';
</style>
<style lang="scss" scoped>
.zero-node-box {
    height: 100%;
    width: 100%;
    overflow: auto;
    .zeronode-chart,
    .zeronode-table {
        width: calc(100% - 70px);
        margin-left: 28px;
        padding: 0 0 0 20px;
    }
    .zeronode-chart {
        height: 350px;
        margin-top: 17px;
        .zeronode-chart-left {
            height: 100%;
            width: 76%;
            float: left;
            .chart-one-box {
                width: 50%;
                height: 50%;
                float: left;
                overflow: hidden;
            }
        }
        .zeronode-chart-right {
            width: 24%;
            height: 100%;
            float: right;
        }
    }
    .zeronode-table {
        padding: 0;
        width: calc(100% - 70px);
        height: calc(100% - 377px);
        margin-top: 10px;
        .title {
            font-size: 17px;
            color: #3590BF;
            margin: 0;
            padding-left: 20px;
        }
        .el-table {
            height: calc(100% - 28px)!important;
            .router {
                text-decoration: none;
                color: rgba(36, 202, 243, 0.9);
            }
        }
        // .pagination {
        //     margin-top: 10px;
        //     text-align: center;
        // }
    } //当屏幕高度小于749px的时候，改变弹框的top值
    // @media screen and (max-width: 1280px) {
    //     .zeronode-chart {
    //         width: 900px;
    //     }
    //     .zeronode-table {
    //         width: 850px;
    //     }
    // } //当屏幕高度小于749px的时候，改变弹框的top值
    @media screen and (max-height: 749px) {
        .zeronode-chart {
            height: 270px;
        }
        .zeronode-table {
            height: calc(100% - 297px);
        }
    }
}
</style>
