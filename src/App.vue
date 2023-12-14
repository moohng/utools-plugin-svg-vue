<script setup>
import { ref } from 'vue';
import { optimize } from 'svgo';
import { Toast } from '@moohng/tui';
import DropArea from './components/DropArea.vue';
import OutputTable from './components/OutputTable.vue';

const svgList = ref([]);

// 编码
function encodeCustom(str) {
  return str.replaceAll('<', '%3C').replaceAll('>', '%3E').replaceAll('#', '%23').replaceAll('"', "'");
}

function handleSvgItem({ svgData, originalSvgData, name, path }) {
  const originalSize = new Blob([originalSvgData]).size;
  const size = new Blob([svgData]).size;
  return {
    key: Date.now(),
    name,
    path,
    original: originalSvgData,
    code: svgData,
    base64: 'data:image/svg+xml;base64,' + btoa(svgData),
    encode: 'data:image/svg+xml,' + encodeCustom(svgData),
    originalSize: originalSize / 1024,
    size: size / 1024,
  };
}

const handleSvg = (svgContent) => {
  try {
    // 压缩svg
    const output = optimize(svgContent);

    svgList.value.unshift(handleSvgItem({ svgData: output.data, originalSvgData: svgContent }));
  } catch (error) {
    // 无效的svg
    console.log('无效的svg', error);
    Toast.error('无效的 SVG !!!');
  }
}

// 监听粘贴事件
window.addEventListener('paste', (e) => {
  e.preventDefault();

  handleSvg(e.clipboardData.getData('text/plain'));
});

if (typeof utools !== 'undefined' && typeof utools.onPluginEnter === 'function') {
  utools.onPluginEnter(async ({code, type, payload, option}) => {
    console.log('用户进入插件应用', code, type, payload)
    if (code === 'svg_files' && type === 'files') {
      const files = payload;
      // 读取svg文件
      const contentList = await window.readContentByFiles(files);
      console.log('读取svg文件', contentList);
      svgList.value = contentList.map((item) => {
        try {
          const output = optimize(item.content);
          return handleSvgItem({ svgData: output.data, originalSvgData: item.content, ...item });
        } catch (error) {
          // 无效的svg
          console.log('无效的svg', error);
          return undefined;
        }
      }).filter(Boolean);
    } else if (code === 'svg_input' && type === 'regex') {
      handleSvg(payload);
    }
  });
} else {
  console.log('当前不是utools环境');
}
</script>

<template>
  <DropArea v-if="!svgList.length" />
  <OutputTable v-if="svgList.length > 0" :list="svgList" />
</template>

<style>
@import '@moohng/tui/lib/Toast/style/index.css';
</style>
