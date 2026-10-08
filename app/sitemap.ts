import { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guidesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://resumemaamey.in";

  const staticRoutes = [
    "",
    "/editor",
    "/templates",
    "/guides",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const guideRoutes = GUIDES.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...guideRoutes];
}