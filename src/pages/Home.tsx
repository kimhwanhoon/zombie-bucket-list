import { styled } from 'styled-components';
import BucketList from '../components/Home/BucketList/BucketList';
import FakeComponent from '../components/Home/FakeComponent';
import WriteAPostButton from '../components/Home/BucketList/WriteAPostButton';

const Home = () => {
  return (
    <Main>
      <FakeComponent />
      <WriteAPostButton />
      <BucketList />
    </Main>
  );
};

export default Home;

const Main = styled.main`
  background-color: #f8f8f8;
  min-height: 100vh;
`;
