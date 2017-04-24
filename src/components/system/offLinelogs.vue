<template>
    <div class="offlinelogs">
        <div class="offlinelogs-top-box">
            <div class="btn_group">
                <el-tooltip :content="contenttime" placement="top">
                    <el-button type="primary" class="timebtn">
                        <!-- <i class="el-icon--right"><img src="../../assets/img/system/topimg/calendar2.png"></i> -->
                        <el-date-picker v-model="datevalue" type="daterange" placeholder="选择时间范围" @change="datechange">
                        </el-date-picker>
                    </el-button>
                </el-tooltip>
                <el-tooltip :content="contentnode" placement="top">
                    <el-button type="primary" class="nodebtn">
                        <!--  <i class="el-icon--right"><img src="../../assets/img/system/topimg/node.png"></i> -->
                        <el-select v-model="nodevalue" placeholder="选择节点" @change="nodechange" clearable>
                            <el-option v-for="item in node" :key="item.key" :label="item.key" :value="item.key">
                            </el-option>
                        </el-select>
                    </el-button>
                </el-tooltip>
                <el-tooltip :content="contentservice" placement="top">
                    <el-button type="primary" class="servicebtn">
                        <!-- <i class="el-icon--right"><img src="../../assets/img/system/topimg/service2.png"></i> -->
                        <el-select v-model="namevalue" placeholder="选择服务" @change="namechange" clearable>
                            <el-option v-for="item in name" :key="item.key" :label="item.key" :value="item.key">
                            </el-option>
                        </el-select>
                    </el-button>
                </el-tooltip>
                <el-tooltip :content="contentlog" placement="top">
                    <el-button type="primary" class="logbtn">
                        <!--  <i class="el-icon--right"><img src="../../assets/img/system/topimg/calendar2.png"></i> -->
                        <el-select v-model="levelvalue" placeholder="选择日志级别" @change="levelchange" clearable>
                            <el-option v-for="item in level" :key="item.key" :label="item.key" :value="item.key">
                            </el-option>
                        </el-select>
                    </el-button>
                </el-tooltip>
                <el-button type="primary" class="downloadbtn">
                    <!-- <i class="el-icon--right downicon"></i> -->
                    导出
                </el-button>
                <el-button type="primary" class=" el-button-search">
                    <!--  <i class="el-icon--right"><img src="../../assets/img/system/topimg/searchimg.png"></i> -->
                    <input type="text" id="search" placeholder="输入关键字" @keypress.enter="presskey">
                </el-button>
                <!-- <div class="el-button el-button-search">
                    <i class="el-icon-plus el-icon--left"></i>新建
                </div> -->
            </div>
        </div>
        <div class="mainpage">
            <el-table :data="dataSource" :resizable="true" border style="width: 100%;" v-loading="loading" element-loading-text="数据加载中">
                <el-table-column label="服务名称" prop="name" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="服务类型" prop="type" width="110" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="日志级别" prop="level" width="110" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="时间" prop="@timestamp" width="250" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="节点" prop="node" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="线程" prop="threadname" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="代码" prop="code" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="日志信息" prop="msg" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handlePageChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getSelect,
    getoffLogs,
    gettableDate,
    searchoffLogs
} from '@/assets/js/queryData'
export default {
    components: {},
    data() {
        return {
            contenttime: '选择时间范围',
            contentnode: '选择节点',
            contentservice: '选择服务',
            contentlog: '选择日志级别',
            currentPage: 1,
            pageSize: 20,
            total: 0,
            loading: true,
            time: [],
            node: [],
            name: [],
            level: [],
            datevalue: '',
            nodevalue: '',
            namevalue: '',
            levelvalue: '',
            dataSource: [],
        };
    },
    mounted() {
        // 获取节点下拉框数据
        getSelect('node').then(res => {
            if (res.code === '200') {
                this.node = res.data;
            }
        });
        // 获取服务下拉框数据
        getSelect('name').then(res => {
            if (res.code === '200') {
                this.name = res.data;
            }
        });
        // 获取日志级别下拉框数据
        getSelect('level').then(res => {
            if (res.code === '200') {
                this.level = res.data;
            }
        });
        gettableDate({
            page: 1,
            size: 100
        }).then(res => {
            if (res.code === '200') {
                this.dataSource = res.data;
                this.total = parseInt(res.total);
                this.loading = false;
            }
        });
    },
    methods: {

        queryTabledata() {
            this.loading = true;
            let data = {};
            if (this.time.length < 2) {
                data = {
                    page: this.currentPage,
                    size: this.pageSize,
                    starttime: '',
                    endtime: '',
                    node: this.nodevalue,
                    name: this.namevalue,
                    level: this.levelvalue
                };
            } else {
                data = {
                    page: this.currentPage,
                    size: this.pageSize,
                    starttime: this.time[0],
                    endtime: this.time[1],
                    node: this.nodevalue,
                    name: this.namevalue,
                    level: this.levelvalue
                };
            }
            getoffLogs(data).then(res => {
                if (res.code === '200') {
                    // console.log(res);
                    this.dataSource = res.data;
                    this.total = parseInt(res.total);
                    this.loading = false;
                }
            });
        },
        datechange(val) {
            this.contenttime = val;
            this.time = val.split(' - ');
            this.queryTabledata();
        },
        nodechange(val) {
            this.contentnode = val;
            // console.log('node:', val);
            this.queryTabledata();
        },
        namechange(val) {
            this.contentservice = val;
            // console.log('name:', val);
            this.queryTabledata();
        },
        levelchange(val) {
            this.contentlog = val;
            // console.log('level:', val);
            this.queryTabledata();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        handlePageChange(val) {
            this.pageSize = val;
        },
        presskey(e) {
            // console.log(e.target.value);
            this.loading = true;
            let data = {};
            if (this.time.length < 2) {
                data = {
                    page: this.currentPage,
                    size: this.pageSize,
                    starttime: '',
                    endtime: '',
                    node: this.nodevalue,
                    name: this.namevalue,
                    level: this.levelvalue,
                    msg: e.target.value
                };
            } else {
                data = {
                    page: this.currentPage,
                    size: this.pageSize,
                    starttime: this.time[0],
                    endtime: this.time[1],
                    node: this.nodevalue,
                    name: this.namevalue,
                    level: this.levelvalue,
                    msg: e.target.value
                };
            }
            // 等数据请求回来后
            searchoffLogs(data).then(res => {
                this.dataSource = res.data;
                this.total = parseInt(res.total);
                this.loading = false;
            });
        },
    }
};
</script>
<style lang="scss" scoped>
.offlinelogs {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .mainpage {
        height: 100%;
        width: 100%;
        .el-table {
            height: calc(100% - 52px);
        }
        .pagination {
            margin-top: 10px;
            text-align: center;
        }
    }
}
</style>
<style lang="scss">
.offlinelogs {
    .offlinelogs-top-box {
        width: 100%;
        height: 8%;
        position: absolute;
        top: -8.3%;
        .btn_group {
            position: absolute;
            height: 80%;
            width: 90%;
            top: 10%;
            left: 7%;
            font-size: 16px;
            .el-button {
                border: 0;
                height: 100%;
                width: 11%;
                // width: 1.4rem;
                color: rgba(182, 239, 253, 0.9);
                overflow: hidden;
                margin-left: 4%;
                position: relative;
                top: -5%;
                padding: 0px;
                .el-date-editor {
                    width: 100%;
                    height: 100%;
                    .el-input__inner {
                        height: 100%;
                        border: 0;
                        padding-left: .15rem;
                    }
                    .el-input__icon {
                        color: #2BEDE6;
                    }
                    .el-cascader__label {
                        line-height: 0.5rem;
                        padding: 0 25px 0 0.15rem;
                    }
                }
                .el-select {
                    height: 100%;
                    width: 100%;
                    .el-input {
                        height: 100%;
                        .el-input__inner {
                            height: 100%;
                            border: 0;
                            padding-left: .35rem;
                        }
                    }
                    .el-input__icon {
                        color: #2BEDE6;
                    }
                }
                .el-cascader__label {
                    line-height: 0.5rem;
                    padding: 0 25px 0 0.5rem;
                }
                ::-webkit-input-placeholder {
                    /* WebKit browsers */
                    color: rgba(182, 239, 253, 0.9);
                }
                :-moz-placeholder {
                    /* Mozilla Firefox 4 to 18 */
                    color: rgba(182, 239, 253, 0.9);
                }
                ::-moz-placeholder {
                    /* Mozilla Firefox 19+ */
                    color: rgba(182, 239, 253, 0.9);
                }
                :-ms-input-placeholder {
                    /* Internet Explorer 10+ */
                    color: rgba(182, 239, 253, 0.9);
                }
            }
            .timebtn {
                background: url("../../assets/img/system/topimg/btn-bg.png") no-repeat;
                background-size: 100% 100%;
            }
            .timebtn:hover {
                background: url("../../assets/img/system/topimg/btn-bg-on.png") no-repeat;
                background-size: 100% 100%;
            }
            .nodebtn {
                background: url("../../assets/img/system/topimg/btn-bg-node.png") no-repeat;
                background-size: 100% 100%;
            }
            .nodebtn:hover {
                background: url("../../assets/img/system/topimg/btn-bg-on-node.png") no-repeat;
                background-size: 100% 100%;
            }
            .servicebtn {
                background: url("../../assets/img/system/topimg/btn-bg-service.png") no-repeat;
                background-size: 100% 100%;
            }
            .servicebtn:hover {
                background: url("../../assets/img/system/topimg/btn-bg-on-service.png") no-repeat;
                background-size: 100% 100%;
            }
            .logbtn {
                background: url("../../assets/img/system/topimg/btn-bg-log.png") no-repeat;
                background-size: 100% 100%;
            }
            .logbtn:hover {
                background: url("../../assets/img/system/topimg/btn-bg-on-log.png") no-repeat;
                background-size: 100% 100%;
            }
            .downloadbtn {
                background: url("../../assets/img/system/topimg/btn-bg-download.png") no-repeat;
                background-size: 100% 100%;
            }
            .downloadbtn:hover {
                background: url("../../assets/img/system/topimg/btn-bg-on-download.png") no-repeat;
                background-size: 100% 100%;
            }
            .el-button-search {
                background: url("../../assets/img/system/topimg/searchnew.png") no-repeat;
                background-size: 100% 100%;
                line-height: 16px;
                input {
                    width: 100%;
                    height: 100%;
                    background-color: rgba(182, 239, 253, 0);
                    border: 0;
                    outline: none;
                    color: rgba(36, 202, 243, 1);
                    padding-left: .4rem;
                }
            }
            .el-button-search:hover {
                background: url("../../assets/img/system/topimg/searchnew.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}

@media screen and (max-width: 1366px) {
    .offlinelogs {
        .offlinelogs-top-box {
            .btn_group {
                width: 96%;
                left: 1%;
                .el-button {
                    font-size: 12px;
                    margin-left: 2%;
                    width: 13%;
                    background-size: 100% 100%;
                    top: -1%;
                    //   zoom: 0.7;
                }
            }
        }
    }
}
</style>
