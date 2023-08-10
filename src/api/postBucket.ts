import moment from 'moment';
import supabase from '../api/supabase';

const postBucket = async ({
  title,
  content,
  selectedTags,
  uuid,
  url,
}: bucketType): Promise<void> => {
  const { error } = await supabase.from('bucketList').insert({
    uuid,
    title,
    content,
    writer: 'anon',
    created_at: moment().format('YYYY-MM-DD HH:mm'),
    categories: selectedTags,
    photoURL: url,
    status: '진행전',
    userId: '',
  } as postType);
  error !== null ? console.log(error) : console.log('success!');
};

export default postBucket;
