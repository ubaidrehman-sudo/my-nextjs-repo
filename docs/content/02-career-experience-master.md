# Career Experience Master — Company-by-Company

**Purpose:** This file tells your career story by company, in descending chronological order, showing natural seniority progression: Backend Engineering → Distributed Systems → System Architecture → Technical Leadership → AI + Cloud + Solution Architecture. It references (not duplicates) the project detail in `01-career-projects-master.md`.

**What's new in this version:** each company's responsibilities are now organized into the same seven categories (only the ones with real, supported content per company), your gap-analysis answers are folded in, and each company ends with a short **LINKEDIN NOTES** block. Your confirmed real throughline — *"failure-resilient, human-centric, easy-to-navigate systems, and knowing deliberately where to rely on AI and where not to"* — replaces the two themes this file guessed at earlier; see `07-voice-and-positioning-profile.md` for the fuller version of this in your own words.

---

# 4. VentureDive — May 2024–Present | Karachi, Pakistan

## Role / progression
**Lead Engineer & Solution Architect** (promoted from Senior Software Engineer), May 2024–Present — the one company where "Solution Architect" is an actually-held title. **Recognition:** Top Performer, VentureDive Communication Excellence Bootcamp (2025). **Soft credibility signal:** a real, existing LinkedIn recommendation specifically referencing your Themis-era work.

## Career stage
The lead-level evolution stage — architecture ownership, GenAI integration, cloud, regulatory-sensitive systems, mentoring, and confirmed pre-sales involvement all converge here.

## Strategic Leadership and Architecture
- Solo-designed the ports-and-adapters module-boundary convention, the PostgreSQL RLS tenant-isolation model, and the hybrid RAG retrieval pipeline for ClearEdgeIQ — including a genuinely forward-looking bet: binding Vendor Directory's cross-module ports to permissive stub adapters before Sourcing and Contracts existed, so the interface didn't need to be reopened once the real modules landed.
- Made an explicit cost-architecture decision on ClearEdgeIQ: chose AWS Bedrock over an OpenAI API gateway specifically to keep AI spend inside VentureDive's existing committed AWS usage rather than opening a second vendor bill, and assigned per-use-case Bedrock model IDs so cheaper models absorb high-volume jobs while a stronger model handles judgment-heavy work.
- Owned architectural reviews and technical decisions for Themis's compliance modules.
- Technical input during a **pre-sales conversation with ClearEdge Enterprises** directly shaped the CEIQ-ARCH-002 architecture direction before the SOW was even formalized — the client helped shape the decision, not just receive it afterward.
- Ran three separate client checkpoint demos on ClearEdgeIQ that grew delivered scope beyond the original SOW (vendor taxonomy, an AI trade-off-summary job, an interactive dashboard calendar) — each change was driven by live client feedback on working software, not internal assumption.
- Ran a dated documentation-hygiene pass re-verifying every ClearEdgeIQ module's spec-version citation against the specs' own headers, catching real drift (a stale citation on the Vendor Directory spec) before it compounded.
- No confirmed instance yet of another VentureDive team adopting a ClearEdgeIQ pattern (RLS-backstop, ports-and-adapters, ADR-log format) — an honest, open item, not claimed as organization-wide standardization.

## GenAI and Innovation Leadership
- Directed GenAI integration architecture (Next.js, Vercel AI SDK, OpenAI APIs) across OutreachIQ and Dermava Health, and built three independent Amazon Bedrock-backed AI subsystems for ClearEdgeIQ (Sourcing, Contracts, Chat) including a self-built hybrid pgvector RAG pipeline.
- On OutreachIQ, designed a three-agent LangChain-orchestrated architecture (Sender-Match, Context-Retriever, Composer) — choosing LangChain's mature agent/tool-calling abstractions over a hand-rolled orchestration layer to focus effort on business logic. `[drafted — unconfirmed rationale, see File 01's OutreachIQ entry; confirm before using]`
- On Dermava Health, validated GenAI feasibility hands-on — embedding ~50 sample content pages and running a test similarity search — before semantic search was ever scoped as a committed feature.
- Authored, end to end, an independent engineering audit and strategic technology recommendation for the Dermava Health/QualDerm engagement, comparing the production platform against a vendor-built AI prototype and recommending a phased "Partial Reuse and Selective Rebuild" architecture; presented the findings directly to the client's product lead and secured approval for a scoped Phase 1.
- Established typed, Zod-validated contracts between AI workflows and application logic, reused across both OutreachIQ and ClearEdgeIQ.
- On ClearEdgeIQ, made a deliberate "don't force reuse" call — keeping prompt templates per-module rather than centralized, since the three AI subsystems' prompt shapes differ enough that a shared template would add indirection without real benefit.

## Backend Architecture and Systems Design
- Built the 26-module ClearEdgeIQ backend (NestJS/TypeORM/PostgreSQL), including rights-based RBAC (13 rights, 3 seed-driven roles), race-safety patterns (`SELECT...FOR UPDATE`, idempotent-insert recovery via caught unique-constraint violations, a staleness-snapshot-and-recheck pattern for a long-running AI job), and a `SECURITY DEFINER`-based solution letting an unauthenticated vendor-portal endpoint resolve tenant-scoped data without ever granting the application RLS-bypass privileges.
- Architected async .NET 9 background-job infrastructure (retry logic, idempotent processing) for Themis's compliance reporting pipelines, backed by SQL Server stored procedures and Redis caching, plus Excel-to-JSON ingestion pipelines for operational data imports.

## Frontend Architecture and Performance
- Built schema-driven Angular Formly form systems for Themis, cutting per-form development time from roughly 3 days to under a day via metadata-driven configuration instead of hardcoded changes.
- Executed a client-directed Angular Elements microfrontend modernization strategy for Themis, delivering incremental migration off a legacy Bootstrap frontend without a feature freeze.
- Optimized heavy PrimeNG data-table rendering (lazy loading, virtual scrolling) for Themis's investigative dashboards.
- Built scalable React/Next.js 16/Tailwind frontends for two GenAI product MVPs (OutreachIQ, Dermava Health).

## Cloud Infrastructure and DevOps
- Designed Azure deployment architecture (Azure DevOps CI/CD, Application Insights telemetry) for Themis.
- Chose and configured an AWS-native stack for ClearEdgeIQ (Bedrock, Cognito, S3, Secrets Manager, ECR/ECS/CloudFront, GitHub Actions), keeping an entire client platform inside one AWS account/IAM boundary rather than adding third-party vendor relationships.

## Team Leadership and Cross-Functional Collaboration
- Mentored 2 mid-level engineers on the Themis team; one of them independently took over ownership of the Angular Formly form-configuration pattern within a few months.
- Translated an ambiguous SAR-reporting regulatory requirement into a shipped technical spec for Themis by walking through a real investigation case directly with compliance stakeholders.
- Led cross-functional technical discussions spanning backend, frontend, QA, and DevOps.
- Presented ClearEdgeIQ progress at recurring client checkpoints (see Strategic Leadership above) and the Dermava Health audit directly to the client's product lead, in both cases with a concrete outcome (scope growth; a Phase 1 approval), not just "presented and moved on."
- Recognized as Top Performer at VentureDive's Communication Excellence Bootcamp (2025); holds a LinkedIn recommendation specifically citing Themis-era work.

## Technical Excellence and Best Practices
- Applied OWASP Top-10-aligned security controls end to end on ClearEdgeIQ: default-deny RBAC, RLS as a database-level backstop, two independently-verified Cognito pools, AES-256-encrypted secrets, magic-byte upload verification, a domain-specific error-code catalog with no generic not-found code anywhere.
- Practiced active documentation hygiene rather than letting it drift: re-verified spec-version citations against source, and ran a dedicated cleanup pass removing internal tracking-artifact IDs (ticket references, spec section numbers) from source comments while preserving the underlying reasoning.
- Tracks its own honest gaps rather than rounding up: ClearEdgeIQ has zero end-to-end tests and no enforced coverage threshold despite a stated ≥90% target, and AI cost visibility is informal (manual console spot-checks, no dashboard) — both named explicitly as the project's own tracked priorities, not glossed over.

## Project references
- **ClearEdgeIQ** — the deepest, most recent, and most architecturally significant project of the whole career; File 1, entry 1.
- **Themis** — RegTech AML compliance platform; File 1, entry 4.
- **OutreachIQ** — agentic AI outbound platform; File 1, entry 2.
- **Dermava Health** — healthcare content platform plus your own engineering audit; File 1, entry 3.

## Two-page resume experience bullets
- Promoted from Senior Software Engineer to Lead Engineer & Solution Architect; engaged as Solution Architect on a client SOW to solo-design and deliver ClearEdgeIQ, a 26-module multi-tenant NestJS/PostgreSQL/AWS Bedrock contract-lifecycle platform, from kickoff to steady-state production in 12 weeks.
- Shaped a key architecture decision through a pre-sales conversation with the client, then ran three checkpoint-demo cycles that grew delivered scope beyond the original SOW.
- Directed GenAI integration architecture (Next.js, Vercel AI SDK, OpenAI APIs, LangChain) across two product lines and authored an independent engineering audit for a third, presenting findings directly to the client and securing a follow-on phase.
- Owned architectural reviews and technical decisions for a RegTech AML compliance platform, building schema-driven form systems that cut per-form development time from days to hours.
- Architected async .NET 9 background-job infrastructure and an AWS-native cloud footprint (Bedrock, Cognito, ECS, CloudFront) chosen specifically to consolidate cost and vendor risk.
- Mentored engineers to independent ownership of a pattern, led cross-functional technical discussions, and was recognized as Top Performer at VentureDive's Communication Excellence Bootcamp.

## One-page resume priority
- **Must Keep:** the promotion; ClearEdgeIQ's solo architecture ownership (RLS + hybrid RAG); the pre-sales-to-delivery thread on ClearEdgeIQ; the Dermava Health audit-to-Phase-1 outcome; mentoring.
- **Keep if relevant:** Themis-specific detail (schema-driven forms, the 3-day→under-a-day example); specific Azure vs. AWS service names.
- **Usually remove:** granular backend plumbing (Excel-to-JSON specifics, individual SQL Server stored-procedure detail).

## LinkedIn experience narrative
At VentureDive, the promotion from Senior Software Engineer to Lead Engineer & Solution Architect marks a real inflection point. You were trusted to solo-design the tenant-isolation and AI-retrieval architecture for a client's contract-lifecycle platform, and the client relationship itself started earlier than delivery — a pre-sales conversation shaped one of the platform's core architecture decisions before the SOW was even signed. In parallel, you directed GenAI integration across two other product lines and personally authored and presented an independent engineering audit that changed a client's technology roadmap. The throughline, in your own words: build systems that stay resilient when things fail, stay easy for actual humans to use and navigate, and use AI deliberately — where it earns its place, not everywhere it could technically go.

## LINKEDIN NOTES — VentureDive
- Narrative angle: promotion + solo architectural ownership + a pre-sales-to-delivery thread that directly supports your "presales" positioning goal, not just "solution architect."
- Cross-project theme: your own confirmed throughline — failure-resilient, human-centric, easy-to-navigate systems, deliberate about where AI belongs and where it doesn't.
- Soft credibility signal: existing LinkedIn recommendation citing Themis work (feature it); Communication Excellence Bootcamp Top Performer recognition.

## Interview narrative
This stage is where individual contribution turned into architectural ownership *and* client-facing ownership at the same time. ClearEdgeIQ is the clearest evidence on the technical side — solo-designed tenant isolation and RAG architecture, delivered on an SOW timeline. Less obvious but just as important: the client wasn't just receiving your work, they were part of shaping it, from a pre-sales conversation that changed a core architecture decision through three separate demo cycles that grew the scope. That combination — deep technical ownership plus a client who trusts you enough to shape direction with you — is the real story of the promotion, not just the title.

---

# 2. DevCrew.io — November 2020–June 2023 | Karachi, Pakistan

## Role / progression
**Full-Stack Engineer (Backend-Focused).** *(The source company-summary document also tagged this era "| Solution Architect" purely as a bullet-selection label for job-application purposes — not a claim of an actually-held title. This file uses the single, evidenced title.)*

## Career stage
Multi-domain growth: seven projects across HealthTech, commerce/payments, Creator Commerce, and AgriTech. Real architecture-level ownership starts appearing here (Goodzilla's microservices split, DentalLoop's protocol design), scoped to individual projects rather than cross-team strategy.

## Strategic Leadership and Architecture
- On Goodzilla, chose true microservices (7 independently deployable services) over a modular monolith specifically because webhook volume and divergent per-service scaling needs (Payout's bursty load vs. Notification's continuous load) justified real separation — not a default "microservices are better" assumption.
- On the same project, chose MongoDB for schema flexibility across rapidly-evolving per-service data models — a deliberately different choice from Peasy's PostgreSQL, made for the same database-per-service pattern but suited to faster-changing schemas.
- On Peasy, made a specific sync-vs-async boundary call: moved commission recalculation to an async BullMQ workflow so a potentially slow computation wouldn't block webhook acknowledgment back to Shopify/Stripe.
- On DentalLoop, designed the dual-protocol (WebSocket signaling / WebRTC media) real-time architecture and proactively built in reconnection handling as standard practice, not as a reactive fix.

## Backend Architecture and Systems Design
- Architected Goodzilla's 7-service microservices platform with Circuit Breaker and Saga patterns for third-party resilience and distributed-transaction correctness, and an idempotent Webhook Service with signature validation and deduplication.
- Built Peasy's idempotent, webhook-driven backend, and fixed a real duplicate-attribution problem from webhook replay by adding idempotency keys to the attribution-resolution path.
- On Titans-adjacent... *(see eBryx below — different company, not repeated here)*.

## Frontend Architecture and Performance
- Implemented a hybrid global/feature-based NgRx store architecture for Staffy, built specifically in response to real production bugs (stale scheduling state, duplicate API triggers) traced to async/reactive complexity.
- Architected a modular Angular frontend (feature/shared/core modules) for FluidMe, integrating GraphQL via Apollo Client with normalized caching that cut redundant requests an estimated 30–40%.
- Built reusable dashboard-widget and enterprise-form abstractions for Ancera, cutting repetitive frontend implementation effort an estimated 25–30%.
- Built defensive response-normalization patterns for OnlineDoc to stabilize integration against an inconsistent legacy PHP API.

## Cloud Infrastructure and DevOps
- Deployed Goodzilla's microservices on AWS ECS/Docker with EventBridge-scheduled workflows and centralized CloudWatch logging.
- Integrated AWS AppSync, Cognito, and Amplify-managed multi-environment deployment for FluidMe.

## Team Leadership and Cross-Functional Collaboration
- Collaborated directly with clients and product teams across all 7 projects, demonstrating adaptability across B2B SaaS (Goodzilla, Peasy, Ancera) and B2C marketplace (DentalLoop, Staffy) contexts.
- Typically became productive on a new project or domain within the first few weeks of joining it — a realistic, not overstated, estimate of ramp-up speed across 4 different domains.
- Participated in production issue resolution spanning attribution mismatches, webhook retries, payout inconsistencies, and queue backlogs; no single flagship incident has a confirmed, detailed story yet — if one comes to mind later, it's worth adding here.

## Technical Excellence and Best Practices
- Applied idempotency-first webhook design as a repeated engineering habit across two separate projects (Goodzilla, Peasy), not a one-off fix.
- Built Pino/Sentry/BullMQ-dashboard observability specifically for debugging retry-heavy async workflows (Peasy), and ELK Stack/CloudWatch observability for search-heavy operational monitoring (shared pattern with Titans at eBryx).

## Project references
Goodzilla, Peasy, Staffy, DentalLoop, FluidMe, OnlineDoc, Ancera — File 1, entries 5–11.

## Two-page resume experience bullets
- Architected a 7-service, event-driven microservices platform (NestJS, AWS ECS, Docker) for Shopify donation commerce, choosing true service separation over a modular monolith based on divergent per-service scaling needs.
- Built idempotent, webhook-driven backend systems (NestJS/PostgreSQL/BullMQ) for a creator-commerce platform, fixing a real duplicate-attribution bug via idempotency keys and moving slow recalculation off the synchronous webhook path.
- Designed a dual-protocol real-time architecture (WebSocket signaling, WebRTC media) for a dental telehealth platform, with reconnection handling built in proactively, and a modular Angular/GraphQL frontend (Apollo/AWS AppSync) for a marketplace operations platform.
- Implemented a hybrid global/feature-based NgRx state architecture for a healthcare workforce marketplace, built in direct response to real production bugs.
- Collaborated directly with clients and product teams across 7+ projects spanning HealthTech, commerce/payments, Creator Commerce, and AgriTech, typically ramping to productivity within a few weeks on a new project or domain.

## One-page resume priority
- **Must Keep:** Goodzilla's microservices architecture with its explicit scaling-driven rationale; Peasy's webhook/idempotency depth; the "7+ projects across 4 domains" breadth statement.
- **Keep if relevant:** DentalLoop's real-time architecture; FluidMe's GraphQL optimization; Staffy's NgRx architecture.
- **Usually remove:** OnlineDoc and Ancera as standalone bullets — fold into the general breadth statement.

## LinkedIn experience narrative
DevCrew.io is where the range shows up, and where the reasoning behind each architecture choice starts becoming explicit rather than assumed. Circuit Breaker and Saga for Goodzilla weren't a default pattern-matching exercise — they were chosen because a donation-to-payout workflow has to reconcile money correctly even when third-party calls fail. MongoDB for Goodzilla and PostgreSQL for Peasy, in the same era, for the same database-per-service pattern, was a deliberate difference based on how fast each project's schemas were actually changing. That habit of asking "what does this specific problem actually need" — not just "what pattern name applies here" — is what carried forward into the architecture-level work at VentureDive.

## LINKEDIN NOTES — DevCrew.io
- Narrative angle: breadth across 4 domains, with architecture instincts forming ahead of a formal title.
- Cross-project theme: matching the right architecture to the specific failure mode — Circuit Breaker/Saga for money movement, WebSocket/WebRTC separation for real-time media, idempotency for webhook-heavy systems.
- Soft credibility signal: none confirmed yet for this era specifically.

## Interview narrative
Frame this as breadth building toward architecture, one deliberate decision at a time. You weren't handed an "architect" title, but on at least three projects (Goodzilla, Peasy, DentalLoop) you made the actual architecture call yourself and can explain exactly why — not just what pattern you used, but what would have gone wrong with the more obvious alternative. That's a stronger interview answer than reciting the pattern names.

---

# 3. eBryx — August 2023–April 2024 | Karachi, Pakistan

## Role / progression
**Backend-Focused Full-Stack Engineer.**

## Career stage
Specialization: a deliberate move into deeper backend/infrastructure engineering. Confirmed single-project stage — Titans is the only documented eBryx project or client.

## Backend Architecture and Systems Design
- Chose Elasticsearch over direct SQL querying for Titans specifically because log volume made direct queries too slow to support near-real-time security investigation at the required scale.
- Built tenant-aware APIs and Elasticsearch aggregation endpoints, Kafka-driven near-real-time event processing, and ELK Stack observability infrastructure.

## Team Leadership and Cross-Functional Collaboration
- Worked directly with the CTO on platform implementation, backend debugging, and technical solution alignment — including proposing a selective Redis-caching approach (targeting only the heaviest aggregation queries) over a naive full-response cache, balancing performance against data freshness. *(This specific example was drafted to match the documented caching work on this project — worth a quick gut-check against your own memory before using it in an interview.)*

## Technical Excellence and Best Practices
- Contributed to RBAC-secured, tenant-isolated backend workflows using Keycloak and JWT authorization, deployed on Docker-containerized private VPS infrastructure for on-premise customer requirements.

## Project references
Titans — the only documented project from this stage; File 1, entry 12.

## Two-page resume experience bullets
- Built a B2B multi-tenant cybersecurity monitoring platform (NestJS, Kafka, Elasticsearch, Redis, Keycloak) deployed on private VPS infrastructure, choosing Elasticsearch over direct SQL specifically for near-real-time investigation at volume.
- Improved dashboard responsiveness and API efficiency an estimated 25–40% through a selective Redis-caching strategy and query optimization.
- Worked directly with the CTO on platform implementation and technical solution alignment.

## One-page resume priority
- **Must Keep:** the multi-tenant, on-premise/private-VPS platform detail; the Elasticsearch-over-SQL reasoning.
- **Keep if relevant:** the CTO collaboration story, if the target role values early stakeholder-facing signals.
- **Usually remove:** granular MySQL/relational-model detail.

## LinkedIn experience narrative
A short but pointed stage: after DevCrew.io, eBryx is where distributed systems and security-conscious backend engineering became the focus — chosen deliberately (Elasticsearch specifically because SQL couldn't keep up at the required log volume), not defaulted into.

## LINKEDIN NOTES — eBryx
- Narrative angle: specialization chapter, short but focused, where the "choose the right tool for the actual constraint" habit first shows up clearly (Elasticsearch for scale, not by default).
- Cross-project theme: N/A — single project.
- Soft credibility signal: direct CTO collaboration, useful for early stakeholder-facing evidence.

## Interview narrative
A good example to reach for if asked about working directly with senior technical stakeholders early in your career — the CTO collaboration was hands-on technical dialogue, not just attending meetings.

---

# 1. Nextbridge — January 2018–January 2019 | Karachi, Pakistan

## Role / progression
**Backend-Focused Full-Stack Engineer.**

## Career stage
Foundation: full-stack development, RESTful API design, and performance optimization. No AI, cloud-architecture, distributed-systems, or lead-level language belongs here — and none is used. Confirmed single-project stage.

## Backend Architecture and Systems Design
- Diagnosed unpaginated admin-facing lists as the primary driver of API latency on TalentForge and fixed it via pagination — the single biggest contributor to the ~25–40% latency reduction, not a vaguer "we optimized the APIs" claim.
- Structured backend workflows around maintainable CRUD modules with centralized validation, cutting recurring validation-related API issues an estimated 20–25%.

## Frontend Architecture and Performance
- Reduced redundant frontend API calls an estimated 20–30% by debouncing search input — the specific fix behind that number, not a general claim.
- Built reusable Angular 10 components and reactive form workflows across employee and admin dashboards.

## Project references
TalentForge — the only documented project from this stage; File 1, entry 13.

## Two-page resume experience bullets
- Diagnosed unpaginated admin lists as the primary driver of API latency for an enterprise LMS platform and fixed it via pagination, reducing response latency for large datasets an estimated 25–40%.
- Reduced redundant frontend API calls an estimated 20–30% by debouncing search input, and reduced recurring validation-related API issues an estimated 20–25% through centralized validation middleware.

## One-page resume priority
- **Must Keep (if included at all):** the two root-caused improvements (pagination for latency, debouncing for redundant calls) — specific and credible for an early-career line.
- **Usually remove:** this entire company is a strong candidate for 2–3 lines total, or omission if space is tight.

## LinkedIn experience narrative
Nextbridge is the starting point, and it's fine to keep it simple: a few months building an enterprise LMS's backend and frontend from the ground up, with real root-cause diagnosis (pagination, debouncing) behind the numbers rather than vague "optimization."

## LINKEDIN NOTES — Nextbridge
- Narrative angle: the foundation, told honestly and briefly.
- Cross-project theme: N/A — single project.
- Soft credibility signal: none.

## Interview narrative
Keep this simple: this is where you learned to build and structure a real backend and frontend, with genuine root-cause diagnosis behind the performance numbers — the fundamentals everything later sits on top of.

---

# Appendix: Cross-Company Notes

- **Titles used throughout this file** are the single, actually-evidenced title per company. Where the company-summary source document appended a second label purely as a bullet-selection tag (DevCrew.io's "| Solution Architect"), that label is not treated as a second real title.
- **Real throughline (confirmed, in your own words):** failure-resilient systems; human-centric, easy-to-navigate design; deliberate judgment about where AI should and shouldn't be relied on. Use this instead of any earlier guessed narrative themes.
- **Pre-sales and presales-adjacent evidence** now exists in one clearly documented instance (ClearEdgeIQ's CEIQ-ARCH-002 origin). If "presales" is a pillar of your target positioning, this is currently your one piece of direct evidence — see `06-self-positioning-checklist.md` for building a second one deliberately.
- **External visibility:** you confirmed you already post on LinkedIn. No specific topics/cadence were provided — share 2–3 example post themes if you want this reflected with more specificity anywhere.
