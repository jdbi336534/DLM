<template>
    <div class="dcp">
        <div class="dcp_top">
            <div class="dcp_logo"></div>
            <div class="dcp_info">
                <div class="dcp_user"><img src="../assets/img/dcp/proud.png" alt=""><span id="dcp_user">{{username}}</span></div>
                <div class="dcp_ring"><img src="../assets/img/dcp/msg.png" alt=""></div>
                <div class="dcp_off" @click="onQuit"></div>
            </div>
        </div>
        <div class="menu">
            <div class="menu_box">
                <el-menu class="left-menu" :defaultActive="defaultActive" :unique-opened="true" :router="true" @select="handleSelectMenu">
                    <el-submenu index="8">
                        <template slot="title"><i class="icons s8"></i>系统平台管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="/dcp/system/node">节点</el-menu-item>
                            <el-menu-item index="/dcp/system/serviceManager">服务管理</el-menu-item>
                            <el-menu-item index="/dcp/system/virtualNode">虚拟节点</el-menu-item>
                            <el-menu-item index="/dcp/system/serviceDiscovery">服务发现</el-menu-item>
                            <el-menu-item index="/dcp/system/configurationManagement">配置管理</el-menu-item>
                            <el-menu-item index="/dcp/system/logsManagement">日志管理</el-menu-item>
                            <el-menu-item index="/dcp/system/security">安全</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="scss">
@media screen and (max-width: 768px) {}

@media screen and (min-width: 768px) and (max-width: 992px) {}

@media screen and (min-width: 992px) and (max-width: 1200px) {}

@media screen and (min-width: 1200px) {}

.dcp {
    width: 100%;
    height: 100%;
    min-height: 600px;
    min-width: 768px;
    position: relative;
    background: url(../assets/img/dcp/bg.png) #0d152f;
    background-size: 100% 100%;
    color: #24caf3;
    .dcp_top {
        height: 7%;
        min-width: 768px;
        position: relative;
        .dcp_logo {
            position: absolute;
            left: 4%;
            bottom: -50%;
            width: 15%;
            height: 100%;
            background: url(../assets/img/dcp/logo.png) no-repeat center center;
            background-size: 100% auto;
        }
        .dcp_info {
            position: absolute;
            right: 6%;
            bottom: 50%;
            margin-bottom: -30px;
            width: 250px;
            height: 50px;
            .dcp_user {
                width: 150px;
                height: 50px;
                float: left;
                text-align: left;
                img {
                    vertical-align: middle;
                    margin-top: -2px;
                }
            }
            #dcp_user {
                line-height: 50px;
            }
            .dcp_ring {
                height: 50px;
                width: 50px;
                text-align: center;
                line-height: 50px;
                float: left;
                cursor: pointer;
            }
            .dcp_off {
                height: 50px;
                width: 50px;
                text-align: center;
                line-height: 50px;
                float: left;
                cursor: pointer;
                background: url(../assets/img/dcp/quit.png) no-repeat;
                &:hover {
                    background: url(../assets/img/dcp/exitselect.png) no-repeat;
                }
            }
        }
    }
    .menu {
        height: 82.5%;
        width: 260px;
        position: absolute;
        top: 14%;
        left: 2.5%;
        background: url(../assets/img/dcp/bg-menu.png) rgba(0, 225, 0, 0);
        background-size: 100% 100%;
        .menu_box {
            width: 240px;
            margin-top: 11px;
            margin-left: 12px;
            height: calc(100% - 35px);
            overflow: auto;
            .left-menu {
                background: none;
                margin-top: 20px;
                .el-submenu {
                    .el-submenu__title {
                        font-size: 18px;
                        height: 74px;
                        line-height: 74px;
                        color: #24caf3;
                        text-indent: 20px;
                        text-align: left;
                        .icons {
                            height: 30px;
                            width: 32px;
                            margin-right: 10px;
                            display: inline-block;
                            vertical-align: middle;
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                            &.s1 {
                                background-image: url(../assets/img/dcp/menu/1.png);
                                &.on {
                                    background-image: url(../assets/img/dcp/menu/1-on.png);
                                }
                            }
                            &.s2 {
                                background-image: url(../assets/img/dcp/menu/2.png);
                                &.on {
                                    background-image: url(../assets/img/dcp/menu/2-on.png);
                                }
                            }
                            &.s3 {
                                background-image: url(../assets/img/dcp/menu/3.png);
                                &.on {
                                    background-image: url(../assets/img/dcp/menu/3-on.png);
                                }
                            }
                            &.s4 {
                                background-image: url(../assets/img/dcp/menu/4.png);
                                &.on {
                                    background-image: url(../assets/img/dcp/menu/4-on.png);
                                }
                            }
                            &.s5 {
                                background-image: url(../assets/img/dcp/menu/5.png);
                                &.on {
                                    background-image: url(../assets/img/dcp/menu/5-on.png);
                                }
                            }
                            &.s6 {
                                background-image: url(../assets/img/dcp/menu/6.png);
                                &.on {
                                    background-image: url(../assets/img/dcp/menu/6-on.png);
                                }
                            }
                            &.s7 {
                                background-image: url(../assets/img/dcp/menu/7.png);
                                &.on {
                                    background-image: url(../assets/img/dcp/menu/7-on.png);
                                }
                            }
                            &.s8 {
                                background-image: url(../assets/img/dcp/menu/8.png);
                                &.on {
                                    background-image: url(../assets/img/dcp/menu/8-on.png);
                                }
                            }
                        }
                        .el-submenu__icon-arrow {
                            top: 40%;
                            display: none;
                        }
                        &:hover {
                            background: none;
                            box-shadow: inset 0 0 17px 0 rgba(73, 210, 247, 0.26);
                        }
                    }
                    .el-menu {
                        background: none;
                        .el-menu-item {
                            text-indent: 40px;
                            color: #24caf3;
                            font-size: 16px;
                            text-align: left;
                            &.is-active {
                                color: inherit;
                                box-shadow: inset 0 0 17px 0 rgba(73, 210, 247, 0.26);
                            }
                            &:hover {
                                box-shadow: inset 0 0 17px 0 rgba(73, 210, 247, 0.26);
                                background: none;
                            }
                        }
                    }
                }
            }
        }
    }
    .main {
        position: absolute;
        height: 82.5%;
        width: calc(94.5% - 260px);
        top: 14%;
        left: calc(2.5% + 265px);
        box-sizing: border-box;
        border: 1px solid #197192;
        background: #0D152F;
    }
}
</style>
<script>
import {
    getUserId
} from '../assets/js/mUtils'
export default {
    data() {
            return {
                defaultActive: '/dcp/data/apply',
                state: '2',
                username: '',
            }
        },
        methods: {
            handleSelectMenu(path) {
                this.$router.push({
                    path: path
                })
                var $find1 = $('.menu_box').find('.el-submenu__title')
                var $find2 = $('.menu_box').find('.is-opened').find('.el-submenu__title')

                $find1.css('color', '#24caf3')
                $find1.find('.icons').removeClass('on')
                $find2.css('color', '#E6A571')
                $find2.find('.icons').addClass('on')
            },
            onQuit() {
                window.sessionStorage.removeItem('userInfo');
                this.$router.push({
                    path: '/login'
                })
            },
        },
        mounted() {
            this.defaultActive = this.$route.path;
            setTimeout(() => {
                this.handleSelectMenu(this.$route.path);
            }, 100);
        },
        created() {
            // 写入sessionStorage
            window.sessionStorage.setItem('userInfo', '{"departmentName":"进近管制室","describeText":null,"organizationName":"湖北省发改委","roleId":2,"departmentId":2,"userName":"wangrx","addDate":1490751822170,"realName":"王瑞祥","password":"wangrx","phoneNumber":"13876589981","organization":63,"delState":"F","roleName":"普通用户","id":112,"email":"13876589981@whga.gov.cn"}');
            if (!getUserId()) {
                this.$router.push({
                    path: '/login'
                })
                return;
            }
            this.username = JSON.parse(sessionStorage.userInfo).realName;
            this.defaultActive = this.$route.fullPath;
            this.state = JSON.parse(sessionStorage.userInfo).roleId;
        },
}
</script>
