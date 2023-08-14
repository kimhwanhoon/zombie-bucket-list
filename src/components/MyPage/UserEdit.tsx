import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { S } from './UserEdit.styles';
import { User } from '@supabase/supabase-js';
import supabase from '../../api/supabase';
import supabaseService from '../../api/supabaseService';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../App';
import { Input } from 'antd';
const { TextArea } = Input;
const UserEdit = ({
  user,
  setIsEdit,
  userData
}: {
  user: User | null;
  setIsEdit: any;
  userData: any;
}) => {
  // 수정되는 유저 정보
  const [userEditNickname, setUserEditNickname] = useState<string>();
  const [userEditAbout, setUserEditAbout] = useState<string>();

  const [prevProfileImageURL, setPrevProfileImageURL] = useState<string>();
  const [newProfileImageURL, setNewProfileImageURL] = useState<
    String | ArrayBuffer | null
  >('');
  const [newProfileImageFile, setNewProfileImageFile] = useState<File | null>(
    null,
  );
  
  console.log("userEditUser!!!!!!!!!!! : ", user)

  // console.log('수정거 적히는지>>>>', userEditNickname);
  // console.log('수정거 적히는지>>>>', userEditAbout);

  // const {data: userData} = useQuery(['userData'], async () => {
  //   console.log(user?.email)
  //   const reponse = await fetchUserDB(user?.email as string);
  //   console.log("userEditResponse!!!!! : ", reponse)
  //   return reponse;
  // });

  console.log("userEdit!!!!!!!!!! : ", userData);

  useEffect(() => {
    if (userData && userData.length > 0) {
      setUserEditNickname(userData[0].nickname);
      setUserEditAbout(userData[0].about);
      setPrevProfileImageURL(userData[0].profileImage);
    }
  }, []);

  // const fetchUserDB = async () => {
  //   const { data, error } = await supabase
  //     .from('users')
  //     .select('nickname, profileImage, email, about')
  //     .eq('email', user?.email);
  //   // console.log('현재 유저 정보 ', data);

  //   if (error) {
  //     alert('프로필 수정 오류가 발생했습니다. 고객센터에 문의해주세요.');
  //   }
  //   return data;
  // };

  // 변경 전 이미지 URL(prevProfileImageURL)이 수정 완료 버튼 클릭 시 적용된 URL과 같으면 변경 로직 실행 X
  // 미리보기
  const imageRef = useRef<HTMLInputElement | null>(null);
  const changhProfileImageFile = () => {
    const file = imageRef.current?.files?.[0]; //내가 새롭게 지정한 이미지 파일
    setNewProfileImageFile((prev) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProfileImageURL(reader.result);
        };
        reader.readAsDataURL(file); // 새롭게 지정한 프로필 이미지를 임의의 URL로 변환하여 화면에 보여줌 (image src에 적용)
      }
      return file as File;
    }); // 이 때 아래서 사용할 image 변수를 지정해주었다. 새롭게 지정한 파일도 storage에는 File 형식으로 올라가야함
  };

  // // storage image update
  const updateStorageAndProfile = async () => {
    const { data, error } = await supabaseService.storage
      .from('user-profile')
      .update(user?.id!, newProfileImageFile!, {
        cacheControl: '3600',
        upsert: true,
      });
    // console.log(data);
  };

  //   // storage image update에 error가 없다면
  //   if (!error) {
  //     const { data, error } = await supabase
  //       .from('users')
  //       .select('profileImage')
  //       .eq('email', user?.email);
  //     console.log('현재 이미지 url ', data);
  //     setPrevProfileImageURL(data![0].profileImage);
  //   }
  // };

  const test = async (): Promise<void> => {
    const { error } = await supabase
      .from('users')
      .update({ nickname: userEditNickname, about: userEditAbout })
      .eq('email', user?.email);

    if (!error) {
      if (!userEditNickname) {
        alert('닉네임은 필수입니다. 닉네임을 입력해주세요.');
      } else {
        await updateStorageAndProfile();
        alert('프로필 수정이 완료됐습니다!');
        setUserEditNickname('');
        setUserEditAbout('');
        setIsEdit(false);
      }
    } else {
      alert(
        '프로필 수정에 오류가 있습니다. 고객센터에 문의해주세요. error: profileEdit.',
      );
    }
  };

  const testMutation = useMutation(test, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userData']);
    },
  });
  // 수정 완료 버튼
  const handleProfileEditSave = async () => {
    testMutation.mutate();
  };
  // try {
  //   const testMutation = useMutation(test, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["userData"]);
  //     },
  //     }
  //     );
  // } catch (error) {
  //   console.log(error);
  // }
  // 뒤로가기 버튼
  const handleEditToggleButton = () => {
    setIsEdit(false);
  };

  return (
    <>
      <S.UserProfileContainer>
        <S.UserImageUpload className="profile-image">
          {newProfileImageURL ? (
            <S.UserImage>
              <img
                src={newProfileImageURL as string}
                alt="새로운 프로필 이미지"
              />
            </S.UserImage>
          ) : prevProfileImageURL ? (
            <S.UserImage>
              <img
                src={prevProfileImageURL as string}
                alt="이전 프로필 이미지"
              />
            </S.UserImage>
          ) : (
            <span>이미지 미리보기</span>
          )}
          <div>
            <S.UserImageButton htmlFor="editProfileImg">
              프로필 이미지 업로드
            </S.UserImageButton>
          </div>
          <input
            type="file"
            accept="image/*"
            id="editProfileImg"
            style={{ display: 'none' }}
            onChange={changhProfileImageFile}
            ref={imageRef}
          />
        </S.UserImageUpload>

        <div>
          <S.UserAboutBox>
            <S.UserLabel>email</S.UserLabel>
            <br />
            <S.UserAbout>{user?.email}</S.UserAbout>
          </S.UserAboutBox>
          <S.UserAboutBox>
            <S.UserLabel>닉네임</S.UserLabel>
            <br />
            <S.UserAbout>
              <Input
                showCount
                maxLength={10}
                type="text"
                value={userEditNickname}
                onChange={(e) => setUserEditNickname(e.target.value)}
                name="nicknameEdit"
              />
            </S.UserAbout>
          </S.UserAboutBox>
          <S.UserAboutBox>
            <S.UserLabel>자기소개</S.UserLabel>
            <br />
            <S.UserAbout>
              <TextArea
                showCount
                maxLength={50}
                value={userEditAbout}
                onChange={(e) => setUserEditAbout(e.target.value)}
                name="aboutEdit"
              />
            </S.UserAbout>
          </S.UserAboutBox>
        </div>
      </S.UserProfileContainer>
      <S.MypageEditButton>
        <S.Button onClick={handleProfileEditSave}>수정 완료</S.Button>
        <S.Button onClick={handleEditToggleButton}>뒤로가기</S.Button>
      </S.MypageEditButton>
    </>
  );
};

export default UserEdit;
