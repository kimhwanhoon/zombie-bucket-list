import supabase from './supabase';

const postBucket = async (
  title: string,
  content: string,
  selectedTags: string[],
  uuid: string,
) => {
  const { error } = await supabase.from('bucketList').insert({
    uuid,
    title,
    content,
    writer: 'anon',
    created_at: new Date(),
    categories: selectedTags,
    photoURL: '',
    status: '',
    userId: '',
  });
  error !== null ? console.log(error) : console.log('success!');
};

export default postBucket;
