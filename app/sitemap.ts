import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { SEO_CONFIG } from "@/lib/seo-config";

function getAllRoutes(): string[] {
  const appDir = path.join(process.cwd(), "app");
  if (!fs.existsSync(appDir)) return ["/"];

  const routes: string[] = ["/"];
  const ignoreDirs = new Set([
    "api",
    "_components",
    "_lib",
    "admin",
    "node_modules",
  ]);
  const ignoreFiles = new Set([
    "layout.tsx",
    "layout.js",
    "loading.tsx",
    "loading.js",
    "error.tsx",
    "error.js",
    "not-found.tsx",
    "not-found.js",
    "globals.css",
    "global.css",
    "sitemap.ts",
    "sitemap.xml",
    "robots.ts",
    "robots.txt",
    "manifest.ts",
    "manifest.json",
    "opengraph-image.tsx",
    "opengraph-image.png",
    "apple-icon.svg",
    "icon.svg",
    "favicon.ico",
  ]);

  function scanDir(dir: string, basePath: string) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

      if (entry.isDirectory()) {
        if (ignoreDirs.has(entry.name)) continue;

        const dirPath = path.join(dir, entry.name);
        const routePath = `${basePath}/${entry.name}`;

        // Check if this directory has a page file
        const hasPage =
          fs.existsSync(path.join(dirPath, "page.tsx")) ||
          fs.existsSync(path.join(dirPath, "page.js")) ||
          fs.existsSync(path.join(dirPath, "page.jsx")) ||
          fs.existsSync(path.join(dirPath, "page.mdx"));

        if (hasPage) {
          // Skip dynamic route folders like [slug], [city] etc.
          if (!entry.name.startsWith("[")) {
            routes.push(routePath);
          }
        }

        // Continue scanning subdirectories
        scanDir(dirPath, routePath);
      }
    }
  }

  scanDir(appDir, "");
  return [...new Set(routes)].sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl;
  const allRoutes = getAllRoutes();
  const lastModified = new Date();

  // Define priority tiers
  const highPriorityPaths = new Set(["/"]);
  const mediumPriorityKeywords = [
    "about",
    "contact",
    "services",
    "service",
  ];

  return allRoutes.map((route) => {
    let priority = 0.7;
    let changeFrequency: "daily" | "weekly" | "monthly" = "weekly";

    if (highPriorityPaths.has(route)) {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (
      mediumPriorityKeywords.some((kw) =>
        route.toLowerCase().includes(kw)
      )
    ) {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (route.split("/").length <= 2) {
      priority = 0.8;
      changeFrequency = "weekly";
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency,
      priority,
    };
  });
}
