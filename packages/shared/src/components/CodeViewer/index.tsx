import React, { useState } from 'react';
import { IAceEditorProps } from 'react-ace';
import { Coding, Helm } from '@kubed/icons';
import { Select } from '@kubed/components';
import { CodeEditor } from '../CodeEditor';

import { CodeViewerWrapper, Toolbar, Editor } from './styles';
import { editorOptions } from 'react-ace/lib/editorOptions';

export interface CodeViewerProps {
  files: Record<string, string> | string[];
  type?: 'selectFiles' | 'values.yaml';
  editorOptions?: IAceEditorProps;
  hideToolbar?: boolean;
  hideActions?: boolean;
  asyncMode?: boolean;
  defaultFile?: { name: string; content: string };
  file?: string;
  onFileChange?: (fileName: string) => string;
}

const getFileOptions = (files: Record<string, string> | string[]) => {
  if (Array.isArray(files)) {
    return files.map(fileName => ({
      label: fileName,
      value: fileName,
    }));
  }
  return Object.keys(files).map(fileName => ({
    label: fileName,
    value: fileName,
  }));
};

const getDefaultFile = (
  files: Record<string, string> | string[],
  fileOptions: Record<string, string>[],
) => {
  if (!Array.isArray(files)) {
    const hasDefaultPreview = files['values.yaml'];
    const firstFile = fileOptions.length ? fileOptions[0].value : '';
    return hasDefaultPreview ? 'values.yaml' : firstFile;
  }
  return 'values.yaml';
};

const CodeViewer = ({
  files = {},
  type = 'selectFiles',
  hideToolbar = false,
  hideActions = false,
  asyncMode = false,
  file,
  defaultFile,
  onFileChange,
}: CodeViewerProps) => {
  const [mode] = useState('yaml');
  const fileOptions = getFileOptions(files);
  const defaultFileName = defaultFile?.name || getDefaultFile(files, fileOptions);

  const [selectedFile, setSelectedFile] = useState<string>(defaultFileName);

  if (!selectedFile) {
    return <p>{t('NO_APP_CHART_FILE_FOUND')}</p>;
  }

  const handleSelectChange = (fileName: string) => {
    console.log(fileName);
    if (asyncMode && onFileChange) {
      onFileChange(fileName);
    } else {
      setSelectedFile(fileName);
    }
  };

  const renderToolbar = () => {
    if (hideToolbar) return null;

    return (
      <Toolbar>
        {type === 'selectFiles' && (
          <>
            <div className="toolbar-title">
              <Coding size={20} />
              <span>{t('CHART_FILES')}</span>
            </div>
            <Select
              options={fileOptions}
              onChange={handleSelectChange}
              defaultValue={defaultFileName}
              style={{ width: '376px' }}
            />
          </>
        )}
        {type === 'values.yaml' && (
          <div>
            <Helm size={20} />
            <span>Values.yaml</span>
          </div>
        )}
      </Toolbar>
    );
  };

  const currentFile = Array.isArray(files) ? file || defaultFile?.content : files[selectedFile];

  return (
    <CodeViewerWrapper>
      {renderToolbar()}
      <Editor className="mt12" style={{ height: 'calc(-420px + 100vh)' }}>
        <CodeEditor mode={mode} value={currentFile} {...editorOptions} />
      </Editor>
    </CodeViewerWrapper>
  );
};

export default CodeViewer;
