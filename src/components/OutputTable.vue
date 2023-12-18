<template>
  <div class="output">
    <div class="item" v-for="item in list" :key="item.key">
      <div class="file">
        <i class="preview" :style="{ backgroundImage: `url(${item.base64})` }"></i>
        <span class="name" v-if="item.name">{{ item.name }}</span>
      </div>
      <div class="size">
        <span class="original">{{ item.originalSize.toFixed(2) }}KB</span>
        <span>></span>
        <span class="now">{{ item.size.toFixed(2) }}KB</span>
        <span class="reduce">{{ ((item.size - item.originalSize) * 100 / item.originalSize).toFixed(2) }}%</span>
      </div>
      <div class="operation">
        <Button size="sm" :disabled="!item.path" :title="item.code" @click="onReplace(toRaw(item))">替换</Button>
        <Button size="sm" :title="item.code" @click="onDownload(item)">保存</Button>
        <i class="line"></i>
        <Button size="sm" :title="item.code" @click="onCopy(item.code)">复制</Button>
        <Button size="sm" :title="item.base64" @click="onCopy(item.base64)">Base64</Button>
        <Button size="sm" :title="item.encode" @click="onCopy(item.encode)">CSS</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRaw } from 'vue';
import clipboard from 'clipboard';
import Button from './Button.vue';

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const onCopy = (str) => {
  clipboard.copy(str);

  utools.showNotification('已成功复制SVG代码');
};

const onDownload = (info) => {
  const $a = document.createElement('a');
  $a.href = URL.createObjectURL(new Blob([info.code]));
  $a.download = info.name || 'icon.svg';
  $a.click();
  URL.revokeObjectURL($a.href);
};

const onReplace = window.replaceFileForLocal;
</script>

<style scoped>
.output {
  border-top: 1px solid var(--border-color);
}
.output .item {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.item .file {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.file .preview {
  display: inline-block;
  height: 44px;
  width: 44px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
/* .file .preview svg {
  height: 60px;
  width: 60px;
} */
.file .name {
  margin-left: 16px;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item .size {
  margin-left: auto;
  text-align: right;
}
.item .size span {
  margin-left: 8px;
}
.size span.reduce {
  display: inline-block;
  margin-left: 16px;
  width: 68px;
  color: var(--success-color);
}
.item .operation {
  margin-left: 24px;
  width: 260px;
  text-align: right;
}
.operation .line {
  margin: 0 4px;
  display: inline-block;
  height: 8px;
  vertical-align: middle;
  border-left: 1px solid var(--border-color);
}
</style>
