<template>
	<div class="movie-item mb-3">
		<div class="movie-item__poster" :style="posterBg"></div>
		<div class="movie-info-wrap">
			<div class="movie-item__info">
				<h3 class="movie-title">{{ movie.Title }}</h3>
				<span class="movie-year">{{ movie.Year }}</span>
			</div>
			<div class="movie-item__controls row no-gutters">
				<div class="col">
					<b-button size="md" block variant="outline-light">Edit</b-button>
				</div>
				<div class="col">
					<b-button size="md" block variant="outline-light">Remove</b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "MovieItem",
	props: {
		movie: {
			type: Object,
			required: true,
		},
	},
	computed: {
		posterBg() {
			return {
				"background-image": `url(${this.movie.Poster})`,
			};
		},
	},
};
</script>

<style>
.movie-item {
	height: 460px;
	position: relative;
	cursor: pointer;
	border-radius: 5px;
	overflow: hidden;
	transition: all 0.2s ease-in;
}
.movie-item button {width: 100%;}
.movie-item:hover {
	box-shadow: 0 5px 30px rgba(0, 0, 0, 0.7);
	transform: scale(1.03);
}
.movie-item__poster {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	z-index: -1;
}
.movie-info-wrap
{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	padding: 20px 10px;
	opacity: 0;
	transition: all .2s ease;
}
.movie-item:hover .movie-info-wrap
{
	opacity: 1;
	background-color: rgba(0, 0, 0, 0.7);
}
.movie-title
{
	font-size: 20px;
	color: #fff;
}
.movie-year
{
	font-size: 16px;
	color: #fff;
}
</style>