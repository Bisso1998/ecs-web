<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="login_modal" tabindex="-1" role="dialog" aria-labelledby="login_modalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
        			<div class="login-top-section section-default">
        				<div class="dark-mask"></div>
        				<div class="login-top-section-contents"> <!-- Default top section -->
        					<div class="right">
        						<button data-dismiss="modal" class="mdl-button mdl-js-button mdl-button--icon close">
        							<i class="material-icons">close</i>
        						</button>
        					</div>
        					<span class="pratilipi-logo-icon"></span>
        					<h4>Join Pratilipi</h4>
        					<p>20,000 authors. 140,000 stories. 1,300,000 readers."</p>
        				</div>
        			</div>
        			<div class="modal-body pratilipi-login-container login-bottom-section">
        				<div class="login-section">
                            <form>
                                <div class="form-group">
                                    <input type="email" v-model="email" class="form-control" id="loginEmail" placeholder="Enter email">
                                </div>
                                <div class="form-group">
                                    <input type="password" v-model="password" class="form-control" id="loginPassword" placeholder="Password">
                                </div>
                                <button type="button" @click="loginUser({email, password})" class="btn btn-primary">Login</button>
                            </form>
        				</div>
        				<div class="signup-section">
        				
        				</div>
        			</div>
        		</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'login-modal',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    watch:{
        getUserDetails(value) {
            if (value && !value.isGuest) {
                $('#login_modal').modal('hide');
            }
        }
    },
    methods: {
        ...mapActions([
            'loginUser'
        ]),
    }
}

</script>

<style lang="scss" scoped>
.login-top-section {
	background-image: url('../assets/login_default_bg.jpg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	height: 180px;
	color: #fff;
	.dark-mask {
		position: absolute;
		height: 180px;
		width: 100%;
		background: rgba(0,0,0,0.6);
	}
	.login-top-section-contents {
		position: relative;
		text-align: center;
		width: 97%;
		margin: 0 auto;
        text-align: center;
		.right {
			text-align: right;
			button {
				margin-top: 5px;
                color: #fff;
			}
		}
        .pratilipi-logo-icon {
            background: url('../assets/pratilipi_logo.png') no-repeat center;
            width: 50px;
            height: 50px;
            display: block;
            background-size: contain;
            margin: 10px auto;
        }
		h4 {
			margin: 5px 0;
			font-size: 18px;
		}
		p {
			font-size: 14px;
		}
	}
}
.login-section {
    text-align: left;
}
</style>
