<template>
    <div class="err">
        <span>
			404
		</span>
    </div>
</template>
<script>
export default {
    data() {
            return {

            }
        },
        methods: {

        },

}
</script>
<style lang="scss">
.err {
    position: absolute;
    width: 200px;
    height: 200px;
    margin-top: -100px;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 60px;
    background: #3493EF;
    border-radius: 50%;
    animation: notfound 5s;
    box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.8);
}

@keyframes notfound {
    from {
        left: -200px;
        transform: rotate(0deg);
    }
    to {
        left: 50%;
        transform: rotate(720deg);
    }
}
</style>
