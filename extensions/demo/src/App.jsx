import React, { useState, useRef } from 'react';
import { get } from 'lodash';
import { Loading } from '@kubed/components';
import { useLocalStorage } from '@kubed/hooks';

export default function App() {
  const [loading, setLoading] = useState(true);
  const FRAME_URL = '/api/v1/namespaces/nacos-system/services/nacos-cs:http/proxy/nacos/index.html';
  const token =
    '{"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWNvcyIsImV4cCI6MTY1Mjc4ODI2NX0.i5xDBKW8WR_QB8VmHE62SB0TUYvlkK02KprpvSom8rY","tokenTtl":18000,"globalAdmin":true,"username":"nacos"}';
  useLocalStorage({ key: 'token', defaultValue: token });
  const iframeRef = useRef();

  const onIframeLoad = () => {
    const iframeDom = get(iframeRef.current, 'contentWindow.document');
    if (iframeDom) {
      if (iframeDom.querySelector('.header-container')) {
        iframeDom.querySelector('.header-container').style.display = 'none';
        // iframeDom.querySelector('body').style.background = '#eff4f9';
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading className="page-loading" />}
      <iframe
        ref={iframeRef}
        src={FRAME_URL}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ height: 'calc(100vh - 68px)', display: loading ? 'none' : 'block' }}
        onLoad={onIframeLoad}
      />
    </>
  );
}
