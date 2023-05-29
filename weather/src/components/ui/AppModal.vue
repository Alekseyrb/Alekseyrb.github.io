<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <h3 v-if="title">{{ title }}</h3>
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppModal",
  emits: ['close'],
  props: {
    title: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .35);
  z-index: 100;
}
.modal {
  position: fixed;
  top: 130px;
  width: 600px;
  padding: 1rem;
  background: #fff;
  z-index: 1000;
  left: 50%;
  border-radius: 10px;
  transform: translateX(-50%);
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
}
h3 {
  font-size: 30px;
  padding: 20px;
  line-height: 40px;
}

@media (max-width: 800px) {
  .modal {
    width: 300px;
  }

  h3 {
    font-size: 20px;
    padding: 10px;
  }
}

</style>