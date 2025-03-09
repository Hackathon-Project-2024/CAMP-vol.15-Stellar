'use client';
import { Box, ListItem, Typography, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFadeInOnScroll } from './hooks/useFadeInOnScroll';

const CustomLink = styled(Link)({
	textDecoration: 'none',
});

const CustomTypography = styled(Typography)({
	padding: '0 20px',
	fontFamily: 'none',
	color: '#fff',
	fontWeight: 300,
	transition: 'color 0.3s ease',
	justifyContent: 'center',
	border: 'solid 1px',
	borderRadius: '5px',
	'&:hover': {
		color: 'transparent',
		WebkitTextStroke: '0.5px #fff',
		textStroke: '1px #fff',
	},
});

export default function Page() {
	const descriptionRef = useFadeInOnScroll<HTMLDivElement>();
	const h2Ref = useFadeInOnScroll<HTMLHeadingElement>();
	const pRef = useFadeInOnScroll<HTMLParagraphElement>();
	const h2Ref2 = useFadeInOnScroll<HTMLHeadingElement>();
	const pRef2 = useFadeInOnScroll<HTMLParagraphElement>();
	const h2Ref3 = useFadeInOnScroll<HTMLHeadingElement>();
	const pRef3 = useFadeInOnScroll<HTMLParagraphElement>();
	const h2Ref4 = useFadeInOnScroll<HTMLHeadingElement>();
	const pRef4 = useFadeInOnScroll<HTMLParagraphElement>();
	const [titleOpacity, setTitleOpacity] = useState(0);
	const [linkOpacity, setLinkOpacity] = useState(0);

	// タイトルのフェードイン
	useEffect(() => {
		const timer = setTimeout(() => {
			setTitleOpacity(1);
			setLinkOpacity(1);
		}, 400);
		return () => clearTimeout(timer);
	}, []);

	// スクロールに応じた背景の暗さを調整
	const overlayRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleScroll = () => {
			if (descriptionRef.current && overlayRef.current) {
				const descriptionTop =
					descriptionRef.current.getBoundingClientRect().top;
				const windowHeight = window.innerHeight;
				if (descriptionTop < windowHeight) {
					const opacity =
						Math.min(1, (windowHeight - descriptionTop) / 200) * 0.7;
					overlayRef.current.style.opacity = opacity.toString();
				}
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<main style={{ backgroundColor: 'black', fontFamily: 'none' }}>
			<Box
				sx={{
					backgroundImage: "url('/haikei2.png')",
					backgroundSize: 'auto 100%',
					backgroundAttachment: 'fixed',
					backgroundPosition: 'center',
					minHeight: '100vh',
					position: 'relative',
				}}
			>
				{/* 暗くなるオーバーレイ */}
				<div
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: '#000',
						transition: 'opacity 0.3s ease',
						opacity: 0,
						overflow: 'hidden',
						position: 'absolute',
					}}
					ref={overlayRef}
				/>

				<Box
					sx={{
						position: 'relative',
						minHeight: '100vh',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '20px',
						maxWidth: '1150px',
						margin: '0 auto',
					}}
				>
					{/* タイトル */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							minHeight: '30vh',
							mt: '220px',
						}}
					>
						<Box
							sx={{
								position: 'relative',
								width: { xs: '80vw', md: '600px' },
								height: { xs: '120px', md: '200px' },
								opacity: titleOpacity,
								transition: 'opacity 1s ease',
							}}
						>
							<Image
								src="/title.png"
								alt="タイトル"
								fill
								sizes="(max-width: 600px)"
							/>
						</Box>
					</Box>

					<Box
						sx={{
							margin: '0 auto',
							justifyContent: 'center',
							opacity: linkOpacity,
							transition: 'opacity 1s ease',
						}}
					>
						<ListItem>
							<CustomLink href="/ai-assistant">
								<CustomTypography
									sx={{
										fontSize: { xs: '2rem', md: '3rem' },
									}}
								>
									≫ Let&apos;s Start
								</CustomTypography>
							</CustomLink>
						</ListItem>
					</Box>

					{/* サイトの説明 */}
					<Box
						ref={descriptionRef}
						sx={{
							margin: '350px 0 300px 0',
							padding: '0 12px',
							color: '#fff',
							maxWidth: '1000px',
							width: '100%',
						}}
					>
						<Typography
							ref={h2Ref}
							sx={{
								fontWeight: 700,
								fontSize: { xs: '2rem', md: '2.7rem' },
								margin: '0 0 20px 0',
								opacity: 0,
								transform: 'translateY(20px)',
								transition: 'opacity 1.2s ease, transform 1.2s ease',
							}}
						>
							声でつながる特別な会話体験
						</Typography>
						<Typography
							ref={pRef}
							sx={{
								padding: '5px 0',
								lineHeight: '2rem',
								fontSize: { xs: '1rem', md: '1.3rem' },
								opacity: 0,
								transform: 'translateX(20px)',
								transition: 'opacity 1s ease, transform 1s ease',
							}}
						>
							Stellarは、AIを活用してユーザーがキャラクターとリアルな会話を楽しむことができるプラットフォームです。
							<br />
							お気に入りキャラクターの特徴を忠実に再現し、まるで本物のような対話体験を提供します。
							<br />
							<br />
							Stellarでは、キャラクターのボイス音声をAIが学習し、その声を使って会話を進めることができます。
							<br />
							また、テキストモデルから、キャラクターの話し方、性格、サンプルテキストを学習し、
							そのキャラクター独自の言葉遣いや表現を再現します。
							<br />
							ユーザーは、音声モデルとテキストモデルを選択してチャット形式で話しかけると、
							<br />
							AIがそのキャラクターの話し方に合わせた返事テキストを生成し、それを音声モデルが話します。
							<br />
							これにより、まるでキャラクター本人と会話をしているかのような体験が可能です。
							<br />
						</Typography>
					</Box>

					{/* STEP 1 */}
					<Box
						sx={{
							mb: '300px',
							p: '50px 12px',
							color: '#fff',
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							width: '100%',
							gap: '20px',
							maxWidth: '1150px',
						}}
					>
						<Box sx={{ flex: 1 }}>
							<Typography
								ref={h2Ref2}
								sx={{
									fontWeight: 700,
									fontSize: { xs: '2rem', md: '2.7rem' },
									margin: '0 0 20px 0',
									opacity: 0,
									transform: 'translateY(20px)',
									transition: 'opacity 1.2s ease, transform 1.2s ease',
								}}
							>
								STEP 1 <br />
								音声モデルを追加しよう
							</Typography>
							<Typography
								ref={pRef2}
								sx={{
									padding: '5px',
									lineHeight: '2rem',
									fontSize: { xs: '1rem', md: '1.3rem' },
									opacity: 0,
									transform: 'translateX(20px)',
									transition: 'opacity 1s ease, transform 1s ease',
								}}
							>
								音声モデル生成ページで音声モデルをアップロードできます。
								<br />
								<br />
								話してみたいキャラクター音声を追加してみてください！
								<br />
							</Typography>
						</Box>
						{/* chara1.webp削除 */}
					</Box>

					{/* STEP 2 */}
					<Box
						sx={{
							mb: '300px',
							p: '50px 12px',
							color: '#fff',
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							width: '100%',
							gap: '20px',
							maxWidth: '1150px',
						}}
					>
						{/* chara2.webp削除 */}
						<Box sx={{ flex: 1 }}>
							<Typography
								ref={h2Ref3}
								sx={{
									fontWeight: 700,
									fontSize: { xs: '2rem', md: '2.7rem' },
									margin: '0 0 20px 0',
									opacity: 0,
									transform: 'translateY(20px)',
									transition: 'opacity 1.2s ease, transform 1.2s ease',
								}}
							>
								STEP 2 <br />
								性格モデルを追加しよう
							</Typography>
							<Typography
								ref={pRef3}
								sx={{
									padding: '5px',
									lineHeight: '2rem',
									fontSize: { xs: '1rem', md: '1.3rem' },
									opacity: 0,
									transform: 'translateX(20px)',
									transition: 'opacity 1s ease, transform 1s ease',
								}}
							>
								性格モデル使用ページでテキストモデルを追加できます。
								<br />
								　１.モデルの名前を記述します。
								<br />
								　２.AIのモデルを選択します。
								<br />
								　３.キャラクターの概要を記述します。
								<br />
								　４.最後にボタンを押して追加します。
								<br />
								そのキャラの性格や話し方、セリフなどの情報をよりわかりやすくまとめることで精度が上がります！
								<br />
							</Typography>
						</Box>
					</Box>

					{/* STEP 3 */}
					<Box
						sx={{
							mb: '300px',
							p: '50px 12px',
							color: '#fff',
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							width: '100%',
							gap: '20px',
							maxWidth: '1150px',
						}}
					>
						<Box sx={{ flex: 1 }}>
							<Typography
								ref={h2Ref4}
								sx={{
									fontWeight: 700,
									fontSize: { xs: '2rem', md: '2.7rem' },
									margin: '0 0 20px 0',
									opacity: 0,
									transform: 'translateY(20px)',
									transition: 'opacity 1.2s ease, transform 1.2s ease',
								}}
							>
								STEP 3 <br />
								あとは会話をするだけ！
							</Typography>
							<Typography
								ref={pRef4}
								sx={{
									padding: '5px',
									lineHeight: '2rem',
									fontSize: { xs: '1rem', md: '1.3rem' },
									opacity: 0,
									transform: 'translateX(20px)',
									transition: 'opacity 1s ease, transform 1s ease',
								}}
							>
								AI使用ページでキャラクターと会話をすることができます。
								<br />
								音声モデルと性格モデルを選択したら準備は完了です！
								<br />
								お気に入りのキャラクターと会話をしてみましょう！
							</Typography>
						</Box>
						{/* chara3.webp削除 */}
					</Box>
				</Box>
			</Box>
		</main>
	);
}
