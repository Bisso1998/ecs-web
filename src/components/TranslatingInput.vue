<template>
    <span>
        <input type="text" class="form-control" 
            :value="value" 
            @keyup.up="goUpInSuggestions"
            @keyup.down="goDownInSuggestions"
            @input="getTranslation"
            @keyup.enter="selectSuggestion"
            @blur="suggestions = 0; selectedSuggestion = 0"
            name="" >
        <ul>
            <li v-for="(eachSuggestion, index) in suggestions" :class="{ 'active': index === selectedSuggestion }" :key="index" @click="selectTranslatedWord(eachSuggestion)">{{ eachSuggestion }}</li>
        </ul>
    </span>
</template>

<script>
import mixins from '@/mixins'

export default {
    name: 'tranliteration',
    mixins: [
        mixins
    ],
    props: {
        value: {
            type: String
        },
        oninput: {
            type: Function
        }
    },
    computed: {

    },
    data() {
        return {
            suggestions: [],
            selectedSuggestion: 0
        }
    },
    watch:{
    },
    methods: {
        getTranslation(e) {
            this.oninput(e.target.value);
            const fullString = e.target.value;
            const lastWord = fullString.split(' ').pop();

            const that = this;
            if (lastWord === '') {
                this.suggestions = [];
                this.selectedSuggestion = 0;
            }

            if (lastWord.trim().length > 0) {
                this.translateWord(lastWord, (suggestions) => {
                    that.suggestions = suggestions
                });
            }
        },
        selectTranslatedWord(selectedWord) {
            const currentText = this.value;
            const words = currentText.split(' ');
            words.pop();
            words.push(selectedWord);
            const textWithoutLastWord = words.join(' ');
            this.oninput(textWithoutLastWord);
        },
        goUpInSuggestions() {
            if (this.suggestions.length === 0) {
                return;
            }

            const totalSuggestions = this.suggestions.length;
            if (this.selectedSuggestion === 0) {
                return;
            }
            this.selectedSuggestion--;
            console.log('One should go up - ', this.selectedSuggestion);
        },
        goDownInSuggestions() {
            if (this.suggestions.length === 0) {
                return;
            }

            const totalSuggestions = this.suggestions.length;
            if (this.selectedSuggestion >= (totalSuggestions - 1)) {
                return;
            }
            this.selectedSuggestion++;
            console.log('You should go down down down - ', this.selectedSuggestion);
        },
        selectSuggestion() {
            this.selectTranslatedWord(this.suggestions[this.selectedSuggestion]);
        }
    }
}
</script>

<style>
    .pratilipi-alert {
        margin: 10px 0 0;
        position: fixed;
        bottom: 0;
        z-index: 5;
        background: #323232;
        color: #fff;
        font-size: 14px;
        border-radius: 0;
        text-align: left;
        display: none;
        width: 100%;
    }
</style>
