import { supabase } from './supabase';

export const fetchPettingCount = async () => {
  const { data } = await supabase
    .from('kittens')
    .select('pettings_count')
    .eq('name', 'Diamond');

  return data[0].pettings_count;
};
