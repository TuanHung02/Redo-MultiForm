<template>
    <div class="button-control">
        <button v-show="currentStep > 1 && currentStep < 4" @click="handleBack">
            Quay lại
        </button>
        <button v-show="currentStep < 3" @click="handleNext" form="first-form" :disabled="isDisable">
            Tiếp
        </button>
        <button v-show="currentStep == 3" @click="handleNext" type="submit" :disabled="isDisable">
            Hoàn Thành
        </button>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';

defineProps({
    currentStep: Number,
});

const emit = defineEmits(['handleBack', 'handleNext']);

const store = useStore();

const isDisable = computed(() => store.getters.isDisable);
const handleBack = () => {
    emit('handleBack');
};

const handleNext = () => {
    emit('handleNext');
};
</script>

<style scoped>
.button-control {
    width: 932px;
    display: flex;
    flex-direction: row;
    margin: 24px auto;
}

.button-control button {
    padding: 10px 30px;
    background: #627d98 !important;
    color: white;
    border-radius: 3px;
    border: none;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    margin-right: 26px;
}

button:disabled {
    background: #dcdcdc !important;
}

button {
    cursor: pointer;
}
</style>