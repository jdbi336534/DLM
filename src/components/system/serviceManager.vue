<template>
    <div class="serviceManager">
        <div class="serviceManager-top-box">
            <div class="btn_group">
                <el-button type="primary">
                    <i class="el-icon-plus el-icon--right"></i>
                    <el-select v-model="value" placeholder="新建">
                        <el-option v-for="item in optionsnode" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-button>
            </div>
        </div>
        <div class="charts">
            <div class="cpu-chart chart-one-box">
                <cpu-chart @cpuresize='cpuresize' ref='cpu' :cpudata="cpuchartdata"></cpu-chart>
            </div>
            <div class="memory-chart chart-one-box">
                <memory-chart @memoryresize='memoryresize' ref='memory' :memorydata="memorychartdata"></memory-chart>
            </div>
        </div>
        <div class="table">
            <p class="title">服务</p>
            <el-popover ref="popover2" placement="bottom" title="标题" width="200" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            </el-popover>
            <el-table :data="servicelistdata" style="width: 100%" height='500'>
                <el-table-column label="名称" show-overflow-tooltip>
                    <template scope="scope">
                        <i style="background: #25CD6B;border-radius:50%;height:7px;width:7px;display:inline-block;vertical-align:middle;"></i>
                        <span style="margin-left: 10px">
                            <router-link :to="{path:'/dcp/system/servicedetails/'+scope.row.metadata.name}">{{scope.row.metadata.name}}</router-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="标签" show-overflow-tooltip>
                    <template scope="scope">
                        {{ scope.row.metadata.labelstring}}
                    </template>
                </el-table-column>
                <el-table-column prop="node" label="虚拟节点" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="alive" label="存活时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="jingx" label="镜像" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="" width="60">
                    <template scope="scope">
                        <el-popover placement="bottom" width="46" trigger="hover">
                            <ul>
                                <li @click="Lookup(scope.$index, scope.row)">查看</li>
                                <li @click="Delete(scope.$index, scope.row)">删除</li>
                            </ul>
                            <el-button type="text" slot="reference"><i style="cursor:pointer;color:#24caf3;" class="el-icon-more"></i></el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
import cpuChart from '../common/Cpuchart';
import memoryChart from '../common/Memorychart';
import {
    getServices,
    deleteservicesDiscovery
} from '../../assets/js/queryData';
export default {
    components: {
        cpuChart,
        memoryChart
    },
    data() {
        return {
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
            currentPage: 1,
            pageSize: 20,
            total: 0,
            dom: {},
            resizelist: [],
            optionsnode: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            servicelistdata: [{
                'metadata': {
                    'name': '',
                    'creationTimestamp': '',
                    'labels': {
                        'addonmanager.kubernetes.io/mode': '',
                        'k8s-app': '',
                        'kubernetes.io/cluster-service': '',
                        'kubernetes.io/name': ''
                    },
                    'labelstring': ''
                },
                'spec': {
                    'selector': {
                        'k8s-app': ''
                    },
                    'clusterIP': '',
                    'type': '',
                    'sessionAffinity': ''
                }
            }]
        };
    },
    created() {},
    methods: {
        cpuresize(nodeval) {
            this.resizelist.push(nodeval);
        },
        memoryresize(nodeval) {
            this.resizelist.push(nodeval);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        clickicon() {
            let that = this;
            setTimeout(function() {
                that.dom = $('.el-dropdown-menu').offset();
            }, 0);
        },
        Delete(index, row) {
            deleteservicesDiscovery(row.metadata.name).then(res => {
                console.log(res);
            });
        },
        Lookup(index, row) {
            console.log(index, row);
        }
    },
    watch: {
        dom(val) {
            console.log('this.dom:val', val);
            $('.el-dropdown-menu').offset({
                left: val.left + 17
            });
        }
    },
    mounted() {
        getServices().then(res => {
            console.log('getServices', res)
            this.servicelistdata = res.items;
            for (var j = 0; j < this.servicelistdata.length; j++) {
                var arr = [];
                for (let i in this.servicelistdata[j].metadata.labels) {
                    var str = i + ':' + this.servicelistdata[j].metadata.labels[i];
                    arr.push(str);
                }
                var labelstring = arr.join('; ');
                this.servicelistdata[j].metadata.labelstring = labelstring;
            }
            console.log('this.servicelistdata', JSON.stringify(this.servicelistdata[0], null, 4));
        })
        var that = this;
        window.onresize = function() {
            for (var k = 0; k < that.resizelist.length; k++) {
                that.resizelist[k].resize();
            }
        }
    },
};
</script>
<style lang="scss">
// popover全局样式覆盖
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
}

// popover全局样式覆盖结束
.serviceManager {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .charts,
    .table {
        width: calc(100% - 57px);
        margin-left: 28px;
        margin-top: 27px;
    }
    .charts {
        height: 180px;
        .chart-one-box {
            float: left;
            width: 50%;
            height: 100%;
        }
    }
    .table {
        height: calc(100% - 262px);
        .title {
            font-size: 17px;
            color: #24CAF3;
            text-align: left;
            margin-bottom: 5px;
        }
        .el-table {
            height: calc(100% - 28px)!important;
            td>div a {
                color: rgba(36, 202, 243, 1);
                text-decoration: none;
            }
            td {
                border-bottom: 1px solid rgba(98, 208, 248, 0.1);
                height: 40px;
            }
            th {
                background-color: transparent;
                height: 40px;
            }
            .el-table__header-wrapper {
                thead div {
                    background-color: transparent;
                }
                th {
                    border-bottom: 1px solid rgba(98, 208, 248, 0.1);
                }
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
        }
        .pagination {
            margin-top: 10px;
            text-align: center;
        }
    }
}
</style>
<style lang="scss">
.serviceManager {
    .serviceManager-top-box {
        width: 100%;
        height: 8%;
        position: absolute;
        top: -8.3%;
        .btn_group {
            position: absolute;
            height: 80%;
            width: 90%;
            // background-color: yellow;
            top: 10%;
            left: 7%;
            font-size: 16px;
            .el-button {
                border: 0;
                background: url("../../assets/img/system/topimg/btn-bg.png") no-repeat center;
                background-size: 100% 100%;
                height: 100%;
                width: 10%;
                color: rgba(182, 239, 253, 0.9);
                position: relative;
                top: -3%;
                padding: 5px;
                // .el-cascader {
                //     height: 100%;
                //     width: 80%;
                // }
                .el-select {
                    height: 100%;
                    width: 80%;
                    .el-input {
                        height: 100%;
                        .el-input__inner {
                            height: 100%;
                            border: 0;
                        }
                    }
                    .el-input__icon {
                        color: #2BEDE6;
                    }
                }
            }
            .el-button:hover {
                background: url("../../assets/img/system/topimg/btn-bg-on.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}

@media screen and (max-width: 1366px) {
    .serviceManager {
        .serviceManager-top-box {
            .btn_group {
                .el-button {
                    font-size: 12px;
                    width: 14%;
                }
            }
        }
    }
}
</style>
