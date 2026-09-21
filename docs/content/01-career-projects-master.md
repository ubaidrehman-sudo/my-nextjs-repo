# Career Projects Master — Canonical Knowledge Base

**Purpose:** This is the factual source of truth for every documented project across your career. It is written to be rich enough to generate a strong two-page resume first, then selectively trimmed for a one-page version, LinkedIn, proposals, or interview prep — without ever going back to the raw source files.

**Ground rules this file follows:**
- Nothing here is invented unprompted. Facts marked as confirmed came directly from your gap-analysis answers or the ClearEdgeIQ technical docs (`ARCHITECTURE.md`, `DB-SCHEMA.md`, `ENGINEERING-PRACTICES.md`). Where you wrote "follow your own suggestion," the suggested language was adopted as documented fact per your explicit instruction — these are marked `[confirmed via your instruction]` the first time they appear per project so you can see exactly where a sentence originated.
- Two items required me to fill in an open placeholder rather than just confirm a complete sentence you'd already written (the Titans/CTO story and, to a lesser extent, the LangChain justification for OutreachIQ). Both are flagged inline as `[drafted — sanity-check before using in an interview]`.
- Projects are grouped by company, in descending chronological order (most recent first), matching `02-career-experience-master.md`.
- **Source key:** `[CEIQ]` = `ceiq-intelligence.md`; `[CEIQ-DOCS]` = the three new technical docs (`ARCHITECTURE.md`, `DB-SCHEMA.md`, `ENGINEERING-PRACTICES.md`); `[QD]` = QualDerm audit docx; `[PB]` = `Resume_-_raw.docx`; `[CS]` = `Resume_Company-Level_Experience_Summaries.docx`; `[GAP]` = your gap-analysis answers.

**Template per project:** Name & short description → Domain → Context/Problem → My contribution → Architecture/technical complexity → Technologies → Engineering significance → Business/product significance → Resume Evidence Bank → Two-page candidate bullets → One-page candidate → Interview talking points.

---

# 🏢 VentureDive (2024–Present)

*Career stage this company represents: lead-level evolution — backend/architecture ownership, GenAI integration, cloud, regulatory-sensitive systems, and client-facing solution-architecture work, including confirmed pre-sales involvement.*

## 1. ClearEdgeIQ — Multi-Tenant Contract Lifecycle & Sourcing Platform

**Short description:** A multi-tenant NestJS/PostgreSQL/AWS Bedrock platform that manages sourcing events, vendor relationships, and contract lifecycle (extraction, comparison, risk analysis) with AI assistance, built end-to-end under a client Statement of Work — and, per your own technical documentation, an unusually well-governed one: every module's status (built vs. partially built, with the gap named) is tracked, every architectural decision is logged with sign-off, and every deliberate exception to a standing convention is written down rather than left as silent inconsistency.

**Domain:** LegalTech / Procurement & Contract Lifecycle Management (B2B SaaS, AI-augmented)

**Context / Problem:** The client, ClearEdge Enterprises LLC, needed to replace manual, unstructured contract review and RFP/RFQ drafting with a governed, multi-tenant platform — one where AI-generated content is auditable and reviewed by humans rather than auto-trusted. Delivered by VentureDive as service provider under SOW ref `VD-CEIQ-SOW-001`, with a committed 12-week build plus 45-day hypercare.

**My contribution:**

*Architecture/leadership:*
- Engaged as Solution Architect for design and build. Designed the ports-and-adapters module-boundary convention, the PostgreSQL Row-Level Security (RLS) tenant-isolation model, and the hybrid RAG retrieval pipeline. Personally authored ~92% of all commits (220 of 239, across two git identities) over a ~12–13 week window, kickoff 2026-06-16 through steady-state production by 2026-09-08. `[CEIQ]`
- Designed the module boundary convention as a genuinely forward-looking architectural bet: the Vendor Directory module shipped before Sourcing and Contracts existed, so its cross-module ports were deliberately bound to permissive stub adapters until the real modules landed — the interface was built before both sides of it existed, precisely so Vendor Directory wouldn't need to be reopened later. That pattern (narrow interface + DI token + `useExisting` binding, e.g. `SOURCING_SERVICE_TOKEN` → `VendorDirectorySourcingAdapter`, `CONTRACT_SERVICE_TOKEN` → `ContractServiceAdapter`, `EMBEDDING_TRIGGER_TOKEN` → `ContractEmbeddingTriggerAdapter`) became the standing convention for every later cross-module boundary across all 26 modules. `[CEIQ-DOCS]`
- Made an explicit, cost-driven infrastructure decision, not just a governance one: choosing Amazon Bedrock over an OpenAI API gateway kept AI spend inside VentureDive's existing committed AWS usage rather than opening a second vendor bill/contract, and assigned per-use-case Bedrock model IDs across the platform's AI jobs so cheaper, faster models handle high-volume work (drafting, summarization) while a stronger model is reserved for judgment-heavy tasks (clause-risk analysis) — a deliberate cost-tiering lever, not a single blanket model choice. `[GAP, confirmed via your instruction]`
- Two of the platform's three read-only exceptions to its own ports-and-adapters rule (Chat reading Contracts/Contract-Embeddings entities directly; Dashboard reading five tables directly via raw SQL) were made and documented as deliberate trade-offs, not accidents `[GAP — the third exception is never named in any source document read so far; either recall and add it, or soften "three" to "at least two" everywhere this is used]` — a pattern repeated across the codebase of knowingly breaking a standing rule in a narrow, written-down place rather than allowing silent inconsistency. `[CEIQ-DOCS]`

*Implementation:*
- Built all 26 backend modules (among them: `auth`, `access-control`, `tenant`, `user`, `sourcing`, `contracts`, `contract-embeddings`, `chat`, `dashboard`, `vendor`, `vendor-portal`, `background-jobs`, `ai`, `notification`/`notifications`, `clause-configuration`), ~30 database tables across 84 TypeORM migrations, and 307 unit test files. `[CEIQ]` `[CEIQ-DOCS]`
- Implemented three independent AI subsystems (Sourcing, Contracts, Chat) sharing one Bedrock account, plus a self-built hybrid pgvector RAG pipeline.
- Implemented rights-based RBAC end to end: 13 system rights mapped to 3 seed-driven default roles per tenant (Procurement Owner gets all 13; Procurement Manager gets 9; Procurement Analyst gets 6 view-only rights plus `use_ai_assistant` and `view_notifications`), enforced by a global, default-deny `RightsGuard` — code never branches on a role's name string, only on resolved rights. `[CEIQ-DOCS]`
- Solved a genuinely tricky multi-tenancy edge case: the public, unauthenticated Vendor Portal has no Cognito session at all, yet still needs tenant-scoped RLS enforcement. Built this via a `SECURITY DEFINER` Postgres function (`resolve_portal_token`) owned by a narrowly-scoped `NOLOGIN BYPASSRLS` role, with only `EXECUTE` granted to the application's normal database role — the app itself never holds `BYPASSRLS`. An anonymous vendor can resolve their own tenant-scoped record without the application ever running with broad bypass privileges. `[CEIQ-DOCS]`

*Specification & process leadership:*
- Directed a spec-driven workflow using Claude Code — wrote 16 versioned feature specs (`CEIQ-FOUND-001` Identity/RBAC/Audit through `CEIQ-FEAT-013` App Shell Header, plus `CEIQ-RAG-001` Contract Embedding Pipeline), directed scaffold generation against them, then reviewed and corrected output (including catching and fixing unreliable AI-generated arithmetic before it reached production). `[CEIQ]` `[CEIQ-DOCS]`
- Ran a dated documentation-hygiene review pass that re-verified every module's own spec-version citation against each spec document's own header table, catching and correcting stale references that had drifted during active development (e.g., the Vendor Directory module's citation had drifted from the current v1.4 back to a stale v1.2 reference in one place) — treating spec-to-code traceability as something that needs active maintenance, not a one-time artifact. `[CEIQ-DOCS]`
- Maintained a consolidated ADR-style decision log: 16 architecture decisions and 7 formally tracked deviations, each with named sign-off (e.g., internal team lead Ahmed Meer approved decision CEIQ-ARCH-002).

*Security verification:*
- Used Claude Code to build a scripted `curl` test matrix that verified a high-risk permanent tenant/user-deletion endpoint across every access-control edge case (wrong role, wrong tenant, missing token, bad ID, re-delete) before shipping it.
- Established a defense-in-depth authentication model: two independently-verified Cognito user pools (tenant, admin), each with its own hand-rolled RS256/JWKS verifier, where a token presented to the wrong pool is rejected at the authentication layer (`401`), never miscategorized as an RBAC denial (`403`) — a distinction corrected from an earlier draft spec that had it wrong, not a code change made after the fact. Global guard order (`Throttler → JWT → TenantActive → Rights`) is itself security-critical: tenant-active status is confirmed before any rights check runs, so a deactivated tenant's user is rejected before RBAC ever evaluates their still-valid role. `[CEIQ-DOCS]`
- Closed a real gap in Cognito's `GlobalSignOut` behavior (which only revokes refresh tokens) with a database-side session-cutoff column (`tokens_invalid_before`) that force-invalidates already-issued access tokens on role/credential change, deactivation, tenant handover, and logout.

*Client-facing / pre-sales:*
- The CEIQ-ARCH-002 architecture decision (moving AI-output correctness enforcement from backend validation into the prompt layer) did not originate as an internal-only engineering call — the trade-off itself was first raised in a **pre-sales conversation with ClearEdge Enterprises**, so the client had already helped shape the direction before the decision was formalized internally with team-lead sign-off. `[GAP]`
- As Solution Architect on the SOW engagement, ran periodic checkpoint demos that concretely changed what got built, beyond the SOW's original scope, on at least three occasions: the Vendor Directory grew from the SOW's "Lite" scope into a full two-level category taxonomy with structured multi-contact/address records and sourcing-history tracking, once a checkpoint review showed the lite version couldn't support real vendor comparison; Sourcing Events grew a dedicated AI executive-summary and trade-off-summary job on top of the SOW's single "draft the RFQ/RFP" line, after a checkpoint demo of a draft-only output led the client to ask for cross-vendor trade-off summarization too; and the Dashboard moved from the SOW's plain summary view into a full interactive multi-view calendar (List/Week/Month), after a checkpoint demo of the static view surfaced that renewal/expiration dates needed to be browsable, not just listed. `[GAP]`

**Architecture / technical complexity:**
- Modular monolith (NestJS, 26 domain modules) using a ports-and-adapters cross-module boundary convention, with background processing (`ECS_SERVICE_BULLMQ`) deployed as a separate service from the HTTP API (`ECS_SERVICE_BACKEND`), unified locally via Docker Compose.
- **Multi-tenancy:** PostgreSQL RLS (`FORCE ROW LEVEL SECURITY`, fail-closed on missing tenant context via `current_setting('app.current_tenant')::uuid` with no `missing_ok` flag) as a structural backstop beneath app-level filtering, via a per-request `SET LOCAL app.current_tenant` issued by a `TenantContextInterceptor`. Every tenant-scoped table routes through one request-scoped, RLS-bound `EntityManager` — a raw injected `Repository` or `DataSource` query would run outside the `SET LOCAL` scope and either fail or silently mis-scope. `[CEIQ-DOCS]`
- **Hybrid RAG, no dedicated vector DB:** contract text chunked (3-tier fallback: section markers → heading heuristics → fixed-size grouping) and embedded via Titan Embed V2 into `pgvector` columns (the `contract_chunks` table) inside the same Postgres instance. Retrieval fuses a keyword leg (`websearch_to_tsquery()`) and a vector leg (cosine distance) via Reciprocal Rank Fusion (`1/(k+rank)`, k=60), then expands matched paragraph chunks back to parent-section context.
- **Race-safety and concurrency control**, evidenced specifically where implemented, not claimed as a blanket guarantee: `SELECT...FOR UPDATE` + `UPDATE...RETURNING` for race-safe sequence/counter allocation (display-ID sequences); idempotent recovery from concurrent-insert races via unique constraints plus a caught Postgres `23505` error (Contracts' comparison cache, Sourcing's proposal invites, Notification Centre's idempotency-keyed inserts); a staleness-snapshot-then-recheck pattern for the one long-running background job (contract embedding) whose result could otherwise be silently overwritten by a race. `[CEIQ-DOCS]`
- **Three independent Bedrock-backed AI subsystems:** Sourcing (RFP/RFQ drafting, event/trade-off summarization — 3 job processors), Contracts (a 2-stage pipeline: Stage 1 extraction always runs on save, Stage 2 summary/clause/risk runs only on first save, with the embedding pipeline re-triggered unconditionally on every successful save regardless of first-save status, so edits always re-embed), and Chat (RAG-grounded, genuinely streaming via `ConverseStream`, tool dispatch across 20 portfolio-analytics tools via a fixed `switch` statement rather than managed Bedrock Agents).
- **A specific distributed-systems bug class avoided by design:** Chat's SSE response flow opens the stream and waits for a Redis subscribe acknowledgment *before* enqueueing the `chat.response` BullMQ job — because Redis Pub/Sub has no replay buffer, publishing before a subscriber exists would silently drop the event with no error raised. `[CEIQ-DOCS]`
- **AI engineering discipline:** prompt templates deliberately live per-module rather than in one shared location, since the three subsystems' prompt shapes differ enough that a shared template would add indirection without real reuse value — a "know when not to force reuse" call, not an oversight. Every prompt builder takes a structured input object, never raw string concatenation of user text; user content is sanitized and length-capped before injection; AI output is treated as untrusted and validated in two layers (shallow validation in the shared `ai/` layer, deeper schema validation by every real caller); model IDs and inference settings live in config, so a model version change is a configuration change, not a code change. `[CEIQ-DOCS]`
- **AI output governance (architecture decision CEIQ-ARCH-002):** moved semantic/business-rule correctness enforcement out of the backend and into the prompt layer (the human draft-review screen is the real quality gate), while keeping arithmetic-sensitive outputs (evaluation-criteria weights, budget rounding) under deterministic, Zod-schema-driven server-side recomputation regardless of prompt quality.
- **Security:** default-deny rights-based RBAC (13 rights, 3 seed-driven roles, Redis-cached); two independently-verified Cognito pools with cross-pool token rejection treated as an authentication-layer failure, not an RBAC one; AES-256-encrypted setup passwords via Secrets Manager (2 independently-gated secrets, `SecretProvider`-abstracted, fail-closed in production if the ARN is missing or the fetch fails); magic-byte file-upload verification; a global `ValidationPipe` (`whitelist: true, forbidNonWhitelisted: true`) with a custom `exceptionFactory` normalizing every validation failure to one consistent shape; two-database-role separation (restricted runtime role vs. migration-only superuser); a domain-specific error-code catalog with **no generic not-found code anywhere** (`ERR_TENANT_NOT_FOUND`, `ERR_CONTRACT_VERSION_NOT_FOUND`, etc. — a previously-existing unused generic member was deliberately removed to keep the catalog honest); OWASP Top-10-aligned controls end to end.
- **Async/queues:** BullMQ against a dedicated Redis instance for Contracts' 4-processor AI pipeline, embedding jobs, Sourcing's Bedrock + email jobs, Chat's response worker, and Notification Centre's event worker plus daily reconciliation cron; every worker manually restores/validates tenant context itself since BullMQ jobs run with no HTTP request context; two deliberate, documented exceptions to the shared `BaseWorker` convention exist (Sourcing's invitation and proposal-confirmation email processors run as thin, log-and-continue plain BullMQ workers by design, since a SendGrid failure there doesn't need retry/DLQ semantics); only rate-limit errors are retried elsewhere, everything else routes to a log-only dead-letter queue.
- **CI/CD:** GitHub Actions — lint/test/SonarQube, then OIDC-authenticated Docker Buildx build/push to ECR, then force-deploy of two ECS services (API + BullMQ worker) per branch-mapped environment, followed by CloudFront invalidation; secondary Jenkins trigger for dev→qa PRs.
- **Honest, documented gaps (its own docs name these, not hidden here):** zero end-to-end test files despite `test:e2e` being wired up in `package.json`, and no enforced Jest coverage threshold despite a stated ≥90% target — tracked internally as the single highest-priority gap in the project's own backlog, since it means RLS tenant-isolation correctness and full API-contract conformance are currently proven only against mocked `EntityManager` calls, never a real running Postgres instance. A related, specific regression class is explicitly called out in project convention: TypeORM's own change-tracking silently skips the `UPDATE` on an identical resubmit for auto-timestamp columns, so tests must assert against the entity object passed into `save()`, not just its mocked return value, or the failure mode stays invisible. Also: no production telemetry/AI-cost-tracking pipeline (only informal, developer-initiated spot-checks — periodic manual Bedrock-console glances and occasional CloudWatch/Cost Explorer checks during heavier development phases, no dashboard, no alerting, no per-tenant cost attribution `[GAP]`); no dependency-vulnerability scanning in CI; no Infrastructure-as-Code in the repo. `[CEIQ-DOCS]`
- **Pattern adoption elsewhere:** confirmed, as of this writing, that no other VentureDive project or team has yet referenced or adopted the RLS-backstop, ports-and-adapters, or ADR-log pattern from ClearEdgeIQ. Left out of resume claims deliberately rather than implied as organization-wide. `[GAP]`

**Technologies:** TypeScript (strict), Node.js 22, NestJS 11, TypeORM 0.3, PostgreSQL 16 + pgvector, Redis + BullMQ, Amazon Bedrock (Claude 3 Sonnet via Converse API, Titan Embed Text V2), Amazon Cognito, Amazon S3, AWS Secrets Manager, Amazon ECR/ECS/CloudFront, GitHub Actions, Jenkins (secondary), Docker/Docker Compose, SonarQube, Jest, Zod, class-validator/class-transformer, helmet, mammoth/pdf-parse/pdfmake/diff, SendGrid, Swagger/OpenAPI, Claude Code.

**Engineering significance:** Demonstrates near-solo delivery of a production multi-tenant SaaS platform where multi-tenancy correctness is structurally enforced (database-level, including a genuinely hard edge case — anonymous vendor access — solved without ever giving the application broad RLS-bypass privileges), where retrieval infrastructure was built without standing up a second, separately-secured vector database, and where the same "write down every deliberate exception" discipline was applied consistently across auth, error codes, API conventions, and job processing, not just the headline architecture decisions. The documentation-hygiene habit (re-verifying spec-version citations, removing stale ticket references from comments) is itself notable: most engineers let documentation drift; this treated it as something to actively re-audit.

**Business/product significance:** Delivered a governed alternative to manual contract review and RFP/RFQ drafting, on time against a 12-week SOW commitment, with AI content kept reviewable rather than auto-trusted — directly reducing the client's exposure to unvetted AI output in a legal/procurement context. The pre-sales involvement and the three demo-driven scope-growth stories show the engagement wasn't just "build what the SOW said" — client feedback loops materially shaped what got delivered, and did so within the same committed timeline.

**Resume Evidence Bank:**
- Solo-architected and delivered a 26-module multi-tenant SaaS platform (NestJS/PostgreSQL/AWS Bedrock) from kickoff to steady-state production in a 12-week client SOW window, authoring ~92% of all commits.
- Designed a fail-closed multi-tenant isolation model combining app-level filtering with PostgreSQL Row-Level Security, so a missing tenant-scope check raises an error instead of silently leaking cross-tenant data — including a public, unauthenticated vendor-portal path solved via a narrowly-scoped `SECURITY DEFINER` database function rather than granting the application broad bypass privileges.
- Built a hybrid keyword+vector RAG retrieval pipeline entirely inside PostgreSQL (pgvector + full-text search, fused via Reciprocal Rank Fusion) instead of standing up a dedicated vector database.
- Made an explicit cost-architecture call: choosing AWS Bedrock over an OpenAI gateway to keep AI spend inside existing committed AWS usage, and assigning per-use-case model IDs so cheaper models absorb high-volume jobs while a stronger model is reserved for judgment-heavy tasks.
- Led the architecture decision to move AI-output correctness enforcement from backend business-rule checks into the prompt layer — a trade-off first raised in a pre-sales conversation with the client, then formalized internally with sign-off — cutting false-positive draft-generation failures while keeping arithmetic-sensitive fields under deterministic server-side control.
- Ran client checkpoint demos that directly grew the delivered scope beyond the original SOW on three separate occasions (vendor taxonomy, AI trade-off summarization, an interactive multi-view dashboard calendar), each triggered by client feedback on a working demo, not an internal assumption.
- Directed a spec-first development workflow with Claude Code across 16 versioned feature specs and 26 modules, reviewing and correcting generated code (including AI-generated arithmetic that couldn't be trusted from the model alone), and ran a dedicated documentation-hygiene pass re-verifying every module's spec-version citation against source.
- Used Claude Code to build a scripted `curl` test matrix that verified a high-risk data-deletion endpoint across every access-control edge case before production release.
- Maintained a consolidated, sign-off-tracked architecture decision log (16 decisions, 7 formally documented deviations) as a first-class deliverable, giving the client an auditable trail of every non-obvious implementation choice.
- Closed a real gap in Cognito's `GlobalSignOut` behavior with a database-side session-cutoff column that force-invalidates already-issued access tokens on role/credential change.
- Applied deliberate concurrency-safety patterns (`SELECT...FOR UPDATE`, idempotent-insert recovery via caught unique-constraint violations, a staleness-snapshot-and-recheck pattern for a long-running AI job) rather than assuming single-writer simplicity.
- Kept an entire client platform (AI, identity, storage, secrets) inside one AWS account/IAM boundary by choosing Bedrock, Cognito, S3, and Secrets Manager over multiple third-party vendors.

**Two-page resume candidate bullets:**
- Architected and delivered ClearEdgeIQ, a multi-tenant NestJS/PostgreSQL/AWS Bedrock contract-lifecycle and sourcing platform, from kickoff to steady-state production in a 12-week client SOW, personally authoring ~92% of all commits across 26 modules.
- Designed a fail-closed multi-tenant isolation model combining app-level filtering with **PostgreSQL Row-Level Security**, including a `SECURITY DEFINER`-based solution for anonymous vendor-portal access that never grants the application RLS-bypass privileges.
- Built a hybrid **RAG** retrieval pipeline entirely inside **PostgreSQL** using **pgvector** and full-text search, fused via Reciprocal Rank Fusion, instead of operating a separate vector database.
- Made a cost-driven architecture call choosing **AWS Bedrock** over a third-party AI gateway, keeping spend inside existing AWS commitments and tiering model selection by job cost-sensitivity.
- Led an architecture decision, first raised in a pre-sales conversation with the client, to move AI-output correctness enforcement into the prompt layer while keeping arithmetic-sensitive fields under deterministic server-side control.
- Ran client checkpoint demos that grew delivered scope beyond the original SOW three separate times, translating live client feedback directly into new architecture (an AI trade-off-summary job, an interactive dashboard calendar, an expanded vendor taxonomy).
- Directed a spec-driven development workflow using Claude Code across 16 versioned feature specs, and maintained a sign-off-tracked architecture decision log covering 16 decisions and 7 intentional deviations.
- Established a defense-in-depth authentication model across two Cognito pools, including a custom session-cutoff mechanism closing a real gap in Cognito's own token-revocation behavior.

**One-page resume candidate:** Solo-architected and delivered a 26-module multi-tenant contract-lifecycle platform (NestJS/PostgreSQL/AWS Bedrock) with database-enforced tenant isolation and a self-built hybrid RAG pipeline, from client SOW kickoff to production in 12 weeks, growing scope through client-facing demos along the way.

**Interview talking points:**
1. The `SECURITY DEFINER` / narrowly-scoped `BYPASSRLS` role solution for anonymous vendor-portal access — why granting the app itself `BYPASSRLS` would have been the wrong call, and what was built instead.
2. The CEIQ-ARCH-002 decision end to end: how it started as a pre-sales conversation with the client, what changed in the architecture, and how it was formalized and signed off internally.
3. Why pgvector inside the existing Postgres instance instead of a dedicated vector database, and the trade-off accepted (non-tunable RRF `k`, no independently scalable retrieval infra).
4. The Redis Pub/Sub replay-buffer problem in Chat's SSE flow — why the subscribe-then-enqueue ordering matters, and what silently breaks without it.
5. Designing the ports-and-adapters convention *before* both sides of a boundary existed (Vendor Directory shipping ahead of Sourcing/Contracts) — building an interface for a module that doesn't exist yet.
6. Being candid about the project's own honest gaps (no e2e suite, no enforced coverage threshold, the TypeORM auto-timestamp testing pitfall) and how you'd prioritize closing them.

*Sources: [CEIQ], [CEIQ-DOCS], [GAP]*

---

## 2. OutreachIQ — Agentic AI Outbound Intelligence Platform

**Short description:** A GenAI-powered platform that automates personalized B2B outbound outreach (email and LinkedIn) using a LangChain-based multi-agent architecture.

**Domain:** B2B SaaS / GenAI Sales & Marketing Technology

**Context / Problem:** Manual, generic outbound outreach doesn't scale; the platform needed to generate genuinely personalized, context-grounded outreach content automatically, across multiple channels.

**My contribution:**
- Designed and implemented a multi-agent architecture with three named agents, each with a distinct responsibility: a **Sender-Match agent** (selects which internal sender/persona to write as, based on account context), a **Context-Retriever agent** (pulls prior engagement history and account context to ground the message), and a **Composer agent** (drafts the channel-specific email or LinkedIn message from the retrieved context). `[GAP, confirmed via your instruction]`
- Built the orchestration layer on **LangChain** — the standard, most widely-adopted choice for multi-agent orchestration in the current Node/TypeScript AI ecosystem — over a fully hand-rolled agent pipeline, for its mature agent/tool-calling abstractions and large pre-built integration library. This kept engineering effort on the actual business logic (sender selection, retrieval, composition) rather than on building and maintaining a bespoke orchestration layer. `[drafted — sanity-check before using in an interview: confirm this is really why LangChain was chosen versus another reason you recall]`
- Built the platform using Next.js 16, React, TypeScript, Vercel AI SDK, and OpenAI APIs.
- Integrated typed API contracts and schema validation using Zod to keep AI workflows, business logic, and UI layers communicating reliably.
- Built retrieval-driven AI workflows grounded on historical outreach and engagement context — retrieved via structured queries against the CRM/engagement database rather than a vector store, since the grounding data (prior interactions, account fields) is naturally structured and didn't need semantic search. `[GAP, confirmed via your instruction]`
- Iterated on the Composer agent's prompt after early drafts read as too generic, adding explicit tone and length constraints to sharpen output quality. `[GAP, confirmed via your instruction]`
- Manually reviewed a sample of generated messages before each campaign launch as the primary quality-control step; LangChain's own tracing was available as a debugging aid alongside this manual review. `[GAP, confirmed via your instruction]`
- Used Cursor AI and Claude Code for rapid scaffolding, prompt iteration, refactoring, and architecture acceleration.
- Developed scalable, reusable frontend UI components (React, Tailwind CSS, TypeScript) with a focus on maintainability and rapid MVP delivery.

**Architecture / technical complexity:** LangChain-orchestrated multi-agent pipeline (Sender-Match → Context-Retriever → Composer) rather than a single monolithic prompt, so each concern can be iterated and evaluated independently; Vercel AI SDK + OpenAI APIs for generation; Zod-validated typed contracts between the AI layer and the rest of the application, preventing a class of runtime integration errors; retrieval grounded in structured historical engagement data (not vector search) to reduce generic, ungrounded output.

**Technologies:** Next.js 16, React, TypeScript, Tailwind CSS, LangChain, Vercel AI SDK, OpenAI APIs, Zod, Node.js, Cursor AI, Claude Code.

**Engineering significance:** The three-agent decomposition is the interesting design decision — it lets each concern (who to contact, what context to retrieve, how to phrase it per channel) be iterated and evaluated independently instead of being buried inside one large, hard-to-debug prompt. Choosing LangChain over a hand-rolled orchestration layer was itself a build-vs-adopt call, prioritizing time-to-market on the actual business logic over full architectural control. `[drafted — this is the same unconfirmed reasoning flagged under "My contribution" above; confirm before using anywhere]` Schema-validated contracts between AI and application layers is a concrete reliability pattern for shipping GenAI features to production.

**Business/product significance:** Automates a task (personalized B2B outreach) that otherwise consumes significant manual sales/SDR effort, directly enabling scaled, still-personalized outbound.

**Resume Evidence Bank:**
- Designed a three-agent LangChain-orchestrated architecture (Sender-Match, Context-Retriever, Composer) for a B2B outbound-intelligence platform, separating sender selection, context retrieval, and message composition into independently iterable stages.
- Built retrieval-grounded AI workflows using structured queries against historical engagement data to improve the relevance of generated email and LinkedIn content, deliberately choosing structured retrieval over vector search since the grounding data didn't need semantic matching.
- Established typed, Zod-validated API contracts between AI workflows and the application layer to prevent runtime integration errors in a GenAI product.
- Iterated on generation prompts based on real output quality, adding explicit tone/length constraints after early drafts read as too generic, and manually reviewed generated samples before each campaign launch.
- Used Cursor AI and Claude Code to accelerate scaffolding, prompt iteration, and refactoring on a fast-moving MVP.

**Two-page resume candidate bullets:**
- Designed and implemented a three-agent **LangChain**-orchestrated architecture (Sender-Match, Context-Retriever, Composer) for an agentic AI outbound-intelligence platform built on **Next.js 16**, React, TypeScript, and OpenAI APIs.
- Built retrieval-driven AI workflows grounded in structured historical engagement data, improving personalization of AI-generated outbound content across email and LinkedIn.
- Established typed API contracts and **Zod** schema validation between AI workflows, business logic, and UI layers to ensure reliable AI-backend communication.
- Iterated on generation prompts based on output quality and instituted manual sample review before each campaign launch, alongside AI-assisted development (Cursor AI, Claude Code) for rapid MVP delivery.

**One-page resume candidate:** Designed a three-agent LangChain architecture (Next.js/OpenAI) automating personalized, retrieval-grounded B2B outbound outreach across email and LinkedIn.

**Interview talking points:**
1. Why three agents specifically, and what each is responsible for (Sender-Match, Context-Retriever, Composer).
2. Why LangChain over a hand-rolled orchestration layer — the build-vs-adopt trade-off.
3. Why structured-query retrieval rather than vector search for this specific grounding data.
4. How prompt iteration happened in practice — the specific generic-output problem that led to adding tone/length constraints.

*Sources: [PB], [CS], [GAP]*

---

## 3. Dermava Health — Healthcare Content & Patient Engagement Platform

**Short description:** A CMS-driven healthcare web platform for a multi-brand/multi-location dermatology provider network, including an independent engineering audit and strategic technology roadmap that you personally authored end to end.

**Domain:** Healthcare (patient engagement / provider content platform)

**Context / Problem:** The client's network needed a modern, CMS-driven public web presence across multiple brands/locations, plus an honest assessment of what it would take to reach a broader AI-driven "conversational, remembered" patient-engagement vision that a separate vendor (Metalab) had prototyped.

**My contribution:**
- *Implementation:* Built the platform using Next.js, React, TypeScript, and Contentful headless CMS. Architected server-rendered, CMS-driven frontend workflows using Next.js App Router and React Server Components for dynamic provider, location, and service pages. Developed reusable, accessible UI components (Tailwind CSS, shadcn/ui, Radix UI).
- *GenAI proof-of-concept, beyond dependency wiring:* Went past installing the Vercel AI SDK/OpenAI client — embedded roughly 50 sample content pages and ran a test similarity search against them to validate the feasibility of AI-powered semantic search, before it became a scoped feature. `[GAP, confirmed via your instruction]`
- *Model choice:* Used OpenAI via the **Vercel AI SDK** — the standard, most-documented AI integration path for a Next.js application, and the combination most engineers building on Next.js would immediately recognize — rather than a more specialized or niche AI framework, keeping the stack mainstream and easy for any future engineer (or client) to pick up. `[GAP, confirmed via your instruction]`
- *AI-accelerated delivery:* Used Cursor AI and Claude Code to accelerate component development, refactoring, and rapid MVP delivery.
- **Authored the QualDerm engineering audit and strategic recommendation end to end** — this was your own deliverable, not a contribution to someone else's document. `[GAP, confirmed via your instruction]` It assessed the production repository's engineering quality, compared it against a separately vendor-built (Metalab) conversational-AI prototype, and recommended a phased **"Partial Reuse and Selective Rebuild"** architecture: preserve the existing website/CMS platform while building AI Chat, Patient Platform (identity/memory), Booking Integration, and Compliance & Monitoring as **separate services** alongside it. It also produced a prioritized stabilization backlog (API error handling, rate limiting, credential rotation, frontend error boundaries, expanded test coverage) and a realistic delivery estimate (6–9 months for a usable AI v1; 12–18 months for the full roadmap).
- *Delivery and outcome:* Presented the audit's findings on a call with the client's product lead, who approved the phased "Partial Reuse and Selective Rebuild" direction; Phase 1 was scoped as a direct follow-on afterward — this had a resolution, not just a delivered document. `[GAP, confirmed via your instruction]`
- *Stabilization follow-through:* Began remediating the audit's own stabilization backlog rather than leaving it purely as a recommendation, starting with rate limiting added to one endpoint. `[GAP, confirmed via your instruction]`

**Architecture / technical complexity (platform, per your own independent audit of the same class of multi-brand dermatology platform):**
- Multi-brand, CMS-driven website architecture with a nightly Azure Blob Storage → Contentful synchronization pipeline (via SFTP) keeping real operational provider/clinic data current — assessed as the platform's strongest, most reusable piece of long-term infrastructure.
- Provider and clinic discovery: specialty/insurance filtering, map integration (Google Maps React + Supercluster for geospatial clustering), virtualized rendering (React Virtuoso) for large provider datasets.
- Contentful platform automation: Management API, Migration tooling, custom App SDK extensions (Forma 36 components), generated TypeScript types from CMS schemas.
- Appointment scheduling via an externally embedded scheduler (not owned end-to-end by this platform — an audited gap, not a criticism of what was built).
- Shopify product/catalog integration; Birdeye review integration; Sentry error monitoring; automated CI/CD; Storybook component-driven development; Vitest testing; internationalization via Lingui React.
- A validated (not just installed) GenAI foundation: a working proof-of-concept semantic-search test over real sample content, positioned for future expansion, not a shipped conversational layer.

**Technologies:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, Contentful (CMS, Management API, Migration, App SDK, Forma 36), Node.js, Vercel AI SDK, OpenAI APIs, Azure Blob Storage SDK, SSH2 SFTP Client, Google Maps React, Supercluster, React Virtuoso, Sentry (Next.js), Storybook, Vitest, Lingui React, Cursor AI, Claude Code.

**Engineering significance:** The audit's central, non-obvious judgment call — clearly separating "what this repository actually is" (a strong, near-production-ready operational website + sync pipeline, now further validated by a real semantic-search proof-of-concept) from "what the AI demo showed" (a separate vendor prototype) — is itself solution-architecture-level work, and it was your own independent analysis, delivered and defended directly to the client's product lead, with a scoped Phase 1 as the direct result.

**Business/product significance:** Gave the client a durable, professionally engineered foundation (website, provider sync, content delivery, a validated AI feasibility test) plus a realistic, staged, client-approved plan toward AI-driven patient engagement — instead of either discarding working infrastructure or overselling the vendor prototype as production-ready.

**Resume Evidence Bank:**
- Authored an independent engineering audit and strategic technology recommendation for a healthcare client, assessing a production platform against a separately vendor-built AI prototype and recommending a phased architecture that preserved working infrastructure while scoping AI, patient-identity, and booking systems as independent services.
- Presented audit findings directly to the client's product lead, securing approval for the recommended phased approach and a scoped Phase 1 follow-on engagement.
- Validated GenAI feasibility with a hands-on proof-of-concept (embedding ~50 sample content pages and running a test similarity search) before scoping semantic search as a committed feature.
- Built a CMS-driven, multi-brand healthcare web platform (Next.js/React/TypeScript + Contentful) with server-rendered provider, location, and service pages via the Next.js App Router and React Server Components.
- Began remediating the audit's own prioritized stabilization backlog, starting with rate limiting on one endpoint, rather than leaving it as a pure recommendation.

**Two-page resume candidate bullets:**
- Authored an independent engineering audit and strategic technology recommendation for a healthcare client's platform, comparing it against a vendor-built AI prototype and recommending a **"Partial Reuse and Selective Rebuild"** architecture; presented findings directly to the client's product lead and secured approval for a scoped Phase 1.
- Validated GenAI feasibility hands-on — embedding sample content and running a test semantic-search proof-of-concept — before committing semantic search as a scoped feature, using the **Vercel AI SDK** and **OpenAI APIs**.
- Built a modern, multi-brand healthcare web platform using **Next.js**, React, TypeScript, and **Contentful** headless CMS, with server-rendered pages via the Next.js App Router and React Server Components.
- Began remediating the audit's prioritized stabilization backlog (rate limiting, error handling, credential rotation) rather than leaving it purely as a recommendation.

**One-page resume candidate:** Authored and presented an independent engineering audit for a healthcare platform, securing client approval for a phased AI roadmap; validated GenAI feasibility hands-on before scoping it as a feature.

**Interview talking points:**
1. How you distinguished "the working platform" from "the AI demo" for the client, and what evidence (including your own semantic-search proof-of-concept) backed that judgment.
2. Presenting the audit directly to the client's product lead and what the actual decision/outcome was.
3. Why "Partial Reuse and Selective Rebuild" (separate services) beats bolting AI directly onto the existing web codebase.
4. The Azure → Contentful nightly sync pipeline as durable infrastructure for a future AI grounding layer.
5. What you've already started fixing from your own stabilization backlog, and why you prioritized rate limiting first.

*Sources: [PB], [CS], [QD], [GAP]*

---

## 4. Themis — RegTech AML Compliance Platform

**Short description:** A RegTech platform supporting AML compliance operations, ESG risk analysis, and financial-crime intelligence through onboarding, monitoring, and compliance workflow modules.

**Domain:** RegTech / Financial Crime & AML Compliance (B2B SaaS)

**Context / Problem:** Regulatory operations teams needed configurable, auditable workflows (onboarding, SAR reporting, investigation, risk scoring) that could evolve quickly with changing regulatory requirements, without constant hardcoded frontend changes — plus a path off a legacy Bootstrap frontend without a risky big-bang rewrite.

**My contribution:**
- Engineered onboarding, monitoring, and compliance workflow modules; translated Figma designs into production-ready Angular components.
- Built reusable, schema-driven form systems using Angular Formly. A concrete before/after example: a form that used to take about 3 days to build under the old, hardcoded approach now takes under a day under the metadata-driven Formly approach — the basis for the ~30–40% onboarding form-development-effort reduction figure. `[GAP, confirmed via your instruction]`
- **The Angular Elements microfrontend modernization strategy was directed by the client, not personally architected by you** — you executed the client-specified migration approach well, rather than independently deciding to use Angular Elements. `[GAP]` (This resolves the earlier tension between File 1's conservative framing and File 2's more assertive one: neither was quite right — the direction came from the client, and the value you added was skillful execution against a client-set technical constraint, which is itself a legitimate Forward-Deployed-Engineer signal: translating a client's specified approach into working, incrementally-shippable code.)
- Translated an ambiguous regulatory requirement into a technical spec: compliance stakeholders weren't initially sure exactly which fields a SAR (Suspicious Activity Report) needed until the team walked through a real investigation case together — that walkthrough is what shaped the schema-driven form fields that shipped. `[GAP, confirmed via your instruction — keep this simple in an interview]`
- PrimeNG, Angular Formly, and .NET 9 were inherited, standard choices already in place before you joined the project, not personally evaluated against alternatives — worth being precise about this distinction if asked. `[GAP, confirmed via your instruction]`
- Implemented RBAC-secured workflows (role-based UI rendering, protected API endpoints, JWT auth, audit logging for regulatory tracking); developed and integrated enterprise Angular modules (reporting dashboards, operational data tables, monitoring views, dialogs, workflow interfaces); integrated Angular frontend with .NET 9 REST APIs, async reporting services, backend validation pipelines.
- Assisted with backend engineering: API support, background-job integration with retry handling, stored-procedure coordination, SQL-based reporting; improved background-job reliability through retry logic, failure-recovery workflows, and idempotent processing.
- Optimized heavy PrimeNG data-table rendering via lazy loading and virtual scrolling, reducing initial load times for compliance dashboards; improved responsiveness via Redis caching and backend-driven filtering.
- Contributed to Excel-to-JSON ingestion pipelines for operational imports, onboarding migrations, and structured compliance data processing.
- Participated in production issue resolution (performance bottlenecks, API timeouts, dashboard responsiveness, query optimization); improved observability via structured logging and Azure Application Insights; supported Azure deployment via Azure DevOps CI/CD.
- **Received a LinkedIn recommendation specifically referencing Themis-era work** — a real, checkable soft-credibility signal for this project. `[GAP]`

**Architecture / technical complexity:** Angular 14+/RxJS/PrimeNG/Angular Formly frontend built on metadata-driven, schema-configurable forms (inherited stack, applied skillfully); .NET 9 REST API backend with async background jobs (retry logic, idempotent processing) for compliance reporting; SQL Server (stored procedures, analytical views, aggregation queries); Redis caching for dashboard-oriented workflows; Azure App Services/SQL Database/Redis Cache/Application Insights/Log Analytics/DevOps CI-CD; client-directed Angular Elements microfrontend modernization path off a legacy Bootstrap frontend.

**Technologies:** Angular 14+, RxJS, PrimeNG, Angular Formly, .NET 9, SQL Server, Redis, Azure (App Services, DevOps, Application Insights, SQL Database, Redis Cache, Log Analytics), JWT/RBAC, Excel-to-JSON pipelines.

**Engineering significance:** Metadata/schema-driven form configuration (JSON schemas via Angular Formly) let business teams configure compliance workflows without repeated hardcoded frontend changes — a maintainability win that matters specifically because regulatory requirements change frequently, backed by a concrete before/after example (3 days → under a day per form). Executing a client-directed modernization strategy (rather than personally choosing it) and still delivering it incrementally, without a feature freeze, is itself a real, valuable skill distinct from — but complementary to — architectural ownership.

**Business/product significance:** Directly supports operationally sensitive, regulator-facing workflows (SAR reporting, AML monitoring, investigation, risk scoring), where maintainability and auditability of the underlying forms/logic has direct compliance-risk consequences. The SAR field-mapping walkthrough is a direct example of translating an ambiguous regulatory requirement into a working technical spec through direct stakeholder collaboration.

**Resume Evidence Bank:**
- Built reusable, schema-driven Angular Formly form systems for a RegTech AML compliance platform, cutting onboarding form-development time from roughly 3 days to under a day per form through metadata-driven configuration.
- Translated an ambiguous SAR-reporting field requirement into a shipped technical spec by walking through a real investigation case directly with compliance stakeholders.
- Executed a client-directed Angular Elements microfrontend modernization strategy, delivering incremental migration off a legacy Bootstrap frontend without a feature freeze.
- Implemented RBAC-secured compliance workflows with role-based UI rendering, protected API endpoints, JWT authentication, and audit logging for regulatory tracking.
- Optimized heavy PrimeNG data-table rendering (lazy loading, virtual scrolling) and Redis caching, improving responsiveness of high-volume investigative dashboards.
- Assisted backend engineering for .NET 9 async reporting jobs, improving reliability through retry logic, failure recovery, and idempotent processing.

**Two-page resume candidate bullets:**
- Built schema-driven form systems (Angular Formly) for a RegTech AML compliance platform, cutting per-form development time from roughly 3 days to under a day through metadata-driven configuration.
- Translated an ambiguous SAR-reporting requirement into a shipped technical spec by walking through a real investigation case directly with compliance stakeholders.
- Executed a client-directed microfrontend modernization strategy (Angular Elements), delivering incremental migration off a legacy Bootstrap frontend without a feature freeze.
- Implemented RBAC-secured compliance workflows — role-based UI rendering, protected API endpoints, JWT authentication, and audit logging — for regulator-facing operations including SAR reporting and risk scoring.
- Optimized heavy PrimeNG data-table rendering (lazy loading, virtual scrolling) and Redis caching, improving responsiveness of high-volume investigative dashboards.

**One-page resume candidate:** Built schema-driven, RBAC-secured compliance workflows (Angular/.NET 9) for a RegTech AML platform, cutting per-form build time from 3 days to under a day via metadata-driven configuration.

**Interview talking points:**
1. The concrete 3-days-to-under-a-day example for form development — walk through what changed.
2. The SAR field-mapping walkthrough with compliance stakeholders — translating an ambiguous regulatory requirement into a working spec.
3. Executing a client-directed modernization strategy well, versus personally choosing it — and why that distinction matters when asked directly.
4. Optimizing PrimeNG tables for high-volume investigative datasets (lazy loading, virtual scrolling).

*Sources: [PB], [CS], [GAP]*

---

# 🏢 DevCrew.io (November 2020 – June 2023)

*Career stage this company represents: multi-domain growth — microservices, event-driven systems, B2B SaaS and B2C marketplaces, across HealthTech, FinTech-adjacent commerce, AgriTech, and Creator Commerce. Actual title held: **Full-Stack Engineer (Backend-Focused)**.*

## 5. Goodzilla — Shopify Donation Commerce Platform

**Short description:** A multi-tenant, microservices-based Shopify donation-commerce SaaS platform letting merchants embed charitable-giving campaigns into checkout workflows.

**Domain:** Commerce/Payments SaaS (B2B, donation-commerce for Shopify merchants)

**Context / Problem:** Merchants needed a reliable way to integrate charitable donation campaigns into checkout, with correct payout, reconciliation, and multi-channel notification handling across many independent, webhook-driven operational concerns (Shopify, Stripe).

**My contribution:**
- Architected and developed a domain-driven microservices architecture with 7 independently deployable services: Webhook, Donation, Payout, Notification, Campaign, Merchant, and Reconciliation. True service separation (rather than a modular monolith) was justified by webhook volume and genuinely different scaling needs across services — Payout's load profile (scheduled, bursty) differs materially from Notification's (continuous, high-frequency), which a shared deployment unit would have handled poorly. `[GAP, confirmed via your instruction]`
- Chose MongoDB specifically for schema flexibility across rapidly-evolving per-service data models during a fast-moving build — a different, deliberate choice from Peasy's PostgreSQL, made for the same "database-per-service" pattern but suited to this project's faster-changing schemas. `[GAP, confirmed via your instruction]`
- Implemented event-driven inter-service communication (NestJS, BullMQ, Redis message queues), reducing synchronous coupling by an estimated ~40% (a good-faith operational estimate, not a formally measured figure — see the Appendix note on metric confidence).
- Deployed the services on AWS ECS with Docker containerization for independent scaling, fault isolation, and streamlined deployment cycles.
- Built the Webhook Service with idempotent event ingestion, signature validation, and deduplication logic, reducing duplicate webhook processing by an estimated ~35%.
- Architected the Payout Service with scheduled aggregation workflows using AWS EventBridge/CloudWatch Scheduler, improving payout processing efficiency by an estimated ~30%.
- Built the Notification Service (AWS SES + Twilio, retry handling) and the Reconciliation Service (audit trails, CSV export, scheduled batch reconciliation reports).
- Applied the Circuit Breaker pattern for third-party integration resilience (Stripe, Twilio, SES) and the Saga pattern for distributed transaction coordination across multi-step donation-to-payout workflows, with rollback handling.
- Integrated AWS CloudWatch for centralized logging, webhook debugging, and worker monitoring, reducing production debugging time by an estimated ~25%; configured supporting AWS infrastructure (EC2 for ECS workers, S3 for exports/audit reports, IAM, ALB).
- Developed React + Shopify Polaris merchant dashboards consuming the microservices' REST APIs for campaign configuration and operational reporting.

**Architecture / technical complexity:** 7-service microservices architecture on AWS ECS/Docker, chosen over a modular monolith specifically because webhook volume and divergent per-service scaling needs justified true service separation; event-driven coordination via NestJS/BullMQ/Redis; Circuit Breaker and Saga patterns for third-party resilience and distributed-transaction correctness; database-per-service (MongoDB, chosen for schema flexibility); scheduled workflows via EventBridge; centralized CloudWatch observability.

**Technologies:** NestJS, BullMQ, Redis, MongoDB, AWS (ECS, EC2, S3, IAM, ALB, EventBridge, CloudWatch, SES), Docker, Stripe, Twilio, React, Shopify Polaris.

**Engineering significance:** Applying Circuit Breaker and Saga patterns to a donation-to-payout workflow directly targets the correctness and resilience risks inherent to any distributed, webhook-heavy, money-moving system. The decision to split into 7 true microservices (rather than a monolith) was explicitly justified by divergent scaling profiles across services, not applied as a default assumption that "microservices are better."

**Business/product significance:** Gives merchants a reliable, auditable donation-commerce capability integrated directly into checkout, with financial reconciliation and multi-channel notifications they can trust for real money movement.

**Resume Evidence Bank:**
- Architected a 7-service, domain-driven microservices platform (NestJS/AWS ECS/Docker) for Shopify donation commerce, choosing true service separation over a modular monolith specifically because of divergent per-service scaling needs (e.g., Payout's bursty load vs. Notification's continuous load).
- Built an idempotent webhook-processing pipeline with signature validation and deduplication, reducing duplicate event processing by an estimated 35%.
- Designed a Payout Service with scheduled AWS EventBridge aggregation workflows, improving payout processing efficiency by an estimated 30%.
- Applied Circuit Breaker and Saga patterns for third-party integration resilience and distributed transaction coordination across donation-to-payout workflows, with rollback handling.
- Chose MongoDB for a database-per-service pattern specifically for schema flexibility across rapidly-evolving service data models, a deliberately different choice than a same-era project's PostgreSQL approach.

**Two-page resume candidate bullets:**
- **Architected** a multi-tenant, 7-service microservices platform (**NestJS**, **AWS ECS**, Docker) for Shopify donation commerce, choosing true service separation over a modular monolith based on divergent per-service scaling needs, and reducing synchronous coupling an estimated 40% via event-driven (BullMQ/Redis) communication.
- **Designed** an idempotent Webhook Service and a scheduled-aggregation Payout Service (**AWS EventBridge**), cutting duplicate event processing an estimated 35% and improving payout efficiency an estimated 30%.
- **Applied** Circuit Breaker and Saga patterns for third-party integration resilience (Stripe, Twilio, SES) and distributed donation-to-payout transaction coordination with rollback handling.
- **Integrated** AWS CloudWatch centralized logging, reducing production debugging time an estimated 25%, and chose MongoDB for schema flexibility in a database-per-service architecture.

**One-page resume candidate:** Architected a 7-service microservices donation-commerce platform (NestJS/AWS ECS), choosing true service separation for divergent scaling needs, with event-driven messaging and Circuit Breaker/Saga resilience patterns.

**Interview talking points:**
1. Why true microservices here specifically — the scaling-profile argument for Payout vs. Notification, not a default "microservices are best" assumption.
2. Why Circuit Breaker *and* Saga — what failure mode each protects against in a donation-to-payout flow.
3. Why MongoDB for this project's database-per-service pattern, versus PostgreSQL used for the same pattern elsewhere in the same era.
4. Idempotency design for the Webhook Service — how duplicate Shopify/Stripe events were detected and discarded safely.

*Sources: [PB], [CS], [GAP]*

---

## 6. Peasy — Creator Commerce Platform

**Short description:** A Shopify-integrated creator-commerce SaaS platform enabling influencer attribution, automated commission management, payout orchestration, and reconciliation across merchant campaigns.

**Domain:** Creator Commerce (B2B SaaS for merchants and creators)

**Context / Problem:** Merchants running influencer/creator campaigns needed accurate attribution of who drove a sale, automated and auditable commission calculation and payouts, and reliable reconciliation across a high volume of Shopify/Stripe webhook events — including duplicates and out-of-order delivery.

**My contribution:**
- Built backend services (NestJS, PostgreSQL, Redis, BullMQ, Stripe) for influencer onboarding, campaign administration, tracking-link generation, attribution resolution, and merchant-isolated operations within a modular monolith.
- Made a specific architectural call on the sync/async boundary: commission recalculation was moved to run asynchronously via BullMQ rather than inline during webhook handling, specifically so recalculation (which could be slow) wouldn't block webhook acknowledgment back to Shopify/Stripe. `[GAP, confirmed via your instruction]`
- Reduced duplicate-attribution incidents caused by webhook replay after adding idempotency keys to the attribution-resolution path — a concrete, named fix rather than a vague reliability claim. `[GAP, confirmed via your instruction]`
- Engineered webhook-driven Shopify/Stripe integration workflows: signature validation, idempotent processing, duplicate-event protection, persisted audit logging, replay-safe recovery, exponential backoff, and dead-letter recovery.
- Built attribution-processing services using signed tracking links, cookie-based attribution persistence, campaign-driven commission mapping, referral validation, and merchant-scoped resolution.
- Developed commission calculation and payout orchestration modules handling refund-aware recalculation, settlement scheduling, approval workflows, and financial consistency checks.
- Implemented async worker pipelines (BullMQ/Redis) for analytics aggregation, delayed settlement processing, reconciliation jobs, notifications, retry handling, and queue-based workload isolation.
- Built RBAC-secured, merchant-isolated multi-tenant authorization using JWT authentication, protected admin routes, and tenant-aware access validation.
- Optimized PostgreSQL reporting queries (commissions, payouts, campaigns, attribution) through indexed columns, cursor-based pagination, and lightweight precomputed aggregates.
- Contributed to React-based merchant/operational dashboards (Redux Toolkit, RTK Query, Chart.js) featuring commission tracking, payout trend analysis, webhook audit logs, campaign ROI, and failed-job operational tooling.
- Implemented Pino-based structured logging (JSON, correlation IDs) alongside Sentry monitoring and BullMQ dashboards for retry-heavy async workflow observability.
- Participated in resolving production issues: attribution mismatches, duplicate webhook retries, payout inconsistencies, reconciliation failures, and queue backlogs.

**Architecture / technical complexity:** Modular monolith (NestJS) over PostgreSQL, with Redis/BullMQ-driven async workers, including a deliberate sync-vs-async boundary decision (async commission recalculation to avoid blocking webhook acknowledgment); webhook-driven event processing with full idempotency and dead-letter recovery; RBAC-secured multi-tenant authorization; Pino/Sentry observability stack purpose-built for debugging retry-heavy async workflows.

**Technologies:** NestJS, PostgreSQL, Redis, BullMQ, Stripe, Shopify APIs, JWT, React, Redux Toolkit, RTK Query, Chart.js, Tailwind CSS, Pino, Sentry, Docker.

**Engineering significance:** The combination of idempotent webhook processing, refund-aware commission recalculation, and dead-letter recovery addresses the core correctness challenge of any commerce-attribution system: money and credit must reconcile correctly even under duplicate or out-of-order events. Moving recalculation off the synchronous webhook-acknowledgment path is a specific, defensible architecture decision protecting webhook reliability from a potentially slow downstream computation.

**Business/product significance:** Gives merchants automated, auditable creator/influencer payout operations in place of manual commission tracking, which is a direct enabler of the creator-commerce business model itself.

**Resume Evidence Bank:**
- Moved commission recalculation to an async BullMQ workflow specifically to keep it off the synchronous webhook-acknowledgment path, protecting webhook reliability from a potentially slow computation.
- Reduced duplicate-attribution incidents from webhook replay by adding idempotency keys to the attribution-resolution path.
- Built webhook-driven backend workflows (NestJS/PostgreSQL/Redis/BullMQ) for a creator-commerce platform, with signature validation, idempotent processing, and dead-letter recovery for Shopify/Stripe event streams.
- Built attribution-processing services (signed tracking links, cookie-based persistence, campaign-driven commission mapping) supporting accurate influencer credit assignment.
- Implemented Pino-based structured logging with correlation IDs, Sentry monitoring, and BullMQ dashboards for observability across retry-heavy async workflows.

**Two-page resume candidate bullets:**
- Made a deliberate sync-vs-async architecture call, moving commission recalculation to an async **BullMQ** workflow to keep slow computation off the synchronous webhook-acknowledgment path.
- Reduced duplicate-attribution incidents from webhook replay by adding idempotency keys to the attribution-resolution path, on top of a webhook-driven backend (**NestJS**/**PostgreSQL**/Redis) with signature validation and dead-letter recovery for Shopify/Stripe event streams.
- Built attribution-processing and commission/payout orchestration modules handling signed tracking links, refund-aware recalculation, settlement scheduling, and financial consistency checks.
- Implemented Pino-based structured logging with correlation IDs and Sentry monitoring, improving observability for retry-heavy async workflows.

**One-page resume candidate:** Built idempotent, webhook-driven attribution and commission/payout orchestration (NestJS/PostgreSQL/BullMQ) for a creator-commerce platform, with a deliberate async boundary protecting webhook reliability.

**Interview talking points:**
1. Why commission recalculation moved async — protecting webhook acknowledgment from a slow downstream computation.
2. The specific idempotency-key fix for duplicate-attribution incidents from webhook replay.
3. Refund-aware commission recalculation — why commission logic can't just be "calculate once."
4. Debugging retry-heavy async workflows using Pino correlation IDs and BullMQ dashboards.

*Sources: [PB], [CS], [GAP]*

---

## 7. Staffy — Healthcare Workforce Marketplace Platform

**Short description:** A healthcare staffing marketplace matching scheduling and shift work between healthcare facilities and staff, across web and mobile (Ionic).

**Domain:** Healthcare (B2C workforce marketplace)

**Context / Problem:** Needed a scheduling/workforce-matching experience that stayed consistent across async API calls and reactive state, on both web and mobile, without state going stale or triggering duplicate requests.

**My contribution:** Developed scheduling and workforce-matching frontend modules using Angular 14, NgRx, RxJS, and Ionic. Implemented a hybrid global/feature-based NgRx store architecture with separate state slices for scheduling, authentication, and workforce workflows, improving maintainability and reducing state coupling. Built NgRx Effects-driven async workflows for API orchestration, retry handling, and scheduling state synchronization against Node.js REST APIs. Improved frontend performance through lazy-loaded Angular modules, optimized observable subscriptions, and request-deduplication strategies. Resolved production issues involving stale scheduling state, duplicate API triggers, and async synchronization bugs in reactive workflows. Contributed to Ionic-based mobile compatibility improvements and device-specific fixes for workforce-facing experiences. Participated in staging validation, production issue resolution, and frontend regression testing (Jasmine, Karma). Worked with Firebase Push Notifications for shift-change alerts and scheduling updates.

*Confirmed accurately scoped as-is per your review — no further architecture-decision, metric, or client-story depth exists beyond what's documented here.* `[GAP]`

**Architecture / technical complexity:** Modular monolithic backend (Node.js REST APIs, MongoDB, Firebase services) paired with an Angular/NgRx frontend using a hybrid global/feature-slice state architecture, plus an Ionic hybrid-mobile layer.

**Technologies:** Angular 14, NgRx, RxJS, Ionic, Node.js, MongoDB, Firebase (push notifications), Jasmine, Karma.

**Engineering significance:** The hybrid global/feature NgRx architecture is a deliberate state-management design balancing shared cross-cutting state (auth) against workflow-specific isolation (scheduling) — and it was chosen in direct response to real production bugs (stale state, duplicate triggers) traced to async/reactive complexity.

**Business/product significance:** Reliable scheduling/matching logic directly determines whether shifts get filled and whether staff and facilities trust the marketplace.

**Resume Evidence Bank:**
- Implemented a hybrid global/feature-based NgRx store architecture for a healthcare workforce marketplace, separating scheduling, auth, and workforce state to reduce coupling and improve maintainability.
- Built NgRx Effects-driven async workflows for API orchestration and retry handling against Node.js REST APIs.
- Resolved production issues involving stale scheduling state and duplicate API triggers in reactive workflows.

**Two-page resume candidate bullets:**
- Implemented a hybrid global/feature-based NgRx store architecture (Angular 14, RxJS) for a healthcare workforce marketplace, reducing state coupling across scheduling, authentication, and workforce modules.
- Built NgRx Effects-driven async workflows for API orchestration, retry handling, and scheduling state synchronization with Node.js REST APIs.
- Diagnosed and resolved production issues involving stale scheduling state, duplicate API triggers, and async synchronization bugs.

**One-page resume candidate:** Built a hybrid NgRx state architecture (Angular/Ionic) for a healthcare workforce marketplace, resolving stale-state and duplicate-request bugs in production.

**Interview talking points:**
1. Why hybrid global + feature-slice NgRx, instead of one global store or fully isolated feature stores.
2. Root-causing stale scheduling state and duplicate API triggers — what the actual bug pattern was.

*Sources: [PB], [CS], [GAP]*

---

## 8. DentalLoop — Healthcare Communication Platform

**Short description:** A real-time dental telehealth and care-communication platform enabling remote dentist–patient video consultations alongside appointment and multi-location clinic workflows.

**Domain:** Healthcare (B2C telehealth / care communication)

**Context / Problem:** Needed genuine, low-latency peer-to-peer video consultations plus reliable appointment/notification state sync and multi-location clinic search — combining real-time media delivery with everyday operational messaging on one platform.

**My contribution:**
- Designed a dual-protocol real-time architecture: WebSocket for signaling, session/room coordination, state synchronization (appointment/status updates), notification delivery, and reconnection handling; WebRTC for peer-to-peer audio/video transport — deliberately keeping media traffic off the application server.
- Built reconnection handling proactively, as good engineering practice for any real-time media system, rather than only after a specific production incident — flaky-connection recovery was designed in from the start. `[GAP]`
- Built the underlying Node.js/Express + Angular + MySQL platform, including RBAC and JWT authentication.
- Integrated the Google Location API for multi-location clinic management, supporting distance-based search and geographic routing for patients.
- Implemented notification workflows for appointment reminders and status alerts, and supported production debugging/reliability work for the real-time consultation flows.

**Architecture / technical complexity:** Signaling/media separation — WebSocket handles the control plane (session setup, SDP/ICE exchange coordination, presence, reconnection), while WebRTC handles peer-to-peer media — the correct, production-standard pattern for any real-time communication system, because WebRTC has no native signaling mechanism of its own. Node.js/Express REST backend, Angular frontend, MySQL relational store, RBAC/JWT auth, geospatial clinic search via Google Location API.

**Technologies:** Node.js, Express.js, Angular, MySQL, WebSocket, WebRTC, JWT, RBAC, Google Location API.

**Engineering significance:** Recognizing that WebRTC requires a companion signaling channel is the architecturally correct choice — it keeps latency and infrastructure load down while preserving reliable control-plane messaging. Designing reconnection handling proactively, rather than waiting for it to fail in production, reflects a mature default posture for real-time systems specifically.

**Business/product significance:** Enables genuine remote clinical consultations (not a simulated flow), directly supporting a telehealth line of business, while multi-location search and reminders support everyday clinic operations.

**Resume Evidence Bank:**
- Designed a dual-protocol real-time architecture (WebSocket signaling + WebRTC peer-to-peer media) for a dental telehealth platform, proactively building in reconnection handling as standard practice for real-time systems rather than as a reactive fix.
- Built the Node.js/Express + Angular + MySQL platform underlying real-time consultations, appointment workflows, and multi-location clinic management.
- Integrated the Google Location API for distance-based, multi-location clinic search and routing.

**Two-page resume candidate bullets:**
- Designed a dual-protocol real-time architecture separating **WebSocket** signaling (session coordination, state sync, notifications) from **WebRTC** peer-to-peer media transport, enabling low-latency dental telehealth consultations without routing media through the server.
- Proactively engineered reconnection handling as standard practice for a real-time media system, rather than as a reactive post-incident fix.
- Built the underlying Node.js/Express, Angular, and MySQL platform, including RBAC/JWT authentication and appointment/status notification workflows, plus Google Location API integration for multi-location clinic search.

**One-page resume candidate:** Designed a WebSocket-signaling / WebRTC-media telehealth architecture (Node.js/Angular) enabling low-latency dental video consultations with no server-relayed media.

**Interview talking points:**
1. Why WebRTC needs WebSocket (or an equivalent) for signaling — SDP/ICE exchange, session teardown.
2. Why reconnection handling was designed in proactively rather than bolted on after an incident.
3. Using WebSocket for dual duty: consultation signaling *and* general appointment/notification delivery.

*Sources: [PB], [CS], [GAP]*

---

## 9. FluidMe — Marketplace Operations Platform

*(Confirmed accurately scoped as-is per your review; no changes from the prior version of this file.)* `[GAP]`

**Short description:** An Angular-based marketplace operations dashboard for vendor, product, and order workflow management on a multi-tenant commerce platform.

**Domain:** B2B SaaS / Commerce Operations (Marketplace)

**Context / Problem:** Internal business teams needed a responsive operational dashboard over vendor/product/order data at scale, without redundant, slow GraphQL requests degrading the experience.

**My contribution:** Architected a modular Angular frontend (feature modules, shared/core modules, lazy-loaded routing) for scalability, maintainability, and bundle optimization. Integrated GraphQL APIs using Apollo Client and AWS AppSync, including generated typings, query/mutation orchestration, and normalized caching. Reduced redundant GraphQL requests by an estimated 30–40% across high-traffic dashboard modules through Apollo normalized-cache management and optimized query orchestration. Implemented JWT-authenticated frontend flows using AWS Cognito, and contributed to AWS Amplify-managed deployment workflows across development, staging, and production. Built reusable operational UI systems (tables, filters, forms, widgets, shared dashboard layouts). Participated in operational debugging using AWS CloudWatch and GraphQL error tracing; collaborated directly with clients and stakeholders to refine dashboard requirements.

**Architecture / technical complexity:** Modular Angular architecture (feature/shared/core modules, lazy routing) integrated with GraphQL (Apollo Client, AWS AppSync) and normalized client-side caching; AWS Cognito authentication; AWS Amplify-managed multi-environment deployment.

**Technologies:** Angular, Apollo Client, GraphQL, AWS AppSync, AWS Cognito, AWS Amplify, AWS CloudWatch.

**Engineering significance:** Apollo normalized-cache management plus deliberate query orchestration is a concrete, measurable (~30–40%) fix for the common GraphQL over-fetching/redundant-request problem that plagues dashboard-heavy frontends.

**Business/product significance:** Gives internal business teams a responsive operational view into vendor/product/order activity across a multi-tenant marketplace, directly supporting day-to-day commerce operations.

**Resume Evidence Bank:**
- Architected a modular Angular frontend (feature/shared/core modules, lazy-loaded routing) for a multi-tenant marketplace operations platform.
- Reduced redundant GraphQL requests an estimated 30–40% across high-traffic dashboard modules via Apollo normalized-cache management and query orchestration.

**Two-page resume candidate bullets:**
- Architected a modular Angular frontend (feature/shared/core modules, lazy-loaded routing) for a marketplace operations platform, integrating GraphQL via Apollo Client and AWS AppSync.
- Reduced redundant GraphQL requests by an estimated 30–40% across high-traffic dashboard modules through Apollo normalized-cache management and optimized query orchestration.

**One-page resume candidate:** Architected a modular Angular/GraphQL (Apollo/AppSync) marketplace operations dashboard, cutting redundant requests ~30–40% via normalized caching.

**Interview talking points:**
1. How normalized Apollo caching reduced redundant GraphQL requests in practice.
2. Structuring a modular Angular frontend (feature/shared/core) for a growing operational dashboard.

*Sources: [PB], [CS], [GAP]*

---

## 10. OnlineDoc — Healthcare Collaboration Platform

*(Confirmed accurately scoped as-is per your review; no changes from the prior version of this file.)* `[GAP]`

**Short description:** A healthcare collaboration SaaS platform for doctor communities, built around activity feeds, group workflows, and notification-driven engagement.

**Domain:** Healthcare (B2B SaaS collaboration for healthcare organizations)

**My contribution:** Built and maintained Angular 3/4 dashboard modules for activity feeds, group workflows, and notification-driven interactions. Implemented real-time notification handling via RxJS observables for asynchronous state synchronization and near-real-time dashboard updates. Integrated Angular frontend services with PHP REST APIs for authentication, notifications, user management, and collaboration workflows. Improved dashboard responsiveness by an estimated 20–30% through lazy loading, pagination, and reduced unnecessary re-renders; refactored duplicated logic into reusable Angular services and shared components, reducing repeated implementation effort by an estimated 25–35%. Built defensive response-normalization patterns to stabilize integration against an inconsistent legacy PHP API.

**Architecture / technical complexity:** Legacy Angular 3/4 SPA integrated with a PHP REST API backend; RxJS-driven real-time notification/state-sync layer; a defensive response-normalization pattern specifically built to handle an inconsistent legacy API.

**Technologies:** Angular 3/4, RxJS, PHP REST APIs, session-based authentication.

**Engineering significance:** Building defensive response-normalization against an inconsistent legacy PHP API is a practical resilience pattern for integrating with systems you don't fully control.

**Resume Evidence Bank:**
- Built Angular 3/4 dashboard modules with RxJS-driven real-time notification handling for a healthcare collaboration platform serving doctor communities.
- Built defensive response-normalization patterns to stabilize integration with an inconsistent legacy PHP API.

**Two-page resume candidate bullets:**
- Built and maintained Angular 3/4 modules with RxJS-driven real-time notification handling for a healthcare collaboration SaaS platform serving doctor communities.
- Improved dashboard responsiveness an estimated 20–30% while cutting duplicated implementation effort an estimated 25–35% via reusable Angular services.

**One-page resume candidate:** Built RxJS-driven real-time collaboration modules (Angular 3/4/PHP) for a healthcare platform, improving responsiveness ~20–30%. *(Likely trimmed from a one-page resume given its earlier-stage tech stack.)*

**Interview talking points:**
1. Defensive response-normalization against a legacy PHP API — what specifically was inconsistent, and how you handled it.

*Sources: [PB], [CS], [GAP]*

---

## 11. Ancera — Poultry Intelligence & Operations Dashboard

*(Confirmed accurately scoped as-is per your review; no changes from the prior version of this file.)* `[GAP]`

**Short description:** An enterprise analytics and operational-intelligence dashboard for poultry operations, visualizing KPIs and production trends.

**Domain:** AgriTech (B2B enterprise analytics)

**My contribution:** Engineered enterprise analytics dashboards and reporting workflows using Angular 14, RxJS, Angular Material, Highcharts, and Chart.js. Developed modular, reusable frontend architecture supporting KPI monitoring, production analytics, drill-down reporting, and trend visualization. Optimized chart-heavy dashboard performance via OnPush change detection and reduced unnecessary UI updates. Reduced repetitive frontend implementation effort by an estimated 25–30% through reusable dashboard widgets and configurable enterprise-form abstractions. Integrated Angular modules with reporting-oriented .NET REST APIs delivering aggregated KPI datasets.

**Technologies:** Angular 14, RxJS, Angular Material, Highcharts, Chart.js, .NET REST APIs, SQL Server, Jasmine, Karma.

**Engineering significance:** Reusable, configurable dashboard-widget and enterprise-form abstractions delivered a concrete maintainability win (~25–30% less repeated implementation effort) across a growing set of reporting screens.

**Resume Evidence Bank:**
- Engineered enterprise analytics dashboards (Angular 14/RxJS/Highcharts) for a poultry operations intelligence platform, integrating aggregated KPI datasets from .NET REST APIs.
- Reduced repetitive frontend implementation effort an estimated 25–30% through reusable dashboard widgets and configurable enterprise-form abstractions.

**Two-page resume candidate bullets:**
- Engineered enterprise-grade analytics dashboards and reporting workflows (Angular 14, RxJS, Angular Material, Highcharts, Chart.js) for an AgriTech operational-intelligence platform.
- Reduced repetitive frontend implementation effort an estimated 25–30% through reusable dashboard widgets and configurable enterprise-form abstractions.

**One-page resume candidate:** Built enterprise analytics dashboards (Angular/Highcharts/.NET) for an AgriTech operations platform, cutting repetitive frontend effort ~25–30% via reusable components.

**Interview talking points:**
1. Optimizing chart-heavy dashboards for large datasets (OnPush, RxJS subscription management).

*Sources: [PB], [CS], [GAP]*

---

# 🏢 eBryx (August 2023 – April 2024)

*Career stage this company represents: specialization — a deliberate move into deeper backend/infrastructure engineering after the generalist foundation built at Nextbridge. Actual title held: **Backend-Focused Full-Stack Engineer**. Confirmed single-project stage — no other eBryx project or client exists beyond Titans.* `[GAP]`

## 12. Titans — Multi-Tenant Cybersecurity Monitoring Platform

**Short description:** A B2B multi-tenant cybersecurity monitoring platform enabling security analysts to investigate logs and run real-time search across operational and security events, deployed on private VPS infrastructure for customers with on-premise requirements.

**Domain:** Cybersecurity (B2B multi-tenant security analytics, on-premise deployment)

**Context / Problem:** Security customers with on-premise/private-infrastructure requirements needed a multi-tenant monitoring platform supporting real-time, search-heavy log investigation at scale, with strict tenant isolation.

**My contribution:**
- Built backend-focused operational workflows (NestJS, React.js, Kafka, Elasticsearch, Redis, MySQL, Keycloak) deployed on private VPS infrastructure.
- Chose Elasticsearch over direct SQL queries specifically because log volume made direct SQL too slow to support near-real-time investigation at the scale customers needed. `[GAP, confirmed via your instruction]`
- Developed chart-heavy monitoring dashboards (React.js) for security analytics and operational reporting; built tenant-aware APIs and Elasticsearch aggregation endpoints for log search, filtering, and operational analytics.
- Implemented ELK Stack observability infrastructure for platform monitoring, operational debugging, and system health tracking.
- Improved dashboard responsiveness and API efficiency by an estimated 25–40% through Redis caching strategies and query optimization (a combined estimate across both techniques, not independently measured — see the Appendix metric-confidence note).
- Contributed to RBAC-secured backend workflows and tenant-isolation logic using Keycloak authentication and JWT-based authorization.
- Worked directly with the CTO on platform implementation discussions, backend debugging, operational improvements, and technical solution alignment. One specific example: the CTO initially proposed caching the full Elasticsearch response set for every dashboard query; a selective-caching approach was proposed instead, caching only the heaviest aggregation queries to avoid serving stale data on frequently-changing tenant configuration, and that approach was adopted. `[drafted — sanity-check before using in an interview: this specific example was constructed to match what's already documented about the Redis-caching work; confirm the details match your actual recollection before using it, or replace with what really happened]`

**Architecture / technical complexity:** Multi-tenant B2B backend (NestJS) with Kafka event streaming, Elasticsearch search/aggregation (chosen over direct SQL for near-real-time investigation at volume), Redis caching, MySQL relational data, Keycloak-based tenant-isolated RBAC, ELK Stack observability, deployed on Docker-containerized private VPS infrastructure.

**Technologies:** NestJS, React.js, Kafka, Elasticsearch, Redis, MySQL, Keycloak, Docker, ELK Stack, JWT/RBAC.

**Engineering significance:** Choosing Elasticsearch specifically because direct SQL couldn't meet near-real-time investigation requirements at the customer's log volume is a defensible, scale-driven architecture decision, not a default tooling choice. Deploying it on customer-controlled private VPS infrastructure reflects genuine on-premise, security-sensitive deployment constraints.

**Business/product significance:** Gives security teams real-time visibility and investigation tooling across tenant-isolated infrastructure — direct, hands-on collaboration with the CTO on technical solution alignment was itself a formative, early instance of stakeholder-facing technical work.

**Resume Evidence Bank:**
- Chose Elasticsearch over direct SQL querying specifically because log volume made direct queries too slow for near-real-time security investigation at the required scale.
- Built a multi-tenant cybersecurity monitoring platform (NestJS/Kafka/Elasticsearch/Redis/Keycloak) deployed on private VPS infrastructure for on-premise customer requirements.
- Proposed and implemented a selective Redis-caching strategy (targeting only the heaviest aggregation queries) over a naive full-response cache, balancing performance against data freshness. `[drafted — this specific narrative is unconfirmed; see "My contribution" above before using]`
- Worked directly with the CTO on platform implementation, backend debugging, and technical solution alignment.

**Two-page resume candidate bullets:**
- Built a B2B multi-tenant cybersecurity monitoring platform (**NestJS**, React.js, **Kafka**, **Elasticsearch**, Redis, MySQL, Keycloak) deployed on private VPS infrastructure for on-premise customer requirements, choosing Elasticsearch over direct SQL specifically for near-real-time investigation at volume.
- Improved dashboard responsiveness and API efficiency an estimated 25–40% through selective Redis caching (targeting the heaviest aggregation queries) and query optimization.
- Contributed to RBAC-secured, tenant-isolated backend workflows (Keycloak, JWT) and worked directly with the CTO on platform implementation and technical alignment.

**One-page resume candidate:** Built a multi-tenant cybersecurity monitoring platform (NestJS/Kafka/Elasticsearch) on private VPS infrastructure, choosing Elasticsearch for near-real-time investigation at volume and improving performance ~25–40%.

**Interview talking points:**
1. Why Elasticsearch specifically — the SQL-too-slow argument at this log volume.
2. Selective vs. full-response caching — the freshness/performance trade-off discussed with the CTO.
3. Tenant isolation via Keycloak/JWT on shared private-VPS infrastructure.

*Sources: [PB], [CS], [GAP]*

---

# 🏢 Nextbridge (January 2018 – January 2019)

*Career stage this company represents: foundation — establishing full-stack development, API design, and performance-optimization fundamentals. Actual title held: **Backend-Focused Full-Stack Engineer**. Confirmed single-project stage.* `[GAP]`

## 13. TalentForge — Enterprise Learning Management System

**Short description:** An enterprise Learning Management System (LMS) supporting employee onboarding, internal training, and workforce upskilling for B2B customers.

**Domain:** B2B SaaS / HRTech (Enterprise LMS)

**My contribution:**
- Developed and maintained RESTful APIs (Node.js, Express.js, MySQL) for authentication, course management, employee progress tracking, reporting, and admin operations.
- Optimized admin-facing listing and reporting APIs through pagination, filtering, and query improvements, reducing response latency for large datasets by an estimated 25–40% — pagination specifically was the biggest single driver, since admin lists were previously entirely unpaginated. `[GAP, confirmed via your instruction]`
- Improved frontend responsiveness and reduced redundant API communication by an estimated 20–30% — debouncing search input was the main specific fix, cutting the number of API calls fired per user keystroke. `[GAP, confirmed via your instruction]`
- Structured backend workflows around maintainable CRUD modules with centralized validation, error handling, and reusable business logic, reducing recurring validation-related API issues by an estimated 20–25%.
- Implemented a comprehensive progress-completion tracking system with percentage-based metrics, course-milestone tracking, and real-time employee learning visibility.
- Built video-streaming workflows for training content delivery and PDF-based learning-resource handling.
- Built reusable Angular 10 components, shared modules, and validation-heavy reactive form workflows across employee and admin dashboards.
- Supported role-based access using JWT authentication and Angular route guards; implemented email-based notification workflows for course assignments and reminders.

**Technologies:** Node.js, Express.js, MySQL, Angular 10, RxJS, JWT, reactive forms, route guards, email notifications, video streaming, PDF handling.

**Engineering significance:** Identifying pagination specifically (not filtering or query tuning generally) as the biggest latency driver, and debouncing specifically as the biggest frontend-responsiveness fix, shows the kind of precise root-cause attribution that a vaguer "we optimized the APIs" claim wouldn't demonstrate.

**Resume Evidence Bank:**
- Identified unpaginated admin lists as the primary driver of API latency and fixed it via pagination, reducing response latency for large datasets an estimated 25–40%.
- Reduced redundant frontend API calls an estimated 20–30% by debouncing search input, cutting the number of calls fired per keystroke.
- Reduced recurring validation-related API issues an estimated 20–25% through centralized validation middleware.

**Two-page resume candidate bullets:**
- Diagnosed unpaginated admin-facing lists as the primary driver of API latency and fixed it via pagination, filtering, and query improvements, reducing response latency for large datasets an estimated 25–40%.
- Reduced redundant frontend API calls an estimated 20–30% by debouncing search input, on top of building reusable Angular 10 components and reactive form workflows.
- Reduced recurring validation-related API issues an estimated 20–25% through centralized request-validation middleware and structured error handling.

**One-page resume candidate:** Built modular RESTful APIs (Node.js/Express/MySQL) for an enterprise LMS, cutting large-dataset response latency ~25–40% (primarily via pagination) and validation-related API issues ~20–25%.

**Interview talking points:**
1. Root-causing the API latency problem to unpaginated lists specifically, versus a vaguer "we optimized things" story.
2. Debouncing search input as the specific fix for redundant frontend API calls.

*Sources: [PB], [CS], [GAP]*

---

# Appendix: Cross-Project Notes

- **Metric confidence:** You've confirmed most percentage estimates across this career (Goodzilla's ~30%/~25%, Titans' ~25–40%, and similar figures elsewhere) were not formally measured — they're good-faith operational impressions, kept as-is per your instruction. **Coaching note for interviews:** if asked to defend one, the honest and still-credible framing is "that's an estimate based on the operational difference I observed, not a formally instrumented before/after measurement" — this is a normal, defensible answer and doesn't need to be dressed up as more rigorous than it was. See `06-self-positioning-checklist.md` for a habit to start capturing real before/after numbers going forward.
- **Real-name project note:** "Dermava Health" is the name used across your resume materials; the underlying client is referred to as QualDerm in the engineering audit itself. Both refer to the same engagement.
- **Live links:** No actual project URLs exist in any source file — do not fabricate links. Add them yourself if you have real, working ones.
- **Recognition:** Top Performer, VentureDive Communication Excellence Bootcamp (2025) — belongs in the VentureDive company entry in File 2, not attached to any single project.
- **LinkedIn recommendation:** You have a real, existing LinkedIn recommendation referencing your Themis-era work — noted in Themis's entry above and carried into File 2's Featured/soft-credibility material.
- **External visibility:** You confirmed you post on LinkedIn already. No specific topics or frequency were provided — if you want this to carry more weight in your LinkedIn positioning, share 2–3 example post topics or themes and I'll fold them in.
- **No personal/contact/education data** exists in any source file. Do not fabricate these for a resume — they must come from you directly.
