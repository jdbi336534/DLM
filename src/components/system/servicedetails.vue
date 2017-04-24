<template>
    <div class="zero-servicedetail-box">
        <div class="servicedetail-chart">
            <div class="servicedetail-cpu-box">
                <cpu-chart @cpuresize='cpuresize' ref='cpu'></cpu-chart>
            </div>
            <div class="servicedetail-memory-box">
                <memory-chart @memoryresize='memoryresize' ref='memory'></memory-chart>
            </div>
        </div>
        <div class="servicedetail-table">
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
                                        <el-col :span="24">
                                            {{item}}</span>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!-- 右边部分 -->
                    <el-col :span="12">
                        <div>
                            <el-row class="margin">
                                <el-col :span="6" class="textright">标签选择器 </el-col>
                                <el-col :span="18" class="textleft">{{detailedinformation.spec.selector['k8s-app']}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="6" class="textright">策略 </el-col>
                                <el-col :span="18" class="textleft">kubernetes.io/hostname:172.16.1.233</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="6" class="textright">最小准备秒 </el-col>
                                <el-col :span="18" class="textleft">0</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="6" class="textright">修订历史记录限制 </el-col>
                                <el-col :span="18" class="textleft">kubernetes.io/hostname:172.16.1.233</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="6" class="textright">滚动更新策略 </el-col>
                                <el-col :span="18" class="textleft">kubernetes.io/hostname:172.16.1.233</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="6" class="textright">状态 </el-col>
                                <el-col :span="18" class="textleft">kubernetes.io/hostname:172.16.1.233</el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import cpuChart from '../common/Cpuchart';
import memoryChart from '../common/Memorychart';
import {
    servicesDiscoverydetails,
    getPods
} from '../../assets/js/queryData';
export default {
    data() {
            return {
                currentPage3: 1,
                total: 1,
                resizelist: [],
                detailedinformation: null,
                virtuualnode: [],
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
            }
        },
        components: {
            cpuChart,
            memoryChart,
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
            getPods('kube-system', '').then(res => {
                console.log('xnjd', res)
                console.log(this.detailedinformation.spec.selector['k8s-app'])
                for (let k = 0; k < res.items.length; k++) {
                    if (res.items[k].metadata.labels['k8s-app'] === this.detailedinformation.spec.selector['k8s-app'] || res.items[k].metadata.labels['app'] === this.detailedinformation.spec.selector['k8s-app']) {
                        this.virtuualnode.push(res.items[k])
                    }
                }
                console.log('this.virtuualnode', this.virtuualnode)
                if (this.virtuualnode.length === 0) {
                    this.cpuchartdata.cpuobj.ip = 'elasticsearch-logging-v1-h3psz';
                    this.memorychartdata.memoryobj.ip = 'elasticsearch-logging-v1-h3psz';
                } else {
                    this.cpuchartdata.cpuobj.ip = this.virtuualnode[0].metadata.name;
                    this.memorychartdata.memoryobj.ip = this.virtuualnode[0].metadata.name;
                    this.$refs.cpu.assignment(this.cpuchartdata)
                    this.$refs.memory.assignment(this.memorychartdata)
                }
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
            cpuresize(nodeval) {
                this.resizelist.push(nodeval);
            },
            memoryresize(nodeval) {
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
.zero-servicedetail-box {
    height: 100%;
    width: 100%;
    overflow: auto;
    .servicedetail-chart,
    .servicedetail-table {
        width: calc(100% - 90px);
        margin-left: 28px;
        margin-top: 27px;
        padding: 20px;
    }
    .servicedetail-chart {
        height: 200px;
        padding: 0 20px;
        .servicedetail-cpu-box,
        .servicedetail-memory-box {
            width: 50%;
            height: 100%;
            float: left;
        }
    }
    .servicedetail-table {
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
}
</style>
