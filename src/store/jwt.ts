import { atom } from 'recoil';

export const jwtResponseState = atom({
	key: 'jwt/response',
	default: ''
});
