import axios from '@/plugins/axios';
import IDs from '@/store/mock/imdb_top250';
import mutations from '@/store/mutations';


function serializeResponse(movies)
{
	return movies.reduce((acc, movie) =>
	{
		acc[movie.imdbID] = movie;
		return acc;
	}, {});
}

const { MOVIES } = mutations;

const moviesStore =
{
	namespaced: true,
	state:
	{
		top250IDs: IDs,
		currentPage: 1,
		moviesPerPage: 12,
		movies: {},
	},
	mutations:
	{
		[MOVIES](state, value)
		{
			state.movies = value;
		}
	},
	actions:
	{
		async fetchMovies({ getters, commit })
		{
			try
			{
				const { currentPage, moviesPerPage, sliceedIds } = getters;
				const from = currentPage * moviesPerPage - moviesPerPage;
				const to = currentPage * moviesPerPage;
				const moviesToFetch = sliceedIds(from, to);
				const request = moviesToFetch.map(id => axios.get(`http://www.omdbapi.com/?i=${id}`))
				const response = await Promise.all(request);
				const movies = serializeResponse(response);
				commit(MOVIES, movies);
			}
			catch (err) { console.log(err) };
		}
	},
	getters:
	{
		sliceedIds: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
		currentPage: ({ currentPage }) => currentPage,
		moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
	},
};

export default moviesStore;