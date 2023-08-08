import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Button, Space, Tag, Form, Input, Upload } from 'antd';
import postBucket from '../../api/postBucket';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import uploadImage from '../../api/uploadImage';
import shortUUID from 'short-uuid';

type FieldType = {
  title?: string;
  content?: string;
};

const WriteAPostModal = () => {
  const { TextArea } = Input;
  const { CheckableTag } = Tag;
  const tagsData: categories[] = [
    '자기계발',
    '여행',
    '건강',
    '문화/예술',
    '가족/친구',
    '자선활동',
    '취미',
    '기타',
  ];
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
        <Form.Item<FieldType>
          label="제목"
          name="title"
          rules={[{ required: true, message: '제목을 입력해주세요.' }]}
        >
          <Input
            size="large"
            onChange={(e) => (titleValue.current = e.target.value)}
          />
        </Form.Item>
        <span style={{ marginRight: 8 }}>Categories:</span>
        <Space size={[0, 0]} wrap>
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
          rules={[{ required: true, message: '내용을 입력해주세요.' }]}
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
          // action={'http://localhost:3000/'}
          listType="picture"
          className="upload-list-inline"
          maxCount={1}
          beforeUpload={(file) => {
            if (file) {
              setPhoto(file);
            }
            return false;
          }}
        >
          <span>Drag files here or click Upload button</span>
          <Button block icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload.Dragger>
        <Space
          direction="vertical"
          style={{ width: '100%', marginTop: '1rem' }}
        >
          <Button
            type="primary"
            block
            onClick={async () => {
              const uuid = shortUUID.generate();
              postBucket(
                titleValue.current,
                contentValue.current,
                selectedTags,
                uuid,
              );
              uploadImage(photo, uuid);
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
    height: 670px;
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
  `,
};
