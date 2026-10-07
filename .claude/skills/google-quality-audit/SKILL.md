---
name: google-quality-audit
description: Audit a web page, a page template or a whole section against Google's quality criteria. Scores the four pillars from the Search Quality Rater Guidelines (effort, originality, talent or skill, accuracy), detects commodity content, checks site focus, and maps each finding to the quality signals that appeared in the May 2024 Google Content Warehouse leak, labelling what is documented and what is inference. Use when the user asks to "audit quality", "review a page for core updates", "check if this content is commodity", "why did we drop in a core update", "evaluate this template", or shares URLs or page text and asks how Google would judge their quality.
---

# Google Quality Audit

Created by Nacho Mascort (nachomascort.com). Based on Google's public documentation, the Search Quality Rater Guidelines (11 Sept 2025 version), the Search Central Live Deep Dive Europe 2026 talks, DOJ v. Google trial records and the May 2024 Content Warehouse API leak.

## What this skill does

It judges content the way Google describes quality: how much effort, originality, talent or skill, and accuracy a human put into it. Then it zooms out to the template and the site, because Google ranks pages but each page inherits the reputation of its site.

It never claims to know Google's algorithm. Every leak-based statement must carry a confidence label (see "Evidence labels").

## Inputs to ask for

Ask only for what is missing. Work with whatever the user gives you.

1. **The content**: one or more URLs, pasted page text, or a description of a template (what fields it has, where the data comes from, how many pages it generates).
2. **The query or intent** the page targets (optional but improves the commodity check).
3. **Context for site-level checks** (optional): what the site is about, its main sections, rough page counts per template, and whether traffic dropped in a core update.

If you can fetch URLs, fetch them and read the main content (MC). Prefer a raw fetch of the HTML or text (for example `curl`) over a tool that returns a summary. If you only have a summary, say so in the report and do not present summary wording as verbatim quotes. If you cannot fetch, ask the user to paste the text. Ignore navigation, ads and boilerplate when judging MC, but note them for the clutter check in Step 4.

Judge the page as it stands today, whatever its publication date. If it is an old or archived post, say so and factor in whether the information is still current.

If the user mentions a competitor set or the current top results for the query, use them for the originality and commodity checks. If you have web search, search the target query and open the top 3 to 5 organic results to compare. If you only see titles and snippets, mark the top 10 test as "partly checked".

## Workflow

Follow these steps in order. Read the reference file for each step before scoring.

### Step 1. Identify page purpose and YMYL

State the page purpose in one line. Decide if the topic is YMYL (health, finance, safety, civic, or anything that could significantly harm people). YMYL raises the bar for accuracy and expertise. See `references/rater-guidelines.md`.

### Step 2. Score the four pillars (page level)

Score each pillar from 0 to 4 using the rubric in `references/rubric.md`. For each score, quote or point to the concrete evidence in the content. No score without evidence.

- **Effort**: did a human actively work to create satisfying content, or could this be generated from a feed, a template or a model without oversight?
- **Originality**: does it offer information not available on other sites? If similar content exists elsewhere, is this the original source?
- **Talent or skill**: is it made with enough skill to satisfy visitors (clarity, structure, media, working tools)?
- **Accuracy**: is it factually correct? For YMYL, is it consistent with expert consensus?

### Step 3. Commodity check

Apply the commodity test from `references/commodity.md`. Classify the page as **commodity**, **partly commodity** or **non-commodity**, and write the one-line "swap test" result: if you replaced the brand with a competitor's, would the page lose anything?

For commodity pages, propose one concrete non-commodity angle the user could produce with what only they have (their data, their customers, their tests, their photos, their experience).

### Step 4. Red flags from spam policies and Lowest/Low criteria

Check the list in `references/rater-guidelines.md` (scaled content abuse, little-to-no effort/originality/added value, filler, deceptive authorship, unreviewed AI output, site reputation abuse) plus clutter: ads, popups or interstitials that get in the way of the MC (related leak signal: `clutterScore`). Report only the flags you can support with evidence. If a flag needs the full text and you do not have it, say "not checked".

### Step 5. Template and site-level view

If the user gave template or site context:

- Estimate how many pages share this template and how many of them have enough unique data to justify existing.
- Check topical focus: does this section fit the site's core topic? (maps to `siteFocusScore` and `siteRadius`, see `references/leak-signals.md`).
- Check whether low-quality sections (thin translations, auto-generated pages, off-topic clusters) could be dragging the site-level score.
- Recommend per template: **improve**, **consolidate**, **move out** (another domain or subdomain) or **remove / noindex**.

### Step 6. Map findings to leak signals

Add a leak attribute only where there is a real link to the finding. An empty table is fine for a single small page. Label name, meaning and usage separately when they differ (for example: description [Documented], link to the Effort pillar [Inference]). The leak tells us which concepts Google stored. It does not tell us weights.

### Step 7. Deliver the report

Use the template in `references/report-template.md`. Write the whole report in the user's language, including headings and verdict names (Spanish verdicts: Sólido, Sólido con huecos, En riesgo, Riesgo alto). Lead with the verdict. Keep it actionable: every problem comes with the fix.

## Evidence labels

Use exactly these labels whenever you cite Google internals:

- **[Documentado]** / **[Documented]**: stated in Google's public docs, the rater guidelines, sworn testimony, or the leaked attribute description itself.
- **[Inferencia]** / **[Inference]**: a reasonable reading by the SEO community or by you, not stated by Google. Name who argues it when known.
- **[Hipótesis]** / **[Hypothesis]**: plausible but unsupported. Use sparingly.
- **[Criterio propio]** / **[Auditor judgment]**: your own assessment that is neither Google-documented nor a known community reading (for example, judging that a piece of SEO advice is outdated). Use it for accuracy calls you make from your own knowledge.

Never present an inference as fact. Never invent attribute names, numbers or quotes. If unsure, say so.

## Things to keep in mind

- Raters do not rank pages. Their guidelines describe what Google's systems try to reward.
- Using AI does not by itself make content low quality. Unreviewed, mass-produced, low-value content does.
- Recovery after a core update typically takes 3 to 6 months and can mean waiting until the next core update (Google Search Central Live Deep Dive Europe 2026; Google's core updates documentation).
- Quality can decide whether a page gets indexed at all: Google's own timeline slides list "never (quality)" as the worst case for sitemap processing, end-to-end indexing and structured data.
