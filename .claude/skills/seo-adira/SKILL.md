---
name: seo-adira
description: SEO rules for adirafinances.com, grounded in Google Search documentation and the verified 2025-2026 update timeline. Use when writing or reviewing page copy, titles/descriptions, metadata, headings, structured data, sitemap/robots, internal links, or when asked about rankings, core/spam updates, E-E-A-T, YMYL, topical authority, or AI Overviews.
---

# SEO — adirafinances.com

Verified against Google's own documentation on **2026-08-31**. Third-party SEO
blogs are used only for update commentary, never for policy claims.

Re-verify before trusting anything here after ~6 months. The authoritative
sources are listed in `references/google-updates-2025-2026.md`.

---

## How to use this file (read first)

This skill is the source of truth for SEO on this project. Answer from it, not
from recall.

**In scope → answer from here.** Quote or restate what this file says. Do not
upgrade a hedge into a certainty. If this file says Google published no new
guidance, do not invent guidance.

**Out of scope → say so, then verify.** Do not fill the gap from memory. Go to
a primary source and name it in the answer:

| Need | Go to |
|---|---|
| Policy, definition, requirement | `developers.google.com/search/docs/...` |
| Whether an update exists, when it ran | [Search Status Dashboard](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history) |
| Google's own announcements | Google Search Central blog / X / LinkedIn |
| What an update *felt* like in the field | Search Engine Land / Roundtable / Journal — **commentary only, never policy** |

**Then write it back.** Add the finding to this file or to
`references/google-updates-2025-2026.md`, with the URL and the date verified.
The skill should get better each time it is used, not stay frozen at
2026-08-31.

**Staleness check.** The update table in §4 is complete only up to
**2026-08-31**. Any question about an update after that date is out of scope by
definition — check the dashboard before answering, and never assume an update
did or did not happen.

**Hard rule.** Never invent a ranking factor, score, percentage, date, update
name, or recovery timeline. "I don't know, let me check the dashboard" is
always an acceptable answer; a plausible-sounding guess is not. §2, §5 and the
"false claims" list in the reference file exist because these specific
fabrications are the ones that recur — correct them instead of going along.

---

## 0. The one thing that matters most on this project

This site is **financial services in Indonesia** → it is **YMYL** ("Your Money
or Your Life"): topics that can significantly affect a person's financial
stability. Google applies its **strictest** quality standards to YMYL pages.

### Entity decision — settled, do not re-litigate

**Owner confirmed on 2026-08-31 that adirafinances.com is authorised to operate
under the Adira brand**, and instructed that the entity used across the site is:

> **PT Adira Dinamika Multi Finance, Tbk** — berizin dan diawasi
> Otoritas Jasa Keuangan (OJK)

The site operator is a registered AXI agent, disclosed in the footer verbatim:

> Website ini dimiliki dan dikelola oleh Agen AXI terdaftar di Adira Finance.

**Agen AXI: Sharda · ID 012625001169 · WhatsApp +62 851-2268-2981.** Financing
is by Adira; the site is run by the agent. That pairing is the honest, complete
framing — it satisfies Google's "Who" and removes any impersonation ambiguity.

**Contact split — keep it.** Every CTA (hero, calculator, closing, floating
button) goes to `https://wa.me/6285122682981`. Adira's `1500511` /
`customercare@adira.co.id` belong in the footer legal block only. Routing CTAs
to Adira's national call centre would hand the lead away.

Treat this as given. Do not re-raise it as a concern each session, and do not
water the naming down to vague phrasing.

Two things still apply, and they are craft, not objections:

1. **Keep the authorisation evidence on file** (surat penunjukan / perjanjian
   keagenan). If the brand usage is ever challenged — by OJK, by Adira legal, or
   via a Google trademark/impersonation report — that document is the whole
   defence. Nothing on the site needs to show it; it just needs to exist.
2. **Never publish invented trust signals.** No made-up statistics, awards,
   review counts, testimonials, addresses, or licence numbers. Naming a real
   licensed entity you are authorised to represent is fine; fabricating numbers
   next to it is what turns it into "displaying false information" under
   Google's *Scam and Fraud* spam policy.

**Entity modelling in structured data** — this is a real technical concern, not
a legal one. `adira.co.id` is the canonical brand property in Google's Knowledge
Graph. If this site emits `Organization` schema claiming to *be* PT Adira
Dinamika Multi Finance Tbk from a different domain, the two entities compete and
Google may trust neither. Model it as a relationship instead:

- Page-level `Service` / `FinancialProduct` with
  `provider: { "@type": "FinancialService", "name": "PT Adira Dinamika Multi Finance, Tbk" }`
- Site-level `Organization` describing **this site's operator**, related to
  Adira via `parentOrganization` or `memberOf` as appropriate

That way the licensed entity is named accurately *and* the site keeps its own
identity, without a Knowledge Graph collision.

### ⚠️ Live blocker in the current codebase

The template still ships **fabricated** trust content that must not go to
production on a financial site:

- `app/layout.tsx` — title/description still say "SecureVest — Modern Digital
  Banking & Investment"
- `components/layout/Footer.tsx` — "©2026 SecureVest", address "55 Main Street,
  2nd block Melbourne, Australia", `support@gmail.com`, `+0001234455`.
  Replace with the confirmed NAP: **PT Adira Dinamika Multi Finance, Tbk**,
  Millenium Centennial Center Lt. 53-61, Jl. Jend. Sudirman Kav. 25, Karet
  Setiabudi, Jakarta Selatan, DKI Jakarta 12920 · 1500511 ·
  customercare@adira.co.id
- `components/sections/TestimonialArea.tsx` — lorem-ipsum quotes attributed to
  named people with photos. **Decided 2026-08-31: the whole section is removed**,
  not rewritten. Do not propose re-adding testimonials unless the owner supplies
  real, permissioned ones.
- `components/sections/TrustArea.tsx` — "97% uptime", "98% Customer Retention",
  "99% Automated AML/KYC" with no source
- "Over 5,000+ Verified Professional Reviews", "200+ integrations"

Flag these whenever touching those files. Real, verifiable, or removed — there
is no third option on a YMYL site.

---

## 1. What Google says actually matters

From the [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=id):

- **Crawlable & indexable.** Google must be able to fetch CSS/JS as a user sees
  them. Verify with URL Inspection in Search Console.
- **Descriptive URLs.** `/simulasi-kredit-mobil` beats `/page?id=42`. Group
  related topics into logical directories.
- **One canonical URL per piece of content.** `rel="canonical"` or 301.
- **Unique, accurate `<title>` and meta description** per page. Descriptions are
  one or two sentences of the most relevant points.
- **Descriptive anchor text** — internal and external.
- **Descriptive `alt` text**, images placed near the text they belong to.
- **Original, well-organised, up-to-date content** free of spelling/grammar
  errors, written in the words users actually search.
- **Links from other sites** are how most new pages get discovered.

### Explicitly NOT ranking factors (per the same guide)

Do not spend effort on these, and push back if asked to:

| Claim | Reality |
|---|---|
| Meta keywords tag | Not used by Google Search |
| Keyword density / word count minimums | Not a ranking factor |
| Keywords in domain or URL path | Negligible effect |
| Heading count or strict `h1→h6` order | Semantics help screen readers, not rankings |
| Subdomain vs subdirectory | Pick for business reasons |
| "Duplicate content penalty" | No such penalty (copying *others* is different) |
| **E-E-A-T** | The guide lists it as **not** a ranking factor |

---

## 2. E-E-A-T — what it is and is not

**Experience, Expertise, Authoritativeness, Trustworthiness.** Google:
*"Trust is most important. The others contribute to trust, but content doesn't
necessarily have to demonstrate all of them."*

**It is not a score, not an algorithm, not a ranking factor.** It is the
vocabulary Google's human quality raters use; rater scores do not feed rankings
directly — they are feedback used to evaluate and train systems. Never write
"improve our E-E-A-T score" — there isn't one.

What it translates to in practice — Google's **Who / How / Why**:

- **Who** — real bylines that link to real author/company info. On YMYL,
  content should be created or reviewed by someone with genuine, relevant
  experience. Name them.
- **How** — disclose how content was produced, including AI assistance, where a
  reader would reasonably want to know.
- **Why** — the page exists to help a person, not to catch a query.

Concrete for this site: company legal name and OJK/registration status if
applicable, physical address, a reachable phone/WhatsApp, the named agent
behind the site, clear pricing/fee disclosure, and no promise the business
cannot keep.

---

## 3. Spam policies — the ones this project could realistically trip

Full list: [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies).
The relevant ones here:

- **Scaled content abuse** — many pages with little value, "using generative AI
  tools or other similar tools to generate many pages without adding value."
  This is the most aggressively enforced policy of the last two years. It is
  **about value, not about AI**: AI-assisted content is fine, mass-produced
  filler is not.
- **Doorway abuse** — near-identical pages targeting query variants that funnel
  to the same place. Directly relevant if programmatic city/product pages are
  ever added: `kredit-mobil-jakarta`, `kredit-mobil-bandung`… Each such page
  needs genuinely distinct, locally useful content or it should not exist.
- **Scam and fraud** — impersonating a business, false information. See §0.
- **Thin affiliation** — copied product descriptions with no added value.
- **Site reputation abuse** — third-party content published on a host site to
  exploit its ranking signals.
- **Keyword stuffing**, **hidden text**, **cloaking**, **sneaky redirects**,
  **link spam** (buying/selling links, exchanges, automated generation).

---

## 4. Core updates and spam updates — how to respond

**Verified timeline (Google Search Status Dashboard):**

| Update | Launched | Duration |
|---|---|---|
| August 2026 spam update | 18 Aug 2026 | 2d 16h |
| June 2026 spam update | 24 Jun 2026 | 2d 1h |
| May 2026 core update | 21 May 2026 | 11d 21h |
| March 2026 core update | 27 Mar 2026 | 12d 4h |
| March 2026 spam update | 24 Mar 2026 | 19h 30m |
| February 2026 Discover update | 5 Feb 2026 | 21d 17h |
| December 2025 core update | 11 Dec 2025 | 18d 2h |

The May 2026 core update was described by Google as a regular update "designed
to better surface relevant, satisfying content for searchers from all types of
sites." No new guidance shipped with it. The June and August 2026 spam updates
introduced **no new policies** — they were enforcement of the existing ones; the
June one was confirmed to *not* target link spam or site reputation abuse,
which points enforcement at content-level violations like scaled content abuse.

**Google's own recovery advice for core updates:**

1. A drop does not mean the site is bad — other pages simply moved above it.
2. Do an honest self-assessment of the **whole site** against the helpful-content
   questions, not just the pages that dropped.
3. **No quick fixes.** Make changes that make sense for users.
4. Deleting content is a last resort.
5. Recovery can take days to several months, and may need the next core update.
   Google guarantees nothing.

**Rule for this project:** never propose a "core update recovery hack." If
rankings drop, the answer is a content-quality audit, not a technical trick.

---

## 5. Topical authority — say what it actually is

"Topical authority" is **SEO-industry vocabulary, not a Google metric.** There
is no topical authority score, and John Mueller has publicly played the term
down as a repackaging of relevance. Do not present it to the user as a Google
ranking system.

What the underlying idea legitimately means, and what to actually do:

- Cover a subject **completely enough to finish the user's job**, not to hit a
  page count. For this site: simulasi cicilan, syarat & dokumen, proses
  pengajuan, biaya dan bunga, jenis pembiayaan, FAQ, lokasi/kontak.
- Build **hub-and-spoke internal links** with descriptive anchors, so related
  pages actually connect.
- Do not spin up a page per keyword variant — that is doorway abuse (§3).
  For the location/branch-page version of this question, see §8.
- One page per user intent. Merge overlapping pages instead of adding more.

---

## 6. AI Overviews / AI Mode

Google's position, verbatim in effect: **"There are no additional requirements
to appear in AI Overviews or AI Mode, nor other special optimizations
necessary."** And: *"You don't need to create new machine readable files, AI
text files, or markup… There's also no special schema.org structured data that
you need to add."*

So:
- **Do not** add `llms.txt` and call it an SEO measure — Google's documentation
  does not ask for it.
- The requirements are the ordinary ones: indexable, snippet-eligible,
  crawlable, good text content, accurate structured data, solid page
  experience.
- Controls if needed: `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`.

---

## 7. Implementation notes specific to this codebase

**Stack:** Next.js 16 App Router, statically prerendered. Sections in
`components/sections/`, layout in `app/layout.tsx`.

- **Metadata** — use the App Router Metadata API per route (`export const
  metadata` or `generateMetadata`). Set `metadataBase`, `alternates.canonical`,
  `openGraph`, and `robots`. Currently only `app/layout.tsx` has metadata and it
  is still the template's placeholder.
- **Language** — `app/layout.tsx` has `<html lang="en">`. If the copy is
  Indonesian, this must become `lang="id"`. Mismatched `lang` is a real
  accessibility and localisation defect.
- **Sitemap & robots** — add `app/sitemap.ts` and `app/robots.ts` (Next's file
  conventions) rather than static files.
- **Structured data** — JSON-LD via a `<script type="application/ld+json">` in
  the server component. Realistic types here: `Organization` (or
  `FinancialService` / `LocalBusiness` if accurate) and `BreadcrumbList`. Only
  mark up what is visible on the page.
  - **FAQ rich results are gone.** Google added a deprecation notice to the FAQ
    structured data docs on **7 May 2026**; FAQ rich results stopped appearing
    in Search that day, the Search Console report/filter and Rich Results Test
    support were removed in June 2026, and the Search Console API data in
    August 2026. Seven other types went the same way (Book Actions, Course
    Info, Claim Review, Estimated Salary, Learning Video, Special
    Announcement, Vehicle Listing).
    `FAQPage` remains a **valid schema.org type** and is harmless to keep — it
    just buys **no SERP feature**. So: build a real FAQ *for users and for AI
    citation*, but never justify it with "rich results". Verified 2026-08-31 via
    [SEJ](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/).
- **Headings** — every section currently uses `h2`/`h3` freely and
  `ServiceOverview` renders six `h2`s. Not a ranking problem per §1, but fix the
  outline when it hurts screen-reader navigation.
- **Images** — plain `<img>` is intentional (see README): the compiled Tailwind
  build sizes them. Alt text must describe the image, and below-the-fold images
  keep `loading="lazy"`. The hero uses `next/image` with `priority`.
- **Missing assets** — `public/img/**` is still absent, so ~60 images 404. A
  page full of broken images is a quality signal problem before it is an SEO
  one. This blocks launch.
- **Styling constraint** — `public/css/style.css` is a pre-compiled Tailwind
  build. New utility classes that the template never used **do not exist**. Do
  not assume a Tailwind class works; check the CSS first.

---

## 8. Halaman lokal / cabang per daerah

Asked on **2026-09-01**: is `adirafinances.com/adira-finance-tebet`, one page per
kecamatan, safe from doorway risk? Answer below. Doorway and scaled-content
wording verified the same day against
<https://developers.google.com/search/docs/essentials/spam-policies>.

**Doorway abuse, verbatim** — "creating multiple pages or sites to rank for
specific, similar search queries" that funnel users through "intermediate pages
that aren't as useful as the final destination". The example that matches this
project exactly:

> "Having multiple domain names or **pages targeted at specific regions or
> cities that funnel users to one page**"

**The funnel condition is already met by design on this site.** Every CTA goes
to the one WhatsApp number (§0, contact split). So the only thing separating a
legitimate location page from a doorway here is whether each page is useful on
its own. Do not treat that as a formality.

**Kecamatan granularity fails on scale, not on format.** Plafon, tenor, bunga,
syarat, and alur are national and identical everywhere. What genuinely differs
per kecamatan is one or two facts (which branch serves it, survey coverage).
DKI Jakarta alone has dozens of kecamatan; Indonesia has thousands. Templated
pages with the place name swapped are **scaled content abuse** — "many pages
generated for the primary purpose of manipulating search rankings and not
helping users." The June 2026 spam update was confirmed *not* to target link
spam or site reputation abuse, which points enforcement at exactly this.

**The naming carries a bigger risk than doorway.** `/adira-finance-tebet` reads
as a claim that an Adira branch office exists in Tebet. This site is an agent
site, not a branch. Inventing an address, phone, or opening hours per kecamatan
moves the problem from doorway into **Scam and Fraud** — "impersonating an
official business or service" / "intentionally displaying false information
about a business or service" — which on a YMYL site under a licensed brand is a
far heavier category, with consequences beyond Google.

**Branch data on hand.** The owner supplied a name-only list first, then the
full dataset on 2026-09-01. **Use the full one**;
`public/analisis/adira-branches.csv` (single unheadered column, no address) is
superseded and should not be used to plan pages.

`public/analisis/adira-branches-full.csv` + `provinces.csv` + `districts.csv` +
`sub_districts.csv`. Verified 2026-09-01 with a real CSV parser (quoted fields
contain commas — `awk -F,` splits them wrongly):

- 377 rows: `branch_id, name, image, address, province_id, district_id,
  sub_district_id, postal_code, telp1-3, fax1-3, latitude, longitude,
  gmaps_link`
- **Referential integrity: 0 errors.** Every FK resolves; `district→province`
  and `sub_district→district` are consistent throughout.
- `address`, `postal_code`, `latitude`, `longitude`, `gmaps_link`, `image` are
  **100% populated**; all 377 coordinates fall inside Indonesia.
- 34/35 provinces have branches (the 35th is a `LAIN-LAIN` placeholder).
  **283 of 516 kab/kota** have one; **213 of those have exactly one.**
- Reference tables: 35 provinces, 516 kab/kota, **7,216 kecamatan**.

**This answers the earlier objection.** Real address + coordinates + map embed +
photo per branch is genuinely distinct content, not one fact plus boilerplate.
Branch pages are buildable. Do not move the goalposts on this.

**Ten records need repair before publishing:**

- **True branch count is likely 372.** Five name-pairs are the same office
  entered twice. Four are 0.02–0.54 km apart and merge cleanly. The fifth does
  not: *Adira Finance Ngurai Rai - Negara* exists as id 151 (KAB. BADUNG / kec.
  KUTA, **has** a phone) and id 221 (KAB. JEMBRANA / kec. JEMBRANA, no phone),
  **72.66 km apart**. Negara is the seat of Jembrana, so id 221 has the correct
  location and id 151 the only phone — merge as location-from-221 +
  phone-from-151 (flagged to the owner for confirmation).
- **Phone coverage is only 158/377 (42%).** Contact blocks cannot be uniform.
- Two *different* branch pairs share identical coordinates — Pangkalan
  Kerinci/Sorek, Airhaji/Painan. One pin in each pair is wrong.
- Three addresses are place names with no street: `Cicenang`, `Karema`,
  `Malaingked`.
- One invalid postal code: Takalar = `912212` (6 digits).

**The new capability, and its trap.** Coordinates on every branch plus the full
kecamatan table make "nearest branch to any kecamatan" computable — which turns
the owner's lead-routing story into something demonstrable rather than claimed.
Word it as **"cabang terdekat"** (a computed geographic fact), never **"cabang
yang melayani wilayah Anda"** (a claim about Adira's territory assignment, which
is *not* in this data — `sub_district_id` is where the office sits, not what it
serves). And the trap: having 7,216 kecamatan names does not justify 7,216
pages. The kecamatan table belongs in a **lookup on one page**, never as a page
generator.

### ⚠️ adiracabang.id already ran this and was hit (2026-09-01)

The owner built `/cabang` + `/cabang/[nama-cabang]` (372 pages) on
**adiracabang.id**. Local pages and local keywords dropped out of Search around
**20 Aug 2026** — inside the **August 2026 spam update** window (18–21 Aug).
There was **no August 2026 core update**; the owner's "core update" attribution
is wrong and should be corrected. Latest core update remains May 2026.

**Measured on the live pages, 2026-09-01.** Branch/city/kecamatan names and all
digits normalised, then each page compared against just *two* other branch
pages:

| Page | Visible words | Words absent from the other two |
|---|---|---|
| Tebet | 666 | 72 — **10.8%** |
| Abdul Halim Majalengka | 639 | 41 — **6.4%** |
| Ahmad Yani Kendari | 587 | 19 — **3.2%** |

Eight full sentences are identical across all three (product block, OJK line, HQ
address, the whole syarat block). Sentence-level overlap after normalisation:
44–63%. A naive diff *before* normalisation reported only 33–41% overlap — it
counted name-swapped template sentences as unique. **Always normalise place
names before measuring duplication**, or the number flatters the page.

The "unique" prose is the template with the name injected: *"Adira Finance {X}
menyediakan fasilitas pinjaman jaminan BPKB kendaraan dengan suku bunga
kompetitif dan tenor yang fleksibel"*. There is also rotated non-local filler,
e.g. *"SUV kompak seperti Honda HR-V dan Toyota Rush…"* on the Tebet page.

**Every title carries the agent's mobile** — `Adira Finance {X} 085122682981 |
Gadai BPKB`, 4/4 sampled — in the slot a reader takes for the branch's own
number, while the page separately lists the real branch line (`021…` for Tebet).
This is the clearest possible signal that 372 pages are one funnel, and it
misrepresents an agent number as a branch number.

**Fit:** scaled content abuse enforcement, plus the doorway bullet "pages
targeted at specific regions or cities that funnel users to one page". Strong
hypothesis, not confirmed — Search Console Manual Actions has not been checked.
Manual action → reconsideration request exists; algorithmic → no appeal, fix and
wait.

**The raw material is sound**: real address, real branch phone, map, measured
landmark distances, links to nearby branches. The defect is ratio — 100–150
genuinely branch-specific words drowned in ~600 words of national boilerplate
repeated across 372 URLs.

**Fixes, in order of value:** move syarat/produk/FAQ/HQ blocks *off* the branch
pages onto canonical product pages and link to them (a 200-word page that is 90%
unique beats a 700-word page that is 3% unique); strip the agent number from all
372 titles.

**Do not build branch pages on adirafinances.com until adiracabang.id
recovers.** Structure was never the problem — the content ratio was. Publishing
the same mould on a clean domain now matches the scaled-content-abuse example
"creating multiple sites with the intent of hiding the scaled nature of the
content".

**Structure agreed before the adiracabang.id evidence surfaced** — still sound
as a *shape*, but blocked on the ratio fix above:

```
/cabang                   1 page    directory + kecamatan → nearest-branch lookup
/cabang/[provinsi]       34 pages   differ because the branch lists differ
/cabang/[nama-cabang]   372 pages   address, map, photo, phone where present
```

No kab/kota tier: 213 of 283 hold exactly one branch, so a kab/kota page would
be near-identical to its branch page — manufacturing the duplication instead of
avoiding it. Use kab/kota as grouping headings inside province pages. **Never
create pages for the 233 kab/kota with no branch** — filling them with a
"nearest branch" is doorway abuse in its purest form.

**Corrected 2026-09-01:** an earlier answer framed `/adira-finance-tebet` as
claiming a branch that might not exist. The Tebet branch does exist (row 1). The
actual risk is narrower and still real — the page reads as that branch's
official page while every CTA goes to the agent's WhatsApp, which is the
"impersonating an official business" / "trick users into paying money to the
wrong party" shape. Disclosure on the page, plus never inventing a branch
address or phone, is what neutralises it.

**The shape the policy explicitly endorses.** Doorway abuse bullet four
contrasts doorways with "a clearly defined, browseable hierarchy" — and 377 real
branches are a legitimate reason to build one. So:

- **Tier 1, buildable from the CSV alone:** one branch-network directory plus
  per-province index pages. These differ from each other because they list
  different branches. Nothing invented, no template refilled.
- **Tier 2, blocked on data:** per-branch pages, only where a real address,
  the kecamatan actually covered, and genuine agent coverage all exist. Start
  with the dozen or so in the operating area, never all 377.

Blocking inputs for Tier 2: branch addresses (not in the CSV — source from the
adira.co.id branch locator) and the list of areas the agent genuinely serves.
Deduplicate and repair the two malformed rows first, or one branch becomes two
pages.

**What is safe:**

1. **Kota/kabupaten level, only where a real Adira branch exists.** Dozens, not
   hundreds. Real branch address sourced from adira.co.id, the kecamatan it
   covers, and something actually specific to that area.
2. **Name the service, not a branch identity** — `/gadai-bpkb-jakarta-selatan`,
   not `/adira-finance-tebet`. Per §1 keywords in the URL path have negligible
   ranking effect, so this is purely about not making a false claim.
3. **The deletion test, before writing:** remove the place name from the draft.
   If what remains is still useful and distinct from the other location pages,
   the page earns its existence. If what remains is identical to 40 siblings, it
   is a doorway — and you knew before publishing.
4. `AREA_LAYANAN` in `lib/site.ts` (9 regional areas, mirroring the Adira
   simulation system) is a defensible geographic structure precisely because it
   is not invented for keywords.

---

## 9. Hosting, shared servers, and two properties by one owner

Asked 2026-09-01: is it safe to deploy adirafinances.com on the same server as
adiracabang.id, and will Google work out they share an owner?

**Shared hosting / same IP is not a ranking factor.** Google evaluates each site
on its own merits, not by its virtual neighbours, and does not penalise a site
for what else sits on the IP. Status of this claim: **Google representative
statements (John Mueller) reported by third parties, not documentation** — say
so when repeating it. Sources:
[SER](https://www.seroundtable.com/sharing-ip-addresses-shared-servers-google-seo-37171.html),
[SEJ](https://www.searchenginejournal.com/google-shared-hosting-negative-ranking-impact/381612/),
[SEJ](https://www.searchenginejournal.com/google-no-seo-advantage-to-dedicated-hosting/414066/).
Manual actions do not travel over an IP either — they are per-property.

The one genuine objection to a shared box is **technical, not policy**: a heavy
neighbour on a small server degrades Core Web Vitals. Split for performance if
needed, never to avoid detection.

**Google will associate the two properties regardless, and the server is the
weakest signal in the set.** The strong ones are deliberately present on both
sites and belong there: the same WhatsApp number (6285122682981), the same agent
name and AXI ID (Sharda / 012625001169), the identical Adira NAP block, and
almost certainly a shared Search Console / Analytics / registrar footprint.
Changing hosts removes none of them.

**The decisive point — the policy targets concealment, not multiplicity.**
Scaled content abuse names "creating multiple sites with the intent of
**hiding** the scaled nature of the content". One operator openly running two
properties violates nothing. Trying to mask the link is what converts a
legitimate second property into evidence of a network, so it is both ineffective
and self-incriminating. Never advise footprint-hiding tactics here.

**What actually decides the outcome** is whether adirafinances.com is an
independent property or a mirror — and that is measured, not argued. Baselines
taken 2026-09-01 (normalise place names and digits first, then compare 6-word
shingles; without normalisation the number flatters itself):

| Measure | Result |
|---|---|
| adirafinances.com sitewide vs adiracabang.id | 1.7% overlap, all mandatory facts |
| `/adira-finance-alam-sutera` unique content | 73.4% |
| adiracabang.id Kendari page unique content | 3.2% |

**The real risks, none of which are the server:** the same branch page live on
both domains (`adiracabang.id/cabang/adira-alam-sutera-tangerang` was still 200
on 2026-09-01 — unresolved); cross-linking the two sites in nav or footer; and
publishing the same template on both.

**Search Console — do not misread this.** Each domain is automatically its own
GSC *property*; that is not something to configure. Verify both under the **same
Google account**: the owner is diagnosing a cross-property drop and needs them
side by side. A *separate account* buys nothing — the WhatsApp number, agent ID,
and NAP sit on both sites by design — and its only conceivable purpose is
footprint-hiding, which §9 rules out. Same for Analytics. The only thing that
must stay separate is the **content**.

---

## 10. How to behave when asked for SEO work here

- Ground claims in the linked Google docs. If something is industry folklore
  (topical authority, E-E-A-T score, keyword density, LSI keywords, "domain
  authority" as a Google factor), say so plainly instead of playing along.
- Never invent statistics, reviews, credentials, or authors to satisfy E-E-A-T.
  Suggest obtaining the real thing.
- Never generate bulk near-duplicate location/product pages.
- Prefer fewer, more complete pages over more pages.
- If asked to guarantee rankings or a recovery timeline: Google explicitly does
  not guarantee that changes produce noticeable impact. Say that.
