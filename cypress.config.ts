import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:3000", // 테스트 실행시 사용될 path입니다.
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
