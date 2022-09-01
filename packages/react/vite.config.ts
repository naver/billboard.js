import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {getBanner, readJson} from "../../config/util";

const pkg = readJson("packages/react/package.json");
const {production} = getBanner();
const version = process.env.VERSION || pkg.version;

// eslint-disable-next-line
function getBannerStr() {
	const body = production
		.replace(/2017/, "2022")
		.replace(/billboard\.js\s/, `${pkg.name} `)
		.replace(/(@version ).*$/, `$1${version}`);

	return `/*!
* ${body}
*/`;
}

const external = id => /^react/.test(id);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	root: "demo",
	build: {
		emptyOutDir: true,
		lib: {
			entry: "../src/index.tsx",
			formats: ["es", "cjs"],
			fileName: "billboardjs-react",
			name: "bb"
		},
		minify: "esbuild",
		outDir: "../dist",
		rollupOptions: {
			external,
			output: {
				banner: getBannerStr(),
				globals: {
					react: "React"
				}
			}
		}
	}
});
