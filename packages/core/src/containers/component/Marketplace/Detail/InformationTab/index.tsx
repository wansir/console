import React from 'react';
import { Col, Descriptions, Row, Tag, Text } from '@kubed/components';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Section } from '../styles';
import { useFetchFile } from '../../../../../stores/component';

interface InformationTabProps {
  data: any;
}

const InformationTab = ({ data }: InformationTabProps) => {
  const { data: readme, isLoading } = useFetchFile(data?.name, data?.version, 'README.md');

  const descriptions = [
    { label: 'Homepage', value: '-' },
    { label: 'Release Date', value: '2021-12-28' },
    { label: 'Provider', value: 'KubeSphere' },
    { label: 'Source', value: <a href="/">https://github.com/kubesphere</a> },
  ];

  return (
    <Row>
      <Col span={8} gutter={[0, 20]}>
        <Section>
          <div className="section-title">Information</div>
          <div className="section-content">
            {!isLoading && <Markdown remarkPlugins={[remarkGfm]}>{readme}</Markdown>}
          </div>
        </Section>
        <Section>
          <div className="section-title">
            Versions(only the latest 10 versions will be displayed)
          </div>
          <div className="section-content">
            <table className="version-table">
              <thead>
                <tr>
                  <th>Version number</th>
                  <th>Update Log</th>
                </tr>
              </thead>
              <tbody>
                {data?.versions.map((version: Record<string, any>) => (
                  <tr key={`version-${version.version}`}>
                    <td>
                      <Text weight={500}>v{version.version}</Text>
                    </td>
                    <td>-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </Col>
      <Col span={4}>
        <Section>
          <div className="section-title">Categories</div>
          <div className="section-content">
            {data?.keywords.map((item: string) => (
              <Tag key={item} color="secondary">
                {item}
              </Tag>
            ))}
          </div>
        </Section>
        <Section>
          <div className="section-title">Basic Information</div>
          <div className="section-content">
            <Descriptions data={descriptions} variant="unstyled" />
          </div>
        </Section>
      </Col>
    </Row>
  );
};

export default InformationTab;
