import axios from 'axios';

const url = process.env.REACT_APP_FIREBASE_API_URL!;
// const url = process.env.REACT_APP_FIREBASE_API_URL_DEV!;

export type PayloadType = {
	uid: string;
	name: string;
	expiresIn: string;
};

/**
 * jwtを発行する
 */
export const fetchCreateJWT = async (payload: PayloadType) => {
	// console.log(payload);
	try {
		const res = await axios.post(url + '/jwt', payload);
		return res.data.jwt as string;
	} catch (error) {
		console.error({ error });
		if (error.response && error.response.data) {
			return error.response.data.error;
		} else {
			return 'JWTが取得できませんでした。';
		}
	}
};

/**
 * jwtを確認する
 */
export const fetchCheckJWT = async (jwt: string) => {
	try {
		const headers = {
			Authorization: `Bearer ${jwt}`
		};
		const res = await axios.get(url + '/jwt/check', { headers });
		return res.data.message as string;
	} catch (error) {
		console.error({ error });
		if (error.response && error.response.data) {
			return error.response.data.error;
		} else {
			return '認証されませんでした。';
		}
	}
};
