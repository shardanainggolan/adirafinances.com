# Search Quality Rater Guidelines: what matters for this audit

Source: Google, "General Guidelines", version of 11 September 2025.
https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf

Google updated its public documentation "Creating helpful, reliable, people-first content" on 1 October 2026 with the same four pillars, a definition of main content and a warning about deceptive authorship.
https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Page Quality vs Needs Met

- **Page Quality (PQ)** rates the page itself. It does not depend on the query.
- **Needs Met (NM)** rates how well a result satisfies a specific query.
- "Useless results should always be rated FailsM, even if the landing page has a high Page Quality rating. Useless is useless." (section 14.0)

This audit is about PQ. Mention NM only when the page clearly mismatches the target query.

## Section 3.2: Quality of the Main Content

"For most pages, the quality of the MC can be determined by the amount of effort, originality, and talent or skill that went into the creation of the content. For informational pages and pages on YMYL topics, accuracy and consistency with well established expert consensus is important."

### Effort
"Consider the extent to which a human being actively worked to create satisfying content."
- Direct effort: a person translating a poem.
- Indirect effort: building a system that provides value, e.g. a page offering machine translation as a service.
- No effort: "the automatic creation of thousands of pages by running existing freely available content through existing translation software without any oversight, manual curation, etc."
- On forums and social sites, many people's contributions "can add up to a significant amount of total human effort."

### Originality
"Consider the extent to which the content offers unique, original content that is not available on other websites. If other websites have similar content, consider whether the page is the original source."

### Talent or skill
"Consider the extent to which the content is created with enough talent and skill to provide a satisfying experience for people who visit the page."
Google's 2026 documentation adds that not all content needs a formal expert: personal experience does not require credentials, technical topics do require subject-matter expertise.

### Accuracy
"For informational pages, consider the extent to which the content is factually accurate. For pages on YMYL topics, consider the extent to which the content is accurate and consistent with well-established expert consensus."

## YMYL

Your Money or Your Life: topics that could significantly affect health, financial stability, safety, or the welfare of society. Apply stricter standards for accuracy, expertise and trust.

## Red flags (Lowest and Low)

### 4.6.5 Scaled Content Abuse (Lowest)
"Creating an abundance of content with little effort or originality with no editing or manual curation is often the defining attribute of spammy websites."
Examples: using automated tools (generative AI or otherwise) as a low-effort way to produce many pages that add little to no value; scraping, synonymizing or stitching content; running multiple sites to hide the scale.

### 4.6.6 MC with little to no effort, originality and added value (Lowest)
Lowest applies "if all or almost all of the MC… is copied, paraphrased, embedded, auto or AI generated, or reposted from other sources with little to no effort, little to no originality, and little to no added value."
Also: "the use of Generative AI tools alone does not determine the level of effort or Page Quality rating."

### 4.6.3 Expired Domain Abuse and 4.6.4 Site Reputation Abuse (Lowest)
Third-party content published on a reputable host without "sufficient input, editorial oversight, or contribution from the host site" (spam policies wording).

### 5.2.1 Low effort, low originality, low added value (Low)
Much of the MC is copied or paraphrased "with a low amount of effort to create value by editing, manually curating, reformatting or injecting some original content." Example: "'Best' lists based on existing reviews and lists with little original content."

### 5.2.2 Filler as a poor user experience (Low)
Content that pads the page and pushes the useful part down.

### Deceptive authorship (Google docs, Oct 2026)
Fabricated creator profiles, AI-generated headshots, made-up names or false credentials are a deception signal.

### Automation disclosure (Google docs)
Google asks creators to explain how and why automation was used. Using automation mainly to manipulate rankings violates spam policies.
https://developers.google.com/search/docs/essentials/spam-policies
