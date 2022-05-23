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
const { CURRENT_PAGE } = mutations;

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
		},
		[CURRENT_PAGE](state, value)
		{
			state.currentPage = value;
		}
	},
	actions:
	{
		initMoviesStore:
		{
			handler({ dispatch })
			{
				dispatch('fetchMovies');
			},
			root: true
		},
		async fetchMovies({ getters, commit, dispatch })
		{
			try
			{
				dispatch('toggleLoader', true, {root: true});
				const { currentPage, moviesPerPage, sliceedIds } = getters;
				const from = currentPage * moviesPerPage - moviesPerPage;
				const to = currentPage * moviesPerPage;
				const moviesToFetch = sliceedIds(from, to);
				const request = moviesToFetch.map(id => axios.get(`http://www.omdbapi.com/?i=${id}`));
				const response = await Promise.all(request);
				const movies = serializeResponse(response);
				commit(MOVIES, movies);
			}
			catch (err)
			{
				console.log(err);
			}
			finally
			{
				dispatch('toggleLoader', false, { root: true });
			}
		},
		changeCurrentPage({ commit, dispatch }, page)
		{
			commit(CURRENT_PAGE, page);
			dispatch('fetchMovies');
		}
	},
	getters:
	{
		sliceedIds: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
		currentPage: ({ currentPage }) => currentPage,
		moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
		moviesList: ({ movies }) => movies,
		moviesLength: ({ top250IDs }) => Object.keys(top250IDs).length,
	},
};

export default moviesStore;