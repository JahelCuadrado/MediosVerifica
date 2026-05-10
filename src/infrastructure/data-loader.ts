import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { MediaOutlet, MediaOutletSummary } from "../domain/entities/media-outlet";

const DATA_DIR = join(process.cwd(), "api", "data");

/**
 * Reads the index.json summary listing.
 * Used at build time for the ranking / listing page.
 */
export function loadMediaIndex(): readonly MediaOutletSummary[] {
  const filePath = join(DATA_DIR, "index.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as MediaOutletSummary[];
}

/**
 * Reads a single media outlet JSON by slug.
 * Used at build time for individual outlet pages.
 */
export function loadMediaOutlet(slug: string): MediaOutlet {
  const safeName = slug.replace(/[^a-z0-9-]/g, "");
  const filePath = join(DATA_DIR, "media", `${safeName}.json`);
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as MediaOutlet;
}

/**
 * Returns all available media outlet slugs.
 * Used by generateStaticParams() for SSG.
 */
export function listMediaSlugs(): readonly string[] {
  const mediaDir = join(DATA_DIR, "media");
  return readdirSync(mediaDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""));
}
