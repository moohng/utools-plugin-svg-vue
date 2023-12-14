<template>
  <div class="drop-area center">
    <div class="tips">拖放SVG文件到此处，或粘贴SVG代码</div>
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
