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
  email: string;
  userId: string;
  uuid: string;
  viewCount: number;
  last_editted_at: string;
  statusValue: number | string;
}

interface postType {
  uuid: string;
  title: string;
  content: string;
  writer: string;
  created_at: string;
  categories: categories[];
  photoURL: string;
  status: '시작전' | '진행중' | '완료';
  email: string;
  userId: string;
}

interface bucketType {
  title: string;
  content: string;
  selectedTags: string[];
  uuid: string;
  url: string | null;
  email: string;
  userId: string;
  created_at: string;
  statusValue: number | string;
}

interface postModalTogglerType {
  postModalToggle: boolean;
}

interface uploadPostImageType {
  uploadedPostImage: Blob;
}

interface State {
  postModalToggle: boolean;
  savedBucket: BucketList | null;
  editModalToggle: boolean;
}
