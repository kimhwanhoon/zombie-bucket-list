type categories = '여행' | '공부';

interface BucketListH {
  categories: Array<categories>;
  content: string;
  created_at: string;
  id: number;
  writer: string;
}
