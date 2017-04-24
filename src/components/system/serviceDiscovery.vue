<template>
    <div class="service">
        <div class="mainpage">
            <el-table :data="servicediscoverylist" :resizable="true" border style="width: 100%;" :loading="false" element-loading-text="拼命加载中">
                <el-table-column label="名称" width="200" show-overflow-tooltip>
                    <template scope="scope">
                        <i style="background: #25CD6B;border-radius:50%;height:7px;width:7px;display:inline-block;vertical-align:middle;"></i>
                        <span style="margin-left: 10px"><router-link :to="{path:'/dcp/system/servicedetails/'+scope.row.metadata.name}">{{scope.row.metadata.name}}</router-link></span>
                    </template>
                </el-table-column>
                <el-table-column label="标签" width="500" show-overflow-tooltip>
                    <template scope="scope">
                        {{ scope.row.metadata.labelstring }}
                    </template>
                </el-table-column>
                <el-table-column label="集群IP" show-overflow-tooltip>
                    <template scope="scope">
                        {{ scope.row.spec.clusterIP}}
                    </template>
                </el-table-column>
                <el-table-column label="内部端点" prop="inner" show-overflow-tooltip>
                    <!-- {{ scope.row.metadata.name}}:{{ scope.row.spec.ports.port}}{{scope.row.spec.ports.protocol}} -->
                    <template scope="scope">
                        {{`${scope.row.metadata.name}:${scope.row.spec.ports[0].port}${scope.row.spec.ports[0].protocol}`}}
                    </template>
                </el-table-column>
                <el-table-column label="外部端点" prop="outer" show-overflow-tooltip>
                    <template scope="scope">
                        {{`${scope.row.metadata.name}:${scope.row.spec.ports[0].port}${scope.row.spec.ports[0].protocol}`}}
                    </template>
                </el-table-column>
            </el-table>
            <!--  <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
import {
    servicesDiscovery,
} from '../../assets/js/queryData';
export default {
    components: {},
    data() {
        return {
            currentPage: 1,
            pageSize: 20,
            total: 0,
            servicediscoverylist: null,
        };
    },
    methods: {
        getservicesDiscovery() {
            servicesDiscovery().then(res => {
                console.log('getServices', res)
                this.servicediscoverylist = res.items;
                for (var j = 0; j < this.servicediscoverylist.length; j++) {
                    var arr = [];
                    for (let i in this.servicediscoverylist[j].metadata.labels) {
                        var str = i + ':' + this.servicediscoverylist[j].metadata.labels[i];
                        arr.push(str);
                    }
                    var labelstring = arr.join('; ');
                    this.servicediscoverylist[j].metadata.labelstring = labelstring;
                }
                console.log('this.servicediscoverylist', this.servicediscoverylist)
            })
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
    },
    mounted() {
        this.getservicesDiscovery();
    }
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
.service {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .mainpage {
        height: 100%;
        width: 100%;
        .el-table {
            height: 100%;
            td>div a {
                color: rgba(36, 202, 243, 1);
                text-decoration: none;
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
