import { useEffect } from 'react';
import Intro from '../components/Intro/Intro';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useGetCurrentUser from '../hooks/getCurrentUser';

const Home = () => {
  const { data: currentUser = null, refetch } = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      refetch();
      return;
    }
    navigate(`/redirecting`);
  }, [currentUser, navigate, refetch]);

  return (
    <Main>
      <Intro />
    </Main>
  );
};

export default Home;

const Main = styled.main`
  background-color: #f8f8f8;
  min-height: 100vh;
`;
