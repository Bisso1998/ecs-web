<template>
    <div 
        class="pratilipi-image blur" 
        :style="{ 'background-image': 'url(' + getLowResolutionImage( coverImageUrl ) + ')' }">
    </div>
</template>

<script>

export default {
    name: 'Pratilipi',
    props: {
        coverImageUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
        getLowResolutionImage(imageUrl) {
            if (imageUrl.indexOf('?') === -1) {
                return imageUrl + '?quality=low&type=webp&width=50';
            } else {
                return imageUrl + '&quality=low&type=webp&width=50';
            }
        },
        getHighResolutionImage(imageUrl) {
            if (imageUrl.indexOf('?') === -1) {
                return imageUrl + '?quality=high&type=webp';
            } else {
                return imageUrl + '&quality=high&type=webp';
            }
        },
    },
    beforeMount() {
        const that = this;
        $('<img/>').attr('src', that.getHighResolutionImage(that.coverImageUrl)).on('load', function() {
            $(this).remove(); // prevent memory leaks as @benweet suggested
            $(that.$el).css('background-image', `url(${that.getHighResolutionImage(that.coverImageUrl)})`);
            $(that.$el).removeClass('blur');
        });
    }
}
</script>

<style lang="scss" scoped>
.pratilipi-image {
    margin: 5px;
    height: 150px;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s;
    &.blur {
        filter: blur(5px);
        padding: 5px;
    }
}
</style>
