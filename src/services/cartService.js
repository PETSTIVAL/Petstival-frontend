import supabase from './supabaseClient';

// 로그인한 유저 아이디를 받아옴
const getUserId = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user?.id; // 세션의 uid 가져오기
};

/* ------- DB에서 cart 테이블의 정보를 불러옴 ------- */
export const selectCartData = async () => {
  const userId = await getUserId();
  if (!userId) return; // 로그인 정보가 없으면 DB를 조회하지 않고 종료

  try {
    const { data, error } = await supabase.from('cart').select().eq('user_id', userId);

    if (error) {
      console.error(error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* ------- DB의 cart 테이블에 새로운 아이템 추가 ------- */
export const insertCartData = async ({ productId, quantity, unitPrice }) => {
  // 로그인한 유저 아이디를 불러옴
  const userId = await getUserId();

  try {
    const { data, error } = await supabase.from('cart').insert({ user_id: userId, product_id: productId, count: quantity, price: unitPrice });
    if (error) {
      console.error(error);
      throw error;
    }
  } catch {
    console.error(error);
    throw error;
  }
};

/* ------- DB의 cart 테이블에서 해당하는 아이템의 정보를 업데이트 ------- */
// NOTE 호출 시 Debounce를 적용해 1초동안 추가 입력이 없을 경우 해당 함수를 호출하도록 구현 (NumberPicker)
// -> DB 요청을 최소화해서 과부하를 줄일 수 있음
export const updateCartData = async ({ productId, quantity }) => {
  // cart id는 어떻게 받아옴? -> cartid 사용 x 그냥 유저 아이디랑 프로덕트 아이디로 조회
  const userId = await getUserId();
  try {
    const { error } = await supabase.from('cart').update({ count: quantity }).eq('product_id', productId).eq('user_id', userId);
    if (error) {
      console.error(error);
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* ------- DB의 Cart 테이블에서 해당하는 아이템을 삭제 ------- */
export const deleteCartItem = async (productIdList) => {
  const userId = await getUserId();
  try {
    // productId가 productIdList 배열에 있는 경우 삭제
    const { error } = await supabase.from('cart').delete().in('product_id', productIdList).eq('user_id', userId);
    if (error) {
      console.error(error);
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
