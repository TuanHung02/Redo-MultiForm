<template>
    <div id="first-layout">
        <form id="third-form" method="get" @change="handleChangeSubmit" @submit.prevent>
            <InputArea label="Lý do muốn ứng tuyển vào công ty" :isRequired="true" v-model="thirdForm.reason"
                :maxLength="1000"></InputArea>
            <p style="margin: 3px !important;">
                {{ thirdForm.reason.length }}/1000
            </p>
            <InputText v-model="thirdForm.salary" type="text" name="salary" label="Mức lương mong muốn"
                placeholder="Nhập số tiền mong muốn" :maxLength="10" :isRequired="true" :isNumber="true"
                style="width: 230px" />
        </form>
    </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";
import InputText from "./InputText.vue";
import InputArea from "./InputArea.vue";
import { useStore } from "vuex";

const store = useStore();
const isDisable = ref(true);
store.commit('setDisable', isDisable);

const thirdForm = reactive({
    reason: "",
    salary: "",
    isChecked: false
});

watch(
    () => store.state.info.thirdForm,
    (newVal) => {
        Object.assign(thirdForm, newVal);
    },
    { deep: true }
);

const handleChangeSubmit = () => {
    isDisable.value = !(thirdForm.reason?.length > 0 && thirdForm.salary?.length > 0);

    thirdForm.isChecked = !isDisable.value
    store.commit('setThirdForm', thirdForm);
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