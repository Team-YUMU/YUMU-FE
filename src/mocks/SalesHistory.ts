import { SalesHistoryType } from '@/types/types';

const SalesHistories: SalesHistoryType[] = [
	{
		id: 1,
		artTitle: '모나리자',
		artist: 'user3',
		price: 1000000000,
		artImage:
			'https://images.unsplash.com/photo-1423742774270-6884aac775fa?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		status: 'Done',
		saleDate: new Date('2024-02-15'),
	},
	{
		id: 2,
		artTitle: '색색의 벽돌 패턴',
		artist: 'user3',
		price: 2000000000,
		artImage:
			'https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		status: 'Before Pay',
		saleDate: new Date('2024-02-17'),
	},
];

export default SalesHistories;
