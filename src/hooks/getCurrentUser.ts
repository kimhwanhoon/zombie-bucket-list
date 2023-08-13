import supabase from '../api/supabase';
import { useQuery } from '@tanstack/react-query';

const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

const useGetCurrentUser = () => {
  const currentUser = useQuery(['currentUser'], getCurrentUser);

  return currentUser;
};

export default useGetCurrentUser;
