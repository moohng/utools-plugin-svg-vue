import * as React from 'react';
import { useSnackbar } from 'notistack';
import { css } from '@emotion/react';
import clipboard from 'clipboard';
import { Tooltip, IconButton, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LayersIcon from '@mui/icons-material/Layers';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeIcon from '@mui/icons-material/Code';
import CSSIcon from '@mui/icons-material/CSS';

const onDownload = (info) => {
  const $a = document.createElement('a');
  $a.href = URL.createObjectURL(new Blob([info.code]));
  $a.download = info.name || 'icon.svg';
  $a.click();
  URL.revokeObjectURL($a.href);
};

const onReplace = window.replaceFileForLocal || (() => {});

const itemCSS = css`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);

  .file {
    flex-shrink: 0;
    display: flex;
    align-items: center;

    .preview {
      display: inline-block;
      height: 44px;
      width: 44px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    .name {
      margin-left: 16px;
      width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .size {
    margin-left: auto;
    text-align: right;

    span {
      margin-left: 8px;
    }
    span.reduce {
      display: inline-block;
      margin-left: 16px;
      width: 68px;
      color: var(--success-color);
    }
  }

  .operation {
    margin-left: 32px;
    flex-shrink: 0;

    .line {
      margin: 0 4px;
      display: inline-block;
      height: 8px;
      vertical-align: middle;
      border-left: 1px solid var(--border-color);
    }
  }
`;

function ListItem({ item }) {
  const { enqueueSnackbar } = useSnackbar();

  const onCopy = (str) => {
    clipboard.copy(str);

    enqueueSnackbar('已成功复制', { variant: 'success' });
  };

  return (
    <div css={itemCSS}>
      <div className="file">
        <i className="preview" style={{ backgroundImage: `url(${item.base64})` }}></i>
        <span className="name">{item.name}</span>
      </div>
      <div className="size">
        <span className="original">{item.originalSize.toFixed(2)}KB</span>
        <span>&gt;</span>
        <span className="now">{item.size.toFixed(2)}KB</span>
        <span className="reduce">{(((item.size - item.originalSize) * 100) / item.originalSize).toFixed(2)}%</span>
      </div>
      <Stack className="operation" direction="row" alignItems="center" spacing={1}>
        <Tooltip title="复制SVG">
          <IconButton color="primary" size="small" onClick={() => onCopy(item.code)}>
            <ContentCopyIcon color="inherit" fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Base64">
          <IconButton color="primary" size="small" onClick={() => onCopy(item.base64)}>
            <CodeIcon color="inherit" fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="CSS编码">
          <IconButton color="primary" size="small" onClick={() => onCopy(item.encode)}>
            <CSSIcon color="inherit" />
          </IconButton>
        </Tooltip>
        <i className="line"></i>
        <Tooltip title={item.path ? '替换' : '不可用'}>
          <span>
            <IconButton color="primary" size="small" disabled={!item.path} onClick={() => onReplace(item)}>
              <LayersIcon color="inherit" fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="保存">
          <IconButton color="primary" size="small" onClick={() => onDownload(item)}>
            <SaveIcon color="inherit" fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </div>
  );
}

export default function OutputTable({ list = [] }) {
  return (
    <div
      css={css`
        border-top: 1px solid var(--border-color);
      `}
    >
      {list.map((item) => (
        <ListItem item={item} key={item.key} />
      ))}
    </div>
  );
}
