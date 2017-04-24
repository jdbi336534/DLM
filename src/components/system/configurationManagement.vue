<template>
    <div class="configManagment">
        <!--  配置管理主页  -->
        <div class="configManagment-top-box">
            <div class="btn_group">
                <el-button type="primary" @click="newconfigbtn"><i class="el-icon-plus el-icon--left"></i>新建</el-button>
                <el-button type="primary" class=" el-button-search">
                    <i class="el-icon--right"><img src="../../assets/img/system/topimg/searchimg.png"></i>
                    <input type="text" id="search" placeholder="" @keypress="presskey">
                </el-button>
            </div>
        </div>
        <div class="mainpage">
            <el-table :data="datalistz" :resizable="true" border style="width: 100%;" :loading="false" element-loading-text="拼命加载中">
                <el-table-column label="组（groupID）" prop="group" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="工程名称（artifactId）" prop="artifact" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="版本" prop="version" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" style="color: #20A0FF;" @click="Lookconfig">查看配置</el-button>
                        <el-button type="text" size="small" style="color: #20A0FF;" @click="Lookrely">查看依赖</el-button>
                        <el-button type="text" size="small" style="margin-left:10px;color: #FF4949;">删除数据</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--  配置管理主页  -->
        <!-- 查看/添加配置弹框 -->
        <modal-box :visible="ModalVisable" :titlename="titlename" @click-close="closeModal">
            <div slot="jdb" class="modalConfig">
                <el-scrollbar wrap-class="jdb__wrap" view-class="jdb__list" show="true">
                    <div class="project">
                        <p>Projects:
                            <el-tag type="warning">io.github.xdiamond</el-tag>/
                            <el-tag type="warning">io.github.xdiamond</el-tag>/
                            <el-tag type="warning">io.github.xdiamond</el-tag> Profiles:
                            <el-tag type="warning">base</el-tag>
                        </p>
                    </div>
                    <div class="addconfig">
                        <p style="text-align:left">
                            <color-button btnname="添加配置" @click="btnclick"></color-button>
                        </p>
                        <div v-if="configshow" class="configForm">
                            <el-form :model="ruleForm" ref="confForm" label-width="100px" label-position="left">
                                <el-form-item label="fonfly key" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="config value" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="description" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item class="commitbtn" label="备注校验规则">
                                    <color-button btnname="提交" type="success" @click="submitForm('confForm')"></color-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="batchadd">
                        <p style="text-align:left">
                            <color-button btnname="批量添加配置" @click="batchaddclick"></color-button>
                            <i class="question"></i>
                        </p>
                        <div v-if="batchconfigshow" class="batchconfigForm">
                            <p>例子配置（可以点击 "已复制到另一个profile的格式查看" 按钮得到JSON字符串）</p>
                            <el-form :model="ruleForm" ref="confForm" label-width="100px" label-position="left">
                                <el-form-item prop="name" class="textarea">
                                    <el-input type="textarea" :rows="12" v-model="textarea">
                                    </el-input>
                                </el-form-item>
                                <p>config array(json array):<span style="color:red;">格式错误！</span></p>
                                <el-form-item prop="name" class="inputmargin">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item class="commitbtn">
                                    <color-button btnname="提交" type="success" @click="submitForm('confForm')"></color-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="lookup">
                        <el-radio-group v-model="radio" @change="lookuptype">
                            <el-radio-button label="1">以Properties格式查看</el-radio-button>
                            <el-radio-button label="2">以json格式查看</el-radio-button>
                        </el-radio-group>
                        <el-input placeholder="请输入您的关键字" v-model="search" style="margin-top:20px;">
                            <template slot="prepend"><i class="imputpre"></i></template>
                        </el-input>
                        <color-button style="margin-top:20px;" btnname="+ 修改 / 详情显示Key / Value" type="warning"></color-button>
                        <div class="radio">
                            <el-radio class="radio" v-model="radios" label="1">只显示当前项目的配置</el-radio>
                            <el-radio class="radio" v-model="radios" label="2">只显示从其他项目继承过来的配置</el-radio>
                        </div>
                        <el-table v-if="showtable" :data="tableData" style="width: 100%" class="lookuptable">
                            <el-table-column prop="date" label="key" width="180" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="name" label="value" width="180" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="address" label="配置的来源" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-scrollbar>
            </div>
        </modal-box>
        <!-- 查看/添加配置弹框 -->
        <!-- 查看依赖弹框 -->
        <modal-box :visible="lookupModalVisable" titlename="查看依赖" @click-close="lookupcloseModal">
            <div slot="jdb" class="dependon">
                <el-scrollbar wrap-class="jdb__wrap" view-class="jdb__list" show="true">
                    <div class="project">
                        <p>Projects:
                            <el-tag type="warning">io.github.xdiamond</el-tag>/
                            <el-tag type="warning">io.github.xdiamond</el-tag>/
                            <el-tag type="warning">io.github.xdiamond</el-tag> Profiles:
                            <el-tag type="warning">base</el-tag>
                        </p>
                    </div>
                    <div class="addconfig">
                        <p style="text-align:left">
                            <color-button btnname="添加配置" @click="depend_btnclick"></color-button>
                        </p>
                        <div v-if="depend_configshow" class="depend_configForm">
                            <el-form :model="ruleForm" ref="confForm" label-width="100px" label-position="left">
                                <el-form-item label="组" prop="name">
                                    <el-select v-model="value" placeholder="" style="width:500px;">
                                        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="工程名（ID）" prop="name">
                                    <el-select v-model="value" placeholder="" style="width:500px;">
                                        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="版本" prop="name">
                                    <el-select v-model="value" placeholder="" style="width:500px;">
                                        <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="commitbtn" label="备注校验规则">
                                    <color-button btnname="提交" type="success" @click="submitForm('confForm')"></color-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="serach">
                        <span>已有依赖</span>
                        <el-input placeholder="请输入您的关键字" v-model="depend_search" style="margin-top:20px;">
                            <template slot="prepend"><i class="imputpre"></i></template>
                        </el-input>
                    </div>
                    <div class="table">
                        <el-table :data="tableData" style="width: 100%" class="lookuptable">
                            <el-table-column prop="date" label="组" width="180" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="name" label="工程名（ID）" width="180" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="name" label="版本" width="180" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="address" label="描述" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="name" label="操作" width="180">
                                <template scope="scope">
                                    <el-button type="text" size="small" style="color: #20A0FF;">查看依赖</el-button>
                                    <el-button type="text" size="small" style="margin-left:10px;color: #FF4949;">删除数据</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-scrollbar>
            </div>
        </modal-box>
        <!-- 查看依赖弹框 -->
        <!-- 新建配置 -->
        <modal-box :visible="newModalVisable" titlename="Add Preject" :dispconfirm="true" @click-close="newcloseModal" btnname="提交" @click-ok="submit('newpro')">
            <div slot="jdb" class="dependon">
                <div class="addconfig">
                    <div class="configForm">
                        <el-form :model="newruleForm" ref="newpro" label-width="100px" label-position="left">
                            <el-form-item label="groupld" prop="name">
                                <el-input v-model="newruleForm.group"></el-input>
                            </el-form-item>
                            <el-form-item label="artifactid" prop="name">
                                <el-input v-model="newruleForm.artifact"></el-input>
                            </el-form-item>
                            <el-form-item label="version" prop="name">
                                <el-input v-model="newruleForm.version"></el-input>
                            </el-form-item>
                            <el-form-item label="description" prop="name">
                                <el-input v-model="newruleForm.description"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </modal-box>
        <!-- 新建配置 -->
    </div>
</template>
<script>
import modalBox from '../common/ModalBox';
import colorButton from '../common/ColorButton';
export default {
    components: {
        modalBox,
        colorButton
    },
    data() {
        return {
            newruleForm: {
                artifact: null,
                description: '',
                version: '',
                group: '',
            },
            newModalVisable: false,
            ModalVisable: false,
            lookupModalVisable: false,
            titlename: '查看/添加配置',
            configshow: false,
            depend_configshow: false,
            batchconfigshow: false,
            showtable: true,
            showjson: false,
            search: '',
            depend_search: '',
            total: 0,
            pageSize: 20,
            currentPage: 1,
            ruleForm: {
                name: ''
            },
            textarea: [{
                key: 'key1',
                value: 'value1',
                description: 'description1'
            }, {
                key: 'key2',
                value: 'value2',
                description: 'description2'
            }],
            radio: '1',
            radios: '',
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
            }],
            datalistz: [{
                group: 'com.r7data',
                artifact: 'service-eureka',
                version: '0.0.1',
                description: '',
            }],
            options: [{
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
            value: ''
        };
    },
    methods: {
        // 关闭弹窗事件
        newcloseModal() {
            this.newModalVisable = false;
            this.newruleForm = {
                artifact: null,
                description: '',
                version: '',
                group: '',
            };
        },
        closeModal() {
            this.ModalVisable = false;
        },
        lookupcloseModal() {
            this.lookupModalVisable = false;
        },
        // 点击添加配置按钮
        btnclick() {
            this.configshow = !this.configshow;
        },
        // 点击批量添加按钮
        batchaddclick() {
            this.batchconfigshow = !this.batchconfigshow;
        },
        // 以什么格式去查看
        lookuptype(val) {
            // console.log(val);
            if (val === '1') {
                this.showjson = false;
                this.showtable = true;
            } else {
                this.showtable = false;
                this.showjson = true;
            }
        },
        // 查看/修改配置
        Lookconfig() {
            this.ModalVisable = true;
        },
        // 查看依赖
        Lookrely() {
            this.lookupModalVisable = true;
        },
        // 点击新建
        newconfigbtn() {
            this.newModalVisable = true;
        },
        // 点击新建提交
        submit() {
            this.newModalVisable = false;
            this.datalistz.push(this.newruleForm);
            this.newruleForm = {
                artifact: null,
                description: '',
                version: '',
                group: '',
            };
        },
        // 搜索
        presskey() {},
        // 查看依赖-》添加配置按钮
        depend_btnclick() {
            this.depend_configshow = !this.depend_configshow;
        },
        // 点击分页的按钮
        handleCurrentChange(val) {

        }
    },
    mounted() {
        this.textarea = JSON.stringify(this.textarea, null, 4);
    }
};
</script>
<style lang="scss">
.configManagment {
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
    .modalConfig {
        padding: 0 25px;
        .jdb__list {
            height: 508px;
            width: 924px;
        }
        .el-scrollbar__thumb {
            // 更改elscroll_bar的颜色
            background-color: #1fa9cf;
        }
        .project {}
        .addconfig {
            margin-top: 20px;
            .configForm {
                width: 100%;
                .el-form-item {
                    label {
                        font-size: 12px;
                        color: #24CAF3;
                        letter-spacing: 1.71px;
                    }
                    .el-input__inner {
                        border-radius: 0;
                        border: none;
                        border-bottom: 1px solid rgba(98, 208, 248, 0.2);
                    }
                }
                .commitbtn {
                    .el-form-item__content {
                        margin-left: 0!important;
                    }
                }
            }
        }
        .batchadd {
            margin-top: 20px;
            .commitbtn {
                .el-form-item__content {
                    margin-left: 0!important;
                }
            }
            .inputmargin {
                .el-form-item__content {
                    margin-left: 0!important;
                    .el-input__inner {
                        border-radius: 0px;
                        border-color: rgba(98, 208, 248, 0.2);
                    }
                    .el-input__inner:focus {
                        border-color: rgba(98, 208, 248, 0.2);
                    }
                }
            }
            .textarea {
                .el-form-item__content {
                    margin-left: 0!important;
                    .el-textarea__inner {
                        background-color: transparent;
                        border: 1px solid rgba(98, 208, 248, 0.2);
                        border-radius: 0px;
                        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                    }
                }
            }
            .question {
                height: 13px;
                width: 13px;
                margin-left: 5px;
                display: inline-block;
                vertical-align: middle;
                background: url(../../assets/img/system/question.png) no-repeat;
            }
        }
        .lookup {
            ::-webkit-input-placeholder {
                /* WebKit browsers */
                color: #1b90b4;
            }
            :-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #1b90b4;
            }
            ::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #1b90b4;
            }
            :-ms-input-placeholder {
                /* Internet Explorer 10+ */
                color: #1b90b4;
            }
            .el-radio-button {
                .el-radio-button__inner {
                    color: #10AD57;
                    border-radius: 0;
                    background: transparent;
                    font-size: 12px;
                    line-height: 2px;
                    padding: 10px 8px;
                    border: 1px solid rgba(18, 206, 102, 0.30);
                    box-shadow: inset 0 0 5px 0 rgba(18, 206, 102, 0.5)!important;
                }
            }
            .el-radio-button:last-child {
                margin-left: 14px;
            }
            .is-active .el-radio-button__inner {
                border-color: rgba(18, 206, 102, 0.7);
            }
            .lookuptable.el-table {
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
            }
            .imputpre {
                height: 34px;
                width: 34px;
                display: inline-block;
                vertical-align: middle;
                background: url(../../assets/img/system/search.png) no-repeat;
            }
            .el-input-group__append,
            .el-input-group__prepend {
                padding: 0 3px;
                background-color: transparent;
                border-radius: 0;
                border-right: 0;
            }
            .el-input-group--prepend .el-input__inner {
                border-radius: 0;
                border-left: 0;
            }
            .el-input__inner:focus {
                border-color: #075174;
            }
            .radio {
                margin-top: 20px;
                .el-radio {
                    display: block;
                }
                .el-radio__label {
                    font-size: 12px;
                    color: #24CAF3;
                }
                .el-radio + .el-radio {
                    margin-left: 0px;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    display: block;
                }
                .el-radio__inner {
                    border-radius: 0;
                    background-color: transparent;
                }
                .el-radio__inner::after {
                    border-radius: 0;
                    background-color: #24caf3;
                }
            }
        }
    }
    .dependon {
        padding: 0 25px;
        .jdb__list {
            height: 508px;
            width: 924px;
        }
        .el-scrollbar__thumb {
            // 更改elscroll_bar的颜色
            background-color: #1fa9cf;
        }
        .addconfig {
            .el-form-item {
                label {
                    font-size: 12px;
                    color: #24CAF3;
                    letter-spacing: 1.71px;
                }
                .el-input__inner {
                    border-radius: 0;
                    border: none;
                    border-bottom: 1px solid rgba(98, 208, 248, 0.2);
                }
                .el-select .el-input {
                    width: 500px;
                    .el-input__icon {
                        color: rgb(36, 202, 243);
                    }
                }
            }
        }
        .serach {
            ::-webkit-input-placeholder {
                /* WebKit browsers */
                color: #1b90b4;
            }
            :-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #1b90b4;
            }
            ::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #1b90b4;
            }
            :-ms-input-placeholder {
                /* Internet Explorer 10+ */
                color: #1b90b4;
            }
            .imputpre {
                height: 34px;
                width: 34px;
                display: inline-block;
                vertical-align: middle;
                background: url(../../assets/img/system/search.png) no-repeat;
            }
            .el-input-group__append,
            .el-input-group__prepend {
                padding: 0 3px;
                background-color: transparent;
                border-radius: 0;
                border-right: 0;
            }
            .el-input-group--prepend .el-input__inner {
                border-radius: 0;
                border-left: 0;
            }
            .el-input__inner:focus {
                border-color: #075174;
            }
            .el-input-group {
                width: 740px;
                margin-left: 100px;
            }
        }
        .table {
            margin-top: 20px;
            .el-table {
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
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.configManagment {
    .configManagment-top-box {
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
                background: url("../../assets/img/system/topimg/btn-bg.png") no-repeat;
                background-size: 100% 100%;
                height: 100%;
                width: 11%;
                // width: 1.4rem;
                color: rgba(182, 239, 253, 0.9);
                overflow: hidden;
                margin-left: 4%;
                position: relative;
                top: -5%;
                padding: 5px;
                .el-icon--right {
                    position: relative;
                    top: 5px;
                }
            }
            .el-button-search {
                background: url("../../assets/img/system/topimg/search3.png") no-repeat;
                background-size: 100% 100%;
                line-height: 16px;
                float: right;
                margin-right: 10%;
                input {
                    width: 70%;
                    height: 100%;
                    background-color: rgba(182, 239, 253, 0);
                    border: 0;
                    outline: none;
                    color: rgba(36, 202, 243, 1);
                }
            }
            .el-button:hover {
                background: url("../../assets/img/system/topimg/btn-bg-on.png") no-repeat;
                background-size: 100% 100%;
            }
            .el-button-search:hover {
                background: url("../../assets/img/system/topimg/search3.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}

@media screen and (max-width: 1366px) {
    .serviceManager-top-box {
        .btn_group {
            .el-button {
                font-size: 12px;
            }
        }
    }
}
</style>
