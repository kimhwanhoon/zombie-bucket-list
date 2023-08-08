import supabaseService from './supabaseService';

const uploadImage = async (file: any, uuid: string) => {
  const { data, error } = await supabaseService.storage
    .from(`Users/posts/${uuid}`)
    .upload(file.name, file as File);
  if (error) {
    // Handle error
    console.log('error:', error);
  } else {
    // Handle success
    console.log('success!', data);
  }
};

export default uploadImage;
