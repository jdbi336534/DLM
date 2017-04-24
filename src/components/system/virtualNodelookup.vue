<template>
    <div class="virtualNodelookup">
        <div class="charts">
            <div class="chartone">
                <cpu-chart @cpuresize='cpuresize' ref='cpu' :cpudata="cpuchartdata"></cpu-chart>
            </div>
            <div class="chartone">
                <memory-chart @memoryresize='memoryresize' ref='memory' :memorydata="memorychartdata"></memory-chart>
            </div>
        </div>
        <div class="details">
            <p class="title">详细信息</p>
            <div class="details-colum">
                <el-row>
                    <!-- 左边部分 -->
                    <el-col :span="14">
                        <div>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">名称 </el-col>
                                <el-col :span="21" class="textleft">{{details.name}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">命名空间 </el-col>
                                <el-col :span="21" class="textleft">{{details.namespace}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">标签 </el-col>
                                <el-col :span="21" class="textleft">
                                    <el-tag :key="tag" v-for="tag in details.tag" type="success" style="margin-right:5px;margin-bottom:2px;">
                                        {{tag}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">注释 </el-col>
                                <el-col :span="21" class="textleft">
                                    <el-tag type="success">
                                        {{details.annotations}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">创建时间 </el-col>
                                <el-col :span="21" class="textleft">{{details.creationTimestamp}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">状态 </el-col>
                                <el-col :span="21" class="textleft">{{details.phase}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright" style="height:1px;"></el-col>
                                <el-col :span="21" class="textleft">
                                    <router-link class="router" :to="{path:'/dcp/system/onLinelogs/'+$route.params.node}"> 查看日志</router-link>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!-- 右边部分 -->
                    <el-col :span="10">
                        <div>
                            <el-row style="margin-top:28px">
                                <el-col :span="4" class="textright" style="font-size:14px;">网络</el-col>
                                <el-col :span="20" class="textleft">
                                    <el-row style="margin-bottom:30px">
                                        <el-col :span="3" class="textright">节点</el-col>
                                        <el-col :span="21" class="textleft">{{details.nodeName}}</span>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-bottom:30px">
                                        <el-col :span="3" class="textright">IP</el-col>
                                        <el-col :span="21" class="textleft">{{details.podIP}}</span>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="containers">
            <p class="title">容器(Containers)</p>
            <div class="con-details">
                <el-col :span="16">
                    <el-row class="margin">
                        <el-col :span="3" class="textright">名称 </el-col>
                        <el-col :span="21" class="textleft">{{containers.name}}</el-col>
                    </el-row>
                    <el-row class="margin">
                        <el-col :span="3" class="textright">镜像 </el-col>
                        <el-col :span="21" class="textleft">{{containers.image}}</el-col>
                    </el-row>
                    <el-row class="margin">
                        <el-col :span="3" class="textright">环境变量 </el-col>
                        <el-col :span="21" class="textleft">
                            <p class="pstyle">{{containers.envname}}</p>
                        </el-col>
                    </el-row>
                    <el-row class="margin">
                        <el-col :span="3" class="textright" style="height:1px;"></el-col>
                        <el-col :span="21" class="textleft">
                            <router-link class="router" :to="{path:'/dcp/system/onLinelogs/'+$route.params.node}"> 查看日志</router-link>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row class="margin">
                        <el-col :span="4" class="textright">命令 </el-col>
                        <el-col :span="20" class="textleft">-</el-col>
                    </el-row>
                    <el-row class="margin">
                        <el-col :span="4" class="textright">存活时间 </el-col>
                        <el-col :span="20" class="textleft">-</el-col>
                    </el-row>
                </el-col>
            </div>
        </div>
        <div class="condition">
            <p class="title">条件</p>
            <el-table :data="condition" style="width: 100%;margin-top:10px;" v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column prop="type" label="类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="status" label="状态" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="lastProbeTime" label="最后心跳时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="lastTransitionTime" label="最后转岗时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="原因" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="消息" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import cpuChart from '../common/Cpuchart';
import memoryChart from '../common/Memorychart';
// import diskChart from '../common/Diskchart';
import {
    getPods
} from '../../assets/js/queryData';
import {
    keyPlusvalue
} from '../../assets/js/mUtils';
export default {
    components: {
        cpuChart,
        memoryChart,
        //  diskChart,
    },
    data() {
        return {
            tableloading: true,
            cpuchartdata: {
                cpuobj: {
                    ip: this.$route.params.node,
                    type: 'cpu',
                    name: 'usage'
                },
                type: 'one',
                pagetype: 'virtualnode',
            },
            memorychartdata: {
                memoryobj: {
                    ip: this.$route.params.node,
                    type: 'memory',
                    name: 'usage'
                },
                type: 'one',
                pagetype: 'virtualnode',
            },
            resizelist: [],
            details: {
                name: '',
                namespace: '',
                tag: [],
                annotations: '',
                creationTimestamp: '',
                phase: '',
                nodeName: '',
                podIP: ''
            },
            containers: {
                name: '',
                image: '',
                envname: ''
            },
            condition: [],
        };
    },
    mounted() {
        // 获取虚拟节点详情
        getPods('kube-system', this.$route.params.node).then(res => {
            // 详情
            this.details.name = res.metadata.name;
            this.details.namespace = res.metadata.namespace;
            this.details.creationTimestamp = res.metadata.creationTimestamp;
            this.details.tag = keyPlusvalue(res.metadata.labels);
            this.details.phase = res.status.phase;
            this.details.annotations = `创建者：${res.metadata.ownerReferences[0].kind} ${res.metadata.ownerReferences[0].name}`;
            this.details.nodeName = res.spec.nodeName;
            this.details.podIP = res.status.podIP;
            // 容器
            this.containers.name = res.spec.containers[0].name;
            this.containers.image = res.spec.containers[0].image;
            if (res.spec.containers[0].env) {
                this.containers.envname = res.spec.containers[0].env[0].name;
            } else {
                this.containers.envname = '';
            }
            // 条件
            this.condition = res.status.conditions;
            this.tableloading = false;
        });
    },
    methods: {
        cpuresize(nodeval) {
            this.resizelist.push(nodeval);
        },
        memoryresize(nodeval) {
            this.resizelist.push(nodeval);
        },
        btnclick() {

        }
    }
};
</script>
<style lang="scss">
.virtualNodelookup {
    height: 100%;
    width: 100%;
    overflow: auto;
    .charts,
    .details,
    .containers,
    .condition {
        width: calc(100% - 90px);
        margin-left: 28px;
        margin-top: 27px;
        padding: 20px;
    }
    .details,
    .containers,
    .condition {
        box-shadow: 0 4px 28px 0 rgba(0, 0, 0, 0.50), inset 0 0 28px 0 rgba(53, 215, 255, 0.4);
    }
    .charts {
        height: 260px;
        .chartone {
            width: 50%;
            height: 100%;
            float: left;
        }
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
            .router {
                text-decoration: none;
                color: #C4E9FB;
            }
        }
    }
    .containers {
        overflow: hidden;
        .pstyle {
            &:first-child {
                margin-top: 0;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
        .title {
            font-size: 17px;
            color: #3590BF;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(30, 157, 194, 0.10);
        }
        .con-details {
            font-size: 12px;
            color: #41B6EC;
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
            .router {
                text-decoration: none;
                color: #C4E9FB;
            }
        }
    }
    .condition {
        margin-bottom: 27px;
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
}
</style>
