@AGENTS.md

# SEO: answer from the skill, never from memory

Any question or task touching SEO — rankings, Google algorithm/core/spam
updates, E-E-A-T, YMYL, topical authority, AI Overviews/AI Mode, metadata,
titles/descriptions, headings, structured data, sitemap/robots, internal
linking, page copy, keywords — **must** start by loading the project skill:

```
Skill(skill: "seo-adira")
```

Rules, in order of precedence:

> Note the name: `seo-adira`, **not** `seo`. The installed `claude-seo` plugin
> owns the bare `seo` name, and asking for `seo` loads the plugin orchestrator
> instead of this project's rules. The plugin is a useful toolbox, but it is not
> the source of truth here — this skill is.

1. **Load the skill before answering.** Do not reply on recall. `.claude/skills/seo-adira/SKILL.md`
   plus `references/google-updates-2025-2026.md` are the source of truth for
   this project, and they were verified against Google's own documentation on
   2026-08-31.
2. **If the skill covers it, quote the skill.** Do not paraphrase it into
   something stronger or more confident than what it says.
3. **If the skill does NOT cover it, say so, then research it** — Google Search
   Central docs, the Search Status Dashboard, or Google's own blog. Third-party
   SEO blogs are acceptable for *what happened and when*, never for *what the
   policy is*. State which source answered it.
4. **After researching something new, write it back into the skill** so the next
   session does not re-derive it. Include the URL and the date verified.
5. **Never invent** a ranking factor, a score, a percentage, a timeline, an
   update name, or a date. If it is not in the skill and not in a source you
   just read, the answer is "I don't know — let me check."
6. The skill records claims that are **false** (E-E-A-T score, topical authority
   as a Google system, duplicate-content penalty, AI-content penalty,
   llms.txt requirement, keyword density). Correct these when the user or a
   third party repeats them, rather than going along with them.
