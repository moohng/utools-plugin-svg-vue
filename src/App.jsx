import * as React from 'react'
import { useSnackbar } from 'notistack';
import { optimize } from 'svgo';
import DropArea from './components/DropArea';
import OutputTable from './components/OutputTable';
import Footer from './components/Footer';

/**
 * 编码
 * @param {*} str
 * @returns
 */
function encodeCustom(str) {
  return str.replaceAll('<', '%3C').replaceAll('>', '%3E').replaceAll('#', '%23').replaceAll('"', "'");
}

/**
 * 转换
 * @param {*} param0
 * @returns
 */
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

/**
 * 替换所有本地文件
 * @param {*} svgList
 */
function onReplaceAll(svgList, enqueueSnackbar) {
  const list = svgList.filter((item) => item.path);
  if (list.length > 0) {
    window.replaceFileForLocal(list);
  } else {
    enqueueSnackbar('本地没有可替换的文件', { variant: 'error' });
  }
}

export default function App() {
  const [svgList, setSvgList] = React.useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const handleSvg = React.useCallback((svgContent) => {
    try {
      // 压缩svg
      const output = optimize(svgContent);

      const list = [handleSvgItem({ svgData: output.data, originalSvgData: svgContent }), ...svgList];
      console.log(list);
      setSvgList(list);
    } catch (error) {
      // 无效的svg
      console.log('无效的svg');
      enqueueSnackbar('无效的 SVG !!!', { variant: 'error' });
    }
  }, [svgList]);

  const handlePaste = React.useCallback((e) => {
    e.preventDefault();

    handleSvg(e.clipboardData.getData('text/plain'));
  }, [handleSvg]);

  // 监听粘贴事件
  React.useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  });

  const handleFiles = React.useCallback(async (files) => {
    const list = await Promise.all([...files].map(async (file) => {
      const content = await file.text();
      try {
        const output = optimize(content);
        return handleSvgItem({ svgData: output.data, originalSvgData: content, ...file });
      } catch (error) {
        // 无效的svg
        console.log('无效的svg');
        return undefined;
      }
    }));
    if (!list.filter(Boolean).length) {
      enqueueSnackbar('无效的 SVG !!!', { variant: 'error' });
    } else {
      setSvgList([...list.filter(Boolean), ...svgList]);
    }
  }, [svgList]);

  React.useEffect(() => {
    if (typeof utools !== 'undefined' && typeof utools.onPluginEnter === 'function') {
      utools.onPluginEnter(async ({code, type, payload, option}) => {
        console.log('用户进入插件应用', code, type, payload)
        if (code === 'svg_files' && type === 'files') {
          const files = payload;
          // 读取svg文件
          const contentList = await window.readContentByFiles(files);
          console.log('读取svg文件', contentList);
          const list = contentList.map((item) => {
            try {
              const output = optimize(item.content);
              return handleSvgItem({ svgData: output.data, originalSvgData: item.content, ...item });
            } catch (error) {
              // 无效的svg
              console.log('无效的svg', error);
              return undefined;
            }
          }).filter(Boolean);
          setSvgList(list);
        } else if (code === 'svg_input' && type === 'regex') {
          handleSvg(payload);
        }
      });
    } else {
      console.log('当前不是utools环境');
    }
  });

  React.useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
    };
    window.addEventListener('dragover', handleDragOver);
    const handleDrop = (e) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    };
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, [handleFiles])

  return svgList.length > 0 ? (
    <>
      <OutputTable list={svgList} />
      <Footer count={svgList.length} hasReplace={svgList.some(item => item.path)} onReplaceAll={() => onReplaceAll(svgList, enqueueSnackbar)} onClear={() => setSvgList([])} />
    </>
  ) : <DropArea onUpload={(files) => handleFiles(files)} />
};
