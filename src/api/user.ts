import supabase from './supabase';

export const fetchUserDB = async (email: string) => {
  // 현재 유저의 프로필URL과 nickname 가져오기
  console.log(' >>>>>', email);
  const { data, error } = await supabase
    .from('users')
    .select('nickname, profileImage, about')
    .eq('email', email);

  console.log('더이상..쓸말이..', data);

  if (error) {
    alert(
      '사용자 정보를 가져오지 못하는 오류가 발생했습니다. 고객센터에 문의해주세요. error:header.',
    );
  }
  return data;
};
