<template>
    <div id="first-layout">
        <form id="first-form" method="get" @change="checkButton" @submit.prevent>
            <InputArea label="Lý do muốn ứng tuyển vào công ty" :isRequired="true" v-model="thirdForm.reason"
                :maxLength="1000"></InputArea>
            <p style="margin: 3px !important;">
                {{ thirdForm.reason.length }}/1000
            </p>
            <InputText v-model="thirdForm.salary" type="text" name="salary" label="Mức lương mong muốn"
                placeholder="Nhập tên của bạn" :maxLength="100" :isRequired="true" />
        </form>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import InputText from "./InputText.vue";
import InputArea from "./InputArea.vue";

const thirdForm = reactive({
    reason: "",
    salary: "",
});




const checkStatus = reactive({
    isEmpty: false,
    isOver: false,
    isOverArea: false,
    isDate: false,
});


const checkButton = () => {
    if (
        checkStatus.isOver ||
        checkStatus.isEmpty ||
        checkStatus.isOverArea ||
        checkStatus.isDate
    ) {
        // 
    }
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