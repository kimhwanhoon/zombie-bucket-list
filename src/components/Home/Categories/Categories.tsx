import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../redux/config/configStore';
import useGetBucketList from '../../../hooks/getBucketList';

import { S } from './Categories.styles';
import { tagColors } from '../../../styles/customStyles';
import { Tag } from 'antd';

import type { TabsProps } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';

// 카테고리 탭에 대한 정보를 담는 인터페이스
interface CategoryTab {
  key: string;
  label: string;
  state?: BucketList[];
}

const Categories = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  // 리덕스 스토어에서 상태값 가져오기
  const statusLabel = useSelector(
    (state: RootState) => state.statusLabel.label,
  );

  // 필터링된 버킷리스트를 저장하는 상태
  const [filteredBucketList, setFilteredBucketList] = useState<BucketList[]>();

  // 버킷리스트 데이터 가져오기
  const bucketListData = useGetBucketList(userId as string, null);
  const bucketList = bucketListData.data?.bucket_list;
  if (!bucketList) return <>버킷리스트를 가져오는 중...</>;

  // 카테고리 탭 변경 시 호출되는 핸들러
  const onChange = (key: string) => {
    const tempLabel = items?.find((item) => item.key === key)?.label;

    const newFilteredBucketList = bucketList.filter((list) => {
      // some함수 : 배열의 요소 중 하나라도 조건을 만족하면 true를 반환
      return list.categories?.some((t) => t === tempLabel);
    });

    // 필터링된 버킷리스트 업데이트
    setFilteredBucketList(newFilteredBucketList);
  };

  // 버킷 아이템 선택 시 호출되는 핸들러
  const handleChooseBucket = (id: number) => {
    navigate(`/userId/${userId}/bucket-list/${id}`);
  };

  // 카테고리 탭 정보
  const categoriesTabs: CategoryTab[] = [
    {
      key: '1',
      label: `전체보기`,
      state: bucketList,
    },
    {
      key: '2',
      label: `자기계발`,
      state: filteredBucketList,
    },
    {
      key: '3',
      label: `여행`,
      state: filteredBucketList,
    },
    {
      key: '4',
      label: `건강`,
      state: filteredBucketList,
    },
    {
      key: '5',
      label: `문화/예술`,
      state: filteredBucketList,
    },
    {
      key: '6',
      label: `가족/친구`,
      state: filteredBucketList,
    },
    {
      key: '7',
      label: `자선활동`,
      state: filteredBucketList,
    },
    {
      key: '8',
      label: `취미`,
      state: filteredBucketList,
    },
    {
      key: '9',
      label: `음식`,
      state: filteredBucketList,
    },
    {
      key: '10',
      label: `기타`,
      state: filteredBucketList,
    },
  ];

  // Ant Design Tabs 컴포넌트에 전달할 아이템 정보
  const items: TabsProps['items'] = categoriesTabs.map((category) => ({
    key: category.key,
    label: category.label,
    children: (
      <>
        <S.bucketListContainer>
          {category.state
            ?.filter((item) => {
              if (!statusLabel) {
                return item;
              } else if (statusLabel === '전체 보기') {
                return item;
              } else {
                return item.status === statusLabel;
              }
            })
            .map((item: BucketList) => (
              <div key={item.id}>
                <S.bucketContainer onClick={() => handleChooseBucket(item.id)}>
                  <S.bucketFirstLineContainer>
                    <h1>{item.title}</h1>
                    <p>
                      {item.categories.map((tag) => (
                        <Tag
                          key={tag}
                          bordered={false}
                          color={tagColors[`${tag}`]}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </p>
                  </S.bucketFirstLineContainer>
                  <S.bucketSecondLineContainer>
                    <p>{item.created_at}</p>
                    <span>{item.status}</span>
                  </S.bucketSecondLineContainer>
                </S.bucketContainer>
              </div>
            ))}
        </S.bucketListContainer>
      </>
    ),
  }));

  // Ant Design Tabs 컴포넌트 출력
  return <S.Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default Categories;
