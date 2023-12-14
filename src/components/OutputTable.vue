<template>
  <div class="output">
    <div class="item" v-for="item in list" :key="item.key">
      <i class="preview" v-html="item.code"></i>
      <div class="size">
        <span class="original">{{ item.originalSize.toFixed(2) }}k</span>
        <span>></span>
        <span class="now">{{ item.size.toFixed(2) }}k</span>
        <span class="reduce">{{ ((item.size - item.originalSize) * 100 / item.originalSize).toFixed(2) }}%</span>
      </div>
      <div class="operation">
        <a class="btn" v-if="item.path" :title="item.code" @click="onReplace(toRaw(item))">替换</a>
        <a class="btn" :title="item.code" @click="onDownload(item.code)">保存</a>
        <a class="btn" :title="item.code" @click="onCopy(item.code)">复制</a>
        <i class="line"></i>
        <a class="btn" :title="item.base64" @click="onCopy(item.base64)">Base64</a>
        <a class="btn" :title="item.encode" @click="onCopy(item.encode)">CSS转义</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRaw } from 'vue';
import clipboard from 'clipboard';
import { Toast } from '@moohng/tui';

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const onCopy = (str) => {
  clipboard.copy(str);

  Toast.success('复制成功');
};

const onDownload = (str) => {
  const $a = document.createElement('a');
  $a.href = URL.createObjectURL(new Blob([str]));
  $a.download = 'abc.svg';
  $a.click();
  URL.revokeObjectURL($a.href);
};

const onReplace = window.replaceFileForLocal;
</script>

<style scoped>
.output {
  margin-top: 16px;
  border-top: 1px solid var(--border-color);
}
.output .item {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.item .preview {
  line-height: 0;
  flex-shrink: 0;
}
.item .preview svg {
  height: 60px;
  width: 60px;
}
.item .size {
  margin-left: 24px;
  text-align: right;
  flex: 1;
}
.item .size span {
  margin-left: 8px;
}
.size span.reduce {
  margin-left: 16px;
  color: #0d6;
}
.item .operation {
  margin-left: 24px;
}
.operation .line {
  margin: 0 4px;
  display: inline-block;
  height: 8px;
  vertical-align: middle;
  border-left: 1px solid var(--border-color);
}
.operation .btn {
  padding: 4px 6px;
  font-size: 12px;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  cursor: pointer;
}
.operation .btn:hover {
  color: #26b;
  border-color: currentColor;
}
.operation .btn + .btn {
  margin-left: 4px;
}
</style>
