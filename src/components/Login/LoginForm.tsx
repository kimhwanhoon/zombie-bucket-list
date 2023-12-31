import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../api/supabase';
import { S } from './LoginForm.styles';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  // 이메일 형식 검사
  const email_check = (email: string) => {
    var reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  };

  // 로그인 버튼
  const handleLoginButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if (!email && !password) {
      return setErrorMessage('이메일과 비밀번호를 입력해주세요.');
    } else if (!email) {
      return setErrorMessage('이메일을 입력해주세요.');
    } else if (!email_check(email)) {
      return setErrorMessage('이메일 형식이 아닙니다. 다시 입력해주세요.');
    } else if (!password) {
      return setErrorMessage('비밀번호를 입력해주세요.');
    } else if (password.length < 6) {
      return setErrorMessage('비밀번호는 6자리 이상 입력해주세요.');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log('error : ', error?.message);

    if (error?.message === 'Invalid login credentials') {
      setErrorMessage(
        '이메일 혹은 비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
      );
    } else if (!error?.message) {
      setErrorMessage('');
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      navigate('/');
    }

    // 토큰 가져오기!
    const getToken = async () => {
      const { data: response } = await supabase.auth.getSession();
      localStorage.setItem('token', response.session?.access_token as string);
    };
    getToken();
  };

  return (
    <S.LoginContainer>
      <S.LoginTitle>
        <img
          src="https://equsyyfbjtstiglyzukm.supabase.co/storage/v1/object/public/user-profile/logo/logo.png"
          alt="logo"
          width={'300px'}
        />
      </S.LoginTitle>
      <S.LoginForm>
        <S.WelcomeText>welcome...☠</S.WelcomeText>
        <S.LoginInputWrapper>
          <S.LoginInputInnerWrapper>
            <S.Input
              type="email"
              value={email}
              onChange={onChange}
              name="email"
              placeholder="이메일"
              autoFocus
            />
            <S.PasswordInput
              type="password"
              value={password}
              onChange={onChange}
              name="password"
              placeholder="비밀번호"
            />
          </S.LoginInputInnerWrapper>
        </S.LoginInputWrapper>

        <S.LoginButtonAndErrorMessageWrapper>
          <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
          <S.Button onClick={handleLoginButtonClick}>로그인</S.Button>
        </S.LoginButtonAndErrorMessageWrapper>
      </S.LoginForm>
    </S.LoginContainer>
  );
};

export default LoginForm;
