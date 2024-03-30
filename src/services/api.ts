import {
  RegistrationProps,
  MemberInfoProps,
  AuctionCheckProps,
  PostAuthLoginProps,
  PostAuthSignUpProps,
  FetchAuctionCheckProps,
  PutMemberPwdProps,
} from '@/types/types';
import saveTokensLocally, {
  authInstance as authAxios,
  instance as axios,
  authInstanceWithMedia as axiosMedia,
} from './axios';
const BASE_URL = `/api/v1`;
const MY_PAGE_BASE_URL = `${BASE_URL}/my-page`;
const MY_PAGE_MEMBERS_URL = `${BASE_URL}/member`;
const AUCTION_BASE_URL = `${BASE_URL}/auction`;

// signIn-page API (로그인)
export async function postAuthLogin(loginData: PostAuthLoginProps) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, loginData);
    const accessToken = res.headers['authorization'];
    const refreshToken = res.headers['refresh'];
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    // 클라이언트 측 코드에서 토큰을 다시 저장
    saveTokensLocally();
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// signUp-page API (회원가입)
export async function postMember(signUpData: PostAuthSignUpProps) {
  const res = await axios.post<MemberInfoProps>(`${BASE_URL}/auth/signup`, signUpData);
  return res.data;
}

// 이메일 중복체크 API
export async function getCheckEmail(email: string) {
  const res = await axios.get(`${BASE_URL}/auth/signup/email-check`, { params: { email } });
  return res.data;
}

// 닉네임 중복체크 API
export async function getCheckNickname(nickname: string): Promise<boolean> {
  const res = await axios.get<boolean>(`${BASE_URL}/auth/signup/nickname-check`, { params: { nickname } });
  return res.data;
}

// Logout API (로그아웃)
export async function postAuthLogout() {
  const res = await authAxios.post(`${BASE_URL}/logout`);
  try {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
// 계정 삭제
export async function deleteWithMember() {
  const res = await authAxios.delete(`${BASE_URL}/withdraw`);
  try {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    return res;
  } catch (error) {
    console.log(error);
  }
}

// my-page get API (내정보 조회)
export async function getMemberInfo() {
  const res = await authAxios.get(`${MY_PAGE_MEMBERS_URL}`);
  return res.data;
}

// my-page put API (회원 정보 수정)
export async function putMemberIntroduceData(introduce: string) {
  const res = await authAxios.put(`${MY_PAGE_MEMBERS_URL}/introduce?introduce=${introduce}`);
  return res;
}
// 닉네임 수정
export async function putMemberNickNameData(nickname: string) {
  const res = await authAxios.put(`${MY_PAGE_MEMBERS_URL}/nickname?nickname=${nickname}`);
  return res;
}
//이미지 수정
export async function putMemberProfileImageData(imageFile: FormData) {
  const res = await axiosMedia.put(`${MY_PAGE_MEMBERS_URL}/profile-image`, imageFile);
  return res;
}
//이미지 삭제
export async function deleteMemberProfileImage() {
  const res = await axiosMedia.delete(`${MY_PAGE_MEMBERS_URL}/profile-image`);
  return res;
}

// my-page put API (비밀번호 수정)

// 비밀번호 수정
export async function putMemberPasswordData({ password, newPassword, newCheckPassword }: PutMemberPwdProps) {
  const res = await authAxios.put(`${MY_PAGE_MEMBERS_URL}/password`, { password, newPassword, newCheckPassword });
  try {
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// 내 작품 조회
export async function getArts() {
  const res = await authAxios.get(`${MY_PAGE_BASE_URL}/arts`);
  return res.data;
}

interface SalesHistoryProps {
  id: number;
  artTitle: string;
  artist: string;
  price: number;
  saleDate: string;
  auctionId: number;
}
// 판매내역 조회
export async function getSalesHistory(cursor: number, limit: number) {
  const res = await authAxios.get<SalesHistoryProps[]>(`${MY_PAGE_BASE_URL}/sold?cursor=${cursor}&limit=${limit}`);
  const postList: SalesHistoryProps[] = res.data;
  return { postList, nextLastPostId: postList[postList.length - 1]?.id, isLast: postList.length < limit };
}

interface BuyHistoryProps {
  id: number;
  artTitle: string;
  artist: string;
  price: number;
  purchaseDate: string;
  auctionId: number;
}
// 구매내역 조회
export async function getBuyHistory(cursor: number, limit: number) {
  const res = await authAxios.get<BuyHistoryProps[]>(`${MY_PAGE_BASE_URL}/buy?cursor=${cursor}&limit=${limit}`);
  const postList: BuyHistoryProps[] = res.data;
  return { postList, nextLastPostId: postList[postList.length - 1]?.id, isLast: postList.length < limit };
}
// 관심목록 조회
export async function getWishHistory() {
  const res = await authAxios.get(`${MY_PAGE_BASE_URL}/wish`);
  return res.data;
}

// auction post API (경매글 등록)
export async function postAuction(auctionRegister: FormData) {
  const res = await axiosMedia.post(`${AUCTION_BASE_URL}`, auctionRegister);
  return res.data;
}

// auction Delete API (경매글 삭제)
export async function deleteAuction(auctionId: number) {
  const res = await authAxios.delete(`${AUCTION_BASE_URL}/${auctionId}`);
  return res.status;
}

// auction put API (경매글 수정)
export async function putAuction(auctionId: number, auctionRegister: RegistrationProps) {
  const res = await authAxios.put(`${AUCTION_BASE_URL}/${auctionId}`, auctionRegister);
  return res.data;
}

// auction get auctionNewData API (경매 조회(최신순))
export async function getAuctionHistory({ keyword, size, page }: AuctionCheckProps) {
  const res = await axios.get(`${AUCTION_BASE_URL}/paging?page=${page}&size=${size}&sort=latest&keyword=${keyword}`);
  return res.data;
}

// auction get auctionSearchData API (경매글 검색)
export async function getSearchAuction({ keyword, size, page }: AuctionCheckProps) {
  const res = await axios.get(`${AUCTION_BASE_URL}/paging?page=${page}&size=${size}&sort=&keyword="${keyword}"`);
  return res.data;
}

//라이브 경매, 라이브 예정 경매, 인기경매
export async function getAuction({ keyword, sort, size, page }: FetchAuctionCheckProps) {
  const res = await axios.get(`${AUCTION_BASE_URL}/paging?page=${page}&size=${size}&sort=${sort}&keyword=${keyword}`);
  return res.data;
}

// auction get auctionDetails API (경매글 상세)
export async function getAuctionDetails(auctionId: number) {
  const res = await axios.get(`${AUCTION_BASE_URL}/${auctionId}`);
  return res.data;
}

// auction post wishAuction API (경매글 찜)
export async function postWishAuction(auctionId: number) {
  const res = await authAxios.post(`${AUCTION_BASE_URL}/wish/${auctionId}`);
  return res.data;
}

// auction get liveAuction API (라이브 경매)
export async function getLiveAuctionList() {
  const res = await authAxios.get(`${AUCTION_BASE_URL}/live`);
  return res.data;
}
