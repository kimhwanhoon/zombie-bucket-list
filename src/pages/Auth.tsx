import React, { useState } from 'react';
import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/Signup/SignupForm';
import supabase from '../api/supabase';
import { S } from './Auth.styles';

type Props = {};

const Auth = (props: Props) => {

  const [isLogin, setIsLogin]=useState(true);

  const handleToggleAuth = ()=>{
    setIsLogin(!isLogin)
  }

  const currentUser = async () =>  {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("현재 로그인한 유저는? ", user)
  }
  currentUser();

  return (
  <>
    <S.AuthContainer>
      <S.AbsoluteBox>
        {isLogin? <LoginForm /> : <SignupForm/>}
        <S.AuthCheckUserContentBox>
          <S.AuthCheckUserText>{isLogin? "회원이 아니신가요?" : "회원이신가요?"}</S.AuthCheckUserText>
          <S.Button onClick={handleToggleAuth}>{isLogin ? "회원가입" : "로그인"}</S.Button>
        </S.AuthCheckUserContentBox>
      </S.AbsoluteBox>
      <S.RedBox></S.RedBox>
    </S.AuthContainer>
  </>
  );
};

export default Auth;
