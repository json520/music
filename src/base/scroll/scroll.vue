<template>
    <!-- 滚动组件 -->
    <div class="scroll" ref="wrapper">
        <slot>

        </slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
let ss = 1;
export default {
    props: {
        probeType: { //当为1时候，会在屏幕滚动停止的时候派发scroll事件
            /* 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
            当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
            当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
            */
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: { //数据改变的时候刷新
            type: Array,
            default: null
        },
        listenScroll: {  //是否实时监听beeter-scroll的滚动事件，默认不监听
            type: Boolean,
            defautl: false
        },
        pullUp: {
            type: Boolean,
            default: false
        },
        beforeScrollStart: {
            type: Boolean,
            default: false
        },
        // 如果不能滚动可能是动画造成的DOM延迟没有渲染高度
        refreshDelay: {
            type: Number,
            default: 20
        }
    },
    data() {
        return {

        }

    },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {
            if (!this.$refs.wrapper) {
                return
            } else {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
            }
            // 如果为要监听滚动事件，则触发当前实例上面的事件，也可以传入参数！
            if (this.listenScroll) {
                let _this = this;
                this.scroll.on('scroll', (site) => {
                    _this.$emit('scroll', site)
                })
            }

            // 是否滚动加载
            if (this.pullUp) {

                this.scroll.on('scrollEnd', () => {

                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {

                        this.$emit('scrollToEnd')
                    }
                })
            }
            // 滾動之前
            if (this.beforeScrollStart) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforScrollStart')
                })
            }


        },
        enable() {
            this.scroll && this.scroll.enable();
        },
        disable() {
            this.scroll && this.scroll.disable();
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            this.scroll && this.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },

    watch: {
        data() {

            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay)
        }
    }
}

</script>
<style scoped>

</style>