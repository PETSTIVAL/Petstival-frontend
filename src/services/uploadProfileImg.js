import supabase from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

// Storage에 이미지 파일을 업로드하고 URL을 return
async function uploadProfileImg(file) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user_id = session?.user?.id;

  // 사진 URL에 들어갈 uuid 생성
  const uuid = uuidv4();

  // 프로필 사진을 storage에 업로드
  try {
    const { error } = await supabase.storage.from('pet-profile-img').upload(`${user_id}/${uuid}`, file, { cacheControl: '3600', upsert: true });
    if (error) throw error;
    // 업로드한 사진의 URL을 받아와 return
    return await getProfileImgUrl(user_id, uuid);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// 업로드된 이미지의 PublicURL을 받아옴
async function getProfileImgUrl(user_id, uuid) {
  try {
    const { data, error } = supabase.storage.from('pet-profile-img').getPublicUrl(`${user_id}/${uuid}`);
    if (error) throw error;
    return data.publicUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default uploadProfileImg;
