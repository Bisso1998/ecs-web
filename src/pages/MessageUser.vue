<template>
    <MainLayout>
        <div class="message-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Messages</h2>
                        <div class="chat-header individual">
                            <div class="back-btn"><i class="material-icons">arrow_back</i></div>
                            <div class="user-img"><img alt="" src="https://0.ptlp.co/author/image?width=60"></div>
                            <div class="user-name">Rahul</div>
                            <div class="options" id="chat-user-more-option"><i class="material-icons">more_vert</i></div>
                            <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="material-icons">more_vert</i>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button type="button" class="btn report-btn" data-toggle="modal" data-target="#reportModal">View profile</button>
                                <button type="button" class="btn report-btn" data-toggle="modal" data-target="#reportModal">Delete Conversation</button>
                                <button type="button" class="btn report-btn" data-toggle="modal" data-target="#reportModal">Block User</button>
                            </div>
                        </div>
                        <!-- <Spinner></Spinner> -->
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import Spinner from '@/components/Spinner.vue';

export default {
    components: {
        MainLayout,
        Spinner
    }
}
</script>

<style lang="scss" scoped>
.message-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px) {
        margin-top: 65px;
        text-align: center;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        @media screen and (max-width: 768px) {
            font-size: 18px;
        }
    }
    .chat-header {
        background: #e9e9e9;
        height: 50px;
        padding: 5px 0;
        width: 100%;
        color: #000;
        position: relative;
        z-index: 2;
        top: 0;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.20), 0 1px 0 0 #e9e9e9;
        .back-btn {
            float: left;
            color: #000;
            padding: 0 10px;
            i {
                line-height: 50px;
            }
        }
        .title {
            float: left;
            font-size: 21px;
            line-height: 50px;
            padding-left: 5px;
        }
    }
    .chat-header.individual {
        position: relative;
        .user-img {
            float: left;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-top: 5px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .user-name {
            float: left;
            line-height: 50px;
            margin-left: 10px;
            font-size: 18px;
        }
        .options {
            float: right;
            color: #fff;
            i {
                line-height: 50px;
                padding: 0 10px;
            }
        }
    }
}
</style>
