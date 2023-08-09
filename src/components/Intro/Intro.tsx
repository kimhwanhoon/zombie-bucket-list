import { useState } from 'react';
import TypeIt from 'typeit-react';
import { S } from '../Intro/Intro.styles';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();
  //
  const [oneStep, setOneStep] = useState<boolean>(true);
  const [twoStep, setTwoStep] = useState<boolean>(false);
  const [threeStep, setThreeStep] = useState<boolean>(false);
  const [fourStep, setFourStep] = useState<boolean>(false);

  return (
    <S.IntroWrapper>
      {oneStep && (
        <TypeIt
          options={{
            speed: 100,
            cursor: false,
            afterComplete: async (instance: typeof TypeIt) => {
              setTimeout(() => {
                setOneStep(false);
                setTwoStep(true);
              }, 1500);
            },
          }}
        >
          <S.IntroText>
            <p>언제나 같은 아침, 매일 똑같은 일상에 지쳐가던 어느 날,</p>
            <p>눈을 떠보니 도시가 좀비 사태에 휩싸였어.</p>
            <p>
              그렇게 시작된 이상한 현실에 나도 모르게 긴장이 감돌기 시작했지.
            </p>
            <p>막연한 불안감이 나를 감싸기 시작했어...</p>
          </S.IntroText>
        </TypeIt>
      )}
      {twoStep && (
        <TypeIt
          options={{
            speed: 100,
            cursor: false,
            afterComplete: async (instance: typeof TypeIt) => {
              setTimeout(() => {
                setTwoStep(false);
                setThreeStep(true);
              }, 1500);
            },
          }}
        >
          <S.IntroText>
            <p>하지만 이제, 더 이상 도망치지 않아도 돼.</p>
            <p>
              세상은 한달에 1번씩 백신을 접종하지 않으면 좀비로 변해버리는 곳이
              되었어.
            </p>
            <p>이제는 내가 내 삶을 쥐고 갈 차례야.</p>
            <p>무서운 시간이지만, 동시에 내게 주어진 두 번째 기회야.</p>
          </S.IntroText>
        </TypeIt>
      )}
      {threeStep && (
        <>
          <TypeIt
            options={{
              speed: 100,
              cursor: false,
              afterComplete: async (instance: typeof TypeIt) => {
                setTimeout(() => {
                  setFourStep(true);
                }, 100);
              },
            }}
          >
            <S.IntroText>
              <p>100가지의 버킷리스트를 작성하고, 이를 하나씩 실천해야해.</p>
              <p>
                눈에 보이지 않는 위험한 적들과 맞서 싸우며, 내 삶을 다시
                채워나가는 거야.
              </p>
              <p>그럼 시작해보자!</p>
            </S.IntroText>
          </TypeIt>
        </>
      )}
      {fourStep && (
        <S.Button onClick={() => navigate('/auth')}>입장하기</S.Button>
      )}
    </S.IntroWrapper>
  );
};

export default Intro;
