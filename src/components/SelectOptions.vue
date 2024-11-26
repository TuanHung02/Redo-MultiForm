<template>
    <div class="input-item">
        <label for="select-option">{{ label }}</label>
        <select id="select-option" name="select-option" v-model="localValue" @change="handleChangeSelect">
            <option v-for="item in list" :key="item.id" :value="item.name">
                {{ item.name }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
defineProps({
    list: Array,
    label: String,
    modelValue: String, // Sử dụng modelValue thay vì selectValue
});

const emit = defineEmits(["update:modelValue", "onChangeSelect"]);

const localValue = ref('');

watch(
    () => localValue.value,
    (newValue) => {
        emit('update:modelValue', newValue);
    },
    { immediate: true }
);

const handleChangeSelect = () => {
    emit("onChangeSelect");
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

.input-item select {
    padding: 10px;
    border: 1px solid #dbdbdb;
    outline: none;
    background: #fff;
    border-radius: 4px;
}

select::-webkit-scrollbar {
    display: none;
}
</style>
