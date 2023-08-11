import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../../api/supabase';
import { S } from './Categories.styles';
import { tagColors } from '../../../styles/customStyles';
import { Tag } from 'antd';

import type { TabsProps } from 'antd';

interface CategoryTab {
  key: string;
  label: string;
  state?: BucketList[];
}

const Categories = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  // 버킷리스트와 필터링된 리스트를 저장하는 상태 변수
  const [bucketlist, setBucketlist] = useState<BucketList[]>();
  const [filteredBucketList, setFilteredBucketList] = useState<BucketList[]>();

  // supabase로부터 버킷 리스트 데이터 가져오기
  const fetchBucketList = async () => {
    try {
      const { data } = await supabase
        .from('bucketList')
        .select('*')
        .eq('userId', userId)
        .order('id', { ascending: false });
      setBucketlist(data as BucketList[]);
    } catch (error: any) {
      return alert(error.message);
    }
  };

  useEffect(() => {
    fetchBucketList();
  }, []);

  // 카테고리 탭 변경 시 호출되는 핸들러
  const onChange = (key: string) => {
    const tempLabel = items?.find((item) => item.key === key)?.label;
    console.log('temp', tempLabel);

    const newFilteredBucketList = bucketlist?.filter((list: any) => {
      console.log('list', list);
      // some함수 : 배열의 요소 중 하나라도 조건을 만족하면 true를 반환
      return list.categories?.some((t: any) => t === tempLabel);
    });

    // 필터링된 버킷리스트 업데이트
    setFilteredBucketList(newFilteredBucketList);
  };

  // 버킷 아이템 선택 시 호출되는 핸들러
  const handleChooseBucket = (id: number) => {
    navigate(`/userId/${userId}/bucket-list/${id}`);
  };

  const categoriesTabs: CategoryTab[] = [
    {
      key: '1',
      label: `전체보기`,
      state: bucketlist,
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

  const items: TabsProps['items'] = categoriesTabs.map((category) => ({
    key: category.key,
    label: category.label,
    children: (
      <>
        <S.bucketListContainer>
          {category.state?.map((item: BucketList) => (
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
                </S.bucketSecondLineContainer>
              </S.bucketContainer>
            </div>
          ))}
        </S.bucketListContainer>
      </>
    ),
  }));

  return <S.Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default Categories;
