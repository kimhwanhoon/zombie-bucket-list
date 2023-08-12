import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Button, Space, Tag, Form, Input, Modal, message } from 'antd';
import postBucket from '../../../../api/postBucket';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import Upload, { RcFile } from 'antd/es/upload';
import uploadImage from '../../../../api/uploadImage';
import shortUUID from 'short-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { postModalToggler } from '../../../../redux/modules/writeAPostModalToggler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import useGetCurrentUser from '../../../../hooks/getCurrentUser';

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

type FieldType = {
  title?: string;
  content?: string;
};

const WriteAPostModal = () => {
  const dispatch = useDispatch();
  const currentUser = useGetCurrentUser().data;
  const { TextArea } = Input;
  const { CheckableTag } = Tag;
  const [titleValue, setTitleValue] = useState<string>('');
  const [contentValue, setContentValue] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['기타']);
  const [photo, setPhoto] = useState<RcFile | null>(null);
  // 무결성 체크
  const [isTitleEmpty, setIsTitleEmpty] = useState<boolean>(true);
  const [isTagMoreThanTwo, setIsTagMoreThanTwo] = useState<boolean>(false);
  const [isContentEmpty, setIsContentEmpty] = useState<boolean>(true);
  useEffect(() => {
    titleValue.length > 0 ? setIsTitleEmpty(false) : setIsTitleEmpty(true);
  }, [titleValue]);
  useEffect(() => {
    contentValue.length > 0
      ? setIsContentEmpty(false)
      : setIsContentEmpty(true);
  }, [contentValue]);
  //
  const postModalToggle = useSelector((state: State) => state.postModalToggle);
  const queryClient = useQueryClient();
  // 작성 모달에 태그 선택관련.. 최대 2개까지만 선택 가능하게 설정
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags((prev) => {
      if (nextSelectedTags.length <= 2) {
        setIsTagMoreThanTwo(false);
        return nextSelectedTags;
      } else if (nextSelectedTags.length > 2) {
        setIsTagMoreThanTwo(true);
        return prev;
      } else {
        return nextSelectedTags;
      }
    });
  };

  // 작성하기 tanstack query함수 + invalidate
  const mutation = useMutation({
    mutationFn: async () => {
      const uuid = shortUUID.generate();
      const url = photo ? await uploadImage(photo, uuid) : null;
      await postBucket({
        title: titleValue,
        content: contentValue,
        selectedTags,
        uuid,
        url,
        email: currentUser!.email as string,
        userId: currentUser!.id,
      });
      message.success('성공적으로 등록되었습니다.');
      dispatch(postModalToggler(false));
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
  return (
    <Modal
      // title="Title"
      open={postModalToggle}
      footer={null}
      // onOk={handleOk}
      // confirmLoading={confirmLoading}
      onCancel={() => dispatch(postModalToggler(false))}
    >
      <modal.container>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          style={{
            width: 400,
          }}
        >
          <modal.titleContainer>
            <modal.title>제목</modal.title>
            {isTitleEmpty && (
              <modal.warning>내용을 입력해주세요.</modal.warning>
            )}
          </modal.titleContainer>

          <Input
            size="large"
            onChange={(e) => setTitleValue(e.target.value)}
            maxLength={30}
            placeholder="제목"
          />
          <modal.titleContainer>
            <modal.title>태그</modal.title>
            {isTagMoreThanTwo && (
              <modal.warning>
                최대 2가지 태그만 선택할 수 있습니다.
              </modal.warning>
            )}
          </modal.titleContainer>
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
          <modal.titleContainer>
            <modal.title>본문</modal.title>
            {isContentEmpty && (
              <modal.warning>내용을 입력해주세요.</modal.warning>
            )}
          </modal.titleContainer>
          <TextArea
            showCount
            maxLength={500}
            style={{
              resize: 'none',
              height: 200,
              marginBottom: '1.25rem',
            }}
            placeholder="내용을 입력해주세요"
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
            <Button
              disabled={isTitleEmpty || isContentEmpty}
              type="primary"
              block
              onClick={() => handleSubmit()}
            >
              작성하기
            </Button>
          </Space>
        </Form>
      </modal.container>
    </Modal>
  );
};

export default WriteAPostModal;

const modal = {
  container: styled.div`
    display: flex;

    justify-content: center;
    align-items: center;
  `,
  title: styled.h2`
    font-size: 1rem;
    padding: 0.5rem 0;
    font-weight: 600;
  `,
  titleContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  warning: styled.span`
    color: var(--color-accent);
  `,
};
