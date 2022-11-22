<template>
<div
    class="chatbot-container">
    <div
        class="chat-ids-dropdown">
        <label for="chatsList">
            {{ $t('titles.dropdownTitle') }}
        </label>
        <select
            v-tooltip="getTooltipObject($t('tooltips.dropdownTooltip'))"
            v-model="selectedChatId"
            name="chatsList"
            id="chatsList"
            class=""
            >
            <option
                v-for="(chatId, index) in chatIdsList"
                :key="index"
                :value="chatId"
            >
            {{ chatId }}
            </option>
        </select>
    </div>
    <chat-question
        v-for="(question, questionIndex) in displayedChat"
        :key="questionIndex"
        :question="question"
        :question-number="questionIndex + 1"
    />
</div>  
</template>

<script>
import { mapGetters } from 'vuex'
import ChatQuestion from '../components/ChatQuestion/index.vue'
import { getVTooltipObject } from '../common/helper.js'

export default {
    name: 'ScreeningChatbotBuilder',

    components: {
        ChatQuestion,
    },

    data () {
        return {
        selectedChatId: null,
        }
    },

    created () {
        this.selectedChatId = this.getChatIdsList()[0]
    },

    computed: {
        ...mapGetters([
            'getChatbyId',
            'getChatIdsList',
        ]),
        chatIdsList () {
            return this.getChatIdsList()
        },
        displayedChat () {
            return this.getChatbyId(this.selectedChatId)
        }
    },

    methods: {
        getTooltipObject: function (content) {
            return getVTooltipObject(content)
        },
    }
}
</script>

<style>
.chatbot-container {
    padding: 2em;
    display: flex;
    flex-direction: column;
}
.chat-ids-dropdown { 
    margin-bottom: 1em;
}
.chat-ids-dropdown > select {
    margin-left: 1em;
}
</style>