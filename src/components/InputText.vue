<template>
    <div class="input-item">
        <label :for="name">
            <span v-show="isRequired">Must</span>{{ label }}
        </label>
        <div class="input-zone">
            <input :id="id" :type="type" :name="name" :placeholder="placeholder" v-model="localValue"
                @blur="validateInput" @input="handleInput" :class="{ 'warning': error }" />
            <slot></slot>
        </div>
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
        default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
    },
    isRequired: {
        type: Boolean,
        default: false
    },
    maxLength: {
        type: Number,
        default: 100,
    },
    name: {
        type: String,
        default: 'text',
    },
    type: {
        type: String,
        default: 'text',
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

const handleInput = () => {
    if (localValue.value.length > props.maxLength) {
        localValue.value = localValue.value.slice(0, props.maxLength); // Giới hạn độ dài
    }
};

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
        // Nếu không cần validate, xóa lỗi (nếu có)
        error.value = '';
    }
};

</script>

<style scoped>
.input-item {
    display: flex;
    flex-direction: column;
    width: 506px;
    text-align: start;
    margin-bottom: 10px;
}

.input-item label {
    margin-bottom: 6px;
}

.input-item span {
    font-size: 12px;
    color: #fff;
    padding: 2px 8px;
    background-color: rgba(98, 125, 152, 1);
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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