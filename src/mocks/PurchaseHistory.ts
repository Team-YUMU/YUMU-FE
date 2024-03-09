import { PurchaseHistoryType } from '@/types/types';

const PurchaseHistories: PurchaseHistoryType[] = [
	{
		id: 1,
		artTitle: '모나리자',
		artist: 'user3',
		price: 1000000000,
		artImage:
			'https://images.unsplash.com/photo-1423742774270-6884aac775fa?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		purchaseDate: new Date('2024-02-15'),
	},
	{
		id: 2,
		artTitle: '풍경',
		artist: 'user4',
		price: 1011000000,
		artImage:
			'https://images.unsplash.com/photo-1667236978744-92b4599d0f94?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		purchaseDate: new Date('2024-02-16'),
	},
	{
		id: 3,
		artTitle: '색색의 벽돌 패턴',
		artist: 'user3',
		price: 2000000000,
		artImage:
			'https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		purchaseDate: new Date('2024-02-17'),
	},
];

export default PurchaseHistories;
