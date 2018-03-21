import DataAccessor from '@/utils/DataAccessor'

export default {
    setInputModalSaveAction({ commit, state }, { action, data, heading, prefilled_value }) {
    	commit('setInputModalSaveAction', { action, data, prefilled_value });
    	commit('setInputModalHeading', heading);
    },

    setMultiInputModalSaveAction({ commit, state }, { action, data, heading, prefilled_value, prefilled_value_two }) {
        commit('setInputModalSaveAction', { action, data, prefilled_value, prefilled_value_two });
        commit('setInputModalHeading', heading);
    },

    dispatchAction({ commit, state, dispatch }) {
    	dispatch(state.save_action, {
    		...state.save_data,
    		value: state.prefilled_value
    	})
    },

    dispatchMultipleInputAction({ commit, state, dispatch }) {
        dispatch(state.save_action, {
            ...state.save_data,
            value: state.prefilled_value,
            value_two: state.prefilled_value_two
        })
    },

    updatePrefilledValue({ commit, state }, value) {
    	commit('updatePrefilledValue', value);
    },

    updatePrefilledValueTwo({ commit, state }, value) {
        commit('updatePrefilledValueTwo', value);
    }
}
