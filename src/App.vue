<template>
  <div id="app">
    <HeaderStep :currentStep="currentStep" :step="step" />
    <keep-alive>
      <component :is="component" />
    </keep-alive>
    <StepButton @handleNext="handleNext" @handleBack="handleBack" :currentStep="currentStep" />
    <div v-if="isDone">{{ info }}</div>
  </div>
</template>

<script setup>
import { ref, shallowRef, computed } from 'vue';
import FirstForm from './components/FirstForm.vue';
import ThirdForm from './components/ThirdForm.vue';
import SecondForm from './components/SecondForm.vue';
import StepButton from './components/StepButton.vue';
import { useStore } from 'vuex';
import HeaderStep from './components/HeaderStep.vue';

const store = useStore();
const info = computed(() => store.state.info);
const isDone = ref(false)
const currentStep = ref(2);
const component = shallowRef(SecondForm);

const step = [
  { id: 1, name: "Thông tin cá nhân", class: "first-step" },
  { id: 2, name: "Kinh nghiệm làm việc", class: "second-step" },
  { id: 3, name: "Xác nhận thông tin", class: "third-step" }
];

const handleNext = () => {
  if (component.value === FirstForm) {
    component.value = SecondForm;
    currentStep.value = 2;
  } else if (component.value === SecondForm) {
    component.value = ThirdForm;
    currentStep.value = 3;
  } else if (component.value === ThirdForm) {
    alert('Send data successfully!')
    console.log(info.value)
    isDone.value = true
  };
}

const handleBack = () => {
  if (component.value === ThirdForm) {
    component.value = SecondForm;
    currentStep.value = 2;
    store.commit('setDisable', false);
  } else if (component.value === SecondForm) {
    component.value = FirstForm;
    currentStep.value = 1;
    store.commit('setDisable', false);
  }
};
</script>