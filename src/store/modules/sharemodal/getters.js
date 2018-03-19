export default {
    getShareDetails: state => state.share_data,
    getShareType: state => state.share_type,

    getFacebookShareUrl: (state) => {
        switch(state.share_type) {
            case 'PRATILIPI':
                return `https://www.facebook.com/dialog/share?app_id=${process.env.FACEBOOK_APP_ID}&display=popup&href=https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}&redirect_uri=https://${state.share_data.language}.pratilipi.com${state.share_data.pageUrl}&p[title]=${state.share_data.title}`;
                break;
        }
    },
    getTwitterUrl: (state) => {
        switch(state.share_type) {
            case 'PRATILIPI':
                return `http://twitter.com/share?text=${state.share_data.title}&url=https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}`;
        }
    },

    getGooglePlusUrl: (state) => {
        switch(state.share_type) {
            case 'PRATILIPI':
                return `https://plus.google.com/share?url=https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}`;
        }
    },

    getWhatsAppUri: (state) => {
        switch(state.share_type) {
            case 'PRATILIPI':
                const encodedUrl = encodeURI(`${state.share_data.title} https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}`);
                return `https://api.whatsapp.com/send?text=${encodedUrl}`
        }
    },

    getContentUri: (state) => {
        switch(state.share_type) {
            case 'PRATILIPI':
                return `https://${state.share_data.language.toLowerCase()}.pratilipi.com${state.share_data.pageUrl}`;
        }
    }

}
