export type MemberType = {
  id: number;
  email: string;
  nickname: string;
  password: string;
  account: null | string;
  profileImage: null | string;
  introduce: null | string;
  snsLink: null | string;
  address: null | string;
};

export type PurchaseHistoryType = {
  id: number;
  artTitle: string;
  artist: string;
  price: number;
  artImage: string;
  purchaseDate: Date;
};

export type SalesHistoryType = {
  id: number;
  artTitle: string;
  artist: string;
  price: number;
  artImage: string;
  status: string;
  saleDate: Date;
};

export type WishListType = {
  id: number;
  memberId: number;
  auctionId: number;
};

export type AuctionType = {
  id: number;
  artTitle: string;
  artImage: string;
  artDetail: string;
  artist: string;
  artSize: string;
  artDate: Date;
  startDate: Date;
  startPrice: number;
  endPrice: null | number;
  bidder: null | string;
  createdAt: Date;
  status: string;
};

// =================================================================
export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: null | string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfoWithToken {
  accessToken: string;
  user: UserInfo;
}

export interface putMemberProps {
  nickname: string;
  profileImageUrl: string | null;
  password: string;
  newPassword: string;
}

export interface postAuthLoginProps {
  email: string;
  password: string;
}

export interface postUsersProps {
  email: string;
  nickname: string;
  password: string;
}
