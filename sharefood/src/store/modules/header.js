import types from '../types.js'

const state={
	headerShow:true
}

const getters={
	headerShow(state){
		return state.headerShow;
	}
}

const actions={
	showHeader({commit}){
		commit(types.SHOW_HEADER);
	},
	hideHeader({commit}){
		commit(types.HIDE_HEADER);
	}
}

const mutations={
	[types.SHOW_HEADER](state){
		state.headerShow=true;
	},
	[types.HIDE_HEADER](state){
		state.headerShow=false;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}