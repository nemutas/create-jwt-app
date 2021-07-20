import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { signInUserState } from '../store/auth';
import { auth } from './firebase';

/**
 * ユーザー認証する
 */
export const signIn = async (email: string, password: string) => {
	try {
		await auth.signInWithEmailAndPassword(email, password);
	} catch (error) {
		alert('サインイン認証に失敗しました。');
	}
};

/**
 * サインアウトする
 */
export const signOut = async () => {
	try {
		await auth.signOut();
	} catch (error) {
		alert('サインアウトに失敗しました。');
	}
};

/**
 * SignInの状態を監視する
 */
export const useAuth = () => {
	const [signInUser, setSignInUser] = useRecoilState(signInUserState);
	const resetStatus = useResetRecoilState(signInUserState);

	useEffect(() => {
		const unSub = auth.onAuthStateChanged(authUser => {
			if (authUser) {
				setSignInUser({
					uid: authUser.uid,
					email: authUser.email!,
					displayName: authUser.displayName!
				});
			} else {
				resetStatus();
			}
		});
		return () => unSub();
	}, [setSignInUser, resetStatus]);

	return signInUser;
};

/**
 * ユーザー名を更新する
 * @param displayName アプリケーションで入力した名前
 */
export const updateDisplayName = async (displayName: string) => {
	try {
		const user = auth.currentUser;
		if (user && user.displayName !== displayName) {
			await user.updateProfile({
				displayName
			});
		}
	} catch (error) {
		alert('ユーザー名の更新に失敗しました。');
	}
};
