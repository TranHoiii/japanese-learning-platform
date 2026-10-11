/**
 * Utility for fetching, parsing, and caching KanjiVG stroke order SVGs.
 * Supports all Kanji, Hiragana, and Katakana characters.
 */

export interface KanjiStrokeNumber {
  text: string;
  x: number;
  y: number;
}

export interface KanjiSvgData {
  character: string;
  paths: string[];
  numbers: KanjiStrokeNumber[];
  viewBox: string;
}

// In-memory cache for ultra-fast instant access
const memoryCache = new Map<string, KanjiSvgData>();

/**
 * Returns the 5-digit lowercase hex Unicode string for a character.
 * E.g., '日' -> '065e5', 'あ' -> '03042', 'ア' -> '030a2'
 */
export function getKanjiVgHex(character: string): string {
  if (!character) return "";
  const codePoint = character.codePointAt(0);
  if (!codePoint) return "";
  return codePoint.toString(16).toLowerCase().padStart(5, "0");
}

/**
 * Returns prioritized CDN URLs for KanjiVG SVG asset.
 */
export function getKanjiVgUrls(character: string, customUrl?: string | null): string[] {
  const urls: string[] = [];

  if (customUrl && customUrl.trim().length > 0 && !customUrl.includes("placeholder")) {
    urls.push(customUrl.trim());
  }

  const hex = getKanjiVgHex(character);
  if (hex) {
    // Fast jsDelivr CDN
    urls.push(`https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg/kanji/${hex}.svg`);
    // Direct GitHub fallback
    urls.push(`https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`);
  }

  return urls;
}

/**
 * Parse XML string into structured path and stroke number data.
 */
function parseKanjiSvgXml(character: string, xmlText: string): KanjiSvgData | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "image/svg+xml");

    // Check for parse error
    if (doc.querySelector("parsererror")) {
      return null;
    }

    const svgEl = doc.querySelector("svg");
    const viewBox = svgEl?.getAttribute("viewBox") || "0 0 109 109";

    // Extract stroke paths in sequential order
    // KanjiVG structure: <g id="kvg:StrokePaths_..."><path id="...-s1" d="..." />...</g>
    const pathElements = Array.from(
      doc.querySelectorAll<SVGPathElement>(
        'g[id*="StrokePaths"] path, path[id*="-s"], svg > g path'
      )
    );

    const paths: string[] = [];
    for (const p of pathElements) {
      const d = p.getAttribute("d");
      if (d && d.trim().length > 0) {
        paths.push(d.trim());
      }
    }

    if (paths.length === 0) {
      // Fallback: any path in the document
      const anyPaths = Array.from(doc.querySelectorAll<SVGPathElement>("path"));
      for (const p of anyPaths) {
        const d = p.getAttribute("d");
        if (d && d.trim().length > 0) {
          paths.push(d.trim());
        }
      }
    }

    // Extract stroke numbers
    const numberElements = Array.from(
      doc.querySelectorAll<SVGTextElement>('g[id*="StrokeNumbers"] text')
    );

    const numbers: KanjiStrokeNumber[] = [];
    for (const t of numberElements) {
      const text = t.textContent?.trim() || "";
      let x = 0;
      let y = 0;

      const transform = t.getAttribute("transform") || "";
      const matrixMatch = transform.match(
        /matrix\(\s*[\d.-]+\s+[\d.-]+\s+[\d.-]+\s+[\d.-]+\s+([\d.-]+)\s+([\d.-]+)\s*\)/i
      );

      if (matrixMatch) {
        x = parseFloat(matrixMatch[1]);
        y = parseFloat(matrixMatch[2]);
      } else {
        x = parseFloat(t.getAttribute("x") || "0");
        y = parseFloat(t.getAttribute("y") || "0");
      }

      if (text) {
        numbers.push({ text, x, y });
      }
    }

    if (paths.length === 0) {
      return null;
    }

    return {
      character,
      paths,
      numbers,
      viewBox,
    };
  } catch (err) {
    console.warn("Failed to parse KanjiVG SVG:", err);
    return null;
  }
}

/**
 * Fetch and parse SVG data with 2-layer caching (Memory -> SessionStorage -> Network).
 */
export async function fetchKanjiSvg(
  character: string,
  customUrl?: string | null
): Promise<KanjiSvgData | null> {
  if (!character || character.trim().length === 0) return null;

  const char = character.trim().charAt(0);

  // 1. Check memory cache
  if (memoryCache.has(char)) {
    return memoryCache.get(char)!;
  }

  // 2. Check SessionStorage cache
  const storageKey = `kvg_svg_${char}`;
  try {
    const cachedJson = sessionStorage.getItem(storageKey);
    if (cachedJson) {
      const parsed = JSON.parse(cachedJson) as KanjiSvgData;
      memoryCache.set(char, parsed);
      return parsed;
    }
  } catch {
    // SessionStorage may be restricted or full, ignore
  }

  // 3. Network fetch
  const urls = getKanjiVgUrls(char, customUrl);

  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: "force-cache" });
      if (!response.ok) continue;

      const xmlText = await response.text();
      const parsedData = parseKanjiSvgXml(char, xmlText);

      if (parsedData && parsedData.paths.length > 0) {
        memoryCache.set(char, parsedData);
        try {
          sessionStorage.setItem(storageKey, JSON.stringify(parsedData));
        } catch {
          // Ignore storage quota
        }
        return parsedData;
      }
    } catch {
      // Try next url fallback
    }
  }

  return null;
}
