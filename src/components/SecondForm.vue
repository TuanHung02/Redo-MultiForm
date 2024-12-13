<template>
    <div id="second-form">
        <form id="second-form" method="get" @change="handleChangeSubmit" @submit.prevent>
            <div class="form-group" v-for="item in companyList.data" :key="item.id">
                <div class="select-box">
                    <InputText label="Tên công ty" v-model="item.company" type="text" name="company"
                        placeholder="Nhập tên công ty" :isRequired="true" :maxLength="100"
                        style="max-width: 780px; height: 110px" />
                    <button @click="handleDelete(item.id)">
                        <TrashIcon />
                    </button>
                </div>
                <InputText v-model="item.position" type="text" name="position" label="Vị trí từng làm"
                    placeholder="Nhập vị trí từng làm" :maxLength="100" :isRequired="true" />
                <div
                    style="display: flex; align-items: center; justify-content: flex-start; gap: 10px; width: 450px; position: relative ">
                    <InputText label="Ngày bắt đầu" name="date-picker" type="date" v-model="item.start_date"
                        :isRequired="true">
                    </InputText>
                    <InputText label="Ngày kết thúc" name="date-picker" type="date" :isRequired="true"
                        v-model="item.end_date">
                    </InputText>
                    <p v-if="overlappingCompanies.includes(item.id)" class="warning">
                        Khoảng thời gian không hợp lệ.
                    </p>
                </div>
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
import { reactive, watch, ref } from 'vue';
import InputText from "./InputText.vue";
import InputArea from "./InputArea.vue";
import { useStore } from "vuex";
import TrashIcon from '@/assets/icons/TrashIcon.vue';
const store = useStore();
const isDisable = ref(true);
store.commit('setDisable', isDisable);

const overlappingCompanies = ref([]);
const companyList = reactive({
    data: [
        {
            id: 1,
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
        },
    ], isChecked: false
});

watch(
    () => store.state.info.companyList,
    (newVal) => {
        Object.assign(companyList, newVal);
    },
    { deep: true }
);

const handleAdd = () => {
    const uniqueKey = Math.random().toString(36).substring(2);
    companyList.data.push({
        id: uniqueKey,
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
    });
    store.commit('setSecondForm', companyList);
    store.commit('setDisable', true);
};

const handleDelete = (id) => {
    const index = companyList.data.findIndex(item => item.id === id);
    if (companyList.data.length > 1) {
        companyList.data.splice(index, 1);
        store.commit('setSecondForm', companyList);
    }
};

const handleChangeSubmit = () => {
    overlappingCompanies.value = [];
    let invalidDates = [];
    for (let i = 0; i < companyList.data.length; i++) {
        const startA = new Date(companyList.data[i].start_date);
        const endA = new Date(companyList.data[i].end_date);
        if (startA >= endA) {
            invalidDates.push(companyList.data[i].id);
        }
        for (let j = i + 1; j < companyList.data.length; j++) {
            const startB = new Date(companyList.data[j].start_date);
            const endB = new Date(companyList.data[j].end_date);
            if (
                (startA <= endB && endA >= startB) ||
                (startB <= endA && endB >= startA)
            ) {
                overlappingCompanies.value.push(companyList.data[i].id, companyList.data[j].id);
            }
        }
    }
    isDisable.value = overlappingCompanies.value.length > 0 || invalidDates.length > 0 || companyList.data.some(item =>
        item.company.length === 0 ||
        item.position.length === 0 ||
        item.start_date.length === 0 ||
        item.end_date.length === 0
    );
    overlappingCompanies.value = [...overlappingCompanies.value, ...invalidDates];
    companyList.isChecked = !isDisable.value;
    store.commit('setSecondForm', companyList);
    store.commit('setDisable', isDisable);
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
    margin-top: 0px !important;
    position: absolute;
    bottom: 0px;
    font-size: 12px;
}
</style>