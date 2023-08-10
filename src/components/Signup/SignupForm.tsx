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

  const [defaultProfileImageURL, setDefaultProfileImageURL] = useState('');
  const [defaultProfileImageFile, setDefaultProfileImageFile] =
    useState<File | null>(null);
  const [newProfileImageURL, setNewProfileImageURL] = useState<
    String | ArrayBuffer | null
  >('');
  const [newProfileImageFile, setNewProfileImageFile] = useState<File | null>(
    null,
  );

  // default image url을 storage에서 가져오기
  const { data } = supabaseService.storage
    .from('user-profile')
    .getPublicUrl('pms.jpg');
  const defaultImageUrl = data.publicUrl;
  console.log('defaultImageUrl : ', defaultImageUrl);

  useEffect(() => {
    setDefaultProfileImageURL(defaultImageUrl);
  }, []);

  useEffect(() => {
    // 기본 이미지의 storage url을 이용해서 file로 만들어준다.
    // storage에는 file 형식으로 올라가야 하는데 url로 가져오면 file이 아니라 그냥 string이다.
    const fetchDefaultImage = async () => {
      try {
        const response = await fetch(defaultImageUrl); // 웹에서의 리소스를 가져온다
        console.log('response', response);
        const blob = await response.blob(); // blob객체로 반환, blob객체는 바이너리 데이터 표현에 사용(잘 모르겠음..)
        console.log('blob', blob);
        const file = new File([blob], defaultImageUrl, { type: 'image/jpg' }); // blob객체를 기반으로 새로운 file 생성
        console.log('file', file);
        setDefaultProfileImageFile(file); // 이걸로 storage에 넣을거임
      } catch (error) {
        console.log('error in fetching default image', error);
      }
    };
    fetchDefaultImage();
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

  // 미리보기 - input으로 선택한 파일을 url로 만들어서 미리 보기로 보여주는 로직
  const imageRef = useRef<HTMLInputElement | null>(null);
  const changhProfileImageFile = () => {
    const file = imageRef.current?.files?.[0]; //내가 새롭게 지정한 이미지 파일
    setNewProfileImageFile(file as File); // 이 때 아래서 사용할 image 변수를 지정해주었다. 새롭게 지정한 파일도 storage에는 File 형식으로 올라가야함
    console.log(newProfileImageFile);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImageURL(reader.result);
      };
      reader.readAsDataURL(file); // 새롭게 지정한 프로필 이미지를 임의의 URL로 변환하여 화면에 보여줌 (image src에 적용)
    }
  };

  // 회원가입 버튼을 누르면
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
      // Authentication에 적용되는 부분
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      console.log(data);

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

      // 유효성 검사가 다 통과되면 ↓

      // user정보 불러오고
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user?.id);
      // 회원가입 버튼 클릭 시 storage에 이미지 파일 저장 - 이때 defaultImageFile과 image이 모두 File 형식이라는 것이 중요!
      const uploadFile = async () => {
        if (!newProfileImageFile && defaultProfileImageFile) {
          // image가 없으면 = 새롭게 지정된 이미지가 없으면 fetchDefaultImage에서 지정해놓은 defaultImageFile을 올릴 것임
          const { data, error } = await supabaseService.storage
            .from('user-profile')
            .upload(user?.id!, defaultProfileImageFile);
          if (error) {
            console.log(error);
          } else {
            console.log(data);
          }
        } else if (newProfileImageFile) {
          // image가 있으면 = changhProfileImageFile에서 setImage로 지정해놓은 image File이 storage에 올라간다.
          const { data, error } = await supabaseService.storage
            .from('user-profile')
            .upload(user?.id!, newProfileImageFile);
          if (error) {
            console.log(error);
          } else {
            console.log(data);
          }
        }
      };
      uploadFile(); // 함수 호출시 이미지 미리보기에서 지정해줬던 File 형식의 image가 인자로 들어감

      // 회원가입 시 storage에 등록된 이미지 url 바로 가져오기 - db에 넣기 위해 사용
      const { data: userImage } = supabaseService.storage
        .from('user-profile')
        .getPublicUrl(user?.id!);
      console.log(userImage); // 이때 userImage는 이미 storage를 거쳐서 오기 때문에 기본 이미지이든, 새로 지정한 이미지이든 잘 적용된 채로 url을 가지고 올 수 있다.

      const signupDate = user?.created_at.slice(0, 10);
      console.log('현재 로그인한 유저는? ', user);
      console.log('유저생성시간>>>>', signupDate);

      // users에 user 정보 insert
      await supabase.from('users').insert({
        nickname,
        email,
        password,
        signupDate,
        profileImage: userImage.publicUrl,
      }); //userImage 객체의 publicUrl 값이 db에 들어가게 연결

      // 로그인 시 메인으로 이동
      if (user) {
        navigate('/');
      }
    } catch (error) {
      alert(
        '회원가입시 오류가 발생했습니다. 고객센터에 문의해주세요. error: signup.',
      );
    }
  };

  return (
    <>
      <div>좀비가 되기 전에 해야하는 100가지</div>

      <form>
        <div>
          {newProfileImageURL ? (
            <img src={newProfileImageURL as string} alt="new-priview-img" />
          ) : defaultProfileImageURL ? (
            <img src={defaultProfileImageURL} alt="default=priview-img" />
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
