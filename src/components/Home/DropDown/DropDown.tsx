import { useParams } from 'react-router-dom';
import useGetBucketList from '../../../hooks/getBucketList';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setStatusLabel } from '../../../redux/modules/statusLabelSlice';

interface MenuItemType {
  key: string;
  label: string; // 'label' 프로퍼티 추가
  disabled?: boolean;
}

// items 배열을 정의합니다.
const items: MenuItemType[] = [
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

  const bucketListData = useGetBucketList(userId as string, null);
  const bucketList = bucketListData.data?.bucket_list;
  if (!bucketList) return <>error!!!</>;

  const handleItemClick: MenuProps['onClick'] = (e) => {
    const tempLabel = items?.find((item) => item?.key === e.key)?.label;
    return dispatch(setStatusLabel(tempLabel));
  };

  // const handleDropdownOpenChange = (open: boolean) => {
  //   if (!open) {
  //     setStatusLabel(undefined);
  //   }
  // };

  return (
    <>
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ['1'],
          onClick: handleItemClick,
        }}

        // onOpenChange={handleDropdownOpenChange}
      >
        <Typography.Link>
          <Space>
            진행상태
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </>
  );
};

export default DropDown;
