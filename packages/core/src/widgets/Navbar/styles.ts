import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  z-index: 200;
  min-width: 1164px;
  height: 68px;
  background-color: ${({ theme }) => theme.palette.accents_1};
  padding: 0 20px;

  &.is-dark {
    background-color: rgba(24, 29, 40, 0.2);

    .global-nav {
      color: #fff;

      &:hover {
        color: #242e42;
      }
    }

    .username,
    .caret-down {
      color: #fff;
    }

    &.is-scroll {
      background-color: rgba(24, 29, 40);
    }
  }

  &.is-scroll {
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  }

  .global-nav {
    padding: 0 11px;

    &:not(:last-child) {
      margin-right: 12px;
    }

    &:hover {
      color: ${({ theme }) => theme.palette.accents_7};
    }
  }
`;

export const NavbarLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  .logo {
    display: inline-flex;
  }

  img {
    width: 150px;
    height: 30px;
  }
`;

export const NavbarRight = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

export const NavbarBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.5px;
  border-style: solid;
  border-width: 1px 0 0 0;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    rgba(255, 255, 255, 0.2)
  );
  border-image-slice: 1;
`;
