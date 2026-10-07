# Quality signals from the Google leak (and other primary sources)

The May 2024 Google Content Warehouse API leak exposed 2,596 modules and 14,014 attributes. It shows which concepts Google stores. It does not show weights or whether an attribute is used in production today. Attribute descriptions below are quoted from the published docs:
https://google-api-content-warehouse.hexdocs.pm/0.4.0/

Analyses: Mike King, iPullRank (https://ipullrank.com/google-algo-leak); Rand Fishkin, SparkToro.

Always attach an evidence label when you cite these.

## Page-level quality (QualityNsrPQData, "Encoded page-level PQ signals")

| Attribute | Leaked description | Maps to | Label |
|---|---|---|---|
| `contentEffort` | "LLM-based effort estimation for article pages" | Effort pillar | Description [Documented]; that it implements the rater "Effort" pillar [Inference] |
| `chard` | "URL-level chard prediction" | Content-based quality prediction | [Documented] name only; meaning [Inference] |
| `tofu` | "URL-level tofu prediction" | Content-based quality prediction | [Documented] name only |
| `vlq` | "URL-level score of the VLQ model" | Very low quality detection | Name [Documented]; "very low quality" expansion [Inference] |
| `rhubarb` | "Site-URL delta signals based quality score" | Page vs site quality gap | [Documented] |
| `keto` | "Keto score" | Unknown | [Documented] name only |

## Site-level quality (QualityNsrNsrData)

| Attribute | Leaked description | Maps to | Label |
|---|---|---|---|
| `chardEncoded` | "Site-level chard score: site quality predictor based on content" | Overall content quality of the site | [Documented] |
| `tofu` (site) | "Site-level tofu score: site quality predictor based on content" | Overall content quality | [Documented] |
| `clutterScore` | "Delta site-level signal in Q* penalizing sites with a large number of distracting/annoying resources" | Ads, popups, clutter | [Documented] |
| `smallPersonalSite` | "Score of small personal site promotion" | Promotion of personal blogs | [Documented] |
| `nsr` | No description | Site-level rank | Name [Documented]; "Normalized Site Rank" or "Neural Semantic Retrieval" both [Inference] |

## Topical focus (QualityAuthorityTopicEmbeddingsVersionedItem)

| Attribute | Leaked description | Audit use | Label |
|---|---|---|---|
| `siteFocusScore` | "Number denoting how much a site is focused on one topic" | Off-topic sections dilute focus | [Documented] |
| `siteRadius` | "The measure of how far page_embeddings deviate from the site_embedding" | Pages far from the site's core topic | [Documented] |

## Compressed quality signals (CompressedQualitySignals, "per doc signals… included in Mustang and TeraGoogle")

| Attribute | Leaked description | Label |
|---|---|---|
| `siteAuthority` | "converted from quality_nsr.SiteAuthority, applied in Qstar" | [Documented] |
| `lowQuality` | "S2V low quality score… applied in Qstar" | [Documented] |
| `pandaDemotion` | Panda fields from SiteQualityFeatures | [Documented] |
| `babyPandaDemotion` | "converted from QualityBoost.rendered.boost" | [Documented] |
| `babyPandaV2Demotion` | "New BabyPanda demotion, applied on top of Panda" | [Documented] |
| `unauthoritativeScore`, `scamness` | "web page quality qstar signals" | [Documented] |

## Originality and spam (PerDocData)

| Attribute | Leaked description | Label |
|---|---|---|
| `OriginalContentScore` | 0–127 score; "Only pages with little content have this field." | [Documented] |
| `spamtokensContentScore` | "Used in SiteBoostTwiddler to determine whether a page is UGC Spam" | [Documented] |
| `hostAge` | Used "to sandbox fresh spam in serving time" | [Documented] |
| `scaledSelectionTierRank` | Score "over the serving tier (Base, Zeppelins, Landfills)" | [Documented]; Base = best, Landfills = worst [Inference] |

## Q* (page quality) from the DOJ v. Google case

- HJ Kim interview notes (exhibit PXR0356, Feb 2025): "Q* (page quality (i.e., the notion of trustworthiness)) is incredibly important." Quality is "generally static across multiple queries and not connected to a specific query." PageRank "is used as an input to the Quality score." [Documented]
- Judge Mehta's remedies opinion (Sept 2025): quality and popularity signals "help Google determine how frequently to crawl web pages." [Documented]
- "Q* uses no click data" is NOT stated anywhere. Do not claim it.

## Twiddlers (re-ranking at serving time)

- Twiddler Quick Start Guide (internal Google doc, 2018, leaked 2019): "A twiddler is a C++ object that makes ranking recommendations (twiddles) given a provisional search response… twiddlers act on a ranked sequence of results, rather than results in isolation." They can boost, demote, filter and limit results per host. [Documented]
- QualityBoost, NavBoost and Baby Panda acting as twiddlers: Mike King "presumably". [Inference]
- Core updates acting through twiddlers: [Hypothesis]

## Site-level quality patents

- US8682892B1 "Ranking search results" (Navneet Panda): site-level modification factor from independent links vs reference queries.
- US9031929B1 "Site quality score": queries that reference the site (branded/navigational demand) relative to queries the site appears for.
- US9767157B2 "Predicting site quality": predicts quality of new sites from n-gram language patterns of already-rated sites.
A patent shows an idea Google protected. It does not prove production use. Label patents as [Documented as a patent].

## What Google said at Search Central Live Deep Dive Europe 2026 (Barcelona)

- Quality = "the extent to which a human being put effort, originality, talent, skill, and accuracy into creating content."
- Retrieval slides showed each candidate URL carrying language, country and quality (high / med / low), with high-quality URLs moving up.
- Core update recovery: typically 3–6 months; worst case 6 months to 1 year (next core update). Rollout: 2–4 weeks.
- Worst case "never (quality)" for sitemap processing, end-to-end indexing and structured data updates.
