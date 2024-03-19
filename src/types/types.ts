export type MemberType = {
  id: number;
  email: string;
  nickname: string;
  password: string;
  profileImage: null | string;
  introduce: null | string;
  snsLink: null | string;
  address: null | string;
};

export type PurchaseHistoryType = {
  id: number;
  memberId: number;
  auctionId: number;
  artTitle: string;
  artist: string;
  price: number;
  artImage: string;
  purchaseDate: string;
};

export type SalesHistoryType = {
  id: number;
  memberId: number;
  auctionId: number;
  artTitle: string;
  artist: string;
  price: number;
  artImage: string;
  status: string;
  saleDate: string;
};

export type WishListType = {
  id: number;
  memberId: number;
  auctionId: number;
};

export type ArtType = {
  id: number;
  artTitle: string;
  artImage: string;
  artist: string;
  status: string;
  postDate: Date;
  wishCnt: number;
};

export type AuctionType = {
  id: number;
  artId: number;
  artDetail: string;
  artSize: string;
  artDate: Date;
  startDate: Date;
  endDate: Date;
  startPrice: number;
  endPrice: null | number;
  bidder: null | string;
  notice: null | string;
  receiveType: string;
};

type RegistrationRequestType = {
  artName: string;
  artDescription: string;
  artSize: string;
  artCreatedDate?: Date;
  auctionStartDate?: Date;
  auctionEndDate?: Date;
  defaultBid?: number;
  notice: string;
  receiveType: string;
};

export type RegistrationType = {
  request: RegistrationRequestType;
  image: string;
};

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
