<template>
    <div class="input-item">
        <label for="select-option">{{ props.label }}</label>
        <select id="select-option" name="select-option" :value="props.selectValue" @input="handleSelect"
            @change="handleChangeSelect">
            <option v-for="item in props.list" :key="item.id" :value="item.name">
                <span>{{ item.name }}</span>
            </option>
        </select>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    list: Array,
    label: String,
    selectValue: String,
});

const emit = defineEmits(["update:selectValue", "onChangeSelect"]);

const handleSelect = (e) => {
    emit("update:selectValue", e.target.value);
};

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

.input-item select:focus {
    border: 1px solid orange;
}
</style>