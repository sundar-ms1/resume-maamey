import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guidesData";

const SITE_URL = "https://www.resumemaamey.in";

export default function sitemap(): MetadataRoute.Sitemap {
  // Do not set lastModified to the build date: that would imply every page
  // changed whenever the site is redeployed. Add real dates when maintained.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/templates`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/guides`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/editor`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...guideRoutes];
}