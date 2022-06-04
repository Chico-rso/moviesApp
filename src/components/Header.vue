<template>
	<header class="header">
		<BNavbar
			class="navbar"
			type="dark"
			variant="dark"
		>
		<b-container>
			<b-navbar-brand href="#">MovieDB</b-navbar-brand>
			<b-nav-form>
				<b-form-input
					class="mr-sm-2 search-input"
					placeholder="Search"
					v-model="searchValue"
					debounce="500"
				></b-form-input>
			</b-nav-form>
		</b-container>
		</BNavbar>
	</header>
</template>

<script>
import { mapActions } from 'vuex';

export default
{
	name: 'Header',
	data()
	{
		return {
			searchValue: '',
		};
	},
	watch:
	{
		searchValue: 'onSearchValueChange'
	},
	methods:
	{
		...mapActions('movies', ['searchMovies']),
		onSearchValueChange(val)
		{
			this.searchMovies(val);
		}
	},
};
</script>

<style>
.header{margin-bottom: 30px;}
.navbar{background-color: rgba(0, 0, 0, 0.7) !important;}
.search-input
{
	color: #fff;
	background: rgba(255, 255, 255, 0.1);
	border-color: rgba(0, 0, 0, 0.6);
}
</style>
