import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// const root = path.resolve(__dirname, "src");
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	resolve: {
		alias: {
			// "@": path.resolve(__dirname, "./src"),
			"@": resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 8001,
	},
});
