Foundation — Global Design System (Must Implement First)
Before touching Home layout, we standardize the system.
If this layer is not clean, everything else becomes inconsistent.

1️⃣ Create Design Tokens (Centralized)
In your globals.css or theme file, define:
🎨 Color System
:root {
  --primary-50: #f0fdfa;
  --primary-500: #14b8a6;
  --primary-600: #0f766e;

  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --text-muted: #6b7280;

  --bg-page: #f5f7f6;
  --bg-section: #ffffff;
  --bg-section-muted: #f0f3f2;

  --border-muted: #e5e7eb;
}

⚠️ Remove all scattered hardcoded hex colors in components.
Everything must reference tokens.

2️⃣ Shadow System (3 Levels Only)
Add utility classes or Tailwind config:
Surface: 0 1px 2px rgba(0,0,0,0.04)
Hover:   0 4px 12px rgba(0,0,0,0.06)
Modal:   0 10px 30px rgba(0,0,0,0.08)

No other shadow sizes allowed.

3️⃣ Transition Standardization
Add one transition rule used everywhere:
transition: all 220ms cubic-bezier(0.4, 0, 0.2, 1);

No fast animations.
No bounce curves.

4️⃣ Border & Hover Activation Language
For every interactive card:
Base
border: 1px solid var(--border-muted);
box-shadow: surface;

Hover
border-color: var(--primary-500);
transform: translateY(-2px);
box-shadow: hover;

Optional premium refinement:
Use ::before and ::after for 2px corner accents (top-left + bottom-right only).
❌ No glow
❌ No animated border drawing
❌ No neon color

5️⃣ Background Section Rhythm (Critical)
Home page must alternate between:
Muted
White
Muted
White
Muted
Footer

Never random.
This creates:
Depth
Section clarity
Professional structure

6️⃣ Heading System Standardization
All section headings:
Left aligned
Same font
Same weight
Same size
Same spacing above and below
Remove:
Centered headings
Random badge labels above headings
Decorative separators
Every section must follow:
<h2>Section Title</h2>
<p>Short strategic subtext</p>

No variation.

7️⃣ Remove Color Noise
Delete:
Purple backend pill
Orange DB pill
Pink DevOps pill
Multi-colored category headers
Replace with:
Neutral surfaces + teal accent only on hover.

After Response 1 Implementation
You will have:
Clean tokenized system
Controlled shadow scale
Consistent hover language
Section rhythm framework
Unified heading structure
This is the skeleton.

Good.
Now we refine the most important section.


Hero Section — Architect-Level Refinement
This section defines your positioning in 3 seconds.
We design it with restraint.

1️⃣ Layout Structure
Two-column layout (desktop)
| Left Column (40%)  | Right Column (60%) |

Left
Image / profile card
Right
Name
Title
Short positioning statement
Primary + Secondary CTA

Mobile
Stack vertically:
Image
Name
Title
Statement
Buttons
No complicated rearrangements.

2️⃣ Height Rule
Hero must:
min-height: 100vh;
display: flex;
align-items: center;

It should fit in one screen.
User must understand:
Who you are + What you build
Without scrolling.

3️⃣ Background Strategy (No Dots)
We pick:
Soft radial teal glow
background: radial-gradient(
  circle at 80% 20%,
  rgba(20, 184, 166, 0.05),
  transparent 40%
);

Opacity max 5%.
If user consciously sees green → reduce opacity.
❌ No dotted backgrounds
❌ No animated background
❌ No heavy gradient layers
Glow adds depth without noise.

4️⃣ Name Typography
Use clamp() to prevent overflow:
font-size: clamp(2.5rem, 5vw, 4rem);

Rules:
Name must fit in viewport
Must not push content below fold
Must not wrap awkwardly
Weight: 700 or 800
Color: var(--text-primary)

5️⃣ Title Line (“Full Stack Developer”)
You suggested blinking cursor.
Here’s the rule:
Option A (Safer)
Static text:
Full Stack Engineer & AI-Native SaaS Builder
Clean. Senior.
Option B (Allowed with control)
Add subtle blinking cursor:
Slow blink (1s or slower)
No typing animation
No rotating phrases
If blinking feels distracting — remove it.
No motion is often stronger than motion.

6️⃣ Positioning Statement (Critical)
This line must sound strategic, not generic.
Avoid:
❌ “Passionate developer”
❌ “Building scalable apps”
Use:
I design multi-tenant SaaS systems with AI integration, production-grade APIs, and scalable backend architecture.
Short.
Clear.
Architect tone.
Max 2 lines.

7️⃣ Button System (Unified Across Site)
Primary Button (Filled)
Background: --primary-500
Hover: darker --primary-600
Slight lift: translateY(-2px)
Shadow: L2
Label:
“Watch Intro” or “View Work”

Secondary Button (Outline)
1px border --border-muted
Text: --text-primary
Hover:
border-color: --primary-500
background: subtle 3% teal tint
lift: -2px
All hollow buttons must follow this exact pattern across site.

8️⃣ Image Card Behavior
Image must be wrapped in a card container.
Base:
Border: muted
Shadow: L1
Radius: same as all cards
Hover:
translateY(-2px)
border-color teal
shadow L2
Do NOT:
Wrap image with teal glow
Add color filter overlay
Animate border drawing
Optional:
Slight scale(1.02) on image only.
Slow.

9️⃣ Spacing & Breathing Room
Add gap between navbar and hero:
padding-top: navbarHeight + 24px

Hero content spacing:
Name → 12px → Title
Title → 16px → Statement
Statement → 24px → Buttons
Buttons gap → 16px
No random spacing.

10️⃣ Micro Interaction Rules
Allowed:
Fade-in on load
Slight card lift
Button lift
Not allowed:
Parallax
Bounce
Fast scale
Overshoot animation

After this implementation:
Hero will feel:
Structured
Premium
Calm
Serious
Intentional

Good. Now we move from identity to capability.

🧱 RESPONSE 3 / 6
Skills Section — Structured, Modular, Architect-Level
This section must communicate depth, not decoration.
Right now your risk is visual noise (multiple colors, pill chaos, decorative styling).
We remove that and build hierarchy.

1️⃣ Section Layout Structure
Standard section wrapper:
<section class="bg-section">
  <div class="container">
    <h2>Skills & Technologies</h2>
    <p>Short strategic capability summary</p>

    <div class="skills-grid">
      Skill Group 1
      Skill Group 2
      Skill Group 3
      Skill Group 4
    </div>
  </div>
</section>

Keep heading left-aligned.
Spacing:
Section padding: py-24
Heading bottom margin: mb-12

2️⃣ Remove Multi-Color Category Pills
Delete:
Purple backend
Orange database
Pink DevOps
Rainbow differentiation
Replace with:
Neutral group headers.

3️⃣ Skill Group Structure
Each group:
<div class="skill-group">
  <div class="group-header">
    <Icon />
    <h3>Backend Development</h3>
  </div>

  <div class="skill-chips">
    [ NestJS ] [ Node.js ] [ Express ] [ REST APIs ]
  </div>
</div>


4️⃣ Group Header Styling
Icon (lucide-react recommended)
Icon color: --primary-500
Text: --text-primary
Font-weight: 600
Subtle divider line under header:
border-bottom: 1px solid var(--border-muted);
padding-bottom: 8px;
margin-bottom: 16px;

No colored backgrounds.

5️⃣ Skill Chips Design
Base:
Background: white
Border: 1px solid --border-muted
Padding: 6px 12px
Radius: same as system
Font-size: 0.875rem
Hover:
Border-color: --primary-500
Slight lift: translateY(-1px)
Very subtle teal tint (3% max)
No solid teal pills.
No filled accent backgrounds.
Chips should feel modular, not flashy.

6️⃣ Grid System
Desktop:
2 columns (or 3 max)
Tablet:
2 columns
Mobile:
1 column
Avoid 4-column dense layouts.
We want breathing room.

7️⃣ Section Background Rhythm
If Hero was muted,
Skills should be white.
If Hero was white,
Skills should be muted.
Alternate rhythm must follow whole homepage pattern.

8️⃣ Make It Prominent (Without Color)
You said you want it more prominent.
Do it using:
Larger section padding
Slightly larger heading size than cards
Clear structural grouping
Strong subtext
Not color.
Prominence comes from spacing and hierarchy.

9️⃣ Copy Style for Skills Section
Avoid generic line like:
“Here are the technologies I use.”
Use:
I design and implement production-ready systems across frontend, backend, infrastructure, and AI layers.
This reinforces architect positioning.

10️⃣ Micro-Interaction Discipline
Allowed:
Subtle fade-in on scroll
Chip border activation on hover
Not allowed:
Group expansion animations
Background shimmer
Hover glow
Animated icon movement

After this implementation:
Skills will feel:
Structured
System-driven
Calm
Intentional
Enterprise-ready

Perfect.
Now we move to your proof layer.


Featured Work — Premium Case Study Architecture
This section decides whether you look like:
• A portfolio hobbyist
or
• A systems engineer building production software
We design this carefully.

1️⃣ Section Layout
Structure:
<section class="bg-section-muted">
  <div class="container">
    <div class="section-header">
      <h2>Featured Work</h2>
      <OutlineButton>View All Projects</OutlineButton>
    </div>

    <div class="projects-grid">
      Project Card
      Project Card
    </div>
  </div>
</section>

Heading left.
Button aligned right on desktop.
Stacked on mobile.
Spacing:
py-24
mb-12 below header

2️⃣ Grid System
Desktop:
2-column layout
Large vertical spacing between rows
Tablet:
1 column
No 3-column dense layout.
Case studies need breathing room.

3️⃣ Card Architecture
Each card is a clickable container.
<Card>
  <ImageArea>
    OverlayIconButtons
  </ImageArea>

  <CardBody>
    Title
    Strategic Description
    Tech Tags
    CTA
  </CardBody>
</Card>

Entire card clickable → navigates to internal detail page.
Icon buttons → external links (stopPropagation).

4️⃣ Card Base Styling
Base state:
Background: white
Border: 1px solid --border-muted
Radius: consistent with system
Shadow: L1
Overflow: hidden
Hover state:
translateY(-2px)
border-color: --primary-500
shadow: L2
transition: standard curve
NO:
❌ Glow
❌ Thick border
❌ Neon color
Optional:
Image slight scale(1.02) on hover (slow, subtle).

5️⃣ Image Area
Use real screenshots where possible.
Rules:
Consistent aspect ratio (16:9 recommended)
No inconsistent height
No stretched meta images
No random metadata preview crops
If company project:
Use product UI screenshot
Not social preview image
Not generic stock
Image container should not get teal border effect separately.
The card handles hover.

6️⃣ Overlay Icon Buttons (Top Right)
Inside image area:
Small circular outline buttons:
Border: --border-muted
Background: white with 90% opacity
Icon color: --text-primary
Hover:
Border-color: --primary-500
Very subtle tint
Slight scale 1.05
Keep size small.
Secondary action only.

7️⃣ Title & Description Strategy
Title:
Strong
Clear
No fluff
Example:
❌ “E-Commerce Platform”
✅ “Multi-Tenant E-Commerce Platform with Inventory Consistency & Payment Orchestration”
Description:
1–2 lines.
Problem + architectural layer.
Example:
Designed a modular monolith with idempotent payment APIs, Redis-backed caching, and async job processing for high-traffic operations.
This signals seniority instantly.

8️⃣ Tech Tags
Neutral styling only:
Border: muted
Small font
No colored category tags
Hover may activate subtle teal border.
No rainbow tags.

9️⃣ CTA Language
Replace:
“View Details”
With:
“View Case Study →”
It signals depth.

10️⃣ Section Differentiation
If Skills was white,
Featured Work should be muted.
Alternate rhythm maintained.

After this implementation:
Projects will feel:
• Real
• Structured
• Product-grade
• Confident
Not decorative.

Good. Now we move from proof → thinking.
This section must feel intelligent, not bloggy.


Articles Section — Thought Leadership Layer
The goal here is:
“This engineer doesn’t just build systems. He thinks in systems.”
We keep structural consistency with Projects, but slightly lighter visual weight.

1️⃣ Section Structure
<section class="bg-section">
  <div class="container">
    <div class="section-header">
      <h2>Latest Articles</h2>
      <OutlineButton>Read All Articles</OutlineButton>
    </div>

    <div class="articles-grid">
      ArticleCard
      ArticleCard
      ArticleCard
    </div>
  </div>
</section>

Heading left.
Button right (desktop).
Stacked on mobile.
Spacing:
py-24
mb-12 below heading block
Maintain rhythm from previous sections.

2️⃣ Grid System
Desktop:
3 columns (lighter density than projects)
Tablet:
2 columns
Mobile:
1 column
Articles can be slightly denser than Projects because they’re lighter content.

3️⃣ Card System (Reuse Architecture)
Article cards must use the same:
Border radius
Shadow scale
Hover lift
Border activation
Transition curve
System consistency is non-negotiable.

4️⃣ Article Card Structure
<Card>
  <ImageArea />
  <CardBody>
    Category + ReadingTime
    Title
    Insight Summary
    Tags (optional)
    CTA
  </CardBody>
</Card>


5️⃣ Visual Weight Difference vs Projects
Projects = stronger visual presence
Articles = lighter intellectual layer
To achieve that:
Projects:
Slightly heavier shadow
Larger title
Articles:
Slightly lighter shadow
Slightly smaller title
More whitespace inside card
Subtle differences only.

6️⃣ Image Rules
If using blog cover images:
Keep same aspect ratio across all
Avoid loud color dominance
Avoid heavy overlays
Optional:
Very subtle bottom gradient overlay for readability.
Do not:
❌ Use thick borders around images
❌ Add colored category ribbons

7️⃣ Category & Metadata Styling
Top of card:
SYSTEM DESIGN · 8 min read

Style:
Uppercase
Letter spacing 0.05em
Muted color (--text-muted)
Small font size
Do not:
Color category in bright teal
Use filled badge styles
Keep it editorial.

8️⃣ Title Styling
Font-weight: 600
Color: --text-primary
Line-height: tight but readable
On hover:
Slight color shift to --primary-600
No underline animation
No sliding effect

9️⃣ Summary Copy
1–2 lines max.
Example:
A breakdown of timeout strategies, retries, and backoff patterns in distributed API systems.
Avoid generic intros.
This is not Medium.
This is architect content.

10️⃣ CTA Style
Replace:
“Read More”
With:
“Read Article →”
Maintain button/text style consistent with projects.
No dramatic CTA styling.

11️⃣ Section Background Rhythm
If Featured Work was muted,
Articles must be white.
Keep alternation pattern.

After this:
Articles will feel:
• Structured
• Intelligent
• Professional
• Not blog-template

Good. Now we finish the Home page properly.
This is the trust + closure layer.
If done wrong, everything above feels weaker.

Kind Words + Footer — Trust & Anchored Closure

🟢 PART 1 — Kind Words (Testimonials)
Goal:
Not flashy.
Not salesy.
Not animated chaos.
It must feel calm, credible, stable.

1️⃣ Section Structure
<section class="bg-section-muted">
  <div class="container">
    <h2>Kind Words</h2>
    <p>Short trust-building line</p>

    <div class="testimonial-grid">
      TestimonialCard
      TestimonialCard
      TestimonialCard
    </div>
  </div>
</section>

Left aligned heading.
Same heading system as previous sections.
No badge above heading.
Spacing:
py-24
mb-12

2️⃣ Background Tone
Use:
--bg-section-muted
Not:
❌ Gradient background
❌ Patterned background
❌ Color-heavy panel
This section must feel slightly different, but calm.

3️⃣ Testimonial Card Design
Base:
White background
1px muted border
L1 shadow
Same radius as other cards
Generous padding (24px)
Structure:
“Quote text here”

Author Name
Role
Company


4️⃣ Visual Refinement (Optional Premium Touch)
Add:
Large quote mark icon as background element:
Absolute positioned
Opacity 3–4%
Large size
Behind text
Very subtle.
No animated quote icons.

5️⃣ Hover Behavior
Same system:
translateY(-2px)
border-color teal
L2 shadow
No glow.
No color shift.
No animated slide.

6️⃣ Carousel vs Grid
If fewer than 4 testimonials → grid.
If more → simple horizontal scroll or calm auto-slide (slow).
Avoid:
❌ Aggressive autoplay
❌ Dots bouncing
❌ Sliding transitions
Trust should feel stable.

🟢 PART 2 — Footer (Anchored, Grounded)
This is your closing statement.
It must feel stable and confident.

1️⃣ Footer Background
Use slightly darker than page:
Example:
background: #e8eceb;

Not dark charcoal.
Not black.
Not gradient.
It should anchor, not dominate.

2️⃣ Footer Structure
Name
Short positioning statement

Quick Links
Projects
Blog
Experience
Contact

Social Links

Copyright

Layout:
Desktop:
3 or 4 columns
Mobile:
Stacked

3️⃣ Typography Tone
Name:
Strong
Same heading font family
Statement:
1 line
Architect positioning
Example:
Designing scalable SaaS systems with AI integration and production-grade backend architecture.
Not:
❌ “Thanks for visiting”
❌ “Built with love”
Keep tone serious.

4️⃣ Link Styling
Base:
Muted color
Hover:
Teal color
Slight underline
No glow

5️⃣ Final CTA (Optional)
You may include:
Small subtle CTA:
“Let’s Build Something Serious →”
But do not make it huge.
Footer is not hero.

🟢 PART 3 — Global Section Rhythm Recap
Home page final rhythm:
Hero → muted
Skills → white
Featured Work → muted
Articles → white
Kind Words → muted
Footer → slightly darker anchor
No random shifts.


