import supabase from './supabaseClient';

async function fetchPetProfile() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user_id = session?.user?.id; // 세션의 uid 가져오기

  // pet 테이블에서 현재 로그인한 유저의 반려견 정보를 불러옴
  try {
    const { data, error } = await supabase.from('pet').select().eq('user_id', `${user_id}`);

    if (error) {
      console.log(error);
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchPetProfile;
