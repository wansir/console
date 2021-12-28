import React, { lazy, Suspense } from 'react';
import { Loading } from '@kubed/components';
import { IAceEditorProps } from 'react-ace';

const AceEditor = lazy(() => import(/* webpackChunkName: "react-ace" */ './AceEditor'));

export type { IAceEditorProps };

export const CodeEditor = ({
  value = '{}',
  mode = 'yaml',
  onChange = () => {},
  ...rest
}: IAceEditorProps) => {
  return (
    <Suspense fallback={<Loading className="page-loading" />}>
      <AceEditor value={value} mode={mode} onChange={onChange} {...rest} />
    </Suspense>
  );
};
