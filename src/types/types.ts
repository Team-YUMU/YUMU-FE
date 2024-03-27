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
  artName: string;
  artist: string;
  price: number;
  artImage: string;
  purchaseDate: string;
}

export interface SalesHistoryProps {
  id: number;
  memberId: number;
  auctionId: number;
  artName: string;
  artist: string;
  price: string;
  artImage: string;
  status: string;
  saleDate: string;
}

export interface WishListProps {
  id: number;
  memberId: number;
  auctionId: number;
}

export interface ArtPropsData {
  page: number;
  totalElements: number;
  totalPages: number;
  auctions: ArtProps[];
}

export interface ArtProps {
  id: number;
  artName: string;
  artImage: string;
  artist: string;
  status: string;
  createdAt: Date;
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
  artSubTitle: string;
  artDescription: string;
  artSummary: string;
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
export interface AuctionCheckProps {
  page?: number;
  size?: number;
  keyword?: string;
}

export interface UserInfoProps {
  id: number;
  email: string;
  nickname: string;
  password: string;
  introduce: null | string;
  snsLink: null | string;
  profileImage: null | string;
}

export interface PutUserProps {
  nickname: string;
  introduce: string;
  profileImage: string | null;
  password: string;
  newPassword: string;
}

export interface PostAuthLoginProps {
  email: string;
  password: string;
}

export interface PostAuthSignUpProps {
  nickname: string;
  email: string;
  password: string;
  checkPassword: string;
}
