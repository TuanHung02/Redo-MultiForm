<template>
    <div id="first-layout">
        <form id="first-form" method="get" @submit.prevent>
            <InputText label="Họ và tên" name="full-name" type="text" :isRequired="true">
            </InputText>

            <InputText label="Ngày sinh" name="date-picker" type="date" :isRequired="true"></InputText>

            <InputArea label="Mô tả về bản thân" :maxLength="1000"></InputArea>


        </form>
    </div>
</template>

<script setup>
import InputText from "./InputText.vue";
import InputArea from "./InputArea.vue";


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
}
</style>