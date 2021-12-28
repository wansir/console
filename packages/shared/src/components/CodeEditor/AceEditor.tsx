import React from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';
import { EditorWrapper } from './styles';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-groovy';
import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/keybinding-vscode';
import 'ace-builds/src-noconflict/ext-searchbox';

const AceEditorWrapper = (props: IAceEditorProps) => {
  return (
    <EditorWrapper>
      <AceEditor
        theme="chaos"
        width="auto"
        height="100%"
        tabSize={2}
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        keyboardHandler="vscode"
        wrapEnabled
        {...props}
      />
    </EditorWrapper>
  );
};

export default AceEditorWrapper;
