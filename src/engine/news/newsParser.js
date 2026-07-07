"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsParser = void 0;
class NewsParser {
    parse(raw) {
        const text = raw.title.toLowerCase();
        const impact = this.detectImpact(text);
        const bias = this.detectBias(text);
        const assets = this.mapAssets(text);
        return {
            id: crypto.randomUUID(),
            title: raw.title,
            description: raw.description || "",
            source: raw.source || "unknown",
            timestamp: Date.now(),
            impact,
            bias,
            affectedAssets: assets
        };
    }
    detectImpact(text) {
        if (text.includes("cpi") || text.includes("inflation") || text.includes("rate hike")) {
            return "CRITICAL";
        }
        if (text.includes("fed") || text.includes("central bank")) {
            return "HIGH";
        }
        return "MEDIUM";
    }
    detectBias(text) {
        if (text.includes("crash") || text.includes("inflation") || text.includes("hike")) {
            return "RISK_OFF";
        }
        if (text.includes("growth") || text.includes("bullish") || text.includes("cuts")) {
            return "RISK_ON";
        }
        return "NEUTRAL";
    }
    mapAssets(text) {
        const assets = [];
        if (text.includes("usd"))
            assets.push("DXY");
        if (text.includes("oil"))
            assets.push("OIL");
        if (text.includes("gold"))
            assets.push("XAUUSD");
        if (text.includes("euro"))
            assets.push("EURUSD");
        if (text.includes("rate"))
            assets.push("BONDS");
        return assets;
    }
}
exports.NewsParser = NewsParser;
