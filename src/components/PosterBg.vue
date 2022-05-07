<template>
	<div class="poster-page-bg" :style="posterStyle">

	</div>
</template>

<script>
export default {
	name: 'PosterBg',
	props:
	{
		poster:
		{
			type: String,
			default: ''
		}
	},
	data()
	{
		return {
			defaultPosterBg: 'linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%)'
		}
	},
	computed:
	{
		setPosterBg()
		{
			return this.poster ? `url(${this.poster})`: this.defaultPosterBg;
		},
		posterStyle()
		{
			return {
				'background-image': this.setPosterBg
			}
		}
	}
}
</script>

<style>
.poster-page-bg
{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -2;
	background-size: cover;
	background-position: center;
	transition: all .2s ease;
}
.poster-page-bg::before
{
	content: "";
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
	opacity: 0.7;
}
</style>