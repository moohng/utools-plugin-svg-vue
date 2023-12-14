const fs = require('fs/promises');

/**
 * 通过文件路径获取文件内容
 * @param {{ path: string; name: string }[]} fileList
 * @returns
 */
window.readContentByFiles = async (fileList) => {
  const res = await Promise.all(fileList.map(async (item) => {
    return fs.readFile(item.path, 'utf8');
  }));
  return fileList.map((item, index) => {
    return {
      name: item.name,
      path: item.path,
      content: res[index]
    };
  });
};

/**
 * 替换本地文件内容
 * @param {{ name: string; code: string; path: string; }[]} infos
 */
window.replaceFileForLocal = async (infos) => {
  console.log('replaceFileForLocal', infos);
  if (Array.isArray(infos) && infos.length > 0) {
    await Promise.all(infos.map(async (item) => fs.writeFile(item.path, item.code)));

    utools.hideMainWindow();
  } else {
    await fs.writeFile(infos.path, infos.code);
  }

  utools.showNotification('已成功替换本地SVG文件');
};
