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
}

interface postType {
  title: string;
  content: string;
  writer: string;
  created_at: number;
  categories: Array<string>;
  photoURL: string;
  status: string;
  userId: string;
}
