import {
  AuctionType,
  UserInfo,
  UserInfoWithToken,
  postAuthLoginProps,
  postUsersProps,
  putMemberProps,
} from '@/types/types';
import { authInstance as authAxios, instance as axios } from './axios';
const BASE_URL = `/api/v1/`;
const MY_PAGE_BASE_URL = `${BASE_URL}mypage/`;
const MY_PAGE_MEMBERS_URL = `${BASE_URL}member`;

// signIn-page API
export async function postAuthLogin({ email, password }: postAuthLoginProps) {
  const res = await axios.post<UserInfoWithToken>(`${BASE_URL}login`, {
    email,
    password,
  });
  return res.data;
}
// signUp-page API
export async function postUsers(userInfo: postUsersProps) {
  const res = await axios.post<UserInfo>(`/users`, userInfo);
  return res.data;
}

// my-page put API
export async function putMemberInfo({ nickname, profileImageUrl, password, newPassword }: putMemberProps) {
  const response = await authAxios.put<string>(MY_PAGE_MEMBERS_URL, {
    nickname,
    profileImageUrl,
    password,
    newPassword,
  });
  return response.status;
}
// my-page get API
export async function getMemberInfo() {
  const res = await axios.get(`${MY_PAGE_MEMBERS_URL}`);
  return res.data;
}

export async function getArts() {
  const res = await axios.get(`${MY_PAGE_BASE_URL}/arts`);
  return res.data;
}
export async function getSalesHistory() {
  const res = await axios.get(`${MY_PAGE_BASE_URL}/sold`);
  return res.data;
}
export async function getBuyHistory() {
  const res = await axios.get(`${MY_PAGE_BASE_URL}/buy`);
  return res.data;
}

// auction post API
export async function postAuction({
  artTitle,
  artImage,
  artDetail,
  artist,
  artSize,
  artDate,
  startDate,
  startPrice,
  endPrice,
  bidder,
}: AuctionType) {
  const res = await axios.post(`${MY_PAGE_BASE_URL}/auction`, {
    artTitle,
    artImage,
    artDetail,
    artist,
    artSize,
    artDate,
    startDate,
    startPrice,
    endPrice,
    bidder,
  });
  return res.data;
}

// pagination get API
export async function getAuctions(page: number) {
  const res = await axios.get(`${MY_PAGE_BASE_URL}/auction/paging?page=${page}`);
  return res.data;
}

// auction latest get  API
export async function getLatestAuctions() {
  const res = await axios.get(`${MY_PAGE_BASE_URL}/auction/latest`);
  return res.data;
}

// auction search get API
export async function getSearchAuctions(keyword: string) {
  const res = await axios.get(`${MY_PAGE_BASE_URL}/auction/search?=${keyword}`);
  return res.data;
}

// auction detail get API
export async function getAuctionDetail(auction_id: number) {
  const res = await axios.get(`${MY_PAGE_BASE_URL}/auction/${auction_id}`);
  return res.data;
}

// auction wish post API
export async function postAuctionWish(auction_id: number) {
  const res = await axios.post(`${MY_PAGE_BASE_URL}/auction/wish/${auction_id}`);
  return res.data;
}

// auction now get API
export async function getAuctionNow() {
  const res = await axios.get(`${MY_PAGE_BASE_URL}/auction/now`);
  return res.data;
}
