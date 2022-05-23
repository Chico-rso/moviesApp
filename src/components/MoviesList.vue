<template>
	<b-container>
		<h3 class="list-title">IMDB Top 250</h3>
		<b-row>
			<template v-if="isExist">
				<b-col
					cols="3"
					v-for="movie, key in list"
					:key="key"
				>
					<MovieItem :movie="movie" @mouseover.native="onMouseover(movie.Poster)"/>
				</b-col>
			</template>
			<template v-else>
				<h2>Empty List</h2>
			</template>
		</b-row>
	</b-container>
</template>

<script>
import MovieItem from './MovieItem.vue';

export default {
	name: "MoviesList",
	components:
	{
		MovieItem
	},
	props: {
		list: {
			type: Object,
			default: () => ({}),
		},
	},
	computed:
	{
		isExist()
		{
			return Boolean(Object.keys(this.list).length);
		}
	},
	methods:
	{
		onMouseover(poster)
		{
			this.$emit('changePoster', poster);
		}
	}
};
</script>

<style>
.list-title
{
	margin-bottom: 30px;
	font-size: 50px;
	color: #fff;
}
</style>