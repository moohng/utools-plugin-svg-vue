<template>
  <div class="drop-area center">
    <div class="tips">粘贴SVG代码到此处、或从资源管理器快捷选取SVG文件</div>
  </div>
</template>

<style scoped>
.drop-area {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.drop-area.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.drop-area .tips {
  font-size: 14px;
  white-space: nowrap;
  text-align: center;
}
</style>
