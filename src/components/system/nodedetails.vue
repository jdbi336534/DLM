<template>
    <div class="node">
        <div class="charts">
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
        <div class="details">
            <p class="title">详细信息</p>
            <div class="details-colum">
                <el-row>
                    <!-- 左边部分 -->
                    <el-col :span="12">
                        <div>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">名称 </el-col>
                                <el-col :span="21" class="textleft">{{details.name}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">标签 </el-col>
                                <el-col :span="21" class="textleft">{{details.tag}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">创建时间 </el-col>
                                <el-col :span="21" class="textleft">{{details.annotations}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">创建时间 </el-col>
                                <el-col :span="21" class="textleft">{{details.creationTimestamp}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">外部ID </el-col>
                                <el-col :span="21" class="textleft">{{details.externalID}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">不可安排 </el-col>
                                <el-col :span="21" class="textleft">-</el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!-- 右边部分 -->
                    <el-col :span="12">
                        <div>
                            <el-row style="margin-top:28px">
                                <el-col :span="4" class="textright" style="font-size:14px;">系统信息</el-col>
                                <el-col :span="20" class="textleft"><span>服务器ID：</span><span>{{sysinfo.machineID}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>系统UUID：</span><span>{{sysinfo.systemUUID}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>Boot ID：</span><span>{{sysinfo.bootID}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>内核版本：</span><span>{{sysinfo.kernelVersion}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>操作系统镜像：</span><span>{{sysinfo.osImage}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>Container Runtime版本：</span><span>{{sysinfo.containerRuntimeVersion}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>Kubelet版本：</span><span>{{sysinfo.kubeletVersion}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>Kubele-Proxyt版本：</span><span>{{sysinfo.kubeProxyVersion}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>操作系统：</span><span>{{sysinfo.operatingSystem}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>架构：</span><span>{{sysinfo.architecture}}</span></el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="Allocatedresources">
            <p class="title">已分配资源</p>
            <el-table :data="tableData" style="width: 100%;margin-top:10px;" v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column prop="date" label="CPU请求(内核)" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="%" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="name" label="CPU限制(内核)" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="%" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="内存请求(bytes)" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="%" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="内存限制(bytes)" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="%" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
        <div class="virtualnode">
            <p class="title">虚拟节点</p>
            <el-table :data="pods" style="width: 100%;margin-top:10px;" v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column label="名称" width="400" show-overflow-tooltip>
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
                <el-table-column prop="address" label="CPU(cores)" show-overflow-tooltip>
                    <template scope="scope">
                        <div style="height:40px;width:120px;float:left;" class="linechartbox">
                            <chart :options="scope.row.cpudata" auto-resize></chart>
                        </div>
                        <span class="el-table-column-span  linechartboxspan"> 787888</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="内存(bytes)" show-overflow-tooltip>
                    <template scope="scope">
                        <div style="height:40px;width:120px;float:left;" class="linechartbox">
                            <chart :options="scope.row.memorydata" auto-resize></chart>
                        </div>
                        <span class="el-table-column-span linechartboxspan">wrrthojk787888</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="" width="90">
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
        </div>
    </div>
</template>
<script>
import cpuChart from '../common/Cpuchart';
import memoryChart from '../common/Memorychart';
import networkChart from '../common/Networkchart';
import diskChart from '../common/Diskchart';
import status from '../common/Status';
import linecpuChart from '../common/linecpuchart';
import linememoryChart from '../common/linememorychart';
import echarts from 'echarts';
import {
    getNode,
    getPods,
    virnodeone,
    deletePods
} from '../../assets/js/queryData';
import {
    keyPlusvalue
} from '../../assets/js/mUtils';
export default {
    components: {
        cpuChart,
        memoryChart,
        networkChart,
        diskChart,
        linecpuChart,
        linememoryChart,
        status
    },
    data() {
        return {
            tableloading: true,
            tempcpulist: [],
            tempmemorylist: [],
            cpuchartdata: {
                cpuobj: {
                    ip: this.$route.params.ip,
                    type: 'cpu',
                    name: 'usage_rate'
                },
                type: 'one',
                pagetype: 'node',
            },
            networkchartdata: {
                networkobj: {
                    ip: this.$route.params.ip,
                    type: 'network',
                    name: 'rx'
                },
                type: 'one',
                pagetype: 'node',
            },
            memorychartdata: {
                memoryobj: {
                    ip: this.$route.params.ip,
                    type: 'memory',
                    name: 'usage'
                },
                type: 'one',
                pagetype: 'node',
            },
            linecpuoption: {
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
            linememoryoption: {
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
            tableData: [],
            resizelist: [],
            details: {
                name: '',
                tag: '',
                annotations: '',
                creationTimestamp: '',
                externalID: '',
            },
            sysinfo: {},
            data: {},
            pods: [],
            podstable: [],
        };
    },
    mounted() {
        // 获取节点
        getNode(this.$route.params.ip).then(res => {
            res.metadata.tag = keyPlusvalue(res.metadata.labels)[0];
            res.metadata.exp = keyPlusvalue(res.metadata.annotations)[0];
            // 详情
            this.details.name = res.metadata.name;
            this.details.tag = res.metadata.tag;
            this.details.annotations = res.metadata.exp;
            this.details.creationTimestamp = res.metadata.creationTimestamp;
            this.details.externalID = res.spec.externalID;
            // 系统信息
            this.sysinfo = res.status.nodeInfo;
        });
        // 获取所有虚拟节点（详情页面）
        getPods('kube-system', '').then(res => {
            let temparr = [];
            for (let i in res.items) {
                if (res.items[i].spec.nodeName === this.$route.params.ip) {
                    let tempobj = {};
                    tempobj.name = res.items[i].metadata.name;
                    tempobj.phase = res.items[i].status.phase;
                    tempobj.restartCount = res.items[i].status.containerStatuses[0].restartCount;
                    tempobj.creationTimestamp = res.items[i].metadata.creationTimestamp;
                    tempobj.cpudata = this.linecpuoption;
                    tempobj.memorydata = this.linememoryoption;
                    if (res.items[i].status.phase === 'Running' || res.items[i].status.phase === 'Succeeded') {
                        tempobj.namestatus = 'success';
                    } else if (res.items[i].status.phase === 'Pending') {
                        tempobj.namestatus = 'warning';
                    } else {
                        tempobj.namestatus = 'wrong';
                    }
                    temparr.push(tempobj);
                }
            }
            this.pods = temparr;
            this.tableloading = false;
        }).then(() => {
            for (let j in this.pods) {
                // 请求cpu的使用率数据
                virnodeone({
                    ip: this.pods[j].name,
                    type: 'cpu',
                    name: 'usage'
                }).then(res => {
                    this.changedata(res, this.linecpuoption);
                    this.pods[j].cpudata = this.linecpuoption;
                    // 请求memory的使用率数据
                    virnodeone({
                        ip: this.pods[j].name,
                        type: 'memory',
                        name: 'usage'
                    }).then(res => {
                        this.changedata(res, this.linememoryoption);
                        this.pods[j].memorydata = this.linememoryoption;
                    });
                });
            }
        });
    },
    created() {
        let that = this;
        window.onresize = function() {
            for (var k = 0; k < that.resizelist.length; k++) {
                that.resizelist[k].resize();
            }
        }
    },
    updated() {},
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
        changedata(resdata, chartdata) {
            // console.log('传过来的', resdata)
            let xAxisdata = [];
            let seriesdata = [];
            for (let i in resdata.metrics) {
                let timestring = resdata.metrics[i].timestamp.substring(11, 16);
                xAxisdata.push(timestring);
                seriesdata.push(resdata.metrics[i].value)
            }
            // console.log('转化后的', seriesdata)
            chartdata.xAxis.data = xAxisdata;
            chartdata.series[0].data = seriesdata;
            // console.log('node-this.cpuchartdata', chartdata)
        },
        // 虚拟节点表格中的删除
        Delete(index, row) {
            deletePods('kube-system', row.name).then(res => {
                // console.log
('删除接口返回的数据：', res);
            });
        },
        // 虚拟及诶单表格中的修改
        Edit(index, row) {

        }
    }
};
</script>
<style lang="scss">
.node {
    height: 100%;
    width: 100%;
    overflow: auto;
    .charts {
        .chart-one-box {
            width: 50%;
            height: 50%;
            float: left;
        }
    }
    .charts,
    .details,
    .Allocatedresources,
    .virtualnode {
        width: calc(100% - 90px);
        margin-left: 28px;
        margin-top: 27px;
        padding: 20px;
    }
    .details,
    .Allocatedresources,
    .virtualnode {
        box-shadow: 0 4px 28px 0 rgba(0, 0, 0, 0.50), inset 0 0 28px 0 rgba(53, 215, 255, 0.4);
        .router {
            text-decoration: none;
            color: rgba(36, 202, 243, 0.9);
        }
    }
    .charts {
        height: 440px;
    }
    .details {
        .title {
            font-size: 17px;
            color: #3590BF;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(30, 157, 194, 0.10);
        }
        .details-colum {
            font-size: 12px;
            color: #41B6EC;
            letter-spacing: 1.71px;
            .textright {
                text-align: right;
                line-height: 18px;
            }
            .textleft {
                text-align: left;
                padding: 0 27px;
                line-height: 18px;
            }
            .margin {
                margin-top: 30px;
            }
        }
    }
    .Allocatedresources {
        .title {
            font-size: 17px;
            color: #3590BF;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(30, 157, 194, 0.10);
        }
        .el-table {
            th,
            td {
                height: 40px;
            }
            th.is-leaf {
                border-bottom: 1px solid #0E2A45;
            }
            td {
                border-bottom: 1px solid #0E2A45;
            }
            th {
                background-color: transparent;
            }
            .el-table__header-wrapper thead div {
                background-color: transparent;
            }
        }
    }
    .virtualnode {
        margin-bottom: 27px;
        .title {
            font-size: 17px;
            color: #3590BF;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(30, 157, 194, 0.10);
        }
        .el-table {
            .linechartbox {
                line-height: 40px;
                .echarts {
                    width: 110px;
                    height: 38px;
                }
            }
            .linechartboxspan {
                height: 100%;
                line-height: 40px;
            }
            th,
            td {
                height: 40px;
            }
            th.is-leaf {
                border-bottom: 1px solid #0E2A45;
            }
            td {
                border-bottom: 1px solid #0E2A45;
            }
            th {
                background-color: transparent;
            }
            .el-table__header-wrapper thead div {
                background-color: transparent;
            }
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
</style>
