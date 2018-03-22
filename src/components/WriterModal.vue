<template>
    <!-- Writer Modal -->
    <div class="modal fade writermodal" id="writermodal" tabindex="-1" role="dialog" aria-labelledby="writermodalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="writermodalLabel">__("writer_add_content_title")</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="material-icons">close</i>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="pratilipi_write_language">__("writer_select_language")</label>
                            <select class="form-control" id="pratilipi_write_language">
                                <option>HINDI</option>
                                <option>MALAYALAM</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="pratilipi_write_title_input">__("writer_input_title") *</label>
                            <input type="text" class="form-control" id="pratilipi_write_title_input" :placeholder="'__("writer_input_title")'">
                        </div>
                        <div class="form-group">
                            <label for="pratilipi_write_title_en_input">__("writer_input_title_en")</label>
                            <input type="text" class="form-control" id="pratilipi_write_title_en_input" :placeholder="'__("writer_input_title_en")'">
                        </div>
                        <div class="form-group">
                            <label for="pratilipi_write_type">__("write_type")</label>
                            <select class="form-control" id="pratilipi_write_type">
                                <option>POEM</option>
                                <option>STORY</option>
                                <option>ARTICLE</option>
                            </select>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="agree-terms-conditions">
                            <label class="form-check-label" for="agree-terms-conditions">__("writer_accept_copyright")</label>
                        </div>
                        <a href="/terms-of-service" class="terms-link" target="_blank">__("writer_read_copyright")</a>
                        <button type="button" class="btn btn-submit" disabled>__("writer_to_next_screen")</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    
}
</script>

<style lang="scss" scoped>
.writermodal {
    text-align: left;
    max-width: 800px;
    margin: 50px auto;
    .modal-header {
        padding: 15px 15px 10px;
    }
    .form-group {
        font-size: 14px;
    }
    .form-check label {
        font-size: 12px;
        padding-left: 5px;
    }
    .terms-link {
        font-size: 12px;
        color: #212121;
        border-bottom: 1px solid;
        &:hover {
            text-decoration: none;
        }
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
