<template>
	<div class='label'>
		<div class='character'>
			<p class='characterSmall'>{{ line1 }}</p>
			<p class='characterBig'>{{ line2 }}</p>
			<p class='characterSmall'>{{ line3 }}</p>
		</div>
		<div class='image'>
			<img :src="imageSrc[imageChoice]" class="imageStyle" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'labelDisplay',
	data() {
		return {
			imageSrc: [`/src/assets/image/electrical-energy.gif`, `/src/assets/image/turbine.gif`, `/src/assets/image/power-transformer.gif`]
		}
	},
	props: {
		line1: {
			type: String,
			required: false,
			default: '2022年全国风机装机容量'  // '2022年风机新增装机'  '2022年风电总发电量'
		},
		line2: {
			type: String,
			required: false,
			default: '36544.00'  // '3763.00'  '6827.20'
		},
		line3: {
			type: String,
			required: false,
			default: '万千瓦'  // '万千瓦'  '亿千瓦时'
		},
		imageChoice: {
			type: Number,
			required: false,
			default: 0  // '万千瓦'  '亿千瓦时'
		}
	},
	computed: {
		imgShow() {
			return this.imgSrc[this.imageChoice]
		}
	}
}
</script>

<style scoped>
.label {
	padding-left: 5%;
	width: 90%;
	height: 100%;
	display: flex;
	flex-direction: row;
	transition: transform 0.3s;
}

.character {
	width: 50%;
	height: 100%;
}

.characterSmall {
	font-size: 16px;
	text-align: left;
	font-weight: bold;
}

.characterBig {
	margin-top: 0px;
	margin-bottom: 0px;
	font-size: 30px;
	text-align: left;
	font-weight: bold;
}

.image {
	width: 50%;
	height: 100%;
}

.imageStyle {
	width: 100%;
	height: 100%;
}
</style>