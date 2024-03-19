export interface UsersProps {
  id: number;
  email: string;
  nickname: string;
  password: string;
  profileImage: null | string;
  introduce: null | string;
  snsLink: null | string;
  address: null | string;
}

export interface PurchaseHistoryProps {
  id: number;
  memberId: number;
  auctionId: number;
  artTitle: string;
  artist: string;
  price: number;
  artImage: null | string;
  purchaseDate: string;
}

export interface SalesHistoryProps {
  id: number;
  memberId: number;
  auctionId: number;
  artTitle: string;
  artist: string;
  price: number;
  artImage: null | string;
  status: string;
  saleDate: string;
}

export interface WishListProps {
  id: number;
  memberId: number;
  auctionId: number;
}

export interface ArtProps {
  id: number;
  artTitle: string;
  artImage: null | string;
  artist: string;
  status: string;
  postDate: Date;
  wishCnt: number;
}

export interface AuctionProps {
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
}

interface RegistrationRequestProps {
  artName: string;
  artDescription: string;
  artSize: string;
  artCreatedDate?: Date;
  auctionStartDate?: Date;
  auctionEndDate?: Date;
  defaultBid?: number;
  notice: string;
  receiveType: string;
}

export interface RegistrationProps {
  request: RegistrationRequestProps;
  image: string;
}
export interface auctionCheckProps {
  page?: number;
  size?: number;
  keyword?: string;
}

export interface UserInfoProps {
  id: number;
  email: string;
  nickname: string;
  profileImage: null | string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfoWithTokenProps {
  accessToken: string;
  user: UserInfoProps;
}

export interface putUserProps {
  nickname: string;
  introduce: string;
  profileImage: string | null;
  password: string;
  newPassword: string;
}

export interface postAuthLoginProps {
  email: string;
  password: string;
}

export interface postAuthSignUpProps {
  nickname: string;
  email: string;
  password: string;
  checkPassword: string;
}
