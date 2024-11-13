import supabase from './supabaseClient';

// 반려견 프로필 정보 삭제
async function deletePetProfile(petId) {
  try {
    const { data, error } = await supabase.from('pet').delete().eq('pet_id', `${petId}`);
    if (error) throw error;
    if (data === null) return true;
  } catch (error) {
    throw error;
  }
}

export default deletePetProfile;
