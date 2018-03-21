<template>
    <!-- Report Modal -->
    <div class="modal fade multiinput" id="multiinput" tabindex="-1" role="dialog" aria-labelledby="multiinputLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="reportModalLabel">__("pratilipi_edit_info")</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label>__("writer_input_title")</label>
                            <input type="text" class="form-control" :placeholder="'__("writer_input_title")'">
                        </div>
                        <div class="form-group">
                            <label>__("writer_input_title_en")</label>
                            <input type="text" class="form-control" :placeholder="'__("writer_input_title_en")'">
                        </div>
                        <button type="button" class="btn btn-submit">__("submit")</button>
                        <button type="button" class="cancel" data-dismiss="modal" aria-label="Close">__("cancel")</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters([
            'getInputModalTitle',
            'getInputModalActionAndData'
        ])
    },
    methods: {
        ...mapActions([
            'dispatchAction',
            'updatePrefilledValue'
        ]),
        dispatchActionAndCloseModal() {
            $('#reportModal').modal('hide');
            this.dispatchAction();
        }
    }
}
</script>


<style lang="scss" scoped>
.multiinput {
    text-align: left;
    max-width: 350px;
    margin: 50px auto;
    .modal-body {
        padding-top: 0;
    }
    .form-group {
        font-size: 14px;
    }
    .btn-submit {
        background: #d0021b;
        color: #fff;
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
</style>
