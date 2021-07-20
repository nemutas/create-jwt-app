import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import {
	createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Slider, Theme, Typography
} from '@material-ui/core';

type PropsType = {
	setExpiration: React.Dispatch<React.SetStateAction<string>>;
};

export const Expiration: React.FC<PropsType> = ({ setExpiration }) => {
	const classes = useStyles();
	const [currentData, setCurrentData] = useState(datas.m);
	const [value, setValue] = useState(datas.m.default);

	useEffect(() => {
		setExpiration(datas.m.default + datas.m.value);
	}, [setExpiration]);

	const setExp = () => {
		const expiration = value + currentData.value;
		setExpiration(expiration);
	};

	/**
	 * 単位が変更されたとき
	 */
	const handleChangeUnit = (event: React.ChangeEvent<{ value: unknown }>) => {
		const key = event.target.value as string;
		setCurrentData(datas[key]);
		setValue(datas[key].default);
		setExp();
	};

	/**
	 * 値が変更されたとき
	 */
	const handleChangeValue = (_: any, newValue: number | number[]) => {
		setValue(newValue as number);
		setExp();
	};

	return (
		<div className={sContainer}>
			<Typography className={classes.title}>Expiration</Typography>
			<div className={sContentsContainer}>
				<Slider
					aria-labelledby="expiration"
					valueLabelDisplay="auto"
					marks
					className={classes.slider}
					defaultValue={value}
					value={value}
					step={currentData.step}
					min={currentData.range[0]}
					max={currentData.range[1]}
					onChange={handleChangeValue}
				/>

				<Typography variant="body1" className={classes.preview}>
					{value}
				</Typography>

				<FormControl className={classes.formControl}>
					<InputLabel id="expiration-unit">Unit</InputLabel>
					<Select
						labelId="expiration-unit"
						id="expiration-unit"
						defaultValue={currentData.value}
						value={currentData.value}
						onChange={handleChangeUnit}>
						<MenuItem value={datas.s.value}>{datas.s.label}</MenuItem>
						<MenuItem value={datas.m.value}>{datas.m.label}</MenuItem>
						<MenuItem value={datas.h.value}>{datas.h.label}</MenuItem>
						<MenuItem value={datas.d.value}>{datas.d.label}</MenuItem>
					</Select>
				</FormControl>
			</div>
		</div>
	);
};

// ================================================
// データセット

type DataType = {
	value: string;
	label: string;
	range: [number, number];
	step: number;
	default: number;
};

type DatasType = {
	[key: string]: DataType;
};

const datas: DatasType = {
	s: {
		value: 's',
		label: 'sec',
		range: [10, 60],
		step: 10,
		default: 30
	},
	m: {
		value: 'm',
		label: 'min',
		range: [5, 30],
		step: 5,
		default: 10
	},
	h: {
		value: 'h',
		label: 'hour',
		range: [1, 10],
		step: 1,
		default: 1
	},
	d: {
		value: 'd',
		label: 'day',
		range: [1, 10],
		step: 1,
		default: 1
	}
};

// ================================================
// スタイル

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			color: theme.palette.text.hint,
			fontSize: theme.typography.subtitle2.fontSize
		},
		slider: {
			marginBottom: theme.spacing(1)
		},
		preview: {
			width: '30px',
			textAlign: 'right',
			marginBottom: theme.spacing(1)
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120
		}
	})
);

const sContainer = css`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const sContentsContainer = css`
	display: grid;
	grid-template-columns: 1fr auto auto;
	width: 100%;
	align-items: flex-end;
	grid-gap: 10px;
`;
