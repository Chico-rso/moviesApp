<template>
	<div class="loader-wrap" v-if="isShowLoader">
		<b-spinner variant="white" ></b-spinner>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Loader',
	data()
	{
		return {};
	},
	components:
	{},
	methods:
	{},
	mounted()
	{},
	computed:
	{
		...mapGetters(["isShowLoader"])
	},
};
</script>

<style>
.loader-wrap
{
	position: fixed;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 99;
}
</style>
