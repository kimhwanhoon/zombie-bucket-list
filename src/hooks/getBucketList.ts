import { useQuery } from '@tanstack/react-query';
import { PostgrestError, createClient } from '@supabase/supabase-js';

interface Type {
  bucket_list: BucketList[] | null;
  error: PostgrestError | null;
}

const getBucketList = async (
  userId: string,
  postId: string | null = null,
): Promise<Type> => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl as string, supabaseKey as string);

  if (!postId) {
    // postId가 없으면, 전체 불러오기
    let { data: bucket_list, error } = await supabase
      .from('bucketList')
      .select('*')
      .eq('userId', userId)
      .order('id', { ascending: false });
    return { bucket_list, error };
  } else {
    // postId가 있으면, 상세 버킷만 불러오기
    let { data: bucket_list, error } = await supabase
      .from('bucketList')
      .select('*')
      .eq('userId', userId)
      .eq('id', postId)
      .order('id', { ascending: false });
    return { bucket_list, error };
  }
};

const useGetBucketList = (userId: string, postId: string | null) => {
  return useQuery({
    queryKey: ['bucketList'],
    queryFn: async () => await getBucketList(userId, postId),
  });
};

export default useGetBucketList;
