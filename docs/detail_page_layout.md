# Detail Page Header Architecture

## Overview
This document outlines the architectural decision to restructure the header section of Blog Post and Project Detail pages. The goal is to align with modern UX best practices by separating the visual "Hero" element from the textual hierarchy.

## Design Philosophy
-   **No Text on Images**: Text-on-image often suffers from contrast issues. Separating them ensures accessibility and consistent legibility.
-   **Clear Hierarchy**: Establish a predictable reading order:
    1.  **Hero Image**: Visual Context / Impact.
    2.  **Navigation**: Orientation (Back button).
    3.  **Topic**: Primary Heading (Title).
    4.  **Metadata**: Context (Date, Role, Technologies).

## Layout Specification

### Common Structure
```tsx
<Container>
  {/* 1. Visual Anchor */}
  <HeroImageContainer>
     <Image src={dynamicSource} /> {/* Full width or contained, no text overlay */}
  </HeroImageContainer>

  {/* 2. Navigation */}
  <NavigationRow>
     <BackButton /> {/* Pill shape or simple link */}
  </NavigationRow>

  {/* 3. Header Content */}
  <HeaderBlock>
     <Title />
     <Metadata />
  </HeaderBlock>

  {/* 4. Main Body */}
  <ContentBody />
</Container>
```

### Blog Detail Implementation
-   **File**: `src/app/blog/[slug]/page.tsx`
-   **Image Source**: `post.image` (from MDX frontmatter).
-   **Fallback**: Gradient/Placeholder if no image.

### Project Detail Implementation
-   **File**: `src/app/projects/[id]/page.tsx`
-   **Image Source**: `project.image` (from data file).
-   **Fallback**: generated gradient with project initials.
