import * as React from 'react';
import { css } from '@emotion/react';
import { Button, Stack } from '@mui/material';

const barCSS = css`
  padding: 0 16px;
  height: 62px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f7f8ff;
  border-top: 1px solid var(--border-color);
  @media (prefers-color-scheme: dark) {
    background-color: #313233;
  }
`

export default function Footer({ count = 0, hasReplace = true, onReplaceAll = () => {}, onClear = () => {} }) {
  return (
    <div>
      <div css={css`height: 62px;`}></div>
      <div css={barCSS}>
        <div>成功压缩 {count} 项</div>
        <Stack css={css`margin-left: auto;`} direction="row" spacing={1}>
          {hasReplace && <Button variant="outlined" tools onClick={onReplaceAll}>全部替换</Button>}
          <Button variant="contained" color="error" onClick={onClear}>
            清空
          </Button>
        </Stack>
      </div>
    </div>
  );
}
