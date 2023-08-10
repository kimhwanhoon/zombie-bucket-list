import { useState, useEffect } from 'react';
import supabase from '../api/supabase';
import Header from '../components/Layout/Header';
import Intro from '../components/Intro/Intro';
import { User } from '@supabase/supabase-js';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { saveLoggedInUserId } from '../redux/modules/saveLoggedInUserId';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log('currentUser:', currentUser);
  useEffect(() => {
    if (!currentUser) return;
    dispatch(saveLoggedInUserId(currentUser.id));
    navigate(`/redirecting`);
  }, [currentUser, dispatch, navigate]);

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
    <Main>
      <Header user={currentUser} />
      <Intro />
    </Main>
  );
};

export default Home;

const Main = styled.main`
  background-color: #f8f8f8;
  min-height: 100vh;
`;
