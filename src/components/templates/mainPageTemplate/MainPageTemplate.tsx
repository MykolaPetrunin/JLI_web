import React, { FC, PropsWithChildren, ReactElement } from 'react';

import Content from './components/Content';
import Wrap from './components/Wrap';

interface MainPageTemplateProps extends PropsWithChildren {
  header: ReactElement;
  footer: ReactElement;
}

const MainPageTemplate: FC<MainPageTemplateProps> = ({ children, header, footer }) => {
  return (
    <Wrap>
      {header}
      <Content>{children}</Content>
      {footer}
    </Wrap>
  );
};

export default MainPageTemplate;
