<template>
    <div id="second-form">
        <form @change="checkButton" @submit.prevent>
            <div class="form-group" v-for="item in companyList" :key="item.id"
                :class="{ 'warning-box': checkExpCount }">
                <div class="select-box">
                    <InputText v-model="item.company" type="text" name="company" placeholder="Nhập tên của bạn"
                        :maxLength="100" style="max-width: 780px;" />

                    <button @click="handleDelete(item.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="26" height="26" x="0" y="0" viewBox="0 0 512 512"
                            style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
                            <g>
                                <path
                                    d="M436 62h-89.022l-9.842-31.023-.067-.208A44.946 44.946 0 0 0 294.377 0h-76.754a44.944 44.944 0 0 0-42.691 30.769l-.067.208L165.022 62H76c-24.813 0-45 20.187-45 45v30c0 8.284 6.716 15 15 15h16.189L88.57 470.953l.011.122C90.703 494.406 109.97 512 133.396 512h245.207c23.427 0 42.693-17.594 44.815-40.925l.011-.122L449.811 152H466c8.284 0 15-6.716 15-15v-30c0-24.813-20.187-45-45-45zM203.421 40.171A14.982 14.982 0 0 1 217.623 30h76.754a14.98 14.98 0 0 1 14.202 10.171L315.504 62H196.496l6.925-21.829zm190.116 428.236A14.926 14.926 0 0 1 378.604 482H133.396a14.928 14.928 0 0 1-14.934-13.593L92.292 152h327.416l-26.171 316.407zM451 122H61v-15c0-8.271 6.729-15 15-15h259.898c.033 0 .065.004.098.004.034 0 .069-.004.103-.004H436c8.271 0 15 6.729 15 15v15z"
                                    fill="#000000" opacity="1" data-original="#000000" class=""></path>
                                <path
                                    d="M166 182c-8.284 0-15 6.716-15 15v240c0 8.284 6.716 15 15 15s15-6.716 15-15V197c0-8.284-6.716-15-15-15zM256 182c-8.284 0-15 6.716-15 15v240c0 8.284 6.716 15 15 15s15-6.716 15-15V197c0-8.284-6.716-15-15-15zM346 182c-8.284 0-15 6.716-15 15v240c0 8.284 6.716 15 15 15s15-6.716 15-15V197c0-8.284-6.716-15-15-15z"
                                    fill="#000000" opacity="1" data-original="#000000" class=""></path>
                            </g>
                        </svg>
                    </button>
                </div>
                <InputText v-model="item.position" type="text" name="position" label="Vị trí từng làm"
                    placeholder="Nhập vị trí từng làm" :maxLength="100" :isRequired="true" />
                <InputArea label="Mô tả công việc" v-model="item.description" :maxLength="1000"></InputArea>
                <p style="margin: 3px !important;">
                    {{ item.description.length }}/1000
                </p>
            </div>
            <p class="add-button" @click="handleAdd">
                <span>Thêm công ty</span>
            </p>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import InputText from "./InputText.vue";
import InputArea from "./InputArea.vue";

const companyList = reactive([
    {
        id: 1,
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
    },
]);

const checkExpCount = ref(false);

const handleAdd = () => {
    const uniqueKey = Math.random().toString(36).substring(2);
    companyList.push({
        id: uniqueKey,
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
    });
    checkExpCount.value = false;
    // Use Vuex to commit the new state
    // this.$store.commit("SET_SECOND_FORM", companyList);
};

const handleDelete = (id) => {
    const index = companyList.findIndex(item => item.id === id);
    if (companyList.length > 1) {
        companyList.splice(index, 1);
        checkExpCount.value = false;
    } else {
        checkExpCount.value = true;
    }
};


</script>

<style scoped>
#second-form {
    width: 932px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.form-group {
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 24px 24px 24px 24px;
    margin-bottom: 28px;
}

.form-group .select-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: #f8f8f8;
    border-radius: 4px;
    margin-bottom: 24px;
}

.form-group .select-box select {
    flex: 80%;
    padding: 8px 10px;
    margin: 10px 0 10px 10px;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
}

.form-group .select-box select:focus {
    outline: none;
}

.form-group .select-box button {
    padding: 14px;
    border: none;
    background: #f8f8f8;
}

.add-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 151px;
    font-size: 16px;
    padding: 8px 8px 8px 0;
    margin: 20px 0 24px 0;
    border: 1px solid #dcdcdc;
    border-radius: 3px;
}

.add-button span {
    font-size: 16px;
    line-height: 24px;
    color: #48647f;
}

.add-button img {
    padding: 0 8px;
}

.select-box .input-item {
    width: 898px;
    justify-content: center;
    margin-left: 16px;
    margin-bottom: 0;
}

.input-time:before {
    content: "";
    position: absolute;
    width: 11px;
    border: 1px solid #bdbdbd;
    left: 135px;
}

.warning-box {
    border-color: red;
}

.warning input[type="date"] {
    border-color: red;
}

p {
    text-align: start;
    margin-bottom: 10px;
}

p.warning {
    color: red;
}
</style>