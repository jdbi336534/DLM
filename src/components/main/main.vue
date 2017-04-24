<template>
    <div class="main-bg">
        <div class="main-bg1">
            <div class="corner top-left">
                <img src="../../assets/img/main/lT22.png" alt="">
            </div>
            <div class="corner top-right">
                <img src="../../assets/img/main/map.png" alt="">
            </div>
            <div class="corner bottom-left">
                <div class="rows">
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="col c1"></div>
                    <div class="col c2"></div>
                </div>
                <div class="pop p1"></div>
                <div class="pop p2"></div>
                <div class="pop p3"></div>
            </div>
            <div class="corner bottom-right">
                <img src="../../assets/img/main/rB22.png" alt="">
            </div>
        </div>
        <div class="main-box">
            <div class="center a"></div>
            <div class="center b"></div>
            <div class="main-title"></div>
            <div class="cell c1" @click="routeTo('/dcp/data')">
                <div class="text"><img src="../../assets/img/main/9.png" alt=""></div>
                <div class="part t1"></div>
                <div class="part t2"></div>
                <div class="part t3"></div>
                <div class="part t4"></div>
                <div class="part t5"></div>
                <div class="part t6"></div>
            </div>
            <div class="cell c2" @click="routeTo('/dcp/resource')">
                <div class="text"><img src="../../assets/img/main/5.png" alt=""></div>
                <div class="part t1"></div>
                <div class="part t2"></div>
                <div class="part t3"></div>
                <div class="part t4"></div>
                <div class="part t5"></div>
                <div class="part t6"></div>
            </div>
            <div class="cell c3" @click="routeTo('/dcp/theme')">
                <div class="text"><img src="../../assets/img/main/3.png" alt=""></div>
                <div class="part t1"></div>
                <div class="part t2"></div>
                <div class="part t3"></div>
                <div class="part t4"></div>
                <div class="part t5"></div>
                <div class="part t6"></div>
            </div>
            <div class="cell c4" @click="routeTo('/dcp/serve/apply')">
                <div class="text"><img src="../../assets/img/main/1.png" alt=""></div>
                <div class="part t1"></div>
                <div class="part t2"></div>
                <div class="part t3"></div>
                <div class="part t4"></div>
                <div class="part t5"></div>
                <div class="part t6"></div>
            </div>
            <div class="cell c5" @click="routeTo('/dcp/monitor')">
                <div class="text"><img src="../../assets/img/main/8.png" alt=""></div>
                <div class="part t1"></div>
                <div class="part t2"></div>
                <div class="part t3"></div>
                <div class="part t4"></div>
                <div class="part t5"></div>
                <div class="part t6"></div>
            </div>
            <div class="cell c6" @click="routeTo('/dcp/system')">
                <div class="text"><img src="../../assets/img/main/6.png" alt=""></div>
                <div class="part t1"></div>
                <div class="part t2"></div>
                <div class="part t3"></div>
                <div class="part t4"></div>
                <div class="part t5"></div>
                <div class="part t6"></div>
            </div>
            <div class="cell c7" @click="routeTo('/dcp/interation')">
                <div class="text"><img src="../../assets/img/main/7.png" alt=""></div>
                <div class="part t1"></div>
                <div class="part t2"></div>
                <div class="part t3"></div>
                <div class="part t4"></div>
                <div class="part t5"></div>
                <div class="part t6"></div>
            </div>
            <div class="cell c8" @click="routeTo('/dcp/system')">
                <div class="text"><img src="../../assets/img/main/4.png" alt=""></div>
                <div class="part t1"></div>
                <div class="part t2"></div>
                <div class="part t3"></div>
                <div class="part t4"></div>
                <div class="part t5"></div>
                <div class="part t6"></div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@keyframes myfirst {
    0% {
        transform: rotate(0);
    }
    50% {
        transform: rotate(-180deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}

@keyframes zhuA {
    0% {
        top: 60%;
    }
    50% {
        top: 13%;
    }
    100% {
        top: 60%;
    }
}

@keyframes zhuB {
    0% {
        top: 13%;
    }
    50% {
        top: 80%;
    }
    100% {
        top: 13%;
    }
}

@keyframes zhuC {
    0% {
        top: 0;
    }
    50% {
        top: 40%;
    }
    100% {
        top: 0;
    }
}

.main-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: url(../../assets/img/login/dot.jpg) #0D152F;
    color: #05BDE6;
    .main-bg1 {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 19.2rem;
        height: 9.5rem;
        z-index: 12;
        margin-top: -4.75rem;
        margin-left: -9.6rem;
        background: url(../../assets/img/main/main-bg1.png) no-repeat center center;
        background-size: 98% 100%;
        .corner {
            width: 3.2rem;
            height: 1.7rem;
            position: absolute;
            &.top-left {
                top: 0.8rem;
                left: 0.4rem;
                text-align: left;
                text-indent: 0.3rem;
                img {
                    width: 1.84rem;
                }
            }
            &.top-right {
                top: 0.8rem;
                right: 0.4rem;
                img {
                    width: 100%;
                }
            }
            &.bottom-left {
                width: 1.5rem;
                height: 1.5rem;
                left: 0.8rem;
                bottom: 0.8rem;
                text-align: left;
                text-indent: 0.3rem;
                background: #005162;
                overflow: hidden;
                .rows {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 99;
                    .row {
                        height: 7.7%;
                        margin-top: 7.7%;
                        background: #0E152F;
                    }
                    .col {
                        height: 100%;
                        width: 10%;
                        position: absolute;
                        top: 0;
                        background-color: #0E152F;
                        &.c1 {
                            left: 26.667%;
                        }
                        &.c2 {
                            left: 63.333%;
                        }
                    }
                }
                .pop {
                    height: 100%;
                    width: 26.667%;
                    position: absolute;
                    background-color: #04CBF5;
                    z-index: 98;
                    &.p1 {
                        left: 0;
                        top: 30%;
                        animation: zhuA 2s infinite;
                    }
                    &.p2 {
                        left: 36.667%;
                        top: 60%;
                        animation: zhuB 2s infinite;
                    }
                    &.p3 {
                        left: 73.333%;
                        top: 90%;
                        animation: zhuC 3s infinite;
                    }
                }
            }
            &.bottom-right {
                right: 0.4rem;
                bottom: 0.8rem;
            }
        }
    }
    .main-box {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 12.3rem;
        height: 6.7rem;
        z-index: 13;
        margin-top: -3.35rem;
        margin-left: -6.15rem;
        background: url(../../assets/img/main/main-box.png) no-repeat center center;
        background-size: 100% auto;
        .main-title {
            position: absolute;
            width: 4.52rem;
            height: 0.34rem;
            top: -0.5rem;
            left: 3.89rem;
            background: url(../../assets/img/main/title.png) no-repeat center center;
            background-size: 100% auto;
        }
        .center {
            width: 2.4rem;
            height: 2.4rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -1.2rem;
            margin-top: -1.2rem;
            &.a {
                background: url(../../assets/img/main/xuanzhuan.png) no-repeat center center;
                background-size: 100%;
                animation: myfirst 5s linear infinite;
            }
            &.b {
                background: url(../../assets/img/main/cty.png) no-repeat center center;
                background-size: 1.72rem 0.83rem;
            }
        }
        .cell {
            width: 1.1rem;
            height: 1.92rem;
            position: absolute;
            z-index: 200;
            cursor: pointer;
            .text {
                position: absolute;
                top: 0.6rem;
                left: -0.3rem;
                height: 0.3rem;
                width: 1.7rem;
                line-height: 0.8rem;
                text-align: center;
                z-index: 300;
                font-size: 0.25rem;
                img {
                    height: 100%;
                }
            }
            &:hover .part {
                background-color: rgba(0, 0, 0, .1);
            }
            &.c1 {
                top: 0.4rem;
                left: 2.32rem;
            }
            &.c2 {
                top: 1.4rem;
                left: 0.64rem;
            }
            &.c3 {
                top: 3.37rem;
                left: 0.64rem;
            }
            &.c4 {
                top: 4.35rem;
                left: 2.33rem;
            }
            &.c5 {
                top: 4.35rem;
                left: 8.88rem;
            }
            &.c6 {
                top: 3.37rem;
                left: 10.58rem;
            }
            &.c7 {
                top: 1.4rem;
                left: 10.58rem;
            }
            &.c8 {
                top: 0.4rem;
                left: 8.872rem;
            }
            .part {
                width: 1.1rem;
                height: 1.1rem;
                position: absolute;
                filter: blur(20px);
                &.t1 {
                    top: 0;
                    left: 0;
                }
                &.t2 {
                    top: 0;
                    left: -1.1rem;
                    transform-origin: 100% 0;
                    transform: rotate(-60deg);
                }
                &.t3 {
                    top: 0.96rem;
                    left: -0.55rem;
                    transform-origin: 0 0;
                    transform: rotate(-30deg);
                }
                &.t4 {
                    top: 0.82rem;
                    left: 0;
                }
                &.t5 {
                    top: 0.96rem;
                    left: 0.55rem;
                    transform-origin: 100% 0;
                    transform: rotate(30deg);
                }
                &.t6 {
                    top: 0;
                    left: 0;
                    transform-origin: 100% 0;
                    transform: rotate(-30deg);
                }
            }
        }
    }
}
</style>
<script>
import '../../assets/js/rem'
import {
    getUserId
} from '../../assets/js/mUtils'
export default {
    methods: {
        routeTo(path) {
            this.$router.push({
                path: path
            });
        }
    },
    created() {
        if (!getUserId()) {
            this.$router.push({
                path: '/login'
            })
        }
    }
}
</script>
