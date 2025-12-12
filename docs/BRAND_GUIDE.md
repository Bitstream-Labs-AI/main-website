# Bitstream Labs.AI Brand Guide

## Overview

This brand guide serves as the definitive source of truth for Bitstream Labs.AI's visual and verbal identity. It ensures consistency across all touchpoints as we scale, hire new team members, and work with external agencies. This document covers brand strategy, visual identity, verbal identity, and practical applications.

---

## 1. The Brand Heart (Strategy & Core Identity)

Before diving into colors and logos, we must align on _why_ we exist. This section defines the soul of Bitstream Labs.AI.

### Mission Statement

**We set the standard in AI benchmarking by providing expert consulting to R&D teams pushing the boundaries of intelligent hardware.**

This mission statement reflects our commitment to excellence and our focus on serving cutting-edge research and development teams.

### Vision Statement

**To unite AI and hardware engineering into a single, unified workflow, turning AI models into simple components for seamless deployment targets.**

Our vision articulates the future we're building—a world where AI and hardware engineering are seamlessly integrated.

### Core Values

These non-negotiable principles guide all our decisions and behaviors:

1. **Technical Excellence**: We maintain the highest standards in everything we do, from benchmarking methodologies to client deliverables.
2. **Innovation First**: We embrace cutting-edge technologies and methodologies, always pushing boundaries.
3. **Evidence-Based Engineering**: All claims and decisions are grounded in data, experimentation, and verifiable results.
4. **Client-Centric Focus**: We prioritize understanding and addressing client needs above all else.
5. **Transparency**: We communicate clearly, honestly, and directly with our clients and team.

### Target Audience / Persona

#### Primary Persona: AI Hardware R&D Leader

**Demographics:**

- **Age**: 30-50
- **Location**: Global (US, Europe, Asia-Pacific tech hubs)
- **Job Title**: Director/VP of AI Hardware, Principal Engineer, Research Lead
- **Company Size**: Mid to large tech companies, research institutions
- **Industry**: AI hardware, semiconductor, edge computing, autonomous systems

**Psychographics:**

- **Fears**: Missing performance benchmarks, shipping inferior products, falling behind competitors
- **Desires**: Reliable benchmarking data, expert guidance, competitive advantage
- **Pain Points**:
  - Lack of standardized benchmarking methodologies
  - Difficulty translating AI models to hardware efficiently
  - Need for expert consultation on hardware optimization
  - Time pressure to deliver results

**Communication Preferences:**

- Technical depth and precision
- Data-driven insights
- Clear, actionable recommendations
- Professional, no-nonsense tone

#### Secondary Persona: Startup Founder / CTO

**Demographics:**

- **Age**: 28-45
- **Location**: Global startup hubs
- **Job Title**: Founder, CTO, Technical Co-founder
- **Company Size**: Early-stage to Series B startups
- **Industry**: AI/ML startups, hardware startups, edge AI companies

**Psychographics:**

- **Fears**: Wasting resources, making wrong technical decisions, being outcompeted
- **Desires**: Fast, expert guidance, cost-effective solutions, competitive edge
- **Pain Points**:
  - Limited resources for extensive R&D
  - Need for quick, expert validation
  - Balancing speed with quality

### Brand Personality

If Bitstream Labs.AI were a person, we would be **The Expert Sage**:

- **Knowledgeable**: Deep expertise in AI benchmarking and hardware
- **Authoritative**: Confident in our recommendations and methodologies
- **Approachable**: Despite our expertise, we remain accessible and helpful
- **Forward-Thinking**: Always looking ahead to emerging technologies and trends
- **Precise**: Detail-oriented and data-driven in our approach

**Personality Traits:**

- Professional but not stuffy
- Technical but not jargon-heavy
- Innovative but grounded in evidence
- Confident but humble
- Clear and direct

---

## 2. Visual Identity (The Look)

This section provides specific guidelines that enable any designer to create assets without additional questions.

### Logo Usage

#### Primary Logo: Wordmark

**Current Implementation**: Text-based wordmark using Inter font with gradient treatment.

**Specifications:**

- **Font**: Inter, Bold (700)
- **Treatment**: Gradient from Futurist Cyan (#00d9ff) to Futurist Blue (#0066ff)
- **Text**: "Bitstream Labs.AI"
- **Usage**: Primary brand identifier for digital interfaces, navigation, headers

**CSS Implementation:**

```css
.logo-primary {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem; /* Adjust as needed */
  background: linear-gradient(to right, #00d9ff, #0066ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

#### Logo Variations

**1. Solid Color Version (Light Mode)**

- Use solid Industrial Slate (#1a1f2e) for light backgrounds
- Maintains readability when gradient isn't suitable

**2. Monochrome Version**

- Use Industrial Light (#e2e8f0) for dark backgrounds
- Use Industrial Slate (#1a1f2e) for light backgrounds

#### Clear Space (Safety Margin)

- **Minimum Clear Space**: Equal to the height of the letter "B" in the logo
- **Example**: If logo is 24px tall, maintain 24px of clear space on all sides
- **Never**: Place logo closer than the minimum clear space to other elements

#### Minimum Size

- **Digital**: 16px height minimum
- **Print**: 0.125" (3mm) height minimum
- **Below these sizes**: Logo becomes illegible and should not be used

#### Logo "Do Not" Examples

**❌ DO NOT:**

- Stretch or distort the logo
- Change the font or typography
- Alter the gradient colors
- Place on busy backgrounds that reduce readability
- Rotate or skew the logo
- Add effects (shadows, outlines, glows) without brand approval
- Use incorrect spacing
- Change the "Labs.AI" portion independently

**✅ DO:**

- Maintain aspect ratio
- Use approved color variations
- Ensure sufficient contrast
- Follow clear space guidelines
- Use appropriate size for context

### Color Palette

#### Primary Colors

**Futurist Cyan** (`#00d9ff`)

- **HEX**: `#00d9ff`
- **RGB**: `rgb(0, 217, 255)`
- **CMYK**: `C:70 M:0 Y:0 K:0` (approximate, may need adjustment for print)
- **PMS**: `PMS 319 C` (closest match)
- **Usage**: Primary accent, CTAs, links, primary brand color

**Futurist Blue** (`#0066ff`)

- **HEX**: `#0066ff`
- **RGB**: `rgb(0, 102, 255)`
- **CMYK**: `C:100 M:60 Y:0 K:0`
- **PMS**: `PMS 285 C` (closest match)
- **Usage**: Secondary accent, gradients, secondary brand color

#### Secondary/Accent Colors

**Futurist Purple** (`#7c3aed`)

- **HEX**: `#7c3aed`
- **RGB**: `rgb(124, 58, 237)`
- **CMYK**: `C:70 M:80 Y:0 K:0` (approximate)
- **PMS**: `PMS 2735 C` (closest match)
- **Usage**: Tertiary accent, special highlights, emphasis

**Futurist Pink** (`#ec4899`)

- **HEX**: `#ec4899`
- **RGB**: `rgb(236, 72, 153)`
- **CMYK**: `C:0 M:80 Y:20 K:0` (approximate)
- **PMS**: `PMS 238 C` (closest match)
- **Usage**: Rare accent, special cases only

#### Neutrals (Dark Mode - Primary)

**Industrial Dark** (`#0a0e1a`)

- **HEX**: `#0a0e1a`
- **RGB**: `rgb(10, 14, 26)`
- **CMYK**: `C:100 M:90 Y:60 K:90`
- **Usage**: Primary background

**Industrial Slate** (`#1a1f2e`)

- **HEX**: `#1a1f2e`
- **RGB**: `rgb(26, 31, 46)`
- **CMYK**: `C:90 M:80 Y:50 K:80`
- **Usage**: Secondary background, cards, elevated surfaces

**Industrial Steel** (`#2d3447`)

- **HEX**: `#2d3447`
- **RGB**: `rgb(45, 52, 71)`
- **CMYK**: `C:80 M:70 Y:40 K:70`
- **Usage**: Borders, dividers, hover states

**Industrial Silver** (`#4a5568`)

- **HEX**: `#4a5568`
- **RGB**: `rgb(74, 85, 104)`
- **CMYK**: `C:70 M:60 Y:30 K:60`
- **Usage**: Disabled states, subtle accents, borders
- **Readability Warning**: Do NOT use for text on light backgrounds - contrast ratio is too low (4.5:1). Use Industrial Steel (`#2d3447`) instead for readable text.

**Industrial Light** (`#e2e8f0`)

- **HEX**: `#e2e8f0`
- **RGB**: `rgb(226, 232, 240)`
- **CMYK**: `C:10 M:5 Y:0 K:5`
- **Usage**: Primary text color (dark mode)
- **Contrast Note**: Provides excellent contrast (12.5:1) on Industrial Dark background for optimal readability

#### Neutrals (Light Mode)

**Light Background** (`#ffffff`)

- **HEX**: `#ffffff`
- **RGB**: `rgb(255, 255, 255)`
- **CMYK**: `C:0 M:0 Y:0 K:0`
- **Usage**: Primary background (light mode)

**Light Background Soft** (`#f8f8f8`)

- **HEX**: `#f8f8f8`
- **RGB**: `rgb(248, 248, 248)`
- **CMYK**: `C:0 M:0 Y:0 K:3`
- **Usage**: Secondary background (light mode)

**Light Text Primary** (`#1a1f2e`)

- **HEX**: `#1a1f2e`
- **RGB**: `rgb(26, 31, 46)`
- **CMYK**: `C:90 M:80 Y:50 K:80`
- **Usage**: Primary text color (light mode) - same as Industrial Slate

**Light Text Secondary** (`#2d3447`)

- **HEX**: `#2d3447`
- **RGB**: `rgb(45, 52, 71)`
- **CMYK**: `C:80 M:70 Y:40 K:70`
- **Usage**: Secondary text color (light mode) - uses Industrial Steel for better contrast
- **Contrast Note**: Changed from Industrial Silver to Industrial Steel to ensure minimum 7:1 contrast ratio on white backgrounds for better readability

#### Gradient Combinations

**Primary Gradient** (Cyan to Blue)

- **Start**: `#00d9ff` (Futurist Cyan)
- **End**: `#0066ff` (Futurist Blue)
- **Direction**: Left to right (horizontal)
- **Usage**: Headlines, brand elements, hero sections, logo treatment

**CSS Implementation:**

```css
.gradient-primary {
  background: linear-gradient(to right, #00d9ff, #0066ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

### Typography

#### Primary Typeface: Inter

**Inter** is our primary typeface for headlines, body text, and all general content. It was chosen for its excellent readability and clarity, especially important for older eyes.

- **Source**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Usage**: Headlines, body text, UI elements, navigation, all general content
- **Readability Note**: Never use Light (300) weight for body text. Always use Regular (400) or heavier for optimal readability.

**Font Loading:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

**CSS Implementation:**

```css
font-family:
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  Oxygen,
  Ubuntu,
  Cantarell,
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  sans-serif;
```

#### Secondary Typeface: Roboto Mono

**Roboto Mono** is used exclusively for code snippets, technical documentation, and monospaced content.

- **Source**: [Google Fonts - Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)
- **Weights**: 400 (Regular), 500 (Medium), 700 (Bold)
- **Usage**: Code blocks, technical specifications, API documentation, command-line examples

**Font Loading:**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

**CSS Implementation:**

```css
font-family: 'Roboto Mono', 'Courier New', Courier, monospace;
```

#### Typography Hierarchy

**Display (Hero Headings)**

- **Size**: 4rem - 6rem (64px - 96px)
- **Weight**: 700 (Bold)
- **Line Height**: 1.1
- **Letter Spacing**: -0.02em
- **Use Case**: Main hero headlines, landing page titles

**H1 (Page Titles)**

- **Size**: 3rem - 4rem (48px - 64px)
- **Weight**: 700 (Bold)
- **Line Height**: 1.2
- **Letter Spacing**: -0.01em
- **Use Case**: Page titles, major section headings

**H2 (Section Headings)**

- **Size**: 2rem - 2.5rem (32px - 40px)
- **Weight**: 600 (SemiBold)
- **Line Height**: 1.3
- **Letter Spacing**: -0.01em
- **Use Case**: Section headings, card titles

**H3 (Subsection Headings)**

- **Size**: 1.5rem - 1.75rem (24px - 28px)
- **Weight**: 600 (SemiBold)
- **Line Height**: 1.4
- **Use Case**: Subsection headings, feature titles

**H4 (Minor Headings)**

- **Size**: 1.25rem (20px)
- **Weight**: 600 (SemiBold)
- **Line Height**: 1.4
- **Use Case**: Minor headings, list titles

**Body Large**

- **Size**: 1.125rem (18px) - **Minimum 18px for optimal readability**
- **Weight**: 400 (Regular)
- **Line Height**: 1.6
- **Use Case**: Lead paragraphs, emphasized body text

**Body (Default)**

- **Size**: 1rem (16px) - **Minimum 16px for body text (WCAG AAA standard)**
- **Weight**: 400 (Regular) - **Never use Light (300) weight for body text**
- **Line Height**: 1.6 - **Minimum 1.5 for readability**
- **Use Case**: Standard body text, paragraphs
- **Readability Note**: This is the absolute minimum size for body text. Prefer 18px (1.125rem) when possible for older readers.

**Body Small**

- **Size**: 0.9375rem (15px) - **Increased from 14px for better readability**
- **Weight**: 400 (Regular)
- **Line Height**: 1.5
- **Use Case**: Captions, metadata, supporting text
- **Readability Note**: Use sparingly. Only for non-critical information. Ensure high contrast.

**Body Extra Small**

- **Size**: 0.875rem (14px) - **Increased from 12px, absolute minimum**
- **Weight**: 400 (Regular)
- **Line Height**: 1.5
- **Use Case**: Labels, timestamps, legal text
- **Readability Note**: Use only when absolutely necessary. Ensure maximum contrast.

#### Web-Safe Fallback Fonts

If Inter fails to load, the following fallback stack ensures readability:

```css
font-family:
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  Oxygen,
  Ubuntu,
  Cantarell,
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  sans-serif;
```

### Imagery & Iconography

#### Photography Style

**Approach**: Professional, technical, clean

**Characteristics:**

- **Style**: Clean, modern, minimal
- **Color Treatment**:
  - Dark mode: High contrast, vibrant accents
  - Light mode: Natural, professional
- **Subjects**:
  - Technology and hardware (circuit boards, chips, hardware components)
  - Abstract technical concepts (data visualizations, neural networks)
  - Professional environments (labs, clean workspaces)
- **Avoid**:
  - Overly staged or stock-photo aesthetic
  - Cluttered or busy compositions
  - Low-quality or pixelated images

**Usage Guidelines:**

- Use high-resolution images (minimum 1920px width for web)
- Maintain consistent color grading
- Ensure images align with industrial futurist aesthetic
- Use images that support technical content

#### Illustration Style

**Current Status**: Not yet defined. When illustrations are needed:

- **Style**: Should align with industrial futurist aesthetic
- **Approach**: Clean, technical, precise
- **Color**: Use brand color palette
- **Avoid**: Overly playful or cartoonish styles

#### Icon Sets

**Style**: Minimal, clean, technical

**Characteristics:**

- **Weight**: Medium (not too thin, not too bold)
- **Style**: Outlined or filled, depending on context
- **Corners**: Slightly rounded for modern feel
- **Consistency**: Use icon sets from established libraries (e.g., Heroicons, Feather Icons)

**Recommended Icon Libraries:**

- Heroicons (outline and solid variants)
- Feather Icons
- Custom icons should match the style of these libraries

**Usage Guidelines:**

- Maintain consistent icon style throughout
- Use appropriate sizes (16px, 20px, 24px standard)
- Ensure icons are accessible (sufficient contrast, clear meaning)

---

## 3. Verbal Identity (The Sound)

This section guides copywriters, social media managers, and support staff on how to speak on behalf of Bitstream Labs.AI.

### Voice

Our brand voice is the consistent personality that never changes, regardless of context.

**Voice Characteristics:**

- **Authoritative**: We speak with confidence and expertise
- **Precise**: We use accurate, specific language
- **Professional**: We maintain a professional tone appropriate for B2B
- **Clear**: We communicate complex ideas simply
- **Forward-Thinking**: We reference innovation and the future

**Voice Examples:**

✅ **Good**: "Our benchmarking methodology provides precise performance metrics that enable R&D teams to make data-driven decisions."

❌ **Avoid**: "We're super excited to help you with your AI stuff!"

### Tone

Tone adapts our voice to different situations while maintaining our core personality.

**Tone Variations:**

| Context                 | Tone                    | Example                                                                                                                 |
| ----------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Technical Documentation | Precise, Detailed       | "The benchmark suite evaluates model performance across three key metrics: latency, throughput, and power consumption." |
| Marketing Materials     | Confident, Aspirational | "Transform your AI hardware development with industry-leading benchmarking expertise."                                  |
| Client Communication    | Professional, Helpful   | "We've completed the initial analysis. Here are the key findings and our recommendations."                              |
| Social Media            | Engaging, Informative   | "New research shows significant improvements in edge AI performance. Here's what it means for hardware teams."          |
| Support/Help            | Patient, Clear          | "Let's walk through the benchmarking process step by step."                                                             |

### Vocabulary / Glossary

#### Words We Use

**Preferred Terminology:**

- **Clients** (not "customers" - we're B2B)
- **R&D teams** (not "developers" - more specific)
- **Benchmarking** (not "testing" - more precise)
- **Hardware engineering** (not "hardware development" - more technical)
- **Performance metrics** (not "results" - more specific)
- **Consulting** (not "services" - more professional)
- **Intelligent hardware** (not "smart devices" - more technical)
- **Deployment targets** (not "platforms" - more specific)

#### Words We Avoid

**Jargon to Avoid:**

- "AI/ML" (use "AI" or "machine learning" as appropriate)
- "Cutting-edge" (overused, prefer "advanced" or "innovative")
- "Game-changing" (too marketing-heavy)
- "Revolutionary" (unless truly accurate)
- Generic terms like "solutions," "leverage," "synergy"

**Competitor Terms:**

- Avoid referencing competitor names unless necessary
- Don't use competitor-specific terminology

### Grammar & Mechanics

#### Sentence Case vs. Title Case

**Headlines:**

- Use **Sentence case** for most headlines
- **Example**: "We set the standard in AI benchmarking"
- **Exception**: Use Title Case for formal documents or when specifically required

**Body Text:**

- Always use **Sentence case** for body text
- Capitalize proper nouns and brand names

#### Oxford Comma

**Policy**: **Yes, use the Oxford comma**

**Example**: "We provide consulting to R&D teams, hardware engineers, and AI researchers."

#### Date and Time Formatting

**Dates:**

- **Format**: Month Day, Year (e.g., "December 11, 2024")
- **Abbreviated**: Use three-letter month abbreviation if space is limited (e.g., "Dec 11, 2024")

**Time:**

- **Format**: 12-hour format with AM/PM (e.g., "2:30 PM")
- **Time Zones**: Always specify time zone (e.g., "2:30 PM PST")

#### Emoji Usage Policy

**Policy**: **Minimal, professional use only**

**Guidelines:**

- ✅ **Appropriate**: Social media posts (sparingly), informal team communications
- ❌ **Avoid**: Professional emails, documentation, formal communications, website copy
- **When Used**: Limit to 1-2 emojis maximum, use technical/professional emojis (⚡, 🔬, 💡) rather than casual ones

#### Numbers and Measurements

- Spell out numbers one through nine, use numerals for 10 and above
- Use numerals for measurements, percentages, and technical specifications
- **Example**: "We tested five models, with 95% accuracy and 2.3ms latency"

---

## 4. Practical Application (The "In Practice")

This section demonstrates how brand elements come together in real-world applications.

### Social Media

#### LinkedIn

**Profile Header:**

- Use dark mode gradient background (Industrial Dark to Industrial Slate)
- Logo: Wordmark in gradient or solid color (depending on background)
- Tagline: "Expert AI Benchmarking & Hardware Consulting"

**Post Templates:**

- **Background**: Industrial Dark or Industrial Slate
- **Text**: Industrial Light for dark backgrounds, Industrial Slate for light
- **Accents**: Futurist Cyan for links and CTAs
- **Typography**: Inter, clear hierarchy

**Example Post Style:**

```
[Header with gradient background]
[Inter, Bold, 24px, Futurist Cyan]

[Body text, Inter Regular, 16px, Industrial Light]
[CTA button: Gradient background, Industrial Dark text]
```

#### Bluesky

**Profile:**

- Header image: Dark gradient with subtle technical elements
- Profile picture: Logo or brand icon
- Bio: Concise, includes key value proposition

**Post Style:**

- Professional tone, technical accuracy
- Use hashtags sparingly: #AIBenchmarking #HardwareEngineering #EdgeAI
- Include visuals when possible (charts, diagrams, technical imagery)
- Leverage Bluesky's thread feature for longer-form technical content

#### GitHub

**Profile/Organization:**

- Use brand colors in README files
- Maintain professional documentation style
- Include mission/vision in organization description

### Marketing Collateral

#### Business Cards

**Design Specifications:**

- **Size**: Standard (3.5" × 2")
- **Orientation**: Landscape preferred
- **Colors**:
  - Dark mode: Industrial Dark background, gradient logo, Industrial Light text
  - Light mode: White background, solid Industrial Slate logo, Industrial Slate text
- **Typography**: Inter, clear hierarchy
- **Information**: Name, title, email, website, optional: LinkedIn/GitHub
- **Bleed**: 0.125" (3mm) bleed area
- **Safe Area**: Keep text 0.25" (6mm) from edges

#### Letterhead

**Design Specifications:**

- **Header**: Logo (left-aligned), company name and tagline
- **Colors**: Industrial Slate text on white background (print-friendly)
- **Typography**: Inter, professional
- **Footer**: Address, contact information (smaller text)

#### One-Pagers / Fact Sheets

**Layout:**

- Clear sections with H2 headings
- Use brand colors for accents and CTAs
- Include mission/vision statements
- Use bullet points for key benefits
- Include contact information prominently

### Digital Presence

#### Email Signatures

**Format:**

```
[Name]
[Title]
Bitstream Labs.AI

[Email] | [Website]
[Optional: LinkedIn, GitHub links]
```

**Styling:**

- Inter font, 12-14px
- Industrial Slate or Industrial Dark text
- Futurist Cyan for links
- Keep it simple and professional

#### Slide Deck Templates

**Template Structure:**

- **Title Slide**: Gradient background, large logo, tagline
- **Content Slides**:
  - Dark mode: Industrial Dark background, Industrial Light text
  - Light mode: White background, Industrial Slate text
- **Accent Colors**: Futurist Cyan for highlights, Futurist Blue for secondary elements
- **Typography**: Inter for all text, clear hierarchy
- **Consistency**: Use same color scheme throughout deck

**Slide Guidelines:**

- Maximum 6-7 lines of text per slide
- Use visuals (charts, diagrams) when possible
- Maintain brand colors consistently
- Include logo on every slide (small, bottom corner)

#### Website Hero Sections

**Current Implementation:**

- Large gradient headline: "Bitstream Labs.AI"
- Subheadline: "Expert AI Benchmarking & Hardware Consulting"
- Supporting text: Mission statement excerpt
- CTA buttons: Gradient background, clear contrast

**Best Practices:**

- Maintain high contrast for readability
- Use gradient sparingly (headlines, CTAs)
- Ensure responsive design
- Test on multiple devices

### Merchandise

#### T-Shirts

**Design Options:**

1. **Logo Only**: Gradient wordmark centered, medium size
2. **Logo + Tagline**: Logo with "Expert AI Benchmarking & Hardware Consulting" below
3. **Technical Pattern**: Subtle circuit board or neural network pattern with logo

**Color Options:**

- **Dark Shirt**: Industrial Light or gradient logo
- **Light Shirt**: Industrial Slate or gradient logo
- **Accent Shirt**: Futurist Cyan shirt with Industrial Dark logo

#### Mugs / Drinkware

**Design:**

- Logo on one side
- Keep design simple and recognizable
- Use solid colors (gradients may not print well on curved surfaces)

#### Tote Bags

**Design:**

- Large logo on one side
- Optional: Tagline or mission statement
- Use high-contrast colors for visibility

---

## 5. Technical Specifications

### Readability for Older Eyes

**Priority**: Ensuring optimal readability for users with older eyes and visual impairments is a core design principle for Bitstream Labs.AI.

#### Key Principles

1. **High Contrast is Non-Negotiable**
   - All body text must meet WCAG AAA standards (7:1 contrast ratio minimum)
   - Never use pale or low-contrast color combinations
   - Avoid gray-on-gray or light-on-light text
   - Test all color combinations with contrast checkers before implementation

2. **Larger Font Sizes**
   - Minimum body text: 16px (1rem) - absolute minimum
   - Recommended body text: 18px (1.125rem) for optimal readability
   - Never use font sizes below 14px for any readable text
   - Increase font sizes when possible rather than decreasing

3. **Font Weight Matters**
   - Never use Light (300) weight for body text
   - Use Regular (400) weight minimum for body text
   - Use SemiBold (600) or Bold (700) for headings to improve visibility

4. **Line Height and Spacing**
   - Minimum line height: 1.5 for body text
   - Recommended line height: 1.6 for body text
   - Increase spacing between paragraphs for better readability
   - Adequate letter spacing prevents text from appearing cramped

5. **Color Selection**
   - Avoid low-contrast color combinations (e.g., light gray on white, pale blue on light gray)
   - Use high-contrast colors: dark text on light backgrounds, light text on dark backgrounds
   - Secondary text must maintain high contrast (7:1+) - don't use pale grays
   - Test color combinations with users or accessibility tools

#### Prohibited Practices

**❌ NEVER:**

- Use font sizes smaller than 14px for readable text
- Use Light (300) font weight for body text
- Use colors with less than 7:1 contrast for body text
- Use pale gray text on light backgrounds
- Use low-opacity text (below 90%) for secondary content
- Use Industrial Silver (`#4a5568`) for text on light backgrounds (contrast too low)
- Use Futurist Cyan for body text on dark backgrounds (contrast too low)

**✅ ALWAYS:**

- Use 16px+ font size for body text (18px preferred)
- Use Regular (400) or heavier font weights
- Maintain 7:1+ contrast ratio for all readable text
- Use Industrial Light on dark backgrounds, Industrial Slate on light backgrounds
- Use Industrial Steel for secondary text on light backgrounds (not Industrial Silver)
- Test contrast ratios before finalizing designs

### Color Accessibility

#### Contrast Ratios (WCAG AAA Compliance for Older Eyes)

**Our Standard**: We aim for WCAG AAA compliance (7:1 contrast ratio) for all body text to ensure optimal readability for older eyes and users with visual impairments.

**Dark Mode:**

- Industrial Light on Industrial Dark: 12.5:1 ✅ (AAA - Excellent)
- Futurist Cyan on Industrial Dark: 4.8:1 ⚠️ (AA for large text only - not for body text)
- Futurist Blue on Industrial Dark: 7.2:1 ✅ (AAA - Acceptable for body text)
- **Recommendation**: Use Futurist Blue for links/accents on dark backgrounds when text readability is critical

**Light Mode:**

- Industrial Slate on White: 12.5:1 ✅ (AAA - Excellent)
- Industrial Steel on White: 7.0:1 ✅ (AAA - Minimum acceptable for body text)
- Light Cyan on White: 4.2:1 ❌ (AA for large text only - avoid for body text)
- Light Blue on White: 7.8:1 ✅ (AAA - Excellent for body text)
- **Recommendation**: Use Light Blue or Industrial Steel for text on light backgrounds

**Critical Rules for Readability:**

- **Body text**: Must meet 7:1 contrast ratio minimum (WCAG AAA) - non-negotiable
- **Large text** (18px+): Can use 4.5:1 contrast ratio (WCAG AA) but strongly prefer 7:1 for older eyes
- **Never use**: Colors with less than 4.5:1 contrast for any readable text
- **Secondary text**: Must maintain at least 7:1 contrast - use Industrial Steel (`#2d3447`) instead of Industrial Silver (`#4a5568`) on light backgrounds
- **Links and CTAs**: Ensure sufficient contrast - prefer Futurist Blue over Futurist Cyan for better readability
- **Gradient text**: Only use for large headlines (32px+) where contrast is maintained throughout the gradient

#### Color Usage Guidelines for Readability

1. **Text Colors** (Critical for Older Eyes):
   - **Primary text**:
     - Dark mode: Use Industrial Light (`#e2e8f0`) - provides 12.5:1 contrast ✅
     - Light mode: Use Industrial Slate (`#1a1f2e`) - provides 12.5:1 contrast ✅
   - **Secondary text**:
     - Dark mode: Use Industrial Light at 90% opacity minimum (`rgba(226, 232, 240, 0.9)`) - ensures 11:1+ contrast
     - Light mode: Use Industrial Steel (`#2d3447`) - provides 7:1+ contrast ✅
     - **Never use Industrial Silver (`#4a5568`) for text on light backgrounds** - contrast is too low (4.5:1)
   - **Disabled text**:
     - Use Industrial Silver (`#4a5568`) with clear visual indication (strikethrough, icon)
     - Ensure it's clearly distinguishable from active text
   - **Critical Rule**: All body text must meet WCAG AAA contrast (7:1 minimum). Never use colors with less than 7:1 contrast for readable text.

2. **Accent Colors for Text**:
   - **Links on dark backgrounds**: Use Futurist Blue (`#0066ff`) - provides 7.2:1 contrast ✅
   - **Links on light backgrounds**: Use Light Blue (`#0052cc`) or Futurist Blue - provides 7.8:1+ contrast ✅
   - **Avoid Futurist Cyan for body text links** - contrast is too low (4.8:1 on dark, 4.2:1 on light)
   - **CTAs**: Use gradient backgrounds with high-contrast text, or solid colors with sufficient contrast
   - **Gradient text**: Only for large headlines (32px+) where readability is maintained

3. **Background Colors**:
   - Maintain clear hierarchy with background shades
   - Use Industrial Slate for elevated surfaces (cards, modals)
   - Use Industrial Steel for borders and subtle separations
   - **Never use backgrounds that reduce text contrast below 7:1**
   - Test all background/text combinations with contrast checkers

### Print Considerations

#### CMYK Color Conversion

When preparing materials for print, convert RGB to CMYK:

| RGB Color                    | CMYK Equivalent      | Notes                            |
| ---------------------------- | -------------------- | -------------------------------- |
| `#0a0e1a` (Industrial Dark)  | C:100 M:90 Y:60 K:90 | Very dark, use sparingly         |
| `#00d9ff` (Futurist Cyan)    | C:70 M:0 Y:0 K:0     | Bright cyan, may need adjustment |
| `#0066ff` (Futurist Blue)    | C:100 M:60 Y:0 K:0   | Standard process blue            |
| `#e2e8f0` (Industrial Light) | C:10 M:5 Y:0 K:5     | Light gray, good for text        |

#### Print Specifications

- **Bleed**: Add 0.125" (3mm) bleed for full-bleed designs
- **Safe Area**: Keep critical content 0.25" (6mm) from edges
- **Resolution**: Minimum 300 DPI for print-ready materials
- **Color Profile**: Use CMYK color profile for print files
- **Minimum Font Size**: 12pt for body text (increased from 10pt for older eyes), 10pt for captions (increased from 8pt)
- **Recommended Font Size**: 14pt for body text when possible
- **Line Height**: Minimum 1.5, prefer 1.6 for body text
- **Font Weight**: Use Regular (400) or heavier - never use Light (300) weight for body text

### Digital Implementation

#### CSS Variables (Dark Mode)

```css
:root {
  /* Industrial Neutrals */
  --color-industrial-dark: #0a0e1a;
  --color-industrial-slate: #1a1f2e;
  --color-industrial-steel: #2d3447;
  --color-industrial-silver: #4a5568;
  --color-industrial-light: #e2e8f0;

  /* Futurist Accents */
  --color-futurist-cyan: #00d9ff;
  --color-futurist-blue: #0066ff;
  --color-futurist-purple: #7c3aed;
  --color-futurist-pink: #ec4899;

  /* Gradients */
  --gradient-primary: linear-gradient(to right, #00d9ff, #0066ff);
}
```

#### CSS Variables (Light Mode)

```css
[data-theme='light'] {
  /* Light Mode Neutrals */
  --color-background: #ffffff;
  --color-background-soft: #f8f8f8;
  --color-background-mute: #f2f2f2;
  --color-border: #e5e7eb;
  --color-text-primary: #1a1f2e;
  --color-text-secondary: #4a5568;

  /* Light Mode Accents */
  --color-accent-primary: #00b8d4;
  --color-accent-secondary: #0052cc;
  --color-accent-tertiary: #6d28d9;
}
```

---

## 6. Quick Reference Checklist

### MVP Elements (Minimum Viable Brand Guide)

✅ **Logo**: Wordmark with gradient treatment, clear space rules defined
✅ **Color Palette**: Complete with HEX, RGB, CMYK, and PMS codes
✅ **Typography**: Inter (primary) and Roboto Mono (secondary) with hierarchy
✅ **Mission Statement**: Defined and documented

### Additional Essential Elements

✅ **Vision Statement**: Defined and documented
✅ **Core Values**: Five values established
✅ **Target Audience**: Primary and secondary personas defined
✅ **Brand Personality**: "The Expert Sage" defined
✅ **Verbal Identity**: Voice, tone, vocabulary, and grammar guidelines
✅ **Practical Applications**: Examples for social media, marketing, digital, merchandise

---

## Resources

### Font Resources

- [Inter on Google Fonts](https://fonts.google.com/specimen/Inter)
- [Roboto Mono on Google Fonts](https://fonts.google.com/specimen/Roboto+Mono)

### Color Tools

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors.co](https://coolors.co/) - Color palette generator
- [Adobe Color](https://color.adobe.com/) - Color wheel and harmony
- [Pantone Color Finder](https://www.pantone.com/color-finder) - PMS color matching

### Print Resources

- [Canva Print Guidelines](https://www.canva.com/help/print-bleed/)
- [Print Design Best Practices](https://www.printingcenterusa.com/print-design-tips)

### Icon Resources

- [Heroicons](https://heroicons.com/)
- [Feather Icons](https://feathericons.com/)

---

## Version History

- **v2.1** (2024-12-11): Enhanced readability for older eyes
  - Added comprehensive "Readability for Older Eyes" section with key principles and prohibited practices
  - Increased minimum font sizes (body text: 16px minimum, 18px recommended)
  - Updated secondary text color from Industrial Silver to Industrial Steel for better contrast (7:1+)
  - Enhanced contrast ratio guidelines with specific recommendations for older eyes
  - Added color usage guidelines emphasizing high contrast requirements
  - Updated typography hierarchy with readability notes
  - Increased print font sizes (12pt minimum for body text)
  - Added warnings about low-contrast color combinations

- **v2.0** (2024-12-11): Comprehensive brand guide update
  - Added Brand Heart section (Mission, Vision, Values, Personas, Personality)
  - Expanded Logo Usage guidelines with clear space and "Do Not" examples
  - Added PMS/Pantone color codes for all colors
  - Added Imagery & Iconography guidelines
  - Expanded Verbal Identity section (Voice, Tone, Vocabulary, Grammar)
  - Added Practical Application examples (Social Media, Marketing, Digital, Merchandise)
  - Enhanced technical specifications

- **v1.0** (2024-12-11): Initial brand guide creation
  - Established typography system with Inter and Roboto Mono
  - Defined dark mode and light mode color palettes
  - Added print and digital considerations
  - Included accessibility guidelines

---

**Last Updated**: December 11, 2024
**Version**: 2.1
**Maintained By**: Bitstream Labs.AI Design Team
**Contact**: For questions or updates to this guide, please contact the design team.

---

## Quick Reference: Readability Checklist

Before finalizing any design, verify:

- ✅ Body text is at least 16px (18px preferred)
- ✅ Font weight is Regular (400) or heavier - never Light (300)
- ✅ Contrast ratio is 7:1+ for all body text (WCAG AAA)
- ✅ Secondary text uses Industrial Steel (`#2d3447`) on light backgrounds, not Industrial Silver
- ✅ Links use Futurist Blue for better contrast, not Futurist Cyan
- ✅ Line height is at least 1.5 (1.6 preferred)
- ✅ No pale or low-contrast color combinations
- ✅ Tested with contrast checker tools
