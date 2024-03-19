import {
  RegistrationType,
  UserInfo,
  UserInfoWithToken,
  postAuthLoginProps,
  postUsersProps,
  putMemberProps,
} from '@/types/types';
import { authInstance as authAxios, instance as axios } from './axios';
const BASE_URL = `/api/v1/`;
const MY_PAGE_BASE_URL = `${BASE_URL}mypage`;
const MY_PAGE_MEMBERS_URL = `${BASE_URL}member`;
const AUCTION_BASE_URL = `${BASE_URL}auction`;

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
  const res = await axios.post<UserInfo>(`${MY_PAGE_MEMBERS_URL}`, userInfo);
  return res.data;
}

// Logout API
export async function postAuthLogout() {
  const res = await authAxios.post<UserInfo>(`${BASE_URL}logout`);
  return res.data;
}

// my-page put API
export async function putMemberInfo({ nickname, profileImageUrl, password, newPassword }: putMemberProps) {
  const response = await authAxios.put<string>(`${MY_PAGE_MEMBERS_URL}`, {
    nickname,
    profileImageUrl,
    password,
    newPassword,
  });
  return response.status;
}
// my-page get API
export async function getMemberInfo() {
  const res = await authAxios.get(`${MY_PAGE_MEMBERS_URL}`);
  return res.data;
}

export async function getArts() {
  const res = await authAxios.get(`${MY_PAGE_BASE_URL}/arts`);
  return res.data;
}
export async function getSalesHistory() {
  const res = await authAxios.get(`${MY_PAGE_BASE_URL}/sold`);
  return res.data;
}
export async function getBuyHistory() {
  const res = await authAxios.get(`${MY_PAGE_BASE_URL}/buy`);
  return res.data;
}

// auction post API
export async function postAuction({
  request: {
    artName,
    artDescription,
    artSize,
    artCreatedDate,
    auctionStartDate,
    auctionEndDate,
    defaultBid,
    notice,
    receiveType,
  },
  image,
}: RegistrationType) {
  const res = await authAxios.post(`${AUCTION_BASE_URL}`, {
    request: {
      artName,
      artDescription,
      artSize,
      artCreatedDate,
      auctionStartDate,
      auctionEndDate,
      defaultBid,
      notice,
      receiveType,
    },
    image,
  });
  return res.data;
}

// pagination get API
export async function getAuctions(page: number) {
  const res = await axios.get(`${AUCTION_BASE_URL}/paging?page=${page}`);
  return res.data;
}

// auction latest get  API
export async function getLatestAuctions() {
  const res = await axios.get(`${AUCTION_BASE_URL}/latest`);
  return res.data;
}

// auction search get API
export async function getSearchAuctions(keyword: string) {
  const res = await axios.get(`${AUCTION_BASE_URL}/search?=${keyword}`);
  return res.data;
}

// auction detail get API
export async function getAuctionDetail(auction_id: number) {
  const res = await axios.get(`${AUCTION_BASE_URL}/${auction_id}`);
  return res.data;
}

// auction wish post API
export async function postAuctionWish(auction_id: number) {
  const res = await authAxios.post(`${AUCTION_BASE_URL}/wish/${auction_id}`);
  return res.data;
}

// auction now get API
export async function getAuctionNow() {
  const res = await axios.get(`${AUCTION_BASE_URL}/now`);
  return res.data;
}
