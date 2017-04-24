<template>
    <div class="zero-virtuanode-box">
        <div class="virtuanode-chart">
            <div class="virtuanode-cpu-box">
                <cpu-chart @cpuresize='cpuresize' ref='cpu' :cpudata="cpuchartdata"></cpu-chart>
            </div>
            <div class="virtuanode-memory-box">
                <memory-chart @memoryresize='memoryresize' ref='memory' :memorydata="memorychartdata"></memory-chart>
            </div>
        </div>
        <div class="virtuanode-table systemdlm-table-column">
            <p class="title">虚拟节点</p>
            <el-table :data="tableData" style="width: 100%;margin-top:10px;" height='360'>
                <el-table-column label="名称" width="300" show-overflow-tooltip>
                    <template scope="scope">
                        <status :type="scope.row.namestatus"></status>
                        <span style="margin-left: 10px"><router-link class="router" :to="{path:'/dcp/system/virtualNodelookup/'+scope.row.name}">{{scope.row.name}}</router-link></span>
                    </template>
                </el-table-column>
                <el-table-column prop="phase" label="状态" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="restartCount" label="重启次数" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="creationTimestamp" label="存活时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="CPU(cores)" width="280">
                    <template scope="scope">
                        <div style="height:40px;width:120px;float:left;">
                            <linecpu-chart @linecpuresize='linecpuresize' ref='cpu'></linecpu-chart>
                        </div>
                        <span class="el-table-column-span"> 787888</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="内存(bytes)" width="280">
                    <template scope="scope">
                        <div style="height:40px;width:120px;float:left;">
                            <linememory-chart @linememoryresize='linememoryresize' ref='memory'></linememory-chart>
                        </div>
                        <span class="el-table-column-span">wrrthojk787888</span>
                    </template>
                </el-table-column>
                <el-table-column label="" width="90">
                    <template scope="scope">
                        <router-link class="router" :to="{path:'/dcp/system/offLinelogs'}">
                            <i class="logs"></i>
                        </router-link>
                        <el-popover placement="bottom" width="46" trigger="hover">
                            <ul>
                                <li @click="Delete(scope.$index, scope.row)">删除</li>
                                <li @click="Edit(scope.$index, scope.row)">编辑</li>
                            </ul>
                            <el-button type="text" slot="reference">
                                <i style="cursor:pointer;color:#24caf3;" class="el-icon-more"></i>
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <!--  <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage3" :page-size="20" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
import cpuChart from '../common/Cpuchart';
import memoryChart from '../common/Memorychart';
import linecpuChart from '../common/linecpuchart';
import linememoryChart from '../common/linememorychart';
import status from '../common/Status';
import {
    getPods,
    deletePods
} from '../../assets/js/queryData';
export default {
    data() {
            return {
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
            }
        },
        components: {
            cpuChart,
            memoryChart,
            linecpuChart,
            linememoryChart,
            status
        },
        beforeUpdate() {},
        updated() {},
        created() {
            var that = this;
            window.onresize = function() {
                for (var k = 0; k < that.resizelist.length; k++) {
                    that.resizelist[k].resize();
                }
            }
        },
        mounted() {
            // 获取所有虚拟节点（详情页面）
            getPods('kube-system', '').then(res => {
                let temparr = [];
                for (let i in res.items) {
                    let tempobj = {};
                    tempobj.name = res.items[i].metadata.name;
                    tempobj.phase = res.items[i].status.phase;
                    tempobj.restartCount = res.items[i].status.containerStatuses[0].restartCount;
                    tempobj.creationTimestamp = res.items[i].metadata.creationTimestamp;
                    if (res.items[i].status.phase === 'Running' || res.items[i].status.phase === 'Succeeded') {
                        tempobj.namestatus = 'success';
                    } else if (res.items[i].status.phase === 'Pending') {
                        tempobj.namestatus = 'warning';
                    } else {
                        tempobj.namestatus = 'wrong';
                    }
                    temparr.push(tempobj);
                }
                // console.log('temparr:', temparr);
                this.tableData = temparr;
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
            linecpuresize(nodeval) {
                //  this.resizearraylist.push(nodeval);
            },
            linememoryresize(nodeval) {
                // this.resizearraylist.push(nodeval);
            },
            handleSizeChange() {

            },
            handleCurrentChange() {},
            Delete(index, row) {
                deletePods('kube-system', row.name).then(res => {
                    // console.log('删除接口返回的数据：', res);
                });
            },
            Edit(index, row) {},
        },
}
</script>
<style lang="scss">
@import '../../assets/css/systemcommon/common.scss'; // popover全局样式覆盖
.el-popover[x-placement^="bottom"] .popper__arrow::after {
    border-bottom-color: #028bb4!important;
}

.el-popover[x-placement^="bottom"] {
    margin-top: 0px!important;
}

.el-popover {
    min-width: 20px!important;
    padding: 5px!important;
    background: rgba(2, 145, 187, 0.95)!important;
    border: 1px solid #2AC2F3!important;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04)!important;
    border-radius: 1px!important;
    li {
        height: 20px;
        line-height: 20px;
        text-align: center;
        padding: 0 10px;
        font-size: 12px;
        color: #FFFFFF;
        cursor: pointer;
        &:first-child {
            padding-bottom: 2px;
            border-bottom: 1px solid rgba(133, 225, 249, 0.75);
        }
        &:last-child {
            padding-top: 2px;
        }
        &:hover {
            color: #2ac2f3;
        }
    }
} // popover全局样式覆盖结束
</style>
<style lang="scss" scoped>
.zero-virtuanode-box {
    height: 100%;
    width: 100%;
    overflow: auto;
    .virtuanode-chart,
    .virtuanode-table {
        width: calc(100% - 90px);
        margin-left: 28px;
        margin-top: 27px;
        padding: 20px;
    }
    .virtuanode-chart {
        height: 200px;
        padding: 0 20px;
        .virtuanode-cpu-box,
        .virtuanode-memory-box {
            width: 50%;
            height: 100%;
            float: left;
        }
    }
    .virtuanode-table {
        height: calc(100% - 310px);
        box-shadow: 0 4px 28px 0 rgba(0, 0, 0, 0.50), inset 0 0 28px 0 rgba(53, 215, 255, 0.4);
        p {
            font-size: 16px;
        }
        .el-table {
            margin-top: 0px;
            height: calc(100% - 68px)!important;
            padding-bottom: 40px;
            .el-table-column-span {
                height: 40px;
                line-height: 40px;
            }
            .router {
                text-decoration: none;
                color: rgba(36, 202, 243, 0.9);
            }
            .el-icon-more {
                transform: rotate(90deg);
                -ms-transform: rotate(90deg);
                /* IE 9 */
                -moz-transform: rotate(90deg);
                /* Firefox */
                -webkit-transform: rotate(90deg);
                /* Safari 和 Chrome */
                -o-transform: rotate(90deg);
                /* Opera */
            }
            .logs {
                height: 18px;
                width: 18px;
                margin-right: 10px;
                display: inline-block;
                vertical-align: middle;
                background: url(../../assets/img/system/logs.png) no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
</style>
