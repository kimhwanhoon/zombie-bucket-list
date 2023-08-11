import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from '../Intro/Intro.styles';
import TypeIt from 'typeit-react';

const Intro = () => {
  const navigate = useNavigate();

  // 현재 스텝 및 버튼 상태를 관리하는 상태 변수들
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [enterButton, setEnterButton] = useState<boolean>(false);
  const [skipToggler, setSkipToggler] = useState<boolean>(false);
  const [lastSkipToggler, setLastSkipToggler] = useState<boolean>(true);

  // 스킵 버튼 클릭 핸들러
  const handleSkipButtonClick = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <S.IntroWrapper>
      {/* 전체 스킵 버튼 */}
      <S.AllSkipButton
        type="text"
        onClick={() => {
          alert('로그인 페이지로 이동합니다.');
          navigate('/auth');
        }}
      >
        전체스킵 &gt;&gt;
      </S.AllSkipButton>

      {/* 스텝에 따른 컨텐츠 표시 */}
      {currentStep === 0 && (
        <>
          <TypeIt
            options={{
              speed: 100,
              cursor: false,
              afterComplete: async (instance: typeof TypeIt) => {
                // 애니메이션 완료 후 스텝 전환
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
          {/* 스킵 토글 상태에 따른 컨텐츠 표시 */}
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
              <S.Button
                onClick={() => {
                  alert('로그인 페이지로 이동합니다!');
                  navigate('/auth');
                }}
              >
                입장하기
              </S.Button>
            </>
          ) : (
            <>
              <TypeIt
                options={{
                  speed: 100,
                  cursor: false,
                  afterComplete: async (instance: typeof TypeIt) => {
                    // 스킵 토글과 버튼 활성화 상태 업데이트
                    setEnterButton(true);
                    setLastSkipToggler(false);
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
              {/* 마지막 스킵 버튼 */}
              {lastSkipToggler && (
                <S.SkipButton type="text" onClick={() => setSkipToggler(true)}>
                  스킵 &gt;&gt;
                </S.SkipButton>
              )}
            </>
          )}
        </>
      )}
      {/* 입장하기 버튼 활성화 상태에 따른 버튼 표시 */}
      {enterButton && (
        <S.Button onClick={() => navigate('/auth')}>입장하기</S.Button>
      )}
    </S.IntroWrapper>
  );
};

export default Intro;
