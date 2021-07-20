import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/css';
import {
	Button, createStyles, Divider, Grid, makeStyles, Theme, Typography
} from '@material-ui/core';
import { fetchCheckJWT } from '../fetch/jwt';
import { jwtResponseState } from '../store/jwt';

export const Attention: React.FC = () => {
	const classes = useStyles();
	const [status, setStatus] = useState('Status：');
	const jwtResponse = useRecoilValue(jwtResponseState);

	const handleCheckJWT = async () => {
		const resp = await fetchCheckJWT(jwtResponse);
		setStatus(`Status：${resp}`);
	};

	return (
		<div className={sContainer}>
			<div className={sTitleGrid}>
				<Divider className={classes.divider} />
				<Typography variant="body1">Attention</Typography>
				<Divider className={classes.divider} />
			</div>

			<Grid container>
				<Grid item xs={12} sm={7}>
					<Typography variant="body1" color="textSecondary">
						JWT は Headers の Authorization に指定します。
					</Typography>
					<Typography variant="body1" className={classes.marginTop}>
						Authorization： Bearer [JWT]
					</Typography>
				</Grid>
				<Grid item xs={12} sm={5}>
					<Button
						fullWidth
						variant="outlined"
						color="primary"
						className={classes.checkButton}
						onClick={handleCheckJWT}>
						Check JWT
					</Button>
					<Typography variant="body1" className={classes.marginTop}>
						{status}
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

// ================================================
// スタイル

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		divider: {
			backgroundColor: theme.palette.text.secondary
		},
		textSize: {
			[theme.breakpoints.down('xs')]: {
				fontSize: 12
			}
		},
		checkButton: {
			width: '100%',
			height: '30px',
			color: theme.palette.text.secondary,
			backgroundColor: 'rgba(239, 108, 0, 0.3)'
		},
		marginTop: {
			marginTop: theme.spacing(1)
		}
	})
);

const sContainer = css`
	display: grid;
	grid-gap: 10px;
	width: 100%;
	padding: 10px;
	background-color: rgba(197, 17, 98, 0.3);
	border: 2px solid rgb(197, 17, 98);
	border-radius: 10px;
`;

const sTitleGrid = css`
	display: grid;
	flex-direction: column;
	grid-template-columns: 1fr auto 1fr;
	width: 100%;
	align-items: center;
	grid-gap: 10px;
`;
