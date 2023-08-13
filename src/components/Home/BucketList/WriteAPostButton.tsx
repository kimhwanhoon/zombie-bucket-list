import { styled } from 'styled-components';
import DropDown from '../DropDown/DropDown';
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
          <S.WriteWrapper>
            <div>
              <AntStyledButton
                loading={postModalToggle}
                onClick={() => dispatch(postModalToggler(!postModalToggle))}
              >
                {!postModalToggle ? '작성하기' : '작성중'}
              </AntStyledButton>
            </div>
            <S.DropDownWrapper>
              <DropDown />
            </S.DropDownWrapper>
          </S.WriteWrapper>
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

  WriteWrapper: styled.div`
    position: absolute;
    right: 4rem;
    margin: 5rem 4rem 0 0;

    display: flex;
    gap: 10px;
  `,

  DropDownWrapper: styled.div`
    margin-top: 10px;
    padding: 4px 8px;
    border: 1px solid lightgray;
    border-radius: 8px;
    z-index: 11;
  `,
};

const AntStyledButton = styled(Button)`
  margin-top: 10px;
  cursor: pointer;
  z-index: 10;

  .ant-space-item {
    padding-top: 4px;
  }
`;
