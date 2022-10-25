import React, { FC } from 'react';

import AppNavigation from '@/AppNavigation';
import AppProviders from '@/AppProviders';

const App: FC = () => {
  return (
    <AppProviders>
      <AppNavigation />
    </AppProviders>
  );
};

export default App;
