import supabase from './supabaseClient';

// 반려견 프로필 정보 삭제
async function deletePetProfile(petId) {
  console.log('petId = ', petId);
  try {
    const { data, error } = await supabase.from('pet').delete().eq('pet_id', `${petId}`);

    if (error) {
      console.log(error);
      throw error;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default deletePetProfile;
