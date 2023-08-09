import React, { useState } from 'react';
import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/Signup/SignupForm';
import supabase from '../api/supabase';

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

  return (<>
  {isLogin? <LoginForm /> : <SignupForm/>}
  <button onClick={handleToggleAuth}>{isLogin ? "회원가입하기" : "로그인하기"}</button>

  </>);
};

export default Auth;
