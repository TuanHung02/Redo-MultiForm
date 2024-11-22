<template>
    <div id="text-area">
        <label>
            <span v-if="isRequired">Must</span>{{ props.label }}
        </label>
        <textarea id="area" v-model="inputValue" :maxlength="props.maxLength" @change="handleChangeInput"></textarea>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
    label: String,
    valueInput: String,
    isRequired: Boolean,
    maxLength: String,
});

const emits = defineEmits(["update:valueInput", "handleChangeInput"]);

const inputValue = computed({
    get: () => props.valueInput,
    set: (value) => emits("update:valueInput", value),
});

const handleChangeInput = () => {
    emits("handleChangeInput");
};
</script>

<style scoped>
#text-area {
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 528px;
    margin-bottom: 10px;
}

#text-area textarea {
    height: 152px;
    overflow: hidden;
    border: 1px solid #dbdbdb;
}

#text-area textarea:focus {
    outline: none;
    border: 1px solid orange;
}

span {
    font-size: 12px;
    color: #fff;
    padding: 5px 8px;
    background-color: #627d98;
    line-height: 20px;
    border-radius: 3px;
    margin-right: 8px;
}

label {
    margin-bottom: 6px;
}

.active textarea {
    border-color: red !important;
}
</style>