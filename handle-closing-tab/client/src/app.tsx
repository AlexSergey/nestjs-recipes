import { ReactElement, useEffect } from 'react';

import './assets/styles/global.scss';

const data = {
  user: 1,
};

export const App = (): ReactElement => {
  useEffect(() => {
    const loadData = (): void => {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      if (document.visibilityState === 'hidden') {
        navigator.sendBeacon('http://localhost:4000/test', blob);
      }
    };
    document.addEventListener('visibilitychange', loadData);

    return (): void => {
      document.removeEventListener('visibilitychange', loadData);
    };
  }, []);

  return <div>Rockpack!</div>;
};
