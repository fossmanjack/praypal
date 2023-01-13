const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
	name: IS_DEV ? 'PrayPal (dev)' : 'PrayPal',
	slug: 'praypal',
	version: '0.2.1',
	orientation: 'portrait',
	icon: './assets/icons/praypalIcon.png',
	userInterfaceStyle: 'light',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff',
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: [
		'**/*',
	],
	ios: {
		bundleIdentifier: IS_DEV ? 'com.p3soft.praypal.dev' : 'com.p3soft.praypal',
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/icons/praypal-foreground.png',
			backgroundImage: './assets/icons/praypal-background.png',
			monochromeImage: './assets/icons/praypal-monochrome.png',
			backgroundColor: '#00a8ff',
		},
		package: IS_DEV ? 'com.p3soft.praypal.dev' : 'com.p3soft.praypal',
	},
	web: {
		favicon: './assets/icons/praypalIcon.png',
	},
	plugins: [
		'@notifee/react-native',
		[
			'expo-build-properties',
			{
				android: {
					compileSdkVersion: 33,
					targetSdkVersion: 33
				},
			},
		],
	],
	extra: {
		eas: {
			projectId: '2a6ab95b-d2a0-4720-82d2-515515842ce6',
		},
	},
}
