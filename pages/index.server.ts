import { defineHead } from "void";
import { meta } from "../data";

export const head = defineHead(() => ({
  title: meta.title,
  htmlAttrs: { lang: "ja" },
  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, interactive-widget=resizes-content",
    },
    { name: "description", content: meta.description },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#a6cee2" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: meta.url },
    { property: "og:title", content: meta.title },
    { property: "og:description", content: meta.description },
    { property: "og:image", content: meta.image },
    { property: "og:url", content: meta.url },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: meta.title },
    { name: "twitter:description", content: meta.description },
    { name: "twitter:image", content: meta.image },
    { name: "twitter:site", content: `@${meta.author}` },
    { name: "twitter:creator", content: `@${meta.author}` },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    { name: "apple-mobile-web-app-title", content: meta.title },
  ],
  link: [
    { rel: "apple-touch-icon", href: meta.image },
    { rel: "canonical", href: meta.url },
    { rel: "icon", type: "image/png", href: meta.image },
    {
      rel: "preload",
      href: "/PixelMplus12-Regular.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: meta.title,
        url: meta.url,
        description: meta.description,
        image: meta.image,
        author: { "@type": "Person", name: meta.author },
      }).replaceAll("<", "\\u003c"),
    },
  ],
}));
