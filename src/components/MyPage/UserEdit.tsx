import React, { useState } from 'react';
import { S } from './UserEdit.styles';
import { User } from '@supabase/supabase-js';

const UserEdit = ({
  user,
  setIsEdit,
}: {
  user: User | null;
  setIsEdit: any;
}) => {
  // 수정되는 유저 정보
  // const [userProfile, setUserProfile] = useState<string>();
  const [userEditNickname, setUserEditNickname] = useState<string>();
  const [userEditAbout, setUserEditAbout] = useState<string>();

  // 뒤로가기 버튼
  const handleEditToggleButton = () => {
    setIsEdit(false);
  };

  return (
    <>
      <S.UserProfileContainer>
        <div>
          <S.UserImage>
            <img src="" />
          </S.UserImage>
          <div>
            <input value={userEditNickname} />
          </div>
        </div>
        <div>
          <div>
            <label>email: {user?.email}</label>
          </div>
          <div>
            <label>자기소개:</label>
            <textarea value={userEditAbout} />
          </div>
        </div>
      </S.UserProfileContainer>
      <div>
        <button>수정 완료</button>
        <button onClick={handleEditToggleButton}>뒤로가기</button>
      </div>
    </>
  );
};

export default UserEdit;
