import moment from 'moment';
import supabase from '../api/supabase';

const editBucket = async ({
  title,
  content,
  selectedTags,
  uuid,
  url,
  statusValue,
}: Partial<bucketType>): Promise<void> => {
  const status =
    statusValue === 0
      ? '시작전'
      : statusValue === 1
      ? '진행중'
      : statusValue === 2
      ? '완료'
      : 0;
  const { error } = await supabase
    .from('bucketList')
    .update({
      title,
      content,
      last_editted_at: moment().format('YYYY-MM-DD HH:mm'),
      categories: selectedTags,
      photoURL: url,
      status,
    } as Partial<bucketType>)
    .eq('uuid', uuid);
  error !== null ? console.log(error) : console.log('success!');
};

export default editBucket;
