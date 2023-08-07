import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

const getBucketList = async () => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_BASE_KEY;
  const supabase = createClient(supabaseUrl as string, supabaseKey as string);

  let { data: bucket_list, error } = await supabase
    .from('bucketList')
    .select('*');

  return { bucket_list, error };
};

const useGetBucketList = () => {
  const query = useQuery({ queryKey: ['bucketList'], queryFn: getBucketList });
  return query;
};

export default useGetBucketList;
