<template>
	<div id="app">
		<MoviesList :list="moviesList" @changePoster="onChangePoster" />
		<PosterBg :poster="posterBg" />
		<MoviesPagination
			:movies-per-page="moviesPerPage"
			:current-page="currentPage"
			:total="moviesLength"
			@onChangePage="onPageChanged"
		/>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "@/components/MoviesList";
import PosterBg from "@/components/PosterBg";
import MoviesPagination from "@/components/MoviesPagination";

export default {
	name: "app",
	data()
	{
		return {
			posterBg: "",
		};
	},
	components:
	{
		MoviesList,
		PosterBg,
		MoviesPagination,
	},
	computed: {
		...mapGetters("movies", [
			"moviesList",
			"currentPage",
			"moviesPerPage",
			"moviesLength",
		]),
	},
	watch:
	{
		"$route.query":
		{
			handler: "onPageQueryChange",
			immediate: true,
			deep: true
		}
	},
	methods: {
		...mapActions("movies", ["fetchMovies", "changeCurrentPage"]),
		onChangePoster(poster)
		{
			this.posterBg = poster;
		},
		onPageChanged(page)
		{
			this.$router.push({ query: { page } });
		},
		onPageQueryChange({page = 1} = {})
		{
			this.changeCurrentPage(Number(page));
		}
	},
	created()
	{
		if(this.$route.query.page)
		{
			this.changeCurrentPage(Number(this.$route.query.page));
		}
	}
};
</script>

<style>
#app {
	position: relative;
	font-family: Arial, Helvetica, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
