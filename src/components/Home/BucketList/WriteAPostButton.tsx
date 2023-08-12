import { styled } from 'styled-components';
import WriteAPostModal from '../Modal/WriteAPost/WriteAPostModal';
import { useDispatch, useSelector } from 'react-redux';
import { postModalToggler } from '../../../redux/modules/writeAPostModalToggler';
import { useParams } from 'react-router-dom';
import useGetCurrentUser from '../../../hooks/getCurrentUser';
import { Button } from 'antd';

const WriteAPostButton = () => {
  const { data: currentUser = null } = useGetCurrentUser();
  const dispatch = useDispatch();
  const postModalToggle = useSelector(
    (state: postModalTogglerType) => state.postModalToggle,
  );
  const params = useParams().userId;
  return (
    <>
      {currentUser !== null && currentUser.id === params && (
        <S.container>
          <AntStyledButton
            loading={postModalToggle}
            onClick={() => dispatch(postModalToggler(!postModalToggle))}
          >
            {!postModalToggle ? '작성하기' : '작성중'}
          </AntStyledButton>
        </S.container>
      )}
      <WriteAPostModal />
    </>
  );
};

export default WriteAPostButton;

const S = {
  container: styled.div`
    position: relative;
  `,
};

const AntStyledButton = styled(Button)`
  position: absolute;
  top: 5rem;
  right: 2rem;
  cursor: pointer;
  z-index: 10;
`;
