declare global {
	type LayoutData = {
		description?: string;
		headTemplate?: string;
		heading?: string;
		isAmp?: boolean;
		isDev?: boolean;
		ogImage?: string;
		ogImageHeight?: string | number;
		ogImageWidth?: string | number;
		pageTemplate?: string;
		pathname?: string;
	};
}

export {};
