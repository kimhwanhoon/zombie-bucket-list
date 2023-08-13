import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import MyPage from '../pages/MyPage';
import BucketDetail from '../pages/BucketDetail';
import BucketList from '../pages/BucketList';
import Redirecting from '../pages/Redirecting';
import NonAuthLayout from './NonAuthLayout';
import AuthLayout from './AuthLayout';
import Header from '../components/Layout/Header';
import { useQueryClient } from '@tanstack/react-query';

// 토큰 정보가 필요한 화면/헤더가 필요한 화면 : 버킷리스트, 버킷리스트 상세페이지, 마이페이지
// 토큰 정보가 없어도 되는 화면 : Home(인트로), Auth(로그인, 회원가입)
const Router: React.FC = (): JSX.Element => {
  const queryClient = useQueryClient();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NonAuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Route>

        <Route
          element={
            <>
              <Header queryClient={queryClient}/>
              <AuthLayout />
            </>
          }
        >
          <Route path="/userId/:userId/my-page" element={<MyPage queryClient={queryClient}/>} />
          <Route path="/userId/:userId/bucket-list" element={<BucketList />} />
          <Route
            path="/userId/:userId/bucket-list/:postId"
            element={<BucketDetail />}
          />
        </Route>
        <Route path="/redirecting" element={<Redirecting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
