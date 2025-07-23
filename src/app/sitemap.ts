import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://justbutton.space",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}