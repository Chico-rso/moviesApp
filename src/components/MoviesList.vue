<template>
	<b-container>
		<h3 class="list-title">{{ listTitle }}</h3>
		<b-row>
			<template v-if="isExist">
				<b-col
					cols="3"
					v-for="movie, key in list"
					:key="key"
				>
					<MovieItem
						:movie="movie"
						@mouseover.native="onMouseover(movie.Poster)"
						@removeItem="onRemoveItem"
					/>
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
import { mapActions, mapGetters } from 'vuex';

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
		...mapGetters('movies', ['isSearch']),
		isExist()
		{
			return Boolean(Object.keys(this.list).length);
		},
		listTitle()
		{
			return this.isSearch ? 'Search result' : 'IMDB Top 250';
		}
	},
	methods:
	{
		...mapActions('movies', ['removeMovie']),
		onMouseover(poster)
		{
			this.$emit('changePoster', poster);
		},
		async onRemoveItem({ id, title })
		{
			const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure remove: ${title} ?`);
			if(isConfirmed)
			{
				this.removeMovie(id);
			}
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