import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import supabase from '../api/supabase';
import { saveLoggedInUserId } from '../redux/modules/saveLoggedInUserId';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TypeIt from 'typeit-react';

interface State {
  loggedInUserId: string;
}

const Redirecting = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: State) => state.loggedInUserId);

  useEffect(() => {
    if (!userId) {
      alert('로그인해주세요.');
      navigate('/');
      return;
    }
    setTimeout(() => {
      navigate(`/userId/${userId}`);
    }, 3000);
  }, [userId, navigate]);

  const photo = (
    <img
      src="https://i.ibb.co/HzWWLB7/redirecting.png"
      alt="redirecting..."
      style={{ maxWidth: '80%', maxHeight: '50%' }}
    ></img>
  );
  const typeIt = (
    <TypeIt
      options={{
        speed: 50,
        cursor: false,
      }}
      style={{ fontSize: '30px' }}
    >
      Redirecting to your Bucket List...
    </TypeIt>
  );
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {photo}
      {typeIt}
    </div>
  );
};

export default Redirecting;
