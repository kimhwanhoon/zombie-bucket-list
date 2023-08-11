import moment from 'moment';
import supabase from '../api/supabase';

const editBucket = async ({
  title,
  content,
  selectedTags,
  uuid,
  url,
}: Partial<bucketType>): Promise<void> => {
  const { error } = await supabase
    .from('bucketList')
    .update({
      title,
      content,
      last_editted_at: moment().format('YYYY-MM-DD HH:mm'),
      categories: selectedTags,
      photoURL: url,
      status: '시작전',
    } as Partial<bucketType>)
    .eq('uuid', uuid);
  error !== null ? console.log(error) : console.log('success!');
};

export default editBucket;
