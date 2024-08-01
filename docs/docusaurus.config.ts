import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
	title: "React-Table-Suite",
	tagline: "A powerful and customizable React library for building dynamic, responsive, and efficient tables with ease.",
	favicon: "img/favicon.ico",

	url: "https://react-table-suite.netlify.app/",
	baseUrl: "/",

	organizationName: "jpranays",
	projectName: "react-table-suite",

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},
	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		colorMode: {
			defaultMode: "dark", // Set the default mode to dark
			disableSwitch: false, // Allow users to switch themes
			respectPrefersColorScheme: true, // Respect the OS preference
		},
		navbar: {
			title: "React-Table-Suite",
			items: [
				{
					type: "docSidebar",
					sidebarId: "docsSidebar",
					position: "left",
					label: "docs",
				},
				{
					href: "https://github.com/jpranays/react-table-suite",
					label: "GitHub",
					position: "right",
				},
			],
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
