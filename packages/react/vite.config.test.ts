import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	root: "demo",
	build: {
		emptyOutDir: true,
		outDir: "../dist"
	}
});
