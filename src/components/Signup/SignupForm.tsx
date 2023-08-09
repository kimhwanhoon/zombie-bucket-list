import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../api/supabase';
import supabaseService from '../../api/supabaseService';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const [defaultProfileImg, setDefaultProfileImg] = useState('');
  const [newProfileImg, setNewProfileImg] = useState<
    String | ArrayBuffer | null
  >('');
  const [image, setImage] = useState<File | null>(null);

  // default image url 가져오기
  const { data } = supabaseService.storage
    .from('user-profile')
    .getPublicUrl('pms.jpg');

  useEffect(() => {
    setDefaultProfileImg(data.publicUrl);
    setNewProfileImg(defaultProfileImg);
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'nickname') {
      setNickname(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'checkPassword') {
      setCheckPassword(value);
    }
  };

  const imageRef = useRef<HTMLInputElement | null>(null);
  const changhProfileImageFile = () => {
    const file = imageRef.current?.files?.[0];
    setImage(file as File);
    console.log(image);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignUpButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    // 닉네임 중복..고민해보장...중복되면 뭐어때..
    if (password !== checkPassword) {
      return setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else if (!nickname) {
      return setErrorMessage('닉네임을 입력해주세요.');
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      // console.log(data);

      // check: 유효성 검사 순서 체크 필요
      if (error?.message === 'To signup, please provide your email') {
        return setErrorMessage('이메일을 입력해주세요.');
      } else if (
        error?.message === 'Unable to validate email address: invalid format'
      ) {
        return setErrorMessage('잘못된 이메일 형식입니다.');
      } else if (error?.message === 'Signup requires a valid password') {
        return setErrorMessage('비밀번호를 입력해주세요.');
      } else if (
        error?.message === 'Password should be at least 6 characters'
      ) {
        return setErrorMessage('비밀번호를 6자리 이상 입력해주세요.');
      } else if (error?.message === 'User already registered') {
        return setErrorMessage('이미 등록된 이메일입니다.');
      } else if (!error?.message) {
        setErrorMessage('');
      }

      const uploadFile = async (image: any) => {
        console.log(image);
        const { data, error } = await supabaseService.storage
          .from('user-profile')
          .upload(email, image);
        if (error) {
          // Handle error
          console.log(error);
        } else {
          console.log(data);
        }
      };
      uploadFile(image);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      const signupDate = user?.created_at.slice(0, 10);
      console.log('현재 로그인한 유저는? ', user);
      // console.log('유저생성시간>>>>', signupDate);

      // users에 user 정보 insert
      await supabase.from('users').insert({
        nickname,
        email,
        password,
        signupDate,
        profileImage: newProfileImg ? newProfileImg : defaultProfileImg,
      });

      // 로그인 시 메인으로 이동
      if (user) {
        navigate('/');
      }
    } catch (error) {
      alert('알 수 없는 오류가 발생했습니다. 고객센터에 문의해주세요.');
    }
  };

  return (
    <>
      <div>좀비가 되기 전에 해야하는 100가지</div>

      <form>
        <div>
          {newProfileImg ? (
            <img src={newProfileImg as string} alt="new-priview-img" />
          ) : defaultProfileImg ? (
            <img src={defaultProfileImg} alt="default=priview-img" />
          ) : (
            <span>이미지 미리보기</span>
          )}
          <label htmlFor="profileImg">프로필 이미지 등록</label>
          <input
            type="file"
            accept="image/*"
            id="profileImg"
            style={{ display: 'none' }}
            onChange={changhProfileImageFile}
            ref={imageRef}
          />
        </div>
        <input
          type="nickname"
          value={nickname}
          onChange={onChange}
          name="nickname"
          placeholder="닉네임"
        />
        <input
          type="email"
          value={email}
          onChange={onChange}
          name="email"
          placeholder="이메일"
        />
        <input
          type="password"
          value={password}
          onChange={onChange}
          name="password"
          placeholder="비밀번호"
        />
        <input
          type="password"
          value={checkPassword}
          onChange={onChange}
          name="checkPassword"
          placeholder="비밀번호 체크"
        />
        <button type="submit" onClick={handleSignUpButtonClick}>
          회원가입
        </button>
      </form>
      <span>{errorMessage}</span>
    </>
  );
};

export default SignupForm;
