import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

const getBucketList = async () => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl as string, supabaseKey as string);

  let { data: bucket_list, error } = await supabase
    .from('bucketList')
    .select('*')
    .order('id', { ascending: false });

  return { bucket_list, error };
};

const useGetBucketList = () => {
  return useQuery({ queryKey: ['bucketList'], queryFn: getBucketList });
};

export default useGetBucketList;
