<template>
    <div id="text-area">
        <label>
            <span v-show="isRequired">Must</span>{{ label }}
        </label>
        <textarea :id="id" :placeholder="placeholder" v-model="localValue" @blur="validateInput" rows="4"
            :maxlength="maxLength" :class="{ 'warning': error }"></textarea>
        <p v-if="error" class="error-message">
            {{ error }}
        </p>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    label: {
        type: String,
    },
    placeholder: {
        type: String,
        default: 'Nhập vào đây...',
    },
    id: {
        type: String,
        default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`,
    },
    maxLength: {
        type: Number,
        default: 1000,
    },
    isRequired: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref('');

watch(
    () => localValue.value,
    (newValue) => {
        emit('update:modelValue', newValue);
    },
    { immediate: true }
);

const error = ref('');

const validateInput = () => {
    if (props.isRequired) {
        if (!localValue.value.trim()) {
            error.value = 'Trường này không được để trống.';
        } else if (localValue.value.length > props.maxLength) {
            error.value = `Độ dài tối đa là ${props.maxLength} ký tự.`;
        } else {
            error.value = '';
        }
    } else {
        error.value = '';
    }
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
    border-radius: 4px;
}

#text-area textarea:focus {
    outline: none;
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

.error-message {
    color: red;
    margin: 3px !important;
    font-size: 12px;
}

.warning {
    border-color: red !important;
}
</style>