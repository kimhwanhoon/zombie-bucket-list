type categories =
  | '자기계발'
  | '여행'
  | '건강'
  | '문화/예술'
  | '가족/친구'
  | '자선활동'
  | '취미'
  | '기타'
  | '음식';

interface BucketList {
  categories: Array<categories>;
  content: string;
  created_at: string;
  id: number;
  writer: string;
  photoURL: string;
  status: string;
  photoURL: string;
  title: string;
  userId: string;
  uuid: string;
}

interface postType {
  uuid: string;
  title: string;
  content: string;
  writer: string;
  created_at: string;
  categories: categories[];
  photoURL: string;
  status: '진행전' | '진행중' | '완료';
  userId: string;
}

interface bucketType {
  title: string;
  content: string;
  selectedTags: string[];
  uuid: string;
  url: string;
}

interface postModalTogglerType {
  postModalToggle: boolean;
}

interface uploadPostImageType {
  uploadedPostImage: Blob;
}
