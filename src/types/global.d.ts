declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DEV?: string;
			PORT: string;
			PROJECT_ROOT?: string;
			TG_ADMIN_ID: string;
			TG_TOKEN: string;
		}
	}
}

export {};
