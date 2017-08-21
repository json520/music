<!-- 创建组件通过slot可以灵活设置内部结构-->
<template>
	<div class="slider" ref="slider">
		<div class="slider_group" ref="sliderGroup">
			<slot>
				
			</slot>
		</div>
		<div class="dots">
			<span class="dot" :class="{active: currentPageIndex === index}" v-for="(item,index) in dots"></span>
		</div>
	</div>
</template>
<script type="text/javascript">
	
import { addClass } from '@/common/js/dom'
import BScroll from 'better-scroll'

export default{
	name:'slider',
	props:{
		loop:{
			type: Boolean,
			default: true
		},
		autoPlay:{
			type:Boolean,
			default:true
		},
		interval:{
			type: Number,
			default: 4000
		}
	},
	data(){
		return{
			dots:[],
			currentPageIndex : 0
		}
	},
	mounted(){
		setTimeout(() =>{
			this._setSliderWidth();
			this._initSlider();
			this._initDots();
		},20)
		if(this.autoPlay){
			this._play();
		}
		
		window.addEventListener('resize', ()=>{
			if(!this.slider){
				return 
			}
			
			this._setSliderWidth(true);
			this.slider.refresh();
		})
		//初始化slider的宽度
		//初始化slider
	},
	methods:{
		_setSliderWidth(isResize){
			//获取sliderGroup下面的所有子元素
			//给每个子元素添加class和设置宽度
			//给slider_grop设置大的宽度
			this.children = this.$refs.sliderGroup.children;
			let width = 0;
			let sliderWidth = this.$refs.slider.clientWidth;
			for( let value of this.children){
				
				addClass(value,'slider_item');
				value.style.width = sliderWidth + 'px';
				width += sliderWidth;
			}
			if(this.loop && !isResize){
				width += 2 * sliderWidth;
			}
			
			this.$refs.sliderGroup.style.width = width + 'px'
			
		},
		_initSlider(){
			this.slider = new BScroll(this.$refs.slider,{
				scrollX : true,  //滚动方向为X轴
				scrollY : false, //滚动方向为Y轴
				momentum : false, //当快速滑动时是否开启滑动惯性
				snap : true , //该属性是给slider组件使用的，普通的列表滚动不需要配置
				snapLoop : this.loop , //是否可以无缝轮播
				snapThreshold : 0.3, //手指滑动时页面可切换的阈(yu)值,大于这个阈值可以滑动到下一页
				snapSpeed: 400 //轮播图切换的时间
			})	
			
			this.slider.on('scrollEnd',()=>{
				let pageIndex = this.slider.getCurrentPage().pageX;
				
				if(this.loop){
					pageIndex -= 1
				}
				this.currentPageIndex = pageIndex;
				
				if(this.autoPlay){
					clearTimeout(this.timer);
					this._play();
				}
			})
		},
		_play(){ //设置自动轮播
			let pageIndex = this.currentPageIndex + 1;
			
			if(this.loop){
				pageIndex += 1 
			}
			this.timer = setTimeout(() =>{
				this.slider.goToPage(pageIndex,0,400)
			},this.interval)
			
		},
		_initDots(){
			this.dots = new Array(this.children.length)
		}
	},
	destroyed(){ //切换页面的时候进行定时器的清楚，内存释放
		clearTimeout(this.timer)
	}
}
</script>
<style lang="scss" scoped>
	.slider{
		min-height:1px;
		position:relative;
		.slider_group{
			position:relative;
			overflow:hidden;
			white-space:nowrap;
			.slider_item{
				float:left;
				box-sizing:border-box;
				overflow:hidden;
				text-align:center;
				a{
					display:block;
					width:100%;
					overflow:hidden;
					text-decoration:none;
					img{
						display:block;
						width:100%;
					}
				}
			}
		}
		.dots{
			position:absolute;
			right:0;
			left:0;
			bottom:12px;
			text-align:center;
			font-size:0;
			.dot{
				display:inline-block;
				margin:0 4px;
				width:8px;
				height:8px;
				border-radius:50%;
				background:#fff;
				
			}
			.dot.active{
				width:20px;
				border-radius:5px;
				background:red;
			}
		}
	}
	
</style>