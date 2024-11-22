<template>
    <div class="input-item">
        <label :for="name">
            <span v-show="props.isRequired">Must</span>{{ props.label }}
        </label>
        <div class="input-zone">
            <input :type="props.type" :id="props.name" :placeholder="props.placeholder" :value="props.valueInput" @input="onInputValue"
                @change="handleChangeInput" :maxlength="props.maxLength" :style="props.styleBox" :class="props.classBox" />
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    label: String,
    placeholder: String,
    classBox: String,    
    type: String,
    name: String,
    valueInput: String,
    maxLength: String,
    styleBox: String,   
    isRequired: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:valueInput', 'handleChangeInput']);

const onInputValue = (e) => {
    const inputText = e.target.value;
    emit('update:valueInput', inputText);
};

const handleChangeInput = () => {
    emit('handleChangeInput');
};
</script>

<style scoped>
.input-item {
    display: flex;
    flex-direction: column;
    width: 528px;
    text-align: start;
    margin-bottom: 10px;
}

.input-item label {
    margin-bottom: 6px;
}

.input-item span {
    font-size: 12px;
    color: #fff;
    padding: 5px 8px;
    background-color: #627d98;
    line-height: 20px;
    border-radius: 3px;
    margin-right: 8px;
}

.input-item input {
    padding: 8px 10px;
    font-size: 14px;
    outline: none;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    width: 100%;
}

.input-item p {
    display: inline-block;
}

.input-item input[type="date"] {
    width: 118px;
    margin-right: 48px;
    font-size: 12px;
}

.input-zone {
    position: relative;
}

.active input[type="date"] {
    border-color: red !important;
    color: red;
}

.active input {
    border-color: red;
    color: red;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>