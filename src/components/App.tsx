import React from 'react';
import { colors, createTheme, ThemeProvider } from '@material-ui/core';
import { useAuth } from '../firebase/functions';
import { Auth } from './Auth';
import { Main } from './Main';

export const App: React.FC = () => {
	const signInUser = useAuth();

	const theme = createTheme({
		palette: {
			primary: {
				main: colors.orange[800]
			},
			type: 'dark'
		}
	});

	return <ThemeProvider theme={theme}>{signInUser.uid ? <Main /> : <Auth />}</ThemeProvider>;
};

export default App;
