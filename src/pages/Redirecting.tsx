import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypeIt from 'typeit-react';
import useGetCurrentUser from '../hooks/getCurrentUser';

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
    }, 3000);
  }, [navigate, currentUser]);

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
