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

  return (<S.AuthContainer>
  {isLogin? <LoginForm /> : <SignupForm/>}
  <S.AuthContentBox>
  <span>{isLogin? "아직 회원이 아니신가요?" : "이미 회원이신가요?"}</span>
  <button onClick={handleToggleAuth}>{isLogin ? "회원가입" : "로그인"}</button>
  </S.AuthContentBox>

  </S.AuthContainer>);
};

export default Auth;
