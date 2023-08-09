import { useState, useEffect } from 'react';
import supabase from '../api/supabase';
import Header from '../components/Layout/Header';
import Intro from '../components/Intro/Intro';
import { User } from '@supabase/supabase-js';

const Home = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Header user={currentUser} />
      <Intro />
      Home
    </>
  );
};

export default Home;
