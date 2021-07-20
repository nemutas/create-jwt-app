import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
	Avatar, Button, CssBaseline, Grid, IconButton, makeStyles, Paper, TextField, Typography
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { fetchCreateJWT, PayloadType } from '../fetch/jwt';
import { signOut, updateDisplayName } from '../firebase/functions';
import { signInUserState } from '../store/auth';
import { jwtResponseState } from '../store/jwt';
import { Attention } from './Attention';
import { Expiration } from './Expiration';

export const Main: React.FC = () => {
	const classes = useStyles();
	const user = useRecoilValue(signInUserState);
	const [jwtResponse, setJwtResponse] = useRecoilState(jwtResponseState);
	const resetJWT = useResetRecoilState(jwtResponseState);
	const [displayName, setDisplayName] = useState('');
	const [expiration, setExpiration] = useState('');

	useEffect(() => {
		setDisplayName(user.displayName);
	}, [user.displayName]);

	/**
	 * Create JWTボタンを押したとき
	 */
	const handleCreateJWT = async () => {
		// DisplayNameに変更があれば更新する
		await updateDisplayName(displayName);
		// Payloadを作成する
		const payload: PayloadType = {
			uid: user.uid,
			name: displayName,
			expiresIn: expiration
		};
		// jwtを発行する
		const response = await fetchCreateJWT(payload);
		setJwtResponse(response);
	};

	/**
	 * サインアウトボタンを押したとき
	 */
	const onSingOut = async () => {
		resetJWT();
		await signOut();
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<VpnKeyIcon />
					</Avatar>

					<Typography component="h1" variant="h5" className={classes.title}>
						Json Web Token
					</Typography>

					<TextField
						id="uid"
						label="UID"
						disabled
						fullWidth
						required
						InputLabelProps={{ shrink: true }}
						className={classes.uid}
						value={user.uid}
					/>

					<TextField
						id="display-name"
						label="Name"
						fullWidth
						required
						className={classes.displayName}
						value={displayName}
						onChange={e => {
							setDisplayName(e.target.value);
						}}
					/>

					<Expiration setExpiration={setExpiration} />

					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.create}
						disabled={!user.uid || !displayName}
						onClick={handleCreateJWT}>
						Create JWT
					</Button>

					<TextField
						id="jwt-text"
						label="JWT"
						multiline
						fullWidth
						InputLabelProps={{ shrink: true }}
						InputProps={{ readOnly: true }}
						value={jwtResponse}
						className={classes.result}
					/>

					<div className={classes.attention}>
						<Attention />
					</div>
				</div>
			</Grid>

			<IconButton className={classes.signout} onClick={onSingOut}>
				<ExitToAppIcon />
			</IconButton>
		</Grid>
	);
};

// ===============================================
// Style

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage:
			'url(https://images.unsplash.com/photo-1547955922-85912e223015?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: theme.spacing(8, 4, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: 'calc(100vh - 120px)'
	},
	avatar: {
		margin: theme.spacing(1, 0, 2),
		backgroundColor: theme.palette.secondary.main
	},
	title: {
		marginBottom: theme.spacing(3)
	},
	uid: {
		marginBottom: theme.spacing(3)
	},
	displayName: {
		marginBottom: theme.spacing(3)
	},
	expiration: {
		marginBottom: theme.spacing(3)
	},
	create: {
		margin: theme.spacing(5, 0, 3)
	},
	result: {
		marginBottom: theme.spacing(2)
	},
	attention: {
		width: '100%',
		marginTop: 'auto'
	},
	signout: {
		position: 'absolute',
		top: '10px',
		right: '10px',
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark
		}
	}
}));
