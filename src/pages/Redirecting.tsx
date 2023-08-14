import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypeIt from 'typeit-react';
import useGetCurrentUser from '../hooks/getCurrentUser';
import { Player } from '@lottiefiles/react-lottie-player';
const Redirecting = () => {
  const navigate = useNavigate();
  const { data: currentUser = null } = useGetCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    setTimeout(() => {
      navigate(`/userId/${currentUser.id}/bucket-list/`);
    }, 2500);
  }, [navigate, currentUser]);

  const photo = (
    <Player
      autoplay
      speed={1.5}
      loop
      src="https://lottie.host/2ee03a4d-e32e-41c1-b5d4-e39e45a23184/HMPdw8LWjh.json"
      style={{ height: '500px', width: '500px' }}
    ></Player>
  );
  const typeIt = (
    <TypeIt
      options={{
        speed: 60,
        cursor: false,
      }}
      style={{ fontSize: '30px' }}
    >
      버킷리스트를 불러오는 중...
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
