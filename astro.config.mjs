// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { rehypeNumberHeadings } from "./src/utils/rehypeNumberHeadings.ts";
import { unified } from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeNumberHeadings],
    })
  },
  integrations: [
    starlight({
      title: "PK21 EDB Dokumentation",
      locales: { root: { label: "Deutsch", lang: "de-CH" } },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/pk21/edb-docs",
        },
      ],
      routeMiddleware: "./src/utils/routeData.ts",
      components: {
        MarkdownContent: "./src/overrides/MarkdownContent.astro",
        PageTitle: "./src/overrides/PageTitle.astro",
      },
      customCss: ["./src/style.css"],
      logo: { src: "./src/assets/logo.svg", alt: "PK21 Logo" },
      sidebar: [
        { label: "Handbuch", slug: "handbook", attrs: { "data-numbered-page": true } },
        {
          label: "Weitere Dokumente",
          items: [{ autogenerate: { directory: "documents" } }],
        },
      ],
    }),
  ],
});
