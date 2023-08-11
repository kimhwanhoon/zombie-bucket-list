import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { S } from './UserInfo.styles';
import supabase from '../../api/supabase';
import { useNavigate } from 'react-router-dom';
import supabaseService from '../../api/supabaseService';
import UserEdit from './UserEdit';
import UserBucketByStatus from './UserBucketByStatus';

const UserInfo = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const UserUID = user?.id;

  // 유저 정보 관리
  const [userProfile, setUserProfile] = useState<string>();
  const [userNickname, setUserNickname] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [userAbout, setUserAbout] = useState<string>();
  const [isEdit, setIsEdit] = useState(false);

  // console.log('isEdit:', isEdit);

  // TODO: 새로고침할 때도 잠깐 User 정보가 안 들어왔다가 들어오는 이슈 있음
  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserDB = async () => {
      // 현재 유저의 프로필URL과 nickname 가져오기
      const { data, error } = await supabase
        .from('users')
        .select('nickname, profileImage, email, about')
        .eq('email', user?.email);

      console.log('나나나나나나<<<<<<<<<<<', data);

      if (error) {
        alert(
          '사용자 정보를 가져오지 못하는 오류가 발생했습니다. 고객센터에 문의해주세요. error: info.',
        );
      } else {
        if (data && data.length > 0) {
          setUserNickname(data[0].nickname);
          setUserProfile(data[0].profileImage);
          setUserEmail(data[0].email);
          setUserAbout(data[0].about);
        }
      }
    };
    fetchUserDB();
  }, [user, isEdit]);

  const deleteProfileImage = async () => {
    const { data, error } = await supabaseService.storage
      .from('user-profile')
      .remove([user?.id!]);
  };

  //유저 정보 수정

  //회원 탈퇴 버튼
  const handleDeleteUser = async () => {
    const isConfirmed = window.confirm('정말로 회원 탈퇴하시겠습니까?');

    if (isConfirmed && UserUID !== undefined) {
      try {
        const { error } = await supabaseService.auth.admin.deleteUser(UserUID);
        await supabase.from('users').delete().eq('email', user?.email);
        localStorage.removeItem('token');
        deleteProfileImage();

        if (error) {
          alert('회원 탈퇴 중 오류가 발생했습니다.');
        } else {
          await supabase.auth.signOut();
          navigate('/auth');
        }
      } catch (error) {
        alert(
          '회원 탈퇴 중 오류가 발생했습니다. 고객센터에 문의해주세요. error: info.',
        );
      }
    }
  };

  //유저 정보 수정 버튼
  const handleEditToggleButton = () => {
    setIsEdit(!isEdit);
  };

  //홈으로 가기 버튼
  const handleGoHomeButton = () => {
    navigate(`/userId/${user?.id}/bucket-list`);
  };

  return (
    <div>
      {/* 내가 쓴 글 상태 보기 */}
      <UserBucketByStatus />

      {/* 내 정보 관리 */}
      {isEdit ? (
        <UserEdit user={user} setIsEdit={setIsEdit} />
      ) : (
        <>
          <S.UserProfileContainer>
            <S.UserImgNickname>
              <S.UserImage>
                <img src={userProfile} alt="user-pic" />
              </S.UserImage>
              <S.UserNickname>{userNickname}</S.UserNickname>
            </S.UserImgNickname>
            <div>
              <S.UserEmailBox>
                <S.UserLabel>email</S.UserLabel>
                <br />
                <S.UserEmail>{userEmail}</S.UserEmail>
              </S.UserEmailBox>
              <div>
                <S.UserLabel>자기소개</S.UserLabel>
                <br />
                <S.UserAbout>{userAbout}</S.UserAbout>
              </div>
            </div>
          </S.UserProfileContainer>
          <S.MypageButtonBox>
            <button onClick={handleEditToggleButton}>회원정보 수정</button>
            <button onClick={handleDeleteUser}>회원 탈퇴</button>
            <button onClick={handleGoHomeButton}>내 홈으로 가기</button>
          </S.MypageButtonBox>
        </>
      )}
    </div>
  );
};

export default UserInfo;
