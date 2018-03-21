import DataAccessor from '@/utils/DataAccessor'

export default {
    setInputModalSaveAction({ commit, state }, { action, data, heading, prefilled_value }) {
    	commit('setInputModalSaveAction', { action, data, prefilled_value });
    	commit('setInputModalHeading', heading);
    },

    dispatchAction({ commit, state, dispatch }) {
    	console.log(state.save_action);
    	console.log(state.save_data);
    	console.log(state.prefilled_value);
    	dispatch(state.save_action, {
    		...state.save_data,
    		value: state.prefilled_value
    	})
    },

    updatePrefilledValue({ commit, state }, value) {
    	commit('updatePrefilledValue', value);
    }
}
