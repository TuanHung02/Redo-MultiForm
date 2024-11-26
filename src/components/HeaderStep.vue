<template>
    <div id="header-form">
        <h3>Đơn ứng tuyển</h3>
        <div class="step">
            <div v-for="(item, index) in step" :key="index" :class="{ active: currentStep === index + 1 }"
                class="step-item">
                <span v-if="currentStep >= index + 1" class="step-idx step-check">
                    {{ item.id }}
                </span>
                <span v-else class="step-idx">
                    {{ item.id }}
                </span>
                <p>{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    currentStep: Number,
    step: Array,
});


</script>

<style scoped>
h3 {
    font-size: 24px;
    line-height: 36px;
    text-align: start;
    margin-bottom: 4px;
}

#header-form {
    width: 932px;
    margin: 32px auto;
}

.step {
    display: flex;
}

.step .step-item {
    display: flex;
    flex-direction: column;
    margin-right: 23px;
}

.step-idx {
    width: 32px;
    height: 32px;
    border-radius: 90px;
    background: #dbdbdb;
    color: #fff;
    line-height: 32px;
    margin: 14px auto;
    position: relative;
    z-index: 1;
    text-align: center;

}

.step-check {
    background: #627d98;

}

.step .step-item p {
    font-size: 14px;
}

.step .step-item .step-idx:before {
    content: "";
    position: absolute;
    width: 125px;
    background: #dbdbdb;
    top: 50%;
    left: 32px;
    border: 1px solid #dbdbdb;
    z-index: 0;
}

.step .step-item:last-child .step-idx:before {
    width: unset;
    border: unset;
}
</style>