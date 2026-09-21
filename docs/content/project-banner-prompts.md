# Project Banner Image Prompts

Paste one of these into ChatGPT (or any image model) to generate a banner/cover
image for the matching project card and case-study page. Save the result to
`public/images/projects/<slug>.jpg` (16:9, at least 1600×900, 1920×1080 if the
model supports it) and set the project's `image` field in `src/lib/data.ts` to
that path.

Each heading below already states the exact output file name in parentheses —
save the image ChatGPT generates for that prompt using that exact file name.

## Why these prompts changed

The old version used one template for all 13 — dark background, glowing nodes,
one accent color — and just swapped the color and the node count per project.
That reads as one AI image generator's default output repeated 13 times, not
as 13 different systems. Two fixes below:

1. **Each prompt now uses a different underlying visual idea**, picked to
   actually match what that project does, not a generic node-network.
2. **Every prompt ends with the same raw/texture line** — grain, uneven edges,
   slightly imperfect linework — because perfectly smooth vector gradients are
   the single biggest tell that an image is AI-generated. Real photography and
   real illustration both have some noise and asymmetry; ask for it on purpose.

Still true for all of them: no text, no logos, no UI screenshots, no people,
16:9 landscape composition, dark background so it reads well on a card next to
the other 12.

---

### ClearEdgeIQ (`clearedgeiq.jpg`) — most prominent, give this the most polish
A dark navy room shown from a slight angle, like looking into a bank vault
antechamber. Several separate frosted-glass compartments sit side by side,
each one closed off from the others by a physical partition, not just a
color difference — one compartment is lit teal, the rest sit in shadow. Thin
copper-colored wire runs along the floor connecting the compartments to a
single point in the back of the room. No people, no readable text, no UI.
Slight film grain, uneven low-key lighting, a little visual noise in the
shadows — not a clean vector render.

### OutreachIQ (`outreachiq.jpg`)
Three separate desks in a dim room, each with a small task lamp, arranged
left to right like a factory line — first desk has scattered papers, second
has a single open folder, third has a sealed envelope ready to go. A thin
beam of light travels from desk to desk. Muted indigo and warm lamp-yellow
only, otherwise dark. No people at the desks, no text on anything. Grainy,
slightly underexposed photo-like quality, not a glossy illustration.

### Dermava Health (`dermava-health.jpg`)
A calm, softly lit room with a single large pinboard covered in blank index
cards connected by red string, most of it in cool slate tones — except one
card off to the side, disconnected from the rest, glowing faintly warm
(coral), as if someone just added it and hasn't tied it in yet. No medical
symbols, no people, no text on the cards. Muted, slightly desaturated,
photographic grain, soft uneven shadow falloff.

### Themis (`themis.jpg`)
An old wooden filing cabinet room, dim amber desk-lamp light, drawers half
open with visible file-folder edges but no readable labels — arranged in
strict, even rows suggesting order and audit. One drawer near the center
sits slightly open with a faint gold glow inside. Institutional, quiet,
slightly formal. No text, no scale-of-justice icon (too literal/cliché),
no people. Slight grain, warm tungsten color cast, imperfect shadows.

### Goodzilla (`goodzilla.jpg`)
A cutaway view of seven small interconnected pipes/chutes on a dark
industrial background, like a simplified plumbing diagram, each pipe a
slightly different width to suggest different loads — one pipe (payout)
has a visible emerald-green liquid moving through it, brighter than the
rest which sit dry/dim. No text, no people, no hexagon/network-node cliché.
Slightly worn metal texture, mild grain, uneven ambient light.

### Peasy (`peasy.jpg`)
A single thin brass thread starting from one point, splitting into three
uneven branches that each end at a small ledger/tally-mark symbol (plain
tick marks, not readable numbers), then all three threads rejoin into one
knot near the bottom right. Warm amber and dusty rose only, dark background.
No text, no logos. Slight paper-like grain texture, imperfect hand-drawn
line quality rather than a perfectly smooth vector curve.

### Staffy (`staffy.jpg`)
Two simple wall-mounted schedule boards facing each other across a dim
room — one board has punch-card-like slots, the other has small tags — with
a few soft blue threads stretched between matching slots and tags, some
threads slightly slack, one taut and glowing to show a fresh match just
made. A faint grid texture in the background, calendar-like. No people, no
literal medical cross, no text. Grainy, slightly cool color temperature.

### DentalLoop (`dentalloop.jpg`)
Two simple standing lamps facing each other across a dark room, connected
by one solid beam of cyan light between them (direct line) and a second,
thinner beam that loops out and back in a wide arc before reaching the
other lamp (the signaling path, taking the long way round). No people, no
video-call iconography, no text. Soft cyan and warm white only. Slight lens
softness at the edges, mild grain, not a crisp digital render.

### FluidMe (`fluidme.jpg`)
An architect's drafting table seen from above, dark surface, with several
rectangular panel-shaped cutouts of different sizes laid out like a floor
plan, thin violet chalk-lines connecting each panel back to one small
central hub drawn slightly heavier than the rest. No text, no UI-looking
elements, no people. Grainy paper/drafting-table texture, uneven pencil-line
weight rather than perfectly uniform vector lines.

### OnlineDoc (`onlinedoc.jpg`)
A single small bell or chime shape suspended in a dark room, with three
faint concentric ripples radiating outward from it like sound waves,
each ripple fading unevenly rather than in a perfect circle. Muted blue
tones only. No people, no notification-bell UI icon (too literal), no
text. Soft grain, imperfect ripple edges, low-key lighting.

### Ancera (`ancera.jpg`)
A simple wooden grain-silo skyline at dusk, shown as flat dark silhouettes
against a warm amber sky, with a few thin upward-trending lines drawn over
the silhouettes like a hand-marked chart overlay. No literal poultry
imagery, no bar-chart-as-UI look, no text, no people. Slight haze, grainy
photographic dusk lighting, not a clean flat-design illustration.

### Titans (`titans.jpg`)
A dark room with a single wide searchlight beam sweeping across a floor
covered in scattered small glowing red embers (representing log events),
most sitting dim and unremarkable, a small cluster caught directly in the
beam glowing brighter white-red — as if something was just found. No text,
no logos, no magnifying-glass cliché icon. Grainy, high-contrast, slightly
smoky atmosphere.

### TalentForge (`talentforge.jpg`)
A plain wooden staircase shown in silhouette against a soft blue dawn-lit
wall, each step slightly worn and uneven (not a perfect geometric render),
with a single thin chalk line tracing up along the steps like a marked
path. No people, no text, no graduation-cap cliché icon. Soft grain, warm
morning light gradient, slightly rough silhouette edges.

---

**Status:** real banner images have been added for all 13 projects at
`public/images/projects/<slug>.png` and wired up via each project's `image`
field in `src/lib/data.ts`. These prompts remain as a reference for
regenerating or replacing any banner later.
