import { useState } from 'react';
import TypeIt from 'typeit-react';
import { S } from '../Intro/Intro.styles';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [enterButton, setEnterButton] = useState<boolean>(false);
  const [skipToggler, setSkipToggler] = useState<boolean>(false);
  const [lastSkipToggler, setLastSkipToggler] = useState<boolean>(true);

  const handleSkipButtonClick = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <S.IntroWrapper>
      <S.AllSkipButton type="text" onClick={() => navigate('/auth')}>
        전체스킵 &gt;&gt;
      </S.AllSkipButton>
      {currentStep === 0 && (
        <>
          <TypeIt
            options={{
              speed: 100,
              cursor: false,
              afterComplete: async (instance: typeof TypeIt) => {
                setTimeout(() => {
                  setCurrentStep(1);
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
          <S.SkipButton type="text" onClick={handleSkipButtonClick}>
            스킵 &gt;&gt;
          </S.SkipButton>
        </>
      )}
      {currentStep === 1 && (
        <>
          <TypeIt
            options={{
              speed: 100,
              cursor: false,
              afterComplete: async (instance: typeof TypeIt) => {
                setTimeout(() => {
                  setCurrentStep(2);
                }, 1500);
              },
            }}
          >
            <S.IntroText>
              <p>하지만 이제, 더 이상 도망치지 않아도 돼.</p>
              <p>
                세상은 한달에 1번씩 백신을 접종하지 않으면 좀비로 변해버리는
                곳이 되었어.
              </p>
              <p>이제는 내가 내 삶을 쥐고 갈 차례야.</p>
              <p>무서운 시간이지만, 동시에 내게 주어진 두 번째 기회야.</p>
            </S.IntroText>
          </TypeIt>
          <S.SkipButton type="text" onClick={handleSkipButtonClick}>
            스킵 &gt;&gt;
          </S.SkipButton>
        </>
      )}
      {currentStep === 2 && (
        <>
          {skipToggler ? (
            <>
              <S.IntroText>
                <p>100가지의 버킷리스트를 작성하고, 이를 하나씩 실천해야해.</p>
                <p>
                  눈에 보이지 않는 위험한 적들과 맞서 싸우며, 내 삶을 다시
                  채워나가는 거야.
                </p>
                <p>그럼 시작해보자!</p>
              </S.IntroText>
              <S.Button onClick={() => navigate('/auth')}>입장하기</S.Button>
            </>
          ) : (
            <>
              <TypeIt
                options={{
                  speed: 100,
                  cursor: false,
                  afterComplete: async (instance: typeof TypeIt) => {
                    // setTimeout(() => {
                    setEnterButton(true);
                    setLastSkipToggler(false);
                    // }, 100);
                  },
                }}
              >
                <S.IntroText>
                  <p>
                    100가지의 버킷리스트를 작성하고, 이를 하나씩 실천해야해.
                  </p>
                  <p>
                    눈에 보이지 않는 위험한 적들과 맞서 싸우며, 내 삶을 다시
                    채워나가는 거야.
                  </p>
                  <p>그럼 시작해보자!</p>
                </S.IntroText>
              </TypeIt>
              {lastSkipToggler && (
                <S.SkipButton type="text" onClick={() => setSkipToggler(true)}>
                  스킵 &gt;&gt;
                </S.SkipButton>
              )}
            </>
          )}
        </>
      )}
      {enterButton && (
        <S.Button onClick={() => navigate('/auth')}>입장하기</S.Button>
      )}
    </S.IntroWrapper>
  );
};

export default Intro;
