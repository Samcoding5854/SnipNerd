import { atom } from 'recoil';

export const userAtom = atom<{
    isAuthenticated:boolean,
    user?:{
        email:string,
        name:string,
        id:string,
        avatar:string
    }
}>({
  key: 'userAtom',
  default: {
    isAuthenticated: false,
  },
});
