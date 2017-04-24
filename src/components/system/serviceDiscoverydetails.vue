<template>
    <div class="zero-servicediscoverydetail-box">
        <div class="servicediscoverydetail-table">
            <p class="title">详细信息</p>
            <div class="details-colum">
                <el-row>
                    <!-- 左边部分 -->
                    <el-col :span="12">
                        <div>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">名称 </el-col>
                                <el-col :span="21" class="textleft">{{detailedinformation.metadata.name}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">命名空间 </el-col>
                                <el-col :span="21" class="textleft">{{detailedinformation.metadata.namespace}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">标签</el-col>
                                <el-col :span="21" class="textleft">
                                    <el-row style="margin-bottom:30px" v-for="(item, index) in detailedinformation.metadata.labelslist" :key="index">
                                        <el-col :span="24" class="textleft">
                                            {{item}}</span>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">类型 </el-col>
                                <el-col :span="21" class="textleft">{{detailedinformation.spec.type}}</el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!-- 右边部分 -->
                    <el-col :span="12">
                        <div>
                            <el-row style="margin-top:28px">
                                <el-col :span="4" class="textright" style="font-size:14px;">创建时间</el-col>
                                <el-col :span="20" class="textleft">{{detailedinformation.metadata.creationTimestamp}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="4" class="textright">标签选择器 </el-col>
                                <el-col :span="20" class="textleft">{{detailedinformation.spec.selector['k8s-app']}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="4" class="textright">集合 </el-col>
                                <el-col :span="20" class="textleft"></el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="4" class="textright">Cluster IP </el-col>
                                <el-col :span="20" class="textleft">{{detailedinformation.spec.clusterIP}}</span>
                                </el-col>
                            </el-row>
                            <el-row style="margin-top:28px">
                                <el-col :span="4" class="textright">内部端点</el-col>
                                <el-col :span="20" class="textleft">
                                    <el-row style="margin-bottom:30px">
                                        <el-col :span="24" class="textleft">
                                            {{`${detailedinformation.metadata.name}:${detailedinformation.spec.ports[0].port}${detailedinformation.spec.ports[0].protocol}`}}</span>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-bottom:30px">
                                        <el-col :span="24" class="textleft">
                                            {{`${detailedinformation.metadata.name}:${detailedinformation.spec.ports[0].port}${detailedinformation.spec.ports[0].protocol}`}}
                                            </span>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="servicediscoverydetail-virtualnode systemdlm-table-column">
            <p class="title">虚拟节点</p>
            <el-table :data="virtuualnode" style="width: 100%;margin-top:10px;">
                <el-table-column prop="address" label="名称" show-overflow-tooltip>
                    <template scope="scope">
                        <i style="background: #25CD6B;border-radius:50%;height:7px;width:7px;display:inline-block;vertical-align:middle;"></i>
                        <span style="margin-left: 10px">
                        <router-link :to="{path:'/dcp/system/virtualNodelookup/'+scope.row.metadata.name}">{{ scope.row.metadata.name}}</router-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="状态" show-overflow-tooltip>
                    <template scope="scope">
                        {{ scope.row.status.phase}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="重启次数" show-overflow-tooltip>
                    <template scope="scope">
                        {{ scope.row.status.containerStatuses[0].restartCount}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="存活时间" show-overflow-tooltip>
                    <template scope="scope">
                        {{ scope.row.metadata.creationTimestamp}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="CPU(cores)" width="280">
                    <template scope="scope">
                        <div style="height:40px;width:120px;float:left;">
                            <linememory-chart @linememoryresize='lineresize' ref='cpu'></linememory-chart>
                        </div>
                        <span class="el-table-column-span"> 787888</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="内存(bytes)" width="280">
                    <template scope="scope">
                        <div style="height:40px;width:120px;float:left;">
                            <linecpu-chart @linecpuresize='lineresize' ref='cpu'></linecpu-chart>
                        </div>
                        <span class="el-table-column-span">wrrthojk787888</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import linecpuChart from '../common/linecpuchart';
import linememoryChart from '../common/linememorychart';
import {
    servicesDiscoverydetails,
    getPods,
} from '../../assets/js/queryData';
export default {
    data() {
            return {
                // this.$route.params.ip
                currentPage3: 1,
                total: 1,
                resizelist: [],
                detailedinformation: null,
                virtuualnode: [],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }],
            }
        },
        components: {
            linecpuChart,
            linememoryChart,
        },
        beforeUpdate() {},
        updated() {},
        created() {},
        mounted() {
            servicesDiscoverydetails(this.$route.params.ip).then(res => {
                console.log('servicesDiscoverydetails-res', res)
                this.detailedinformation = res;
                var arr = [];
                for (let i in this.detailedinformation.metadata.labels) {
                    var str = i + ':' + this.detailedinformation.metadata.labels[i];
                    arr.push(str);
                }
                this.detailedinformation.metadata.labelslist = arr;
                console.log('this.detailedinformation', this.detailedinformation)
                console.log(this.detailedinformation.spec.selector['k8s-app'])
            })
            getPods().then(res => {
                console.log('xnjd', res)
                console.log(this.detailedinformation.spec.selector['k8s-app'])
                for (let k = 0; k < res.items.length; k++) {
                    if (res.items[k].metadata.labels['k8s-app'] === this.detailedinformation.spec.selector['k8s-app']) {
                        this.virtuualnode.push(res.items[k])
                    }
                }
                console.log('this.virtuualnode', this.virtuualnode)
            })

            var that = this;
            window.onresize = function() {
                console.log('window.onresize')
                console.log('that.resizelist', that.resizelist)
                console.log('that.resizelist', that.resizelist.length)
                for (var k = 0; k < that.resizelist.length; k++) {
                    console.log('k', that.resizelist[k])
                    that.resizelist[k].resize();
                }
            }
        },
        computed: {},
        methods: {
            lineresize(nodeval) {
                this.resizelist.push(nodeval);
            },
            handleSizeChange() {

            },
            handleCurrentChange() {},
        },
}
</script>
<style lang="scss">
@import '../../assets/css/systemcommon/common.scss';
</style>
<style lang="scss" scoped>
.zero-servicediscoverydetail-box {
    height: 100%;
    width: 100%;
    overflow: auto;
    .servicediscoverydetail-virtualnode,
    .servicediscoverydetail-table {
        width: calc(100% - 90px);
        margin-left: 28px;
        margin-top: 27px;
        padding: 20px;
    }
    .servicediscoverydetail-table {
        box-shadow: 0 4px 28px 0 rgba(0, 0, 0, 0.50), inset 0 0 28px 0 rgba(53, 215, 255, 0.4);
        padding-bottom: 40px;
        p {
            font-size: 16px;
        }
        .details-colum {
            font-size: 12px;
            color: #41B6EC;
            letter-spacing: 1.71px;
            .textright {
                text-align: right;
                line-height: 16px;
            }
            .textleft {
                text-align: left;
                padding: 0 27px;
                line-height: 16px;
            }
            .margin {
                margin-top: 20px;
            }
        }
    }
    .servicediscoverydetail-virtualnode {
        box-shadow: 0 4px 28px 0 rgba(0, 0, 0, 0.50), inset 0 0 28px 0 rgba(53, 215, 255, 0.4);
        p {
            font-size: 16px;
        }
        .el-table {
            margin-top: 0px;
            .el-table-column-span {
                height: 40px;
                line-height: 40px;
            }
        }
    }
}
</style>
