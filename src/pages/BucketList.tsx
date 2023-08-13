import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import useGetBucketList from '../hooks/getBucketList';
import WriteAPostButton from '../components/Home/BucketList/WriteAPostButton';
import useGetCurrentUser from '../hooks/getCurrentUser';
import Categories from '../components/Home/Categories/Categories';
import Layout from '../components/Layout/Layout';
import bucketBackground from '../assets/zombie1.png';
import { useEffect } from 'react';

const BucketList = () => {
  useGetCurrentUser();
  const params = useParams().userId;
  const bucketListData = useGetBucketList(params as string, null);
  const data: Array<BucketList> | null | undefined =
    bucketListData.data?.bucket_list;

  useEffect(() => {
    if (data && data.length <= 1) bucketListData.refetch();
  });

  return (
    <Main>
      <Layout>
        <WriteAPostButton />
        <Categories />
      </Layout>
    </Main>
  );
};

export default BucketList;

const Main = styled.main`
  background-color: transparent;
  width: 100%;
  padding-top: 15px;
  background-image: url(${bucketBackground});
  background-repeat: no-repeat;
  background-size: 1600px 500px;
  background-position: bottom;
`;
