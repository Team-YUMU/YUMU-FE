export type Member = {
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

// 그냥 Art라는 타입 새로 만들어서
export type PurchaseHistory = {
	// 구매내역
	id: number;
	artTitle: string; // 여기에 Art 넣고
	artist: string; // 여기에 Member 넣고
	price: number; // 이거 Auction으로 대신하고
	artImage: string; // 이것도 Art로 하고
	purchaseDate: Date; // 이것도 Auction으로 대체하고 싶어요
};

export type SalesHistory = {
	id: number;
	artTitle: string;
	artist: string;
	price: number;
	artImage: string;
	status: string;
	saleDate: Date;
};

// 이거는 잘 된... 거 같?아요? 그냥 member랑 auction 넣어도 되려나? 그럼 너무 뚱뚱해지나?
export type WishList = {
	id: number;
	memberId: number;
	auctionId: number;
};

// 그냥 여기에 Member 다 집어넣으면 PurchaseHistroy에 머리 아플 일 없을 거 같긴한데
export type Auction = {
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
