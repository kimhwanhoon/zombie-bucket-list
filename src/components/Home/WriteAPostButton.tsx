import { styled } from 'styled-components';
import WriteAPostModal from './WriteAPostModal';
import { useState } from 'react';

const WriteAPostButton = () => {
  const [modalToggler, setModalToggler] = useState<boolean>(false);
  return (
    <>
      <S.container>
        <S.button onClick={() => setModalToggler(!modalToggler)}>
          작성하기
        </S.button>
      </S.container>
      {modalToggler && <WriteAPostModal setModalToggler={setModalToggler} />}
    </>
  );
};

export default WriteAPostButton;

const S = {
  container: styled.div`
    position: relative;
  `,
  button: styled.button`
    position: absolute;
    top: 2rem;
    right: 2rem;
    cursor: pointer;
  `,
};
