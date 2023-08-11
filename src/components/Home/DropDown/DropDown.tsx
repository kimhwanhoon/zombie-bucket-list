import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import { useState } from 'react';

const items: MenuProps['items'] = [
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
  const [key, setKey] = useState<string>('0');

  const handleItemClick: MenuProps['onClick'] = (e) => {
    console.log(e.key);
  };

  // const handleMenuClick: MenuProps['onClick'] = (e) => {
  //   if (e.key === '3') {
  //     setOpen(false);
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

// import React, { useState } from 'react';
// import { DownOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Dropdown, Space } from 'antd';

// const App: React.FC = () => {
//   const [open, setOpen] = useState(false);

//   const handleMenuClick: MenuProps['onClick'] = (e) => {
//     if (e.key === '3') {
//       setOpen(false);
//     }
//   };

//   const handleOpenChange = (flag: boolean) => {
//     setOpen(flag);
//   };

//   const items: MenuProps['items'] = [
//     {
//       label: 'Clicking me will not close the menu.',
//       key: '1',
//     },
//     {
//       label: 'Clicking me will not close the menu also.',
//       key: '2',
//     },
//     {
//       label: 'Clicking me will close the menu.',
//       key: '3',
//     },
//   ];

//   return (
//     <Dropdown
//       menu={{
//         items,
//         onClick: handleMenuClick,
//       }}
//       onOpenChange={handleOpenChange}
//       open={open}
//     >
//       <a onClick={(e) => e.preventDefault()}>
//         <Space>
//           Hover me
//           <DownOutlined />
//         </Space>
//       </a>
//     </Dropdown>
//   );
// };

// export default App;
