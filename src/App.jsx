import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import { supabase } from './supabase';
import { fetchPettingCount } from './api';

export const App = () => {
  const [pettingCount, setPettingCount] = useState(null);
  const [clicksCount, setClicksCount] = useState(0);

  const getPettingCount = async () => {
    setPettingCount(await fetchPettingCount());
  };
  const incrementClicksCount = () => {
    setClicksCount((clicksCount) => clicksCount + 1);
  };

  useDebounce(
    async () => {
      // Immediately reset click counter to avoid blocking further user interactions
      setClicksCount(0);

      if (clicksCount > 0) {
        const latestPettingCount = await fetchPettingCount();

        setPettingCount(latestPettingCount + clicksCount);

        await supabase
          .from('kittens')
          .update({ pettings_count: latestPettingCount + clicksCount })
          .eq('name', 'Diamond');
      }
    },
    200,
    [clicksCount]
  );

  useEffect(() => {
    getPettingCount();
  }, []);

  return (
    <main>
      <p>hi, i&rsquo;m ruburi.</p>
      <p>
        i&nbsp;have 6+&nbsp;years of&nbsp;experience in&nbsp;web engineering.
      </p>
      <p>
        i&nbsp;can do&nbsp;frontend, backend, web3, 3d&nbsp;and mobile apps.
      </p>
      <div>
        <a href="https://t.me/rubyuroboros">telegram</a>
      </div>

      <div>
        <img
          src="/kitten.png"
          className="kitten"
          title="pet the kitten?"
          onClick={incrementClicksCount}
        />
        {pettingCount !== null && (
          <>
            the kitten was petted {pettingCount}{' '}
            {pettingCount === 1 ? 'time' : 'times'}.
          </>
        )}
      </div>
    </main>
  );
};
