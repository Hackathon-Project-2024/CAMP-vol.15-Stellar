import type { Metadata } from 'next';
import Header from './_layout/Header';
import './globals.css';
import { darkTheme } from '@/theme';
import { ThemeProvider } from '@mui/material';

export const metadata: Metadata = {
	title: 'Stellar',
	description: 'カスタマイズAIプラットフォーム',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<ThemeProvider theme={darkTheme}>
				<body>
					<Header />
					{children}
				</body>
			</ThemeProvider>
		</html>
	);
}
