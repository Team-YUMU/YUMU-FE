import { ArtType } from '@/types/types';

const Arts: ArtType[] = [
  {
    id: 1,
    artTitle: '모나리자',
    artImage:
      'https://images.unsplash.com/photo-1423742774270-6884aac775fa?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    artist: 'user3',
    status: 'Done',
    postDate: new Date('2024-02-11T10:00:00'),
    wishCnt: 11,
  },
  {
    id: 2,
    artTitle: '풍경',
    artImage:
      'https://images.unsplash.com/photo-1667236978744-92b4599d0f94?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    artist: 'user4',
    status: 'Done',
    postDate: new Date('2024-02-12T10:00:00'),
    wishCnt: 22,
  },
  {
    id: 3,
    artTitle: '색색의 벽돌 패턴',
    artImage:
      'https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    artist: 'user3',
    status: 'Done',
    postDate: new Date('2024-02-13T10:00:00'),
    wishCnt: 33,
  },
  {
    id: 4,
    artTitle: '오로라',
    artImage:
      'https://images.unsplash.com/photo-1705964586021-24cb78a96598?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    artist: 'user2',
    status: 'Before',
    postDate: new Date('2024-02-14T10:00:00'),
    wishCnt: 44,
  },
  {
    id: 5,
    artTitle: '빛을 발하는',
    artImage:
      'https://images.unsplash.com/photo-1578632307646-44afb788f005?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    artist: 'user2',
    status: 'Before',
    postDate: new Date('2024-02-15T10:00:00'),
    wishCnt: 55,
  },
];

export default Arts;
