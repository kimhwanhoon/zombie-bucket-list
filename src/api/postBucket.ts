import supabase from './supabase';
import moment from 'moment';

const postBucket = async (
  title: string,
  content: string,
  selectedTags: string[],
  uuid: string,
  url: string,
) => {
  const { error } = await supabase.from('bucketList').insert({
    uuid,
    title,
    content,
    writer: 'anon',
    created_at: moment().format('YYYY-MM-DD HH:mm'),
    categories: selectedTags,
    photoURL: url,
    status: '',
    userId: '',
  });
  error !== null ? console.log(error) : console.log('success!');
};

export default postBucket;
