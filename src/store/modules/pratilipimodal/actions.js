import DataAccessor from '@/utils/DataAccessor'

export default {

    setPratilipiModalData({ commit, state }, pratilipiData) {
        commit('setPratilipiModalDataLoadingSuccess', pratilipiData);
    },

    fetchPratilipiData({ commit, state }, pratilipiId) {
        DataAccessor.getPratilipiById(pratilipiId, false, function(pratilipiData, userPratilipiData) {
            if (pratilipiData) {
                commit('setPratilipiModalDataLoadingSuccess', pratilipiData);
            } else {
                commit('setPratilipiModalDataLoadingError');    
            }
            // if (userPratilipiData) {
            //     commit('setPratilipiUserDataLoadingSuccess', userPratilipiData);
            // } else {
            //     commit('setPratilipiUserDataLoadingError');    
            // }
        });
    }

    // addToLibrary({ commit, state }, pratilipiId) {
    //     commit('alert/triggerAlertView', '__("added_to_library")', { root: true });
    //     setTimeout(() => {
    //         commit('alert/triggerAlertHide', null, { root: true });
    //     }, 3000);
    //     DataAccessor.addOrRemoveFromLibrary(pratilipiId, true, (response) => {
    //         commit('addPratilipiToLibrarySuccess', response);
    //     }, (error) => {
    //         commit('addPratilipiToLibraryError');
    //     })
    // },

    // removeFromLibrary({ commit, state }, pratilipiId) {
    //     commit('alert/triggerAlertView', '__("removed_from_library")', { root: true });
    //     setTimeout(() => {
    //         commit('alert/triggerAlertHide', null, { root: true });
    //     }, 3000);
    //     DataAccessor.addOrRemoveFromLibrary(pratilipiId, false, (response) => {
    //         commit('removePratilipiFromLibrarySuccess', response);
    //     }, (error) => {
    //         commit('removePratilipiFromLibraryError');
    //     })
    // }

}
