// ============================================================================
// Batch Google Indexing Script
// Run: npx tsx scripts/batch-index.ts
// Requires: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, REINDEX_API_KEY
// ============================================================================

import fs from "fs";
import path from "path";

const SITE_URL = "https://hadeed-transport.com";
const API_URL = `${SITE_URL}/api/reindex`;

function getAllRoutes(): string[] {
  const appDir = path.join(process.cwd(), "app");
  if (!fs.existsSync(appDir)) return ["/"];
  
  const routes: string[] = ["/"];
  const ignoreDirs = new Set(["api", "_components", "_lib", "admin", "node_modules"]);
  const ignoreFiles = new Set(["layout.tsx", "layout.js", "loading.tsx", "error.tsx", "not-found.tsx", "globals.css", "sitemap.ts", "robots.ts"]);

  function scanDir(dir: string, basePath: string) {
    let entries: fs.Dirent[];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    
    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;
      if (entry.isDirectory()) {
        if (ignoreDirs.has(entry.name) || entry.name.startsWith("[")) continue;
        const dirPath = path.join(dir, entry.name);
        const routePath = `${basePath}/${entry.name}`;
        const hasPage = fs.existsSync(path.join(dirPath, "page.tsx")) || fs.existsSync(path.join(dirPath, "page.js"));
        if (hasPage) routes.push(routePath);
        scanDir(dirPath, routePath);
      }
    }
  }

  scanDir(appDir, "");
  return [...new Set(routes)].sort();
}

async function main() {
  const routes = getAllRoutes();
  const urls = routes.map(r => `${SITE_URL}${r}`);
  
  console.log(`Found ${urls.length} URLs to index`);
  console.log("Submitting to Google Indexing API...");
  
  const apiKey = process.env.REINDEX_API_KEY;
  if (!apiKey) {
    console.error("Missing REINDEX_API_KEY environment variable");
    process.exit(1);
  }

  // Process in batches
  const batchSize = 50;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`\nBatch ${Math.floor(i/batchSize) + 1}: Submitting ${batch.length} URLs...`);
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ urls: batch }),
      });
      
      const data = await response.json();
      if (data.successful) successCount += data.successful;
      if (data.failed) failCount += data.failed;
      console.log(`  Success: ${data.successful || 0}, Failed: ${data.failed || 0}`);
    } catch (err) {
      console.error(`  Batch failed: ${err}`);
      failCount += batch.length;
    }
    
    // Rate limit delay
    if (i + batchSize < urls.length) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log(`\n✅ Done! Success: ${successCount}, Failed: ${failCount}, Total: ${urls.length}`);
}

main().catch(console.error);
