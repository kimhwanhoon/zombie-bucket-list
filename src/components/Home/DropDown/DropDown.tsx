import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setStatusLabel } from '../../../redux/modules/statusLabelSlice';
import useGetBucketList from '../../../hooks/getBucketList';
import { S } from './DropDown.styles';
import { Dropdown, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';

// 드롭다운 메뉴 아이템에 대한 정보를 담는 인터페이스
interface MenuItemType {
  key: string;
  label: string;
}

// 드롭다운 아이템 정보
const items: MenuItemType[] = [
  {
    key: '0',
    label: '전체 보기',
  },
  {
    key: '1',
    label: '시작전',
  },
  {
    key: '2',
    label: '진행중',
  },
  {
    key: '3',
    label: '완료',
  },
];

const DropDown = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  // 버킷리스트 데이터 가져오기
  const bucketListData = useGetBucketList(userId as string, null);
  const bucketList = bucketListData.data?.bucket_list;
  if (!bucketList) return <>error!!!</>;

  // 드롭다운 아이템 클릭 시 호출되는 핸들러 함수
  const handleItemClick: MenuProps['onClick'] = (e) => {
    // 선택된 아이템의 label 가져오기
    const tempLabel = items?.find((item) => item?.key === e.key)?.label;
    return dispatch(setStatusLabel(tempLabel));
  };

  return (
    <S.Container>
      {/* Ant Design의 드롭다운 컴포넌트 */}
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ['0'],
          onClick: handleItemClick,
        }}
        placement="bottom"
      >
        {/* 드롭다운 트리거 역할을 하는 링크 */}
        <Typography.Link>
          <Space>
            <S.Statuslabel>
              진행상태&nbsp;
              <DownOutlined />
            </S.Statuslabel>
          </Space>
        </Typography.Link>
      </Dropdown>
    </S.Container>
  );
};

export default DropDown;
