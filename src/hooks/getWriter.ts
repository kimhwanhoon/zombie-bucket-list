import supabase from '../api/supabase';
import { useQuery } from '@tanstack/react-query';

const getWriter = async (userId: string) => {
  const { data } = await supabase.from('users').select('*').eq('id', userId);
  return data;
};

const useGetWriter = (userId: string) => {
  const currentUser = useQuery(['userData'], async () => getWriter(userId));
  return currentUser;
};

export default useGetWriter;
