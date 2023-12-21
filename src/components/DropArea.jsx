import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const VisuallyHiddenInput = styled.input`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
  overflow: hidden;
`;

export default function DropArea({ onUpload }) {
  const onInput = async (e) => {
    onUpload(e.target.files);
  };

  return <div css={css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  `}>
    <Button size="large" variant="outlined" color="inherit" component="label" startIcon={<FileOpenIcon />} onInput={onInput}>
      选择SVG文件
      <VisuallyHiddenInput type="file" accept=".svg" multiple />
    </Button>
    <p css={css`
      margin-top: 1.5rem;
    `}>粘贴SVG代码到此处、或从资源管理器快捷选取SVG文件</p>
  </div>;
}
