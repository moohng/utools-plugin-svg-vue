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
.button[data-type=bg-danger] {
  color: #efefef;
  background: var(--danger-color);
  border-color: var(--danger-color);
}
.button[data-type=default]:hover {
  color: var(--primary-color);
  border-color: currentColor;
}
.button[data-type=bg-danger]:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
}
.button:disabled {
  opacity: .6;
}
</style>
