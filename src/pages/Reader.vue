<template>
    <ReadLayout>
        <div class="read-page">
            <div class="header-section" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                <div class="container">
                    <div class="row">
                        <div class="exit-reader col-1">
                            <router-link :to="getPratilipiData.pageUrl"><i class="material-icons">arrow_back</i></router-link>
                        </div>
                        <div class="col-1" id="sidebarCollapse" @click="openSidebar">
                            <i class="material-icons">list</i>
                        </div>
                        <div class="book-name col-7">{{ getPratilipiData.title }}</div>
                        <div class="settings col-1">
                            <button type="button" class="btn" data-toggle="modal" data-target="#readerOptions">
                                <i class="material-icons">settings</i>
                            </button>
                        </div>
                        <div class="more-options col-1">
                            <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="material-icons">more_vert</i>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button type="button" class="btn report-btn" data-toggle="modal" data-target="#reportModal">
                                    __("report_button")
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Reader Options Modal -->
            <div class="modal fade" id="readerOptions" tabindex="-1" role="dialog" aria-labelledby="readerOptionsLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="material-icons">close</i>
                            </button>
                            <div class="options">
                                <div class="option">
                                    <span>__("reader_font_size"):</span>
                                    <div class="buttons">
                                        <button type="button" name="button" @click="increaseFont"><i class="material-icons">add</i></button>
                                        <button type="button" name="button" @click="decreaseFont"><i class="material-icons">remove</i></button>
                                    </div>
                                </div>
                                <div class="option">
                                    <span>__("reader_background"):</span>
                                    <div class="buttons">
                                        <button type="button" name="button" @click="themeWhite"><icon name="file-text-o" scale="1.5"></icon></button>
                                        <button type="button" name="button" @click="themeBlack"><icon name="file-text" scale="1.5"></icon></button>
                                        <button type="button" name="button" @click="themeYellow" class="yellow"><icon name="file-text-o" scale="1.5"></icon></button>
                                    </div>
                                </div>
                                <div class="option">
                                    <span>__("reader_line_spacing"):</span>
                                    <div class="buttons">
                                        <button type="button" name="button" @click="lineHeightSm"><span class="lh-icon lh-sm-icon"></span></button>
                                        <button type="button" name="button" @click="lineHeightMd"><span class="lh-icon lh-md-icon"></span></button>
                                        <button type="button" name="button" @click="lineHeightLg"><span class="lh-icon lh-lg-icon"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Report Modal -->
            <div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="reportModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="reportModalLabel">__("report_title")</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="material-icons">close</i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="reportModalTextarea">__("report_issue")</label>
                                    <textarea class="form-control" id="reportModalTextarea" rows="3" placeholder="__('report_issue')"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary btn-submit">__("submit")</button>
                                <button type="button" class="cancel" data-dismiss="modal" aria-label="Close">__("cancel")</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="book-content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" v-if="getPratilipiContent.length > 0 && getPratilipiData.pratilipiId == $route.query.id">
                            <h2
                                class="chapter-title"
                                v-for="eachIndex in getIndexData" 
                                :key="eachIndex.chapterId"
                                v-if="eachIndex.chapterNo === selectedChapter">
                                    {{ eachIndex.title || eachIndex.chapterNo }}
                            </h2>
                            <div class="content-section lh-md" 
                                :class="fontStyleObject" 
                                v-for="eachChapter in getPratilipiContent"
                                v-if="eachChapter.chapterNo === selectedChapter" 
                                :key="eachChapter.chapterNo"
                                v-html="eachChapter.content">
                            </div>
                            
                            <div class="book-recomendations col-md-12 p-0" v-if="selectedChapter == getIndexData.length">
                                <div class="card">
                                    <Recommendation
                                        :contextId="getPratilipiData.pratilipiId"
                                        :context="'summaryPage'"
                                        v-if="getPratilipiData && getPratilipiData.pratilipiId">
                                    </Recommendation>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <Spinner v-if="getPratilipiContent.length === 0 || getPratilipiData.pratilipiId != $route.query.id"></Spinner>
            </div>
            
            <div class="footer-section">
                <div class="container">
                    <div class="row">
                        <div class="review-count col-3" @click="openReviewModal">
                            <i class="material-icons">comment</i>
                            <span>{{ getPratilipiData.reviewCount }}</span>
                        </div>
                        <div class="rating-count col-3" @click="openRatingModal">
                            <i class="material-icons">star_rate</i>
                            <span>{{ getPratilipiData.ratingCount }}</span>
                        </div>
                        <div class="add-to-lib col-3">
                            <i class="material-icons" v-if="getUserPratilipiData.addedToLib" @click="removeFromLibrary">bookmark</i>
                            <i class="material-icons" v-else @click="addPratilipiToLibrary(getPratilipiData.pratilipiId)">bookmark_border</i>
                        </div>
                        <div class="share-btn col-3" @click="openShareModal">
                            <i class="material-icons">share</i>
                        </div>
                    </div>
                </div>
            </div>
            
            <nav id="sidebar" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                <div id="dismiss" @click="closeSidebar">
                    <i class="material-icons">close</i>
                </div>
                <div class="book-info">
                    <div class="book-cover"><img :src="getPratilipiData.coverImageUrl" alt=""></div>
                    <div class="book-name">{{ getPratilipiData.title }}</div>
                    <a :href="getPratilipiData.author.pageUrl" class="author-link">
                        <span class="auth-name">{{ getPratilipiData.author.displayName }}</span>
                    </a>
                    <div class="follow-btn-w-count"><!-- Follow Button -->
                        <button><i class="material-icons">person_add</i> __("author_follow")</button><span><b>1234</b></span>
                    </div>
                    <div class="follow-btn-w-count" style="display: none;"><!-- Following Button -->
                        <button><i class="material-icons">check</i> __("author_following")</button><span><b>1235</b></span>
                    </div>
                </div>
                <div class="book-index">
                    <ul>
                        <li 
                            v-for="eachIndex in getIndexData" 
                            :key="eachIndex.chapterId"
                            :class="{ isActive: eachIndex.chapterNo === selectedChapter }">
                                <router-link
                                    :to="{ path: '/read', query: { id: getPratilipiData.pratilipiId, chapterNo: eachIndex.chapterNo } }"
                                    @click.native="closeSidebar">
                                    __("writer_chapter") {{ eachIndex.title || eachIndex.chapterNo }}
                                </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <div class="container">
                <div class="row">
                    <div class="review-popout" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                        <button type="button" class="close-review" name="button" @click="closeReviewModal"><i class="material-icons">close</i></button>
                        <Reviews 
                            :pratilipiId="getPratilipiData.pratilipiId" 
                            :authorId="getPratilipiData.author.authorId" 
                            :userPratilipiData='getUserPratilipiData'>
                        </Reviews>
                    </div>
                    
                    <div class="rating-popout" v-if="getPratilipiLoadingState === 'LOADING_SUCCESS'">
                        <button type="button" class="close-review" name="button" @click="closeRatingModal"><i class="material-icons">close</i></button>
                        <Reviews 
                            :pratilipiId="getPratilipiData.pratilipiId" 
                            :authorId="getPratilipiData.author.authorId" 
                            :userPratilipiData='getUserPratilipiData'>
                        </Reviews>
                    </div>
                </div>
            </div>
            <div class="overlay" @click="closeSidebar"></div>
            <div class="overlay-1" @click="closeReviewModal"></div>
            <div class="overlay-2" @click="closeRatingModal"></div>
            <div class="reader-progress"><div class="progress-bar"></div></div>
        </div>
    </ReadLayout>
</template>

<script>
import ReadLayout from '@/layout/Reader-layout.vue';
import Spinner from '@/components/Spinner.vue';
import mixins from '@/mixins';
import 'vue-awesome/icons/file-text'
import 'vue-awesome/icons/file-text-o'
import Reviews from '@/components/Reviews.vue';
import Recommendation from '@/components/Recommendation.vue';
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    components: {
        ReadLayout,
        Spinner,
        Reviews,
        Recommendation
    },
    mixins: [
        mixins
    ],
    data() {
        return {
            fontSize: 16,
            selectedChapter: 1
        }
    },
    methods: {
        ...mapActions('readerpage', [
            'fetchPratilipiDetails',
            'fetchPratilipiContentForHTML',
            'clearCachedContents',
            'addToLibrary',
            'removeFromLibrary'
        ]),
        ...mapActions([
            'setShareDetails',
            'setAfterLoginAction'
        ]),
        addPratilipiToLibrary(pratilipiId) {
            if (this.getUserDetails.isGuest) {
                // throw popup modal
                console.log(this.$route);
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/addToLibrary`, data: pratilipiId });
                this.openLoginModal();
            } else {
                this.addToLibrary(pratilipiId);
            }
        },
        increaseFont() {
            if (this.fontSize !== 32) {
                this.fontSize += 2;
            }
        },
        decreaseFont() {
            if (this.fontSize !== 12) {
                this.fontSize -= 2;
            }
        },
        lineHeightSm() {
            $(".book-content .content-section").removeClass("lh-sm lh-md lh-lg");
            $(".book-content .content-section").addClass("lh-sm");
        },
        lineHeightMd() {
            $(".book-content .content-section").removeClass("lh-sm lh-md lh-lg");
            $(".book-content .content-section").addClass("lh-md");
        },
        lineHeightLg() {
            $(".book-content .content-section").removeClass("lh-sm lh-md lh-lg");
            $(".book-content .content-section").addClass("lh-lg");
        },
        themeWhite() {
            $(".read-page").removeClass("theme-white theme-black theme-yellow");
            $(".read-page").addClass("theme-white");
            
            $(".header-section").removeClass("theme-white theme-black theme-yellow");
            $(".header-section").addClass("theme-white");
            
            $(".footer-section").removeClass("theme-white theme-black theme-yellow");
            $(".footer-section").addClass("theme-white");
        },
        themeBlack() {
            $(".read-page").removeClass("theme-white theme-black theme-yellow");
            $(".read-page").addClass("theme-black");
            
            $(".header-section").removeClass("theme-white theme-black theme-yellow");
            $(".header-section").addClass("theme-black");
            
            $(".footer-section").removeClass("theme-white theme-black theme-yellow");
            $(".footer-section").addClass("theme-black");
        },
        themeYellow() {
            $(".read-page").removeClass("theme-white theme-black theme-yellow");
            $(".read-page").addClass("theme-yellow");
            
            $(".header-section").removeClass("theme-white theme-black theme-yellow");
            $(".header-section").addClass("theme-yellow");
            
            $(".footer-section").removeClass("theme-white theme-black theme-yellow");
            $(".footer-section").addClass("theme-yellow");
        },
        openReviewModal() {
            $(".review-popout").toggleClass("show");
            $('.overlay-1').fadeToggle();
            $('.overlay-2').fadeOut();
            $(".rating-popout").removeClass("show");
        },
        openRatingModal() {
            $(".rating-popout").toggleClass("show");
            $('.overlay-2').fadeToggle();
            $('.overlay-1').fadeOut();
            $(".review-popout").removeClass("show");
        },
        closeReviewModal() {
            $(".review-popout").removeClass("show");
            $('.overlay-1').fadeOut();
        },
        closeRatingModal() {
            $(".rating-popout").removeClass("show");
            $('.overlay-2').fadeOut();
        },
        openSidebar() {
            $('#sidebar').addClass('active');
            $('.overlay').fadeIn();   
        },
        closeSidebar() {
            $('#sidebar').removeClass('active');
            $('.overlay').fadeOut();
        },
        openShareModal() {
            this.setShareDetails({ data: this.getPratilipiData, type: 'PRATILIPI' })
            console.log('test')
            $('#share_modal').modal('show');
        }
    },
    computed: {
        fontStyleObject() {
            const fontStyleObject = {};
            fontStyleObject['font-' + this.fontSize] = true
            return fontStyleObject
        },
        ...mapGetters('readerpage', [
            'getPratilipiData',
            'getPratilipiLoadingState',
            'getUserPratilipiData',
            'getUserPratilipiLoadingState',
            'getIndexData',
            'getIndexLoadingState',
            'getPratilipiContent'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    created() {
        this.fetchPratilipiDetails(this.$route.query.id);
        if (this.$route.query.chapterNo) {
            this.selectedChapter = Number(this.$route.query.chapterNo);
        }
    },
    mounted() {
        $('.read-page').bind("contextmenu",function(e){
            e.preventDefault();
        }),
        $(window).scroll(function() {
            var wintop = $(window).scrollTop(), docheight = $('.book-content').height(), winheight = $(window).height();
            var totalScroll = (wintop/(docheight-winheight))*100;
            $(".reader-progress .progress-bar").css("width",totalScroll+"%");
            console.log($(".progress-bar"));
        });
    },
    watch: {
        '$route.query.id'(newValue) {
            this.fetchPratilipiDetails(newValue);
        },
        '$route.query.chapterNo'(newValue) {
            if (!newValue) {
                return;
            }
            if (this.getPratilipiData.contentType === 'PRATILIPI') {
                this.fetchPratilipiContentForHTML({ pratilipiId: this.getPratilipiData.pratilipiId, chapterNo: Number(newValue) });    
                this.selectedChapter = newValue;
            }
        },
        'getPratilipiData.pratilipiId'(newId, oldId) {
            this.clearCachedContents();
            if (this.getPratilipiData.contentType === 'PRATILIPI') {
                this.fetchPratilipiContentForHTML({ pratilipiId: newId, chapterNo: this.$route.query.chapterNo ? Number(this.$route.query.chapterNo) : 1 });
            }
        },
        'getUserDetails.userId'() {
            this.fetchPratilipiDetails(this.$route.query.id);
        }
    }
}
</script>

<style lang="scss" scoped>
.read-page {
    margin: 0;
    padding: 0;
    position: relative;
    min-height: 100vh;
    .header-section {
        box-shadow: 0 1px 1px rgba(0,0,0,0.2);
        padding: 10px 0;
        position: fixed;
        top: 0;
        z-index: 2;
        width: 100%;
        background: #fff;
        .exit-reader a {
            color: #2c3e50;
        }
        .book-name {
            text-align: left;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
        }
        #sidebarCollapse {
            cursor: pointer;
        }
        .more-options .btn, .settings .btn {
            padding: 0;
            background: transparent;
            &:focus {
                box-shadow: none;
            }
        }
        .more-options {
            .dropdown-menu {
                padding: 0;
                .report-btn {
                    padding: 10px;
                    width: 100%;
                    text-align: left;
                }
            }
        }
        .col-1 i {
            vertical-align: middle;
        }
    }
    .reader-progress {
        left:0;
        width: 100%;
        height: 4px;
        margin-bottom: 0px;
        position: fixed;
        top: 48px;
        overflow: hidden;
        background-color: white;
        content: "";
        display: table;
        table-layout: fixed;
        z-index: 1;
        .progress-bar {
            width: 0%;
            float: left;
            height: 100%;
            z-index:9;
            max-width: 100%;
            background-color:#d0021b;
            -webkit-transition: width .3s ease;
            -o-transition: width .3s ease;
            transition: width .3s ease;
        }
    }
    .book-content {
        margin-top: 54px;
        font-size: 16px;
        padding: 10px;
        text-align: justify;

        -moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        h2.chapter-title {
            font-size: 24px;
            text-align: center;
            @media screen and (max-width: 768px ) {
                font-size: 18px;
            }
        }
        .content-section {
            margin-bottom: 50px;
        }
    }
    .footer-section {
        box-shadow: 0 -1px 1px rgba(0,0,0,0.2);
        padding: 10px 0;
        position: fixed;
        bottom: 0;
        z-index: 12;
        width: 100%;
        background: #fff;
        i {
            vertical-align: middle;
            max-width: 30px;
        }
        span {
            font-size: 14px;
        }
        .col-3 {
            cursor: pointer;
            padding: 0 5px;
        }
    }
    #sidebar {
        width: 300px;
        position: fixed;
        top: 0;
        left: -310px;
        height: 100vh;
        z-index: 999;
        background: #fff;
        color: #fff;
        transition: all 0.3s;
        overflow-y: scroll;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
        &.active {
            left: 0;
        }
        #dismiss {
            width: 35px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            color: #2c3e50;
            z-index: 2;
            -webkit-transition: all 0.3s;
            -o-transition: all 0.3s;
            transition: all 0.3s;
            &:hover {
                opacity: 0.9;
            }
        }
        .book-info {
            position: relative;
            text-align: center;
            color: #2c3e50;
            font-size: 14px;
            border-bottom: 1px solid #e9e9e9;
            padding-bottom: 10px;
            margin-bottom: 10px;
            .book-cover {
                width: 150px;
                height: 150px;
                margin: 10px auto;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .book-name {
                font-size: 18px;
                font-weight: bold;
                margin: 0;
            }
            .author-link {
                color: #d0021b;
                margin-bottom: 10px;
                .auth-name {
                    text-align: left;
                    display: inline-block;
                    margin: 0 10px;
                    font-size: 14px;
                    vertical-align: middle;
                    @media screen and (max-width: 992px ) {
                        max-width: 110px;
                    }
                }
                &:hover {
                    text-decoration: none;
                }
            }
        }
        .book-index {
            text-align: left;
            font-size: 14px;
            ul {
                padding: 0 0 0 20px;
                li {
                    padding: 5px;
                    a {
                        color: #212121;
                    }
                    &.isActive a {
                        font-weight: bold;
                    }
                }
            }
        }
        .follow-btn-w-count {
            color: #fff;
            margin: 10px;
            font-size: 14px;
            position: relative;
            text-align: center;
            display: block;
            clear: both;
            overflow: hidden;
            cursor: pointer;
            button {
                background: #d0021b;
                border: 1px solid #d0021b;
                border: 1px solid #d0021b;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
                outline: none;
                color: #fff;
                margin: 0;
                padding: 5px 10px;
                display: inline-block;
                clear: both;
                cursor: pointer;
            }
            i {
                vertical-align: middle;
                padding-right: 5px;
                font-size: 18px;
            }
            span {
                background: #fff;
                color: #d0021b;
                display: inline-block;
                border: 1px solid #d0021b;
                padding: 5px 10px;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                b {
                    font-size: 12px;
                }
            }
        }
    }
    .overlay, .overlay-1, .overlay-2 {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 998;
        display: none;
        top: 0;
        left: 0;
    }
    .overlay-1, .overlay-2 {
        z-index: 9;
    }
    #readerOptions {
        max-width: 350px;
        margin: 50px auto;
    }
    .options {
        margin: 20px 0 0;
        .option {
            text-align: left;
            font-size: 14px;
            border-bottom: 1px solid #fff;
            padding-bottom: 10px;
            margin-bottom: 5px;
            .buttons {
                display: inline-block;
                vertical-align: middle;
                margin: 0 15px 0 0;
                button {
                    border: 0;
                    background: #fff;
                    cursor: pointer;
                    i {
                        font-size: 20px;
                        vertical-align: middle;
                    }
                    &:focus {
                        outline: none;
                    }
                    .fa-icon {
                        vertical-align: middle;
                    }
                    &.yellow .fa-icon {
                        background: #F4ECD8;
                    }
                }
            }
            .lh-icon {
                height: 24px;
                width: 24px;
                display: block;
                margin: auto;
                background-color: transparent;
                background-repeat: no-repeat;
                cursor: pointer;
                &.active {
                    opacity: 0.5;
                }
            }
            .lh-sm-icon {
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEwLjMgMy4zaDEydjJoLTEyek0xMC4zIDE5LjNoMTJ2MmgtMTJ6TTEwLjMgMTEuM2gxMnYyaC0xMnpNMTAuMyAxNS4zaDEydjJoLTEyek0xMC4zIDcuM2gxMnYyaC0xMnpNNC4zIDguM0gxLjhsMy41IDMuNSAzLjUtMy41SDYuM3YtNWgtMk0xLjggMTYuNGwzLjUtMy41IDMuNSAzLjVINi4zdjVoLTJ2LTUiLz48L3N2Zz4=);
            }
            .lh-md-icon {
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTMuNCAzLjRoMTcuM3YySDMuNHpNMy40IDE5LjRoMTcuM3YySDMuNHpNMy40IDE0aDE3LjN2MkgzLjR6TTMuNCA4LjdoMTcuM3YySDMuNHoiLz48L3N2Zz4=);
            }
            .lh-lg-icon {
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTkuOSAzLjNoMTJ2MmgtMTJ6TTkuOSAxOS4zaDEydjJoLTEyek05LjkgMTEuM2gxMnYyaC0xMnpNMy45IDYuOEgxLjRsMy41LTMuNSAzLjUgMy41SDUuOXY1aC0yTTEuNCAxNy45bDMuNSAzLjUgMy41LTMuNUg1Ljl2LTVoLTJ2NSIvPjwvc3ZnPg==);
            }
        }
    }
    .book-content {
        .font-12 {
            font-size: 12px;
        }
        .font-14 {
            font-size: 14px;
        }
        .font-16 {
            font-size: 16px;
        }
        .font-18 {
            font-size: 18px;
        }
        .font-20 {
            font-size: 20px;
        }
        .font-22 {
            font-size: 22px;
        }
        .font-24 {
            font-size: 24px;
        }
        .font-26 {
            font-size: 26px;
        }
        .font-28 {
            font-size: 28px;
        }
        .font-30 {
            font-size: 30px;
        }
        .font-32 {
            font-size: 32px;
        }
        .lh-sm {
            line-height: 1.4em;
        }
        .lh-md {
            line-height: 1.7em;
        }
        .lh-lg {
            line-height: 2em;
        }
    }
    #reportModal {
        text-align: left;
        max-width: 350px;
        margin: 50px auto;
        .form-group {
            font-size: 14px;
        }
        .btn-submit {
            background: #d0021b;
            border: 0;
            font-size: 14px;
            float: right;
        }
        .cancel {
            background: none;
            border: 0;
            float: right;
            font-size: 12px;
            line-height: 33px;
        }
    }
    .review-popout, .rating-popout {
        height: 60vh;
        width: 96%;
        max-width: 700px;
        position: fixed;
        margin-bottom: 46px;
        margin-left: 7px;
        bottom: -100vh;
        overflow: hidden;
        overflow-y: auto;
        text-align: left;
        background: #fff;
        box-shadow: 0 -1px 2px rgba(0,0,0,0.5);
        transition: all 0.5s;
        z-index: 10;
        .close-review {
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 9;
            background: none;
            border: 0;
        }
        &.show {
            bottom: 0;
        }
    }
    .rating-popout {
        height: auto;
        z-index: 11;
        min-height: 150px;
    }
}
.theme-white {
    background: #fff !important;
    color: #2c3e50 !important;
}
.theme-black {
    background: #000 !important;
    color: #fff !important;
    i {
        color: #fff !important;
    }
    .modal {
        color: #2c3e50 !important;
        i {
            color: #2c3e50 !important;
        }
    }
    
}
.theme-yellow {
    background: #F4ECD8 !important;
    color: #2c3e50 !important;
}
</style>
<style lang="scss">
.rating-popout {
    .all-reviews, .show-more, .write-review-btn {
        display: none !important;
    }
    .comments-list li {
        display: none !important;
        &:first-child {
            display: block !important;
        }
        .comment-box .rate-now .rating {
            width: 200px;
            label:before {
                font-size: 35px;
            }
        }
    }
}
</style>
