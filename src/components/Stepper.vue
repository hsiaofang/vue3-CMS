<template>
    <div class="stepper">
      <div class="steps">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="step"
          :class="{ active: index === currentStep, completed: index < currentStep }"
          @click="goToStep(index)"
        >
          <div class="step-label">{{ step.label }}</div>
          <div class="step-indicator">
            <div class="indicator" :class="{ filled: index <= currentStep }"></div>
          </div>
        </div>
      </div>
      <div class="step-content">
        <slot :step="currentStep" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      steps: {
        type: Array,
        required: true,
      },
      currentStep: {
        type: Number,
        default: 0,
      },
    },
    methods: {
      goToStep(index) {
        this.$emit('update:currentStep', index)
      },
    },
  };
  </script>
  
  <style>
  .stepper {
    width: 100%;
  }
  
  .steps {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .step {
    flex: 1;
    text-align: center;
    position: relative;
    cursor: pointer;
  }
  
  .step-label {
    margin-top: 10px;
    font-weight: bold;
  }
  
  .step-indicator {
    position: relative;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
  }
  
  .indicator {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #3f51b5;
    transition: width 0.3s ease;
  }
  
  .step.active .indicator {
    background-color: #3f51b5;
  }
  
  .step.completed .indicator {
    background-color: #4caf50;
  }
  
  .step.completed .step-label {
    color: #4caf50;
  }
  
  .step-content {
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
  }
  </style>
  