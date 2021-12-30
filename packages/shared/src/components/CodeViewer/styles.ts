import styled from 'styled-components';

export const CodeViewerWrapper = styled.div`
  border-radius: 4px;
  padding: 8px;
  border: 1px solid #ccd3db;
`;

export const Toolbar = styled.div`
  display: flex;
  height: 32px;
  justify-content: space-between;

  .toolbar-title {
    display: flex;
    font-weight: 500;
    align-items: center;

    .kubed-icon {
      margin-right: 5px;
    }
  }
`;

export const Editor = styled.div`
  position: relative;
`;
