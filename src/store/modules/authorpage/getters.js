export default {
    // checkoutStatus: state => state.checkoutStatus,

    // cartProducts: (state, getters, rootState) => {
    //     return state.added.map(({ id, quantity }) => {
    //         const product = rootState.products.all.find(product => product.id === id)
    //         return {
    //             title: product.title,
    //             price: product.price,
    //             quantity
    //         }
    //     })
    // },

    // cartTotalPrice: (state, getters) => {
    //     return getters.cartProducts.reduce((total, product) => {
    //         return total + product.price * product.quantity
    //     }, 0)
    // }
    
    getAuthorData: state => state.author.data,
    getAuthorDataLoadingState: state => state.author.loading_state,

    getPublishedContents: state => state.published_contents.data,
    getPublishedContentsLoadingState: state => state.published_contents.loading_state,
    getPublishedContentsTotalCount: state => state.published_contents.numberFound
}
