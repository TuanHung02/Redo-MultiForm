<template>
    <div id="first-layout">
        <form id="first-form" method="get" @change="handleChangeSubmit" @submit.prevent>
            <InputText v-model="firstForm.fullName" type="text" name="fullName" label="Họ và tên"
                placeholder="Nhập tên của bạn" :maxLength="100" :isRequired="true" />
            <InputText label="Ngày sinh" name="date-picker" type="date" :isRequired="true" v-model="firstForm.date">
            </InputText>
            <SelectOptions :list="listCities" label="Thành Phố" v-model="firstForm.city"></SelectOptions>
            <InputArea label="Mô tả về bản thân" v-model="firstForm.description" :maxLength="1000"></InputArea>
            <p style="margin: 3px !important;">
                {{ firstForm.description.length }}/1000
            </p>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import InputText from "./InputText.vue";
import InputArea from "./InputArea.vue";
import SelectOptions from "./SelectOptions.vue";
import { citiesData } from "@/data";
import { useStore } from "vuex";

const store = useStore();

const firstForm = reactive({
    fullName: "",
    date: "",
    city: "",
    description: "",
});

const isDisable = ref(true);
const listCities = ref(citiesData);

watch(
    () => store.state.info.firstForm,
    (newVal) => {
        Object.assign(firstForm, newVal);
    },
    { deep: true }
);

const handleChangeSubmit = () => {
    if (firstForm.fullName !== '' && firstForm.date !== '') {
        isDisable.value = false
    } else {
        isDisable.value = true
    }
    store.commit('setFirstForm', firstForm);
    store.commit('setDisable', isDisable);
};


</script>

<style scoped>
#first-layout {
    display: flex;
    flex-direction: column;
    width: 926px;
    margin: 0 auto;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 20px 14px;
}

p {
    text-align: start;
    margin-bottom: 10px;
}

p.active {
    color: red;
}

.active textarea {
    border-color: red !important;
}

.warning {
    color: red;
    margin: 0 !important;
}
</style>