import { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Button, Space, Tag, Form, Input, Slider } from 'antd';
import postBucket from '../../../../api/postBucket';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import Upload, { RcFile } from 'antd/es/upload';
import uploadImage from '../../../../api/uploadImage';
import shortUUID from 'short-uuid';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import useGetCurrentUser from '../../../../hooks/getCurrentUser';
import { editModalToggler } from '../../../../redux/modules/editPostModalToggler';
import useGetBucketList from '../../../../hooks/getBucketList';
import { useParams } from 'react-router-dom';
import editBucket from '../../../../api/editBucket';

const tagsData: categories[] = [
  '자기계발',
  '여행',
  '건강',
  '문화/예술',
  '가족/친구',
  '자선활동',
  '취미',
  '음식',
  '기타',
];

interface BucketListResponse {
  data: { bucket_list: Array<BucketList>; error: any };
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: any;
}
const EditPostModal = () => {
  // Basic settings
  const { data: currentUser = null } = useGetCurrentUser();
  const { userId, postId } = useParams();
  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useGetBucketList(
    userId as string,
    postId as string,
  ) as BucketListResponse;
  const targetPost = postData.bucket_list.filter(
    (post) => post.id.toString() === postId,
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  // Form
  const { TextArea } = Input;
  const { CheckableTag } = Tag;
  const [titleValue, setTitleValue] = useState<string>(targetPost[0].title);
  const [contentValue, setContentValue] = useState<string>(
    targetPost[0].content,
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(['기타']);
  const [statusValue, setStatusValue] = useState<number>(1);
  const [photo, setPhoto] = useState<RcFile | null>(null);
  const uuid = targetPost[0].uuid;
  //
  useEffect(() => {
    if (postData && targetPost.length > 0) {
      setSelectedTags(targetPost[0].categories);
      switch (targetPost[0].status) {
        case '시작전': {
          setStatusValue(0);
          break;
        }
        case '진행중': {
          setStatusValue(1);
          break;
        }
        case '완료': {
          setStatusValue(2);
          break;
        }
      }
    }
  }, [postData]);
  const handleStatusChange = (value: number) => {
    setStatusValue(value);
  };
  //
  // 작성 모달에 태그 선택관련.. 최대 2개까지만 선택 가능하게 설정
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags((prev) => {
      if (nextSelectedTags.length > 2) {
        alert('최대 2가지 태그만 선택할 수 있습니다.');
        return prev;
      } else {
        return nextSelectedTags;
      }
    });
  };
  // 작성하기 tanstack query함수 + invalidate

  const mutation = useMutation({
    mutationFn: async () => {
      const url = photo
        ? await uploadImage(photo, uuid)
        : targetPost[0].photoURL;

      await editBucket({
        title: titleValue,
        content: contentValue,
        selectedTags,
        uuid,
        url,
        statusValue,
      });
      alert('성공적으로 수정했습니다.');
      dispatch(editModalToggler(false));
      setPhoto(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bucketList'] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 작성하기 함수를 디바운싱하는 함수를 useCallaback에 넣기
  const handleSubmit = useCallback(
    debounce(() => mutation.mutate(), 300),
    [],
  );
  if (isLoading) return <>Loading...</>;
  if (isError) return <>error! {error}</>;
  return (
    <modal.container style={photo ? { height: '730px' } : { height: '670px' }}>
      <modal.closeButtonContainer>
        <CloseOutlined onClick={() => dispatch(editModalToggler(false))} />
      </modal.closeButtonContainer>
      <Form
        name="basic"
        // initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        style={{
          width: 400,
        }}
      >
        <modal.title>제목</modal.title>
        <Input
          size="large"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          maxLength={30}
          style={{ marginBottom: '1rem' }}
        />
        <modal.title>태그</modal.title>
        <Space style={{ marginBottom: '1rem' }} size={[0, 0]} wrap>
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.includes(tag)}
              onChange={(checked) => handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </Space>
        <Slider
          defaultValue={0}
          max={2}
          autoFocus
          keyboard
          dots
          tooltip={{ open: false }}
          marks={{ 0: '시작전', 1: '진행중', 2: '완료' }}
          value={statusValue}
          onChange={handleStatusChange}
        />
        <modal.title>본문</modal.title>
        <TextArea
          showCount
          maxLength={500}
          style={{
            resize: 'none',
            height: 200,
            marginBottom: '2rem',
          }}
          placeholder="내용을 입력해주세요"
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
        />
        <Upload.Dragger
          accept="image/png, image/jpeg, image/jpg"
          listType="picture"
          className="upload-list-inline"
          maxCount={1}
          onRemove={() => setPhoto(null)}
          beforeUpload={(file) => {
            if (file) setPhoto(file);
            return false;
          }}
        >
          <span>사진을 드래그 하거나 밑의 업로드 버튼을 눌러주세요.</span>
          <Button block icon={<UploadOutlined />}>
            업로드
          </Button>
        </Upload.Dragger>
        <Space
          direction="vertical"
          style={{ width: '100%', marginTop: '1rem' }}
        >
          <Button type="primary" block onClick={() => handleSubmit()}>
            수정하기
          </Button>
        </Space>
      </Form>
    </modal.container>
  );
};

export default EditPostModal;

const modal = {
  container: styled.div`
    display: flex;
    width: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    z-index: 100;
    background-color: #fafafa;
    box-shadow: 0 1px 5px 0 #ccc;
    justify-content: center;
    align-items: center;
    transition: cubic-bezier(0, 0, 0.2, 1) 0.3s;
  `,
  closeButtonContainer: styled.div`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
    font-size: 1.25rem;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  `,
  title: styled.h2`
    font-size: 1rem;
    padding-bottom: 0.3rem;
    font-weight: 600;
  `,
};
