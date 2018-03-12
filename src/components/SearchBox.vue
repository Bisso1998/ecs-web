<template>
    <div class="search-dropdown">
        <ul class="search-options">
            <li><a href="#"></a></li>
        </ul>
        <div class="trending">
            <div class="title">__("search_trending_heading")</div>
            <div class="tags">
                <a href="#">#trendingtag1</a>
                <a href="#">#trendingtag2</a>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    
}
</script>

<style lang="scss" scoped>
    .search-dropdown {
        background: #fff;
        border: 1px solid #ced4da;
        border-top: 0;
        position: absolute;
        z-index: 2;
        margin: -5px 0 0 -1px;
        width: 100%;
        box-sizing: content-box;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        display: none;
        .search-options {
            padding: 0;
            margin: 0;
            list-style: none;
            text-align: left;
            font-size: 14px;
            border-bottom: 1px solid #eee;
            a {
                padding: 5px 10px;
                display: block;
            }
        }
        .title {
            font-size: 16px;
            font-weight: bold;
            text-align: left;
            border-left: 3px solid #d0021b;
            padding-left: 10px;
            margin: 10px 0 0 5px;
        }
        .tags {
            text-align: left;
            padding: 5px 5px 10px;
            a {
                padding: 5px;
                font-size: 12px;
            }
        }
    }
</style>
