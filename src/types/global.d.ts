declare global {
	interface Window {
		isDev?: boolean;
	}

	namespace NodeJS {
		interface ProcessEnv {
			DEV?: string;
			PORT: string;
			PROJECT_ROOT?: string;
		}
	}
}

export {};
