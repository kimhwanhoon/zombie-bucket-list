import { styled } from 'styled-components';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <StyledAppContainer>{children}</StyledAppContainer>;
};

export default Layout;

const StyledAppContainer = styled.div`
  max-width: 1200px;
  min-width: 1300px;
  margin: 2px auto;
`;
