import DataAccessor from '@/utils/DataAccessor'

export default {
    // checkout({ commit, state }, products) {
    //     const savedCartItems = [...state.added]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    //     shop.buyProducts(
    //         products,
    //         () => commit('setCheckoutStatus', 'successful'),
    //         () => {
    //             commit('setCheckoutStatus', 'failed')
    //             // rollback to the cart saved before sending the request
    //             commit('setCartItems', { items: savedCartItems })
    //         }
    //     )
    // },

    // addProductToCart({ state, commit }, product) {
    //     commit('setCheckoutStatus', null)
    //     if (product.inventory > 0) {
    //         const cartItem = state.added.find(item => item.id === product.id)
    //         if (!cartItem) {
    //             commit('pushProductToCart', { id: product.id })
    //         } else {
    //             commit('incrementItemQuantity', cartItem)
    //         }
    //         // remove 1 item from stock
    //         commit('decrementProductInventory', { id: product.id })
    //     }
    // }
    fetchUserDetails({ commit, state }) {
        commit('setUserDataLoadingTrue');
        DataAccessor.getUser((data) => {
            if (data.status === 200) {
                commit('setUserDataLoadingSuccess', data.response);
            } else {
                commit('setUserDataLoadingError');
            }
        })
    },

    loginUser({ commit, state, dispatch }, { email, password }) {
        commit('setUserDataLoadingTrue');
        DataAccessor.loginUser(email, password, (data) => {
            commit('setUserDataLoadingSuccess', data);

            if (state.post_login_action.action) {
                dispatch(state.post_login_action.action, state.post_login_action.data, { root: true });
                commit('clearPostLoginAction');
            }
            
        }, (error) => {
            console.log(error);
            commit('setUserDataLoadingError', error.message);
        })
    },

    signupUser({ commit, state, dispatch }, { email, name, password, language }) {
        commit('setUserDataLoadingTrue');
        DataAccessor.registerUser(name, email, password, language, (data) => {
            commit('setUserDataLoadingSuccess', data);

            if (state.post_login_action.action) {
                dispatch(state.post_login_action.action, state.post_login_action.data, { root: true });
                commit('clearPostLoginAction');
            }
            
        }, (error) => {
            console.log(error);
            commit('setUserDataLoadingError', error.message);
        })
    },

    logoutUser({ commit, state }) {
        commit('setUserLogoutInProgressTrue');
        DataAccessor.logoutUser((data) => {
            commit('setUserLogoutInProgressSuccess', data);
        }, () => {
            commit('setUserLogoutInProgressError');
        })
    },

    setNotificationCount({ commit, state }, notificationCount) {
        commit('setNotificationCount', notificationCount);
    },

    resetNotificationCount({ commit, state }) {
        import('firebase').then((firebase) => {
            const node = firebase.database().ref( "NOTIFICATION" ).child( state.data.userId ).child( "newNotificationCount" );
            node.set( 0 );
        });
    },

    setAfterLoginAction({ commit, state }, { action, data }) {
        commit('setAfterLoginAction', {
            action,
            data
        });
    },

    sendPasswordResetEmail({ commit, state }, email) {
        DataAccessor.forgotPassword(email, () => {
            commit('alert/triggerAlertView', '__('password_reset_request_success')', { root: true });
            $('#forgotPassModal').modal('hide');
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
        }, () => {
            commit('alert/triggerAlertView', '__('server_error_message')', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
        });
    },

    resetUserPassword({ commit, state }, { email, idToken, newPassword }) {
        console.log(email, idToken, newPassword)
        DataAccessor.resetUserPassword(email, idToken, newPassword, (userDetails) => {
            commit('setUserDataLoadingSuccess', userDetails);
            window.location = '/';
        }, (error) => {
            console.log(error);
        });
    }
}
