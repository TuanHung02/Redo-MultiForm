<template>
  <div id="app">
    <HeaderStep :currentStep="currentStep" :step="steps" @updateStep="handleStepUpdate" :isChecked="checkedStep" />
    <keep-alive>
      <component :is="component" />
    </keep-alive>
    <StepButton @handleNext="handleNext(currentStep)" @handleBack="handleBack(currentStep)"
      :currentStep="currentStep" />
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
//commit
const store = useStore();
const info = computed(() => store.state.info);
const isDone = ref(false)
const currentStep = ref(1);
const component = shallowRef(FirstForm);
const checkedStep = ref(1)

const steps = [
  { id: 1, name: "Thông tin cá nhân", class: "first-step" },
  { id: 2, name: "Kinh nghiệm làm việc", class: "second-step" },
  { id: 3, name: "Xác nhận thông tin", class: "third-step" }
];

const setCheckedStep = () => {
  if (info.value.firstForm.isChecked && !info.value.companyList.isChecked) {
    checkedStep.value = 2
  } else if (info.value.companyList.isChecked) {
    checkedStep.value = 3
  } else {
    checkedStep.value = 1
  }
  console.log(info.value.companyList.isChecked, checkedStep.value);
}

const components = [null, FirstForm, SecondForm, ThirdForm];

const handleStepUpdate = (index) => {
  setCheckedStep();
  if (index >= 1 && index <= components.length - 1) {
    component.value = components[index];
    currentStep.value = index;
  }
};

const handleNext = (prevStep) => {
  setCheckedStep();
  if (prevStep >= 1 && prevStep < components.length - 1) {
    component.value = components[prevStep + 1];
    currentStep.value = prevStep + 1;
  } else if (prevStep === components.length - 1) {
    alert('Send data successfully!');
    console.log(info.value);
    isDone.value = true;
  }
};

const handleBack = (prevStep) => {
  setCheckedStep()
  switch (prevStep) {
    case 3:
      component.value = SecondForm;
      currentStep.value = 2;
      store.commit('setDisable', false);
      break;
    case 2:
      component.value = FirstForm;
      currentStep.value = 1;
      store.commit('setDisable', false);
      break;
    default:
      break;
  }
}
</script>