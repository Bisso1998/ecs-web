<template>
    <div class="modal fade share-modal" id="share_modal" tabindex="-1" role="dialog" aria-labelledby="share_modalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">__("share")</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body social">
              <a href="#" class="fb" target="_blank">
                  <span class="social-icon"><icon name="facebook-f"></icon></span>
                  __("facebook")
              </a>
              <a href="#" class="twitter" target="_blank">
                 <span class="social-icon"><icon name="twitter"></icon></span>
                 __("twitter")
              </a>
              <a href="#" class="google" target="_blank">
                  <span class="social-icon"><icon name="google-plus"></icon></span>
                  __("google_plus")
              </a>
              <a href="#" class="whatsapp" target="_blank">
                  <span class="social-icon"><icon name="whatsapp"></icon></span>
                  __("whatsapp")
              </a>
              <a href="#" class="link">
                  <span class="social-icon"><icon name="link"></icon></span>
                  copy link
              </a>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import 'vue-awesome/icons/facebook-f'
import 'vue-awesome/icons/twitter'
import 'vue-awesome/icons/google-plus'
import 'vue-awesome/icons/whatsapp'
import 'vue-awesome/icons/link'

export default {
    
}
</script>

<style lang="scss" scoped>
    .share-modal {
        max-width: 320px;
        margin: 50px auto 0;
        .social a {
            vertical-align: middle;
            color: #2c3e50;
            display: block;
            text-align: left;
            margin: 0 10px 20px;
            font-size: 14px;
            .social-icon {
                display: inline-block;
                width: 40px;
                height: 40px;
                background: #3b5998;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                line-height: 40px;
                margin-right: 15px;
            }
            .fa-icon {
                vertical-align: middle;
            }
            &:hover {
                text-decoration: none;
            }
        }
        .social a.twitter .social-icon  {
            background: #00aced;
        }
        .social a.google .social-icon { 
            background: #dd4b39;
        }
        .social a.whatsapp .social-icon {
            background: #48C631;
        }
        .social a.link .social-icon {
            background: #2c3e50;
        }
    }
</style>
