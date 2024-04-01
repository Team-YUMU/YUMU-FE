import { MemberProps } from '@/types/types';

const Members: MemberProps[] = [
  {
    id: 1,
    email: 'example1@example.com',
    nickname: 'user1',
    password: 'password1',
    profileImage: null,
    introduce: null,
    snsLink: null,
    address: null,
  },
  {
    id: 2,
    email: 'example2@example.com',
    nickname: 'user2',
    password: 'password2',
    profileImage: 'https://via.placeholder.com/482x482',
    introduce: '안녕하세요. 저는 유저2입니다.',
    snsLink: 'https://www.example.com/user2',
    address: null,
  },
  {
    id: 3,
    email: 'example3@example.com',
    nickname: 'user3',
    password: 'password3',
    profileImage: 'https://via.placeholder.com/483x483',
    introduce: '안녕하세요. 저는 유저3입니다.',
    snsLink: 'https://www.example.com/user3',
    address: '서울특별시 종로구 청와대로 1',
  },
  {
    id: 4,
    email: 'example4@example.com',
    nickname: 'user4',
    password: 'password4',
    profileImage: 'https://via.placeholder.com/484x484',
    introduce: '안녕하세요. 저는 유저4입니다.',
    snsLink: 'https://www.example.com/user4',
    address: '서울특별시 종로구 청와대로 2',
  },
];

export default Members;
