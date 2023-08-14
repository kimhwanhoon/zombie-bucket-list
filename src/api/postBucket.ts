import moment from 'moment';
import supabase from '../api/supabase';

const postBucket = async ({
  title,
  content,
  selectedTags,
  uuid,
  url,
  email,
  userId,
}: Partial<bucketType>): Promise<void> => {
  const { error } = await supabase.from('bucketList').insert({
    uuid,
    title,
    content,
    writer: 'anon',
    created_at: moment().format('YYYY-MM-DD HH:mm'),
    categories: selectedTags,
    photoURL: url,
    status: '시작전',
    email,
    userId,
  } as Partial<bucketType>);
  error !== null ? console.log(error) : console.log('success!');
};

export default postBucket;
