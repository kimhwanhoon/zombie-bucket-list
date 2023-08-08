import { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Button, Space, Tag, Form, Input, Upload } from 'antd';
import postBucket from '../../api/postBucket';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import uploadImage from '../../api/uploadImage';
import shortUUID from 'short-uuid';

type FieldType = {
  title?: string;
  content?: string;
};
interface Props {
  setModalToggler: (modalToggler: boolean) => void;
}
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

const WriteAPostModal = ({ setModalToggler }: Props) => {
  const { TextArea } = Input;
  const { CheckableTag } = Tag;

  const titleValue = useRef('');
  const contentValue = useRef('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['기타']);
  const [photo, setPhoto] = useState<RcFile | null>(null);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <modal.container style={photo ? { height: '680px' } : { height: '630px' }}>
      <modal.closeButtonContainer>
        <CloseOutlined onClick={() => setModalToggler(false)} />
      </modal.closeButtonContainer>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        style={{
          width: 400,
        }}
      >
        <Form.Item<FieldType>
          label="제목"
          name="title"
          rules={[{ message: '제목을 입력해주세요.' }]}
        >
          <Input
            size="large"
            onChange={(e) => (titleValue.current = e.target.value)}
          />
        </Form.Item>
        <span>태그</span>
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
        <Form.Item<FieldType>
          label="내용"
          name="content"
          rules={[{ message: '내용을 입력해주세요.' }]}
        >
          <TextArea
            showCount
            maxLength={100}
            style={{
              resize: 'none',
              height: 200,
            }}
            placeholder="내용을 입력해주세요"
            onChange={(e) => (contentValue.current = e.target.value)}
          />
        </Form.Item>
        <Upload.Dragger
          accept="image/png, image/jpeg, image/jpg"
          listType="picture"
          className="upload-list-inline"
          maxCount={1}
          onRemove={() => setPhoto(null)}
          beforeUpload={(file) => {
            if (file) {
              setPhoto(file);
            }
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
            type="primary"
            block
            onClick={() => {
              const uuid = shortUUID.generate();
              postBucket(
                titleValue.current,
                contentValue.current,
                selectedTags,
                uuid,
              );
              uploadImage(photo, uuid);
              setModalToggler(false);
              alert('성공적으로 업로드했습니다.');
            }}
          >
            작성하기
          </Button>
        </Space>
      </Form>
    </modal.container>
  );
};

export default WriteAPostModal;

const modal = {
  container: styled.div`
    display: flex;
    width: 500px;
    height: 630px;
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
};
