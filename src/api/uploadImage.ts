import supabaseService from './supabaseService';
import Resizer from 'react-image-file-resizer';

const uploadImage = async (file: any, uuid: string) => {
  const optimizedImage = await new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800, // 최대 너비
      800, // 최대 높이
      'JPEG', // 포맷
      80, // 품질 (0-100)
      0, // 회전 각도
      (blob) => {
        resolve(blob);
      },
      'blob',
    );
  });

  const { data, error } = await supabaseService.storage
    .from(`Users/posts/${uuid}`)
    .upload(uuid, optimizedImage as File);
  if (error) {
    // Handle error
    console.log('error:', error);
  } else {
    // Handle success
    // console.log('success!', data);
  }

  const { data: url } = supabaseService.storage
    .from(`Users/posts/${uuid}`)
    .getPublicUrl(uuid);
  if (error) {
    // Handle error
    console.log('error:', error);
  } else {
    // Handle success
    // console.log('url retrieval success!', url);
  }
  return url.publicUrl;
};

export default uploadImage;
