export class NarrativeEngine {

  private stories: string[] = [];

  compress(events: any[]) {

    const keywords: string[] = [];

    for (const e of events) {

      if (e.type === "NEWS") {
        keywords.push(`NEWS:${e.data.title}`);
      }

      if (e.type === "BELIEF") {
        keywords.push(`BELIEF:${e.data.direction}`);
      }
    }

    const story = this.simplify(keywords);

    this.stories.push(story);

    return story;
  }

  private simplify(keywords: string[]) {

    if (keywords.length === 0) return "NO DATA";

    let story = "";

    for (const k of keywords) {

      if (k.startsWith("NEWS")) {
        story += "Market catalyst detected → ";
      }

      if (k.startsWith("BELIEF")) {
        story += "Trader bias response → ";
      }
    }

    return story.trim();
  }

  getMemory() {
    return this.stories;
  }
}
