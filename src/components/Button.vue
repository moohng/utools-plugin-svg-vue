<template>
  <button :class="['button', size]" :data-type="type" :disabled="disabled"><slot></slot></button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
  },
});
</script>

<style scoped>
.button {
  appearance: none;
  display: inline-block;
  padding: 0.4em 0.8em;
  color: inherit;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
}
.button.sm {
  padding: 0.3em 0.6em;
  font-size: 12px;
}
.button + .button {
  margin-left: 0.5em;
}
.button[data-type*=bg] {
  border-color: var(--danger-color);
}
/* .button[data-type*=bg]:hover {
  background: rgba(--danger-color, 0.6);
} */
.button[data-type=bg-danger] {
  color: #e2e2e2;
  background: var(--danger-color);
}
.button[data-type=default]:hover {
  color: #447bdf;
  border-color: currentColor;
}
.button:disabled {
  opacity: .6;
}
</style>
