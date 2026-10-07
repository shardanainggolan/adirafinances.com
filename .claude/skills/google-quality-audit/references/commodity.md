# Commodity vs non-commodity content

Google uses this distinction in its guide to generative AI features in Search (updated July 2026) and showed it at Search Central Live Deep Dive Europe 2026 (talk by Duy Nguyen, Search Quality Analyst).
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Commodity content is based on common knowledge that could come from anyone and adds little unique insight. Google's example: "'7 Tips for First-Time Homebuyers' is often based on common knowledge… adds little unique insight." Non-commodity example: "Why We Waived the Inspection & Saved Money: A Look Inside the Sewer Line".

Examples shown at the event:

| Industry | Commodity | Non-commodity |
|---|---|---|
| Running store | Top 10 things to consider when buying running shoes | Why this customer's shoes collapsed after 400 miles: a wear pattern analysis |
| Real estate agent | 7 tips for first-time homebuyers | Why we waived the inspection (and saved $15k): a look inside the sewer line |
| Kitchen store | What is a kitchen and why? | Grandma's skillet: caring for cast iron cookware manufactured before the 1940s |

## Tests to apply

1. **Swap test.** Replace the brand name with a competitor's. If the page loses nothing, it is commodity.
2. **Top 10 test.** Compare with the current top results for the target query. If every fact, heading and recommendation already appears there, it is commodity. (Related idea: Google's "information gain" patent, US11354342B2, scores how much new information a document adds over what the user has seen. [Documented as a patent; use in ranking not confirmed.])
3. **Only-you test.** Does the page use anything only this publisher has: first-party data, customer cases, tests, original photos or video, proprietary metrics, hands-on experience, a working tool?
4. **Template test (for programmatic pages).** Remove the variable fields (city name, product name, keyword). If what remains is the same text on every page, the template is commodity at scale.

## Classification

- **Commodity**: fails the swap test and the top 10 test, and has nothing from the only-you test.
- **Partly commodity**: generic core with some unique elements (one original photo, a short personal note) that do not change what the reader learns.
- **Non-commodity**: the main value comes from something only this publisher could produce.

## Turning commodity into non-commodity

Always propose angles based on assets the user actually has. Ask if you do not know. Typical sources: support tickets and customer questions, internal usage data, returns and reviews, lab or field tests, pricing history, before/after cases, staff expertise, original media.
