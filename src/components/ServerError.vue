<template>
    <div class="server_error">
        <span>__("server_error_message")</span>
        <button type="button" name="button"><i class="material-icons">refresh</i></button>
    </div>  
</template>

<script>

export default {
    
}
</script>

<style  lang="scss" scoped>
.server_error {
    margin: 20px 0;
    padding: 10px;
    background: #f9f9f9;
    font-size: 14px;
    font-style: italic;
    span {
        display: block;
    }
    button {
        background: #d0021b;
        border: 0;
        color: #fff;
        padding: 5px 20px;
        border-radius: 3px;
        margin: 10px;
        cursor: pointer;
        i {
            vertical-align: middle;
            -webkit-transition-duration: 500ms;
            -moz-transition-duration: 500ms;
            -o-transition-duration: 500ms;
             transition-duration: 500ms;
        }
        &:focus {
            outline: none;
        }
        &:active i {
           transform: rotate(360deg);
           -webkit-transform: rotate(360deg);
           -ms-transform: rotate(360deg);
        }
    }
}
</style>
