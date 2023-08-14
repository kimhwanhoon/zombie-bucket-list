import axios from 'axios';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkToken = async () => {
      try {
        // 먼저 localhost로 시도
        try {
          await axios.get('http://localhost:3000/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (localhostError) {
          // localhost 접속 실패 시 다른 호스트로 시도
          try {
            await axios.get('https://zombie-bucket-list.vercel.app/', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } catch (error) {
            handleTokenInvalid();
          }
        }
      } catch (error) {
        handleTokenInvalid();
      }
    };

    const handleTokenInvalid = () => {
      alert('토큰 정보가 유효하지 않습니다. 로그인 화면으로 이동합니다.');
      localStorage.removeItem('token');
      navigate('/auth');
    };

    if (!token) {
      alert('토큰이 없습니다. 로그인 화면으로 이동합니다.');
      navigate('/auth');
    } else {
      checkToken();
    }
  }, [navigate]);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
