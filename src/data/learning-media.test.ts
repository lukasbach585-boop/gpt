import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { baseContent } from './catalog';
import { learningMedia, mediaForSection, mediaSourceCommit, mediaSourceUrl } from './learning-media';
import manifest from '../../public/media/sources.json';

describe('Licensed offline learning images', () => {
  it('ships each original image with its verified bytes, pinned source and complete license', () => {
    expect(manifest.commit).toBe(mediaSourceCommit);
    expect(manifest.assets).toHaveLength(learningMedia.length);
    expect(readFileSync('public/media/LICENSE-Microsoft.txt', 'utf8')).toContain('Copyright (c) Microsoft Corporation.');
    expect(readFileSync('public/media/LICENSE-Microsoft.txt', 'utf8')).toContain('MIT License');
    for (const media of learningMedia) {
      const original = manifest.assets.find(asset => asset.file === media.file)!;
      expect(original, media.id).toBeDefined();
      const bytes = readFileSync(`public/media/${media.file}`);
      expect(bytes.subarray(0, 8).toString('hex'), media.id).toBe('89504e470d0a1a0a');
      expect(createHash('sha256').update(bytes).digest('hex'), media.id).toBe(original.sha256);
      expect(original.modified).toBe(false);
      expect(original.source_url).toBe(mediaSourceUrl(media));
    }
  });

  it('uses every selected image at matching authored sections and never attaches it to a renamed import', () => {
    const used = new Set<string>();
    const modules = new Set<number>();
    let uses = 0;
    for (const week of baseContent.weeks) for (const lesson of week.lessons) {
      for (const section of lesson.explanationSections!) {
        const media = mediaForSection(lesson, section.title);
        if (!media) continue;
        uses++; used.add(media.id); modules.add(week.id);
        expect(media.readingGuide.length).toBeGreaterThanOrEqual(3);
        expect(mediaForSection(lesson, `${section.title} · anderer Inhalt`)).toBeUndefined();
      }
    }
    expect(uses).toBe(24);
    expect(used.size).toBe(learningMedia.length);
    expect(modules.size).toBe(12);
  });
});
