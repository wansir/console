import React, { useState } from 'react';
import { Col, Navs, Row } from '@kubed/components';
import { CodeViewer } from '@ks-console/shared';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useFetchFile, useFetchFileNames } from '../../../../../stores/component';

interface DetailsTabProps {
  data: any;
}

const navs = [
  { label: 'Introduction', value: 'introduction' },
  { label: 'Chart Files', value: 'chart-files' },
];

const DetailsTab = ({ data }: DetailsTabProps) => {
  const [activeTab, setActiveTab] = useState('introduction');
  const [file, setFile] = useState('values.yaml');
  const { data: readme, isLoading } = useFetchFile(data?.name, data?.version, 'README.md');
  const { data: files, isLoading: filesLoading } = useFetchFileNames(
    data?.name,
    data?.version,
    activeTab === 'chart-files',
  );
  const { data: fileContent, isLoading: contentLoading } = useFetchFile(
    data?.name,
    data?.version,
    file,
  );

  const renderReadMe = () => {
    if (!isLoading) {
      return <Markdown remarkPlugins={[remarkGfm]}>{readme}</Markdown>;
    }
  };

  const onFileChange = (filename: string) => {
    setFile(filename);
    return '';
  };

  const renderFileViewer = () => {
    if (!filesLoading && !contentLoading) {
      return (
        <CodeViewer
          files={files}
          defaultFile={{ name: 'values.yaml', content: fileContent }}
          asyncMode
          editorOptions={{ height: '100vh - 420px' }}
          onFileChange={onFileChange}
        />
      );
    }
  };

  return (
    <Row>
      <Col span={8}>
        <Navs
          data={navs}
          onChange={tab => {
            setActiveTab(tab);
          }}
          style={{ marginBottom: '20px' }}
        />
        {activeTab === 'introduction' ? renderReadMe() : renderFileViewer()}
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default DetailsTab;
