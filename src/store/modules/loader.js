import mutations from '@/store/mutations';

const { TOGGLE_LOADER } = mutations; //деструктуризация

const loaderStore =
{
	state:
	{
		isShowLoader: false,
	},
	actions:
	{
		toggleLoader({ commit }, bool)
		{
			commit(TOGGLE_LOADER, bool);
		}
	},
	mutations:
	{
		[TOGGLE_LOADER](state, bool)
		{
			state.isShowLoader = bool;
		}
	},
	getters:
	{
		isShowLoader: ({ isShowLoader }) => isShowLoader,
	}
};

export default loaderStore;