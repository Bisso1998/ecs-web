export default {
    setReviewLoadingTrue(state) {
        state.loading_state = 'LOADING';
        state.data = [];
        state.cursor = null;
        state.numberFound = 0;
    },
    setReviewLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        
        state.cursor = data.cursor;
        state.numberFound = data.numberFound;

        data.reviewList.forEach((eachReview) => {
            eachReview.comments = {
                loading_state: 'LOADING_SUCCESS',
                data: [],
                cursor: null,
                numberFound: 0
            }
        });
        state.data = data.reviewList;
        if (data.reviewList.length === 0) {
            state.cursor = null;
        }
    },
    setReviewLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    },

    setMoreReviewLoadingTrue(state) {
        state.loading_state = 'LOADING';
    },
    setMoreReviewLoadingSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        data.reviewList.forEach((eachReview) => {
            eachReview.comments = {
                loading_state: 'LOADING_SUCCESS',
                data: [],
                cursor: null,
                numberFound: 0
            }
        });
        if (data.reviewList.length > 0) {
            state.data = state.data.concat(data.reviewList);
            state.cursor = data.cursor;
        } else {
            state.cursor = null;
        }
    },
    setMoreReviewLoadingError(state) {
        state.loading_state = 'LOADING_ERROR';
    },

    setCommentLoadingTrue(state, parentId) {
        console.log(parentId);
        const reviewToAddComment = state.data.find(eachReview => eachReview.userPratilipiId === parentId);
        reviewToAddComment.comments.loading_state = 'LOADING';
    },
    setCommentLoadingSuccess(state, { data, parentId }) {
        const reviewToAddComment = state.data.find(eachReview => eachReview.userPratilipiId === parentId);
        reviewToAddComment.comments.loading_state = 'LOADING_SUCCESS';
        reviewToAddComment.comments.data = data.commentList;
        reviewToAddComment.comments.cursor = data.cursor;
        reviewToAddComment.comments.numberFound = data.numberFound;
    },
    setCommentLoadingError(state, parentId) {
        const reviewToAddComment = state.data.find(eachReview => eachReview.userPratilipiId === parentId);
        reviewToAddComment.comments.loading_state = 'LOADING_ERROR';
    }
}
