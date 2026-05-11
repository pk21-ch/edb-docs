// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
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
      customCss: ["./src/style.css"],
      logo: { src: "./src/assets/logo.svg", alt: "PK21 Logo" },
      sidebar: [
        { label: "Handbuch", slug: "handbook" },
        {
          label: "Weitere Dokumente",
          items: [{ autogenerate: { directory: "documents" } }],
        },
      ],
    }),
  ],
});
