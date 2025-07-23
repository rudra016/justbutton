const site_url = "http://www.justbutton.space/";

export const siteConfig = {
  name: "JustButton",
  title: {
    default: "JustButton",
    template: `%s - JustButton`,
  },
  description: "Design and export custom Tailwind buttons",
  url: site_url,
  ogImage: `${site_url}/open-graph.png`,
  links: {
    twitter: "https://twitter.com/unsaintme",
    github: "https://github.com/rudra016",
  },
  mailSupport: "rudra619kumar@gmail.com",
  keywords: ["Tailwind CSS", "Tailwind Button", "Tailwind Button Generator"],
  author: {
    name: "Rudra Kumar",
    twitter: "@unsaintme",
    github: "rudra016",
  },
  favicon: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/site.webmanifest",
};
