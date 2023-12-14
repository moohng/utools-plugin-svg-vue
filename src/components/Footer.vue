<template>
  <div class="footer">
    <div class="place"></div>
    <div class="bar">
      <div class="stat">成功压缩 {{ count }} 项</div>
      <div class="group">
        <Button>全部压缩</Button>
        <Button @click="emit('replaceAll')">全部替换</Button>
        <Button type="bg-danger" @click="emit('clear')">清空</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue';

defineProps({
  count: Number,
});

const emit = defineEmits(['replaceAll', 'clear']);
</script>

<style scoped>
.place {
  height: 62px;
}
.bar {
  padding: 0 16px;
  height: 62px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid var(--border-color);
}
.bar .group {
  margin-left: auto;
}
</style>
