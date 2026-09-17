<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Development Skill / Project Specification

## Khakim Interior | Premium Custom Interior Design Website

### Next.js App Router + Supabase PostgreSQL + Prisma + Cloudinary + Auth.js + Tailwind CSS + shadcn/ui + Framer Motion

> This document is **source of truth** for the AI coding assistant/developer working on the project.
> All subsequent implementations must follow architecture, design system, data flow, security rules, and coding conventions di this document.
>
> **Primary goal:** build a premium custom interior design website for **Khakim Interior** that feels like a high-end architecture/interior studio portfolio: calm, editorial, minimal, whitespace-driven, typography-led, image-focused, and animated with a slow, deliberate rhythm.

---

# 1. PRODUCT OVERVIEW

Build the company website for **Khakim Interior**, a custom interior design brand, with two areas:

### Brand Identity

The official brand name is:

```text
Khakim Interior
```

The brand name must be used consistently across:

- public navigation
- browser titles
- SEO metadata
- Open Graph
- Twitter/X cards
- structured data
- favicon/brand assets
- footer
- admin branding
- social sharing previews

Do not invent business facts such as awards, years of experience, locations, project counts, client names, certifications, press coverage, or service areas unless the real information is supplied.

### Public Website

Public pages accessible to all visitors:

- `/` → Home
- `/services` → Services
- `/portfolio` → portfolio/project list
- `/portfolio/[slug]` → portfolio/project detail
- `/about` → About Us
- `/gallery` → Gallery visual
- `/contact` → Kontak

### Admin Dashboard

The admin area only for satu akun administrator:

- `/admin/login`
- `/admin/dashboard`
- `/admin/portfolio`
- `/admin/portfolio/new`
- `/admin/portfolio/[id]/edit`
- `/admin/gallery`
- `/admin/messages`

The dashboard is mainly used for:

1. create, updating, and deleting portfolio.
2. Managing portfolio cover images.
3. Managing project image order.
4. Uploading images to Cloudinary.
5. creating, updating, and deleting gallery item.
6. Managing gallery image orientation for masonry layout.
7. Reading messages from the contact form.
8. Marking messages as read/unread.

The `services` and `about` pages can remain **editorial/static content** in the first phase so the CMS stays simple. If content later needs to be edited by the admin, create a separate CMS model in a later phase and keep it separate from the core schema.

---

# 2. CORE DESIGN DIRECTION

## Brand Personality

The website should feel:

- Elegant
- Minimalist
- Sophisticated
- Architectural
- Editorial
- Quiet luxury
- Premium
- Timeless
- Warm
- Intentional

Visual references may draw general principles from:

- Architectural Digest
- High-end architecture studios
- Boutique interior design firms
- Luxury hospitality websites
- Editorial design magazines

Do not directly imitate layout, copywriting, or identitas visual brand tertentu in a langsung.

---

# 3. DESIGN SYSTEM

## 3.1 Typography

Use two font families from `next/font/google`.

### Heading / Display

Default:

- `Cormorant Garamond`

Alternatives may be used when needed:

- `Playfair Display`
- `Cinzel`

Karakter:

- editorial
- high contrast
- elegant
- generous line height
- not overly bold

### Body / UI

Default:

- `Manrope`

Alternatif:

- `Inter`
- `Lato`

Karakter:

- clean
- modern
- highly readable
- restrained

### Typography Rules

Use a clear hierarchy:

```text
Hero heading       → sangat besar, serif, light/regular
Page heading       → besar, serif
Section heading    → medium-large, serif
Card title         → serif or sans according to context
Body copy          → sans-serif
Metadata           → sans-serif, uppercase, small tracking
Navigation         → sans-serif, medium
CTA                → sans-serif, medium
```

Do not use too many font weights.

Use whitespace to create hierarchy, not only font size.

---

# 4. COLOR SYSTEM

Main background **must not** using pure white `#ffffff`.

Use a muted palette:

```text
Background        #F5F3EE
Surface           #FBFAF7
Surface Muted     #ECE8DF

Foreground        #272625
Foreground Soft   #55524D

Border            #DDD8CE

Sage              #87927F
Sage Dark         #687261

Warm Taupe        #A69584
Terracotta        #B8836D

White Soft        #F8F7F3
Black Soft        #1E1D1B
```

### Rules

- Main background: warm off-white.
- Text: charcoal/soft black.
- Use accents sparingly.
- Sage/taupe menjadi aksen, bukan warna dominan.
- Hinfrom gradient neon.
- Hinfrom pure black.
- Avoid pure white as the main background.
- Do not use too many colors.
- Every page should maintain a calm visual rhythm.

---

# 5. SPACING & LAYOUT

Whitespace is part of the design.

Use:

- `py-20`
- `py-24`
- `py-32`
- `py-40`
- `gap-8`
- `gap-12`
- `gap-16`
- `gap-20`

as needed.

### Container

Default:

```text
max-width: 1280px
padding horizontal: responsive
```

Prinsip:

```text
Mobile  → px-5 / px-6
Tablet  → px-8
Desktop → px-10 / px-12
```

Do not make every section full-width without a reason.

Use full-bleed only when the image is the focal point.

---

# 6. IMAGE DIRECTION

Photography is one of the website's primary elements.

Use:

- large architectural photography
- interior details
- material textures
- lighting
- furniture composition
- spatial composition
- close-up details

All images:

- using Next.js `<Image>`
- `object-cover`
- mempertahankan aspect ratio
- has `alt`
- using responsive sizes
- optimized for performance

Do not use a regular `<img>` for image that can dioptimalkan through Next.js.

---

# 7. MOTION DESIGN

use `framer-motion`.

Animations must be:

- subtle
- slow
- deliberate
- smooth
- premium

### Default Motion Language

Durasi umum:

```text
0.5s - 0.9s
```

for hero image:

```text
8s - 20s
```

for slow Ken Burns effect.

### Allowed animations

#### Fade Up

```text
opacity: 0 → 1
y: 20 → 0
```

#### Stagger Reveal

Cards/gallery should appear one at a time with a small delay.

#### Image Reveal

Images should emerge slowly from a masked container.

#### Ken Burns

Image scale:

```text
1.00 → 1.04 / 1.06
```

in a perlahan.

### Disallowed animations

- bounce bermorean
- elastic scale
- spinning UI
- rapid parallax
- chaotic hover
- excessive page transitions

Respect:

```css
prefers-reduced-motion
```

---

# 8. RESPONSIVE DESIGN

Wajib responsive:

- 360px+
- 390px
- 430px
- tablet
- laptop
- desktop
- wide desktop

Mobile is not a scaled-down desktop.

Mobile must have a purpose-designed layout.

Example:

### Desktop portfolio

```text
Large image | Project information
```

### Mobile portfolio

```text
Image

Project title
Location
Description
CTA
```

---

# 9. ACCESSIBILITY

Implementasikan:

- semantic HTML
- proper heading hierarchy
- visible focus state
- keyboard navigation
- accessible labels
- meaningful alt text
- sufficient contrast
- dialog accessibility
- form error messaging
- `aria-*` only when actually needed

Interactive element must not only using icon without accessible label.

---

# 10. TECH STACK

Use:

```text
Framework       Next.js App Router
Language        TypeScript
Database        Supabase PostgreSQL
ORM             Prisma
Storage         Cloudinary
Auth            Auth.js / NextAuth Credentials
Styling         Tailwind CSS
UI              shadcn/ui
Animation       Framer Motion
Forms           React Hook Form + Zod
Icons           Lucide React
Notifications   Sonner
Validation      Zod
Formatting      Prettier
Version Control Git
```

Use Supabase only as the PostgreSQL provider.

Do not use Supabase Storage for image portfolio/gallery.

Image storage must use Cloudinary.

---

# 11. DATABASE ARCHITECTURE

## Entities

The core database only requires:

```text
Admin
Project
ProjectImage
GalleryItem
Message
```

Relationship:

```text
Project
  └── ProjectImage[]

Admin
  └── single admin record

GalleryItem
  └── standalone

Message
  └── standalone
```

---

# 12. PRISMA SCHEMA

Use UUIDs as primary keys.

`ProjectImage` depends on `Project`.

Deleting a project must deleting project images from database with cascade.

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Project {
  id               String         @id @default(uuid())
  title            String
  slug             String         @unique
  description      String         @db.Text
  coverImageUrl    String
  clientName       String
  completionDate   DateTime
  createdAt        DateTime       @default(now())
  updatedAt        DateTime       @updatedAt

  images           ProjectImage[]

  @@index([completionDate])
  @@index([createdAt])
}

model ProjectImage {
  id          String   @id @default(uuid())
  projectId   String
  imageUrl    String
  altText     String
  orderIndex  Int      @default(0)

  project     Project  @relation(
    fields: [projectId],
    references: [id],
    onDelete: Cascade
  )

  @@index([projectId, orderIndex])
}

enum GalleryOrientation {
  LANDSCAPE
  PORTRAIT
}

model GalleryItem {
  id          String              @id @default(uuid())
  imageUrl    String
  altText     String
  orientation GalleryOrientation
  createdAt   DateTime            @default(now())

  @@index([orientation])
  @@index([createdAt])
}

model Message {
  id          String   @id @default(uuid())
  senderName  String
  email       String
  messageText String   @db.Text
  isRead      Boolean  @default(false)
  createdAt   DateTime @default(now())

  @@index([isRead, createdAt])
}

model Admin {
  id           String   @id @default(uuid())
  username     String   @unique
  passwordHash String
}
```

### Important Prisma Rule

Do not store:

```text
base64
blob
Data URI
```

ke database.

The database stores only Cloudinary URL strings.

---

# 13. SUPABASE + PRISMA CONNECTION

For Supabase PostgreSQL, use:

```env
DATABASE_URL="..."
DIRECT_URL="..."
```

Konsep:

```text
DATABASE_URL
→ runtime application
→ pooled connection

DIRECT_URL
→ Prisma CLI
→ migration / schema operations
```

Use `prisma.config.ts` for konfigurasi Prisma modern.

Example:

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: env("DIRECT_URL"),
  },
});
```

for runtime Prisma Client, use PostgreSQL adapter that according to with version Prisma that dipasang.

---

# 14. PRISMA CLIENT SINGLETON

File:

```text
lib/prisma.ts
```

Rules:

- satu Prisma Client instance for development
- do not instantiate PrismaClient di setiap request/module
- use global singleton pattern
- do not expose the Prisma Client ke client component

all query database must berasal from server-side code:

```text
Server Component
Server Action
Route Handler
Server Utility
```

---

# 15. AUTHENTICATION

Use Auth.js / NextAuth with:

```text
Credentials Provider
```

Because there is only one admin.

Admin login:

```text
username
password
```

Database:

```text
Admin.username
Admin.passwordHash
```

Passwords must use a hash:

```text
bcrypt
or
bcryptjs
```

Do not store plaintext passwords.

---

# 16. AUTH SESSION RULES

Admin-only route:

```text
/admin/*
```

must be protected.

Admin-only API:

```text
/api/admin/*
```

must be protected.

If there is no session:

```text
redirect /admin/login
```

The The API must return:

```text
401 Unauthorized
```

for unauthenticated requests.

---

# 17. ADMIN SINGLE-ACCOUNT RULE

The system does not need:

- role management
- permissions matrix
- team members
- multi-admin system
- RBAC

Only one:

```text
1 Admin
```

The admin seed must be secure.

Do not create a public route for creating an admin.

---

# 18. CLOUDINARY ARCHITECTURE

Cloudinary is the source of truth for image storage.

Flow wajib:

```text
Admin UI
   ↓
Select image
   ↓
Client uploads FormData
   ↓
POST /api/upload
   ↓
Authenticate the admin
   ↓
Validate file
   ↓
Upload to Cloudinary
   ↓
Cloudinary returns secure_url
   ↓
API returns URL
   ↓
Project/Gallery mutation stores URL
   ↓
Supabase PostgreSQL
```

Do not store binary images in PostgreSQL.

---

# 19. CLOUDINARY SECURITY

Environment variables:

```env
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

`CLOUDINARY_API_SECRET`:

- server-only
- do not use `NEXT_PUBLIC_`
- do not send it to the browser
- do not store it in the database
- do not commit it

Use a server-side signed upload flow if upload endpoint diuse as bagian from authenticated admin system.

Cloudinary juga mendukung signed upload flow for Next.js and menekankan bahwa API secret must still server-side.

---

# 20. UPLOAD VALIDATION

The server must validate:

### Allowed MIME

```text
image/jpeg
image/png
image/webp
image/avif
```

Optional:

```text
image/heic
```

only when the pipeline fully supports it.

### Size limit

Default rekomendasi:

```text
10 MB
```

per image.

Reject:

- executable
- SVG if not required
- HTML
- arbitrary files
- unsupported MIME
- oversized file

Do not trust the file extension alone.

---

# 21. CLOUDINARY FOLDER STRUCTURE

Use consistent folders:

```text
custom-interior/
├── projects/
│   ├── covers/
│   └── gallery/
│
└── gallery/
```

Example:

```text
custom-interior/projects/covers
custom-interior/projects/gallery
custom-interior/gallery
```

Use transformations for image delivery.

Do not deliver the full original image when the display size is already known.

---

# 22. IMPORTANT ASSET-DELETION RULE

Schema inti sengaja not store `cloudinaryPublicId` karena requirement database only menentukan URL.

Konsekuensinya:

```text
Delete database record
≠
Delete Cloudinary asset
```

In the first phase:

- database deletion may be performed
- Cloudinary asset do not dihapus in a spekulatif berdasarkan URL

If physical asset deletion is needed later physical asset deletion, tambahkan `cloudinaryPublicId` on model through migration that terpisah.

Do not silently add that extra field ke schema first phase.

---

# 23. ROUTE ARCHITECTURE

Use the App Router.

```text
app/
├── (public)/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── services/
│   │   └── page.tsx
│   │
│   ├── portfolio/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── gallery/
│   │   └── page.tsx
│   │
│   └── contact/
│       └── page.tsx
│
├── (admin)/
│   ├── layout.tsx
│   │
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   │
│   │   ├── portfolio/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   │
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   │
│   │   └── messages/
│   │       └── page.tsx
│
├── api/
│   ├── upload/
│   │   └── route.ts
│   │
│   ├── contact/
│   │   └── route.ts
│   │
│   └── admin/
│       ├── projects/
│       │   └── route.ts
│       ├── gallery/
│       │   └── route.ts
│       └── messages/
│           └── route.ts
│
├── globals.css
├── favicon.ico
├── sitemap.ts
└── robots.ts
```

Catatan:

`Project is the database model name.

The public URL uses:

```text
/portfolio
```

because this term is more natural for visitors.

---

# 24. COMPONENT ARCHITECTURE

```text
components/
├── ui/
│
├── layout/
│   ├── public-navbar.tsx
│   ├── public-footer.tsx
│   ├── mobile-menu.tsx
│   ├── admin-sidebar.tsx
│   └── admin-header.tsx
│
├── sections/
│   ├── hero.tsx
│   ├── featured-projects.tsx
│   ├── services-preview.tsx
│   ├── about-preview.tsx
│   ├── gallery-preview.tsx
│   ├── process-section.tsx
│   ├── testimonials.tsx
│   └── contact-cta.tsx
│
├── portfolio/
│   ├── project-card.tsx
│   ├── project-grid.tsx
│   ├── project-gallery.tsx
│   ├── project-meta.tsx
│   └── project-detail.tsx
│
├── gallery/
│   ├── masonry-grid.tsx
│   ├── gallery-item.tsx
│   └── gallery-lightbox.tsx
│
├── forms/
│   ├── contact-form.tsx
│   ├── project-form.tsx
│   └── gallery-form.tsx
│
├── admin/
│   ├── dashboard-stats.tsx
│   ├── recent-messages.tsx
│   ├── project-table.tsx
│   ├── gallery-grid.tsx
│   ├── image-upload.tsx
│   └── image-sorter.tsx
│
└── shared/
    ├── fade-in.tsx
    ├── reveal.tsx
    ├── stagger-container.tsx
    ├── parallax-image.tsx
    ├── image-reveal.tsx
    ├── page-heading.tsx
    ├── section-heading.tsx
    └── container.tsx
```

---

# 25. SERVER / CLIENT COMPONENT RULES

Default:

```text
Server Component
```

Use Client Components only when required.

Client Components are required for:

- Framer Motion interactivity
- form interaction
- drag & drop
- dialog
- mobile menu
- lightbox
- upload interaction
- sorting UI
- optimistic interaction
- browser-only APIs

Do not add `"use client"` to every page by default.

---

# 26. HOME PAGE STRUCTURE

The home page should be editorial and image-heavy.

Recommended sequence:

```text
1. Hero
2. Intro statement
3. Featured Projects
4. Services Preview
5. About / Studio Philosophy
6. Selected Gallery
7. Process
8. Testimonial
9. Contact CTA
10. Footer
```

### Hero

Fokus:

- full viewport image
- strong serif heading
- short statement
- subtle CTA
- subtle image zoom

Do not use too much text.

---

# 27. SERVICES PAGE

Contoh services:

```text
Interior Design
Custom Furniture
Space Planning
Renovation Consultancy
Material & Finish Selection
Styling & Final Decoration
```

Layout:

- large heading
- editorial introduction
- service blocks
- supporting imagery
- process
- CTA

Services can remain static content in the first phase.

---

# 28. PORTFOLIO PAGE

portfolio should be one of the most visual pages.

Fitur:

- project grid
- hover interaction
- image reveal
- project title
- client/location metadata when available
- completion information
- link ke detail

Do not use cards with heavy shadows.

Prefer:

```text
border subtle
minimal radius
image dominant
typography elegant
```

---

# 29. PORTFOLIO DETAIL PAGE

Route:

```text
/portfolio/[slug]
```

content:

```text
Project title
Client name
Completion date
Description
Cover image
Project image gallery
```

Recommended layout:

```text
Hero image
↓
Project metadata
↓
Description
↓
Large image sequence
↓
Image grid
↓
Next project navigation
```

Use `notFound()` when the slug is not found.

Use dynamic metadata:

```text
title
description
Open Graph image
```

---

# 30. GALLERY PAGE

The gallery should be visual-first.

Use a masonry-style layout.

`orientation` database:

```text
LANDSCAPE
PORTRAIT
```

used to help control the layout.

Example:

```text
Portrait     Landscape
Landscape    Portrait
Landscape    Landscape
Portrait     Landscape
```

Do not force every image into an identical aspect ratio.

Still use:

```text
object-cover
```

with wrapper ratio that dikontrol per item.

---

# 31. GALLERY LIGHTBOX

The lightbox must:

- keyboard accessible
- close with Escape
- next/previous
- focus management
- image alt text
- smooth transition
- no unnecessary animation

Use the shadcn dialog or dialog implementation that accessible.

---

# 32. ABOUT PAGE

The About page is not a dashboard-driven page in the first phase.

content:

```text
Studio introduction
Philosophy
Approach
Design principles
Process
Values
Selected statement
```

Visual:

- portrait/studio image
- architecture/detail image
- typography-heavy section
- large whitespace

---

# 33. CONTACT PAGE

Form:

```text
Name
Email
Message
```

Validation:

```text
name required
valid email required
message required
reasonable message length
```

Submit:

```text
POST /api/contact
```

The API must:

1. parse body
2. validate with Zod
3. normalize input
4. rate-limit/spam-protection layer
5. save Message
6. return safe JSON response

Do not send stack traces to the browser.

---

# 34. MESSAGE ENTITY

The admin can view:

```text
Sender
Email
Message preview
Created at
Read status
```

Actions:

```text
Mark as read
Mark as unread
Delete
```

Clicking a message can open its detail modal/page.

---

# 35. ADMIN DASHBOARD

Dashboard layout:

```text
Sidebar
Header
Main content
```

Stats:

```text
Total Projects
Total Gallery Items
Unread Messages
Latest Project
```

Recent message list:

```text
sender
email
message preview
date
status
```

The dashboard does not need complex charts in the first phase.

Design:

- clean
- compact
- functional
- muted palette
- high readability

The admin UI may be slightly more utilitarian than the public website.

---

# 36. ADMIN PORTFOLIO CRUD

Create Project:

```text
title
slug
description
clientName
completionDate
cover image
project gallery images
```

Flow:

```text
Create project
↓
Upload cover
↓
Upload gallery images
↓
Receive Cloudinary URLs
↓
Submit metadata
↓
Create Project
↓
Create ProjectImage rows
```

---

# 37. PROJECT IMAGE SORTING

The admin must be able to change:

```text
orderIndex
```

through drag and drop.

After sorting:

```text
image A → 0
image B → 1
image C → 2
...
```

Do not rely only on upload order.

---

# 38. ADMIN GALLERY CRUD

Gallery item form:

```text
Image
Alt text
Orientation
```

Orientation:

```text
LANDSCAPE
PORTRAIT
```

Image upload still melewati:

```text
/api/upload
```

---

# 39. ZOD VALIDATION

Use separate schemas.

Contoh struktur:

```text
lib/validations/
├── contact.ts
├── project.ts
├── project-image.ts
└── gallery.ts
```

Rules:

- client validation for UX
- server validation wajib
- do not trust client validation
- use reusable schemas where possible

---

# 40. ERROR HANDLING

API response format konsisten.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": "Human readable message"
}
```

Do not expose:

```text
database internals
stack traces
Cloudinary credentials
Prisma errors mentah
```

---

# 41. API ROUTE DESIGN

## Upload

```text
POST /api/upload
```

Purpose:

- authenticated admin upload

Input:

```text
multipart/form-data
file
folder/type metadata
```

Output:

```json
{
  "success": true,
  "data": {
    "imageUrl": "https://res.cloudinary.com/..."
  }
}
```

---

## Contact

```text
POST /api/contact
```

Public.

Rate limit wajib dipertimbangkan.

---

## Admin Projects

Recommended:

```text
GET    /api/admin/projects
POST   /api/admin/projects
PATCH  /api/admin/projects/[id]
DELETE /api/admin/projects/[id]
```

---

## Admin Gallery

```text
GET    /api/admin/gallery
POST   /api/admin/gallery
PATCH  /api/admin/gallery/[id]
DELETE /api/admin/gallery/[id]
```

---

## Admin Messages

```text
GET    /api/admin/messages
PATCH  /api/admin/messages/[id]
DELETE /api/admin/messages/[id]
```

---

# 42. SERVER ACTION VS API ROUTE

Use **Server Actions** for internal UI mutations when simpler.

Use **Route Handlers** when:

- menerima multipart upload
- endpoint need HTTP API behavior
- endpoint berpotensi diuse client-side
- endpoint need explicit JSON response
- need separate public contact endpoint

Do not create Server Actions for everything simply because they exist.

---

# 43. ADMIN UPLOAD COMPONENT

Component:

```text
components/admin/image-upload.tsx
```

Behavior:

```text
idle
↓
select
↓
preview
↓
uploading
↓
success
↓
uploaded URL
```

Error states:

```text
unsupported type
file too large
network error
Cloudinary error
unauthorized
```

UX:

- drag & drop
- click to select
- preview
- progress if available
- remove/reset
- disabled state when upload

---

# 44. FORM UI

Use shadcn/ui for:

```text
Button
Input
Textarea
Label
Select
Dialog
Alert Dialog
Sheet
Table
Badge
Skeleton
Separator
Sonner
```

Form pattern:

```text
React Hook Form
+
Zod
+
shadcn/ui
```

Error tampil dekat field.

Do not rely on a toast as the only validation error message.

---

# 45. PUBLIC NAVBAR

Desktop:

```text
Logo
Services
portfolio
About
Gallery
Contact
```

Mobile:

- menu icon
- fullscreen/sheet menu
- generous spacing
- smooth open/close

The navbar may change state on scroll.

Example:

```text
Top:
transparent

After scroll:
soft background
subtle border
backdrop blur
```

Do not use heavy glassmorphism.

---

# 46. FOOTER

Footer minimal:

```text
Brand
Short description
Navigation
Contact
Social links
Copyright
```

Use generous spacing.

---

# 47. GLOBAL CSS

Use CSS variables.

Recommended `app/globals.css`:

```css
@import "tailwindcss";

:root {
  --background: #f5f3ee;
  --foreground: #272625;

  --surface: #fbfaf7;
  --surface-muted: #ece8df;

  --foreground-soft: #55524d;

  --border: #ddd8ce;

  --sage: #87927f;
  --sage-dark: #687261;

  --taupe: #a69584;
  --terracotta: #b8836d;

  --white-soft: #f8f7f3;
  --black-soft: #1e1d1b;

  --radius: 0.375rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-surface: var(--surface);
  --color-surface-muted: var(--surface-muted);

  --color-foreground-soft: var(--foreground-soft);

  --color-border: var(--border);

  --color-sage: var(--sage);
  --color-sage-dark: var(--sage-dark);

  --color-taupe: var(--taupe);
  --color-terracotta: var(--terracotta);

  --color-white-soft: var(--white-soft);
  --color-black-soft: var(--black-soft);

  --font-display: var(--font-cormorant);
  --font-body: var(--font-manrope);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-body), sans-serif;
}

::selection {
  background: var(--sage);
  color: var(--white-soft);
}

* {
  border-color: var(--border);
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

img {
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

# 48. NEXT FONT SETUP

Use `next/font/google`.

Recommended:

```ts
import { Cormorant_Garamond, Manrope } from "next/font/google";
```

Configure CSS variables:

```ts
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});
```

Apply both variables to `<body>`.

---

## Root Metadata Example

Use the Next.js Metadata API in the root layout:

```ts
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Khakim Interior | Custom Interior Design",
    template: "%s | Khakim Interior",
  },

  description:
    "Khakim Interior creates refined custom interiors shaped by light, material, proportion, and everyday life.",

  applicationName: "Khakim Interior",
  creator: "Khakim Interior",
  publisher: "Khakim Interior",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "Khakim Interior",
    title: "Khakim Interior | Custom Interior Design",
    description:
      "Refined custom interior design shaped by light, material, proportion, and everyday life.",
    url: "/",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Khakim Interior",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Khakim Interior | Custom Interior Design",
    description:
      "Refined custom interior design shaped by light, material, proportion, and everyday life.",
    images: ["/opengraph-image.jpg"],
  },
};
```

Keep the metadata truthful to the final website copy and actual business information.

# 49. SEO & OPEN GRAPH SYSTEM

SEO is a first-class requirement for Khakim Interior.

The goal is to make the website technically crawlable, semantically understandable, socially shareable, fast, and genuinely useful. Do not use keyword stuffing or generate large numbers of thin pages.

Next.js supports static and programmatic metadata, including titles, descriptions, Open Graph metadata, icons, sitemaps, robots configuration, and generated Open Graph images.

## 49.1 Brand-Level Metadata

The root layout should define:

```text
metadataBase
title
title template
description
applicationName
creator
publisher
alternates.canonical
robots
openGraph
twitter
icons
```

Recommended default:

```text
Khakim Interior | Custom Interior Design
```

Recommended title template:

```text
%s | Khakim Interior
```

Examples:

```text
portfolio | Khakim Interior
Services | Khakim Interior
About Khakim Interior
Interior Design Gallery | Khakim Interior
Contact Khakim Interior
```

Project detail:

```text
{Project Title} | Khakim Interior
```

Keep titles concise and truthful to the actual page.

---

## 49.2 Canonical URLs

Every indexable public page should have exactly one canonical URL.

Public canonical paths:

```text
/
/services
/portfolio
/portfolio/[slug]
/about
/gallery
/contact
```

Use:

```ts
alternates: {
  canonical: "/portfolio",
}
```

For project pages, generate the canonical URL from the project slug.

Use `NEXT_PUBLIC_SITE_URL` as the production origin instead of hard-coding the domain throughout the codebase.

---

## 49.3 Open Graph

Use site-wide Open Graph metadata:

```ts
openGraph: {
  type: "website",
  siteName: "Khakim Interior",
  title: "Khakim Interior | Custom Interior Design",
  description:
    "Refined custom interior design shaped by light, material, proportion, and everyday life.",
  url: "/",
  images: [
    {
      url: "/opengraph-image.jpg",
      width: 1200,
      height: 630,
      alt: "Khakim Interior",
    },
  ],
}
```

The default OG image should be a dedicated brand asset, not a random project image.

Recommended target:

```text
1200 × 630 px
```

Visual direction:

- warm muted background
- refined serif typography
- subtle brand treatment
- generous whitespace
- optional architectural/interior photography
- no excessive promotional text

---

## 49.4 Open Graph Image File

Recommended default:

```text
app/opengraph-image.jpg
```

or a generated dynamic file:

```text
app/opengraph-image.tsx
```

Next.js can automatically discover file-based Open Graph images and can also generate dynamic OG images with `ImageResponse`.

---

## 49.5 Dynamic Project Open Graph

Each public project page should have project-specific social sharing metadata.

Recommended structure:

```text
app/
└── (public)/
    └── portfolio/
        └── [slug]/
            ├── page.tsx
            └── opengraph-image.tsx
```

The generated image should use:

```text
Project title
Project cover image
Khakim Interior branding
```

Do not expose private admin fields.

This gives every portfolio project a useful social preview instead of sharing the same generic OG image.

---

## 49.6 Twitter / X Cards

Configure:

```ts
twitter: {
  card: "summary_large_image",
  title: "Khakim Interior | Custom Interior Design",
  description:
    "Refined custom interior design shaped by light, material, proportion, and everyday life.",
  images: ["/opengraph-image.jpg"],
}
```

Project detail pages should use project-specific title, description, and image values.

---

## 49.7 Page-Specific SEO Metadata

### Home

```text
Title:
Khakim Interior | Custom Interior Design
```

Example description:

```text
Khakim Interior creates refined custom interiors shaped by light, material, proportion, and everyday life.
```

### Services

```text
Title:
Interior Design Services | Khakim Interior
```

Description should describe the actual services offered.

### portfolio

```text
Title:
portfolio | Khakim Interior
```

Description should explain the portfolio and design work.

### Project Detail

Use:

```text
{project.title} | Khakim Interior
```

and derive the description from the actual project content.

### About

```text
Title:
About Khakim Interior
```

### Gallery

```text
Title:
Interior Design Gallery | Khakim Interior
```

### Contact

```text
Title:
Contact Khakim Interior
```

---

## 49.8 Robots

Create:

```text
app/robots.ts
```

Recommended behavior:

```ts
return {
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: ["/admin/", "/api/"],
  },
  sitemap: `${siteUrl}/sitemap.xml`,
};
```

Important:

`robots.txt` is a crawler directive, not an authentication mechanism. Private content must still be protected by server-side authentication and authorization.

---

## 49.9 Sitemap

Create:

```text
app/sitemap.ts
```

Static public URLs:

```text
/
/services
/portfolio
/about
/gallery
/contact
```

Dynamic URLs:

```text
/portfolio/{slug}
```

Use each project's `updatedAt` as `lastModified` where appropriate.

Never include:

```text
/admin/*
/api/*
```

Next.js supports programmatic sitemap generation, which is appropriate because portfolio URLs come from Prisma.

---

## 49.10 Structured Data / JSON-LD

Use JSON-LD when it accurately represents the website.

For the homepage/about page, use:

```text
Organization
```

Baseline:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Khakim Interior",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png"
}
```

Only add real values for:

```text
telephone
email
address
sameAs
legalName
```

Do not invent business data.

Google recommends Organization structured data on the homepage or an organization/about page and recommends adding relevant properties such as name, URL, logo, and real-world/contact information when applicable.

---

## 49.11 portfolio Structured Data

Project detail pages may use structured data such as:

```text
CreativeWork
ImageObject
BreadcrumbList
```

Only include properties supported by actual database/content values.

Do not invent:

```text
rating
review
award
price
location
```

---

## 49.12 Breadcrumb Structured Data

Visible breadcrumb:

```text
Home
→ portfolio
→ Project Title
```

If visible on the page, it can also be represented with:

```text
BreadcrumbList
```

The structured data must match the visible navigation.

---

## 49.13 Image SEO

Every important image must have meaningful alt text.

Good:

```text
Warm minimalist living room with custom oak cabinetry
```

Bad:

```text
image1
photo123
IMG_2048
```

Do not keyword-stuff alt text.

Image delivery should continue to use:

```text
Next.js Image
Cloudinary optimization
responsive sizes
appropriate dimensions
```

---

## 49.14 Internal Linking

Use natural internal links:

```text
Home → portfolio
Home → Services
portfolio → Project Detail
Project Detail → Contact
Services → Contact
About → portfolio
Gallery → portfolio
```

Avoid artificially repetitive SEO anchor text.

---

## 49.15 Semantic HTML

Use:

```html
<header>
  <nav>
    <main>
      <section>
        <article>
          <figure>
            <figcaption>
              <footer></footer>
            </figcaption>
          </figure>
        </article>
      </section>
    </main>
  </nav>
</header>
```

Each indexable page should have one clear primary heading.

SEO and accessibility should share the same semantic foundation.

---

## 49.16 Indexing Rules

Index:

```text
Home
Services
portfolio
Public Project Pages
About
Gallery
Contact
```

Do not index:

```text
Admin Login
Admin Dashboard
Admin CRUD
Private Messages
API Endpoints
```

Admin pages may also use appropriate `noindex` metadata.

Do not depend on `robots.txt` alone to protect private pages.

---

## 49.17 Search Console

After production deployment:

```text
Google Search Console
```

should be configured.

Submit:

```text
/sitemap.xml
```

Validate:

```text
robots.txt
sitemap.xml
canonical URLs
structured data
Open Graph previews
```

Google recommends validating structured data and using URL Inspection to verify how Google can access and interpret deployed pages.

---

## 49.18 SEO Validation Checklist

```text
[ ] Every public page has a unique title
[ ] Every public page has a useful meta description
[ ] Canonical URL is correct
[ ] Open Graph title is correct
[ ] Open Graph description is correct
[ ] Open Graph image loads
[ ] Twitter/X card metadata is present
[ ] Favicon is configured
[ ] Sitemap is available
[ ] Robots configuration is available
[ ] Admin routes are not indexable
[ ] Project URLs are crawlable
[ ] Dynamic project metadata works
[ ] Dynamic project OG image works
[ ] Organization JSON-LD contains only real data
[ ] No fake ratings or reviews are added
[ ] Image alt text is meaningful
[ ] Internal links work
[ ] No accidental noindex on public pages
[ ] Production site URL is configured
[ ] Structured data is validated
[ ] Search Console can access the site
```

---

## 49.19 SEO Content Principles

Technical SEO must never replace good content.

The strongest organic content signals for Khakim Interior should come from:

```text
real projects
real project descriptions
real services
real studio information
original interior photography
clear headings
logical internal links
```

Do not generate hundreds of low-value pages only to capture search phrases.

The website remains a premium interior design portfolio first and an SEO asset second.

# 50. PERFORMANCE

Priority:

1. image optimization
2. server components
3. limited client JavaScript
4. proper dynamic rendering
5. lazy image loading
6. responsive image sizes
7. avoid unnecessary dependencies
8. avoid huge JS bundles

portfolio image should use appropriate `sizes`.

Hero image may use:

```tsx
priority;
```

only when it is truly above the fold.

Do not mark every image as priority.

---

# 51. DATA FETCHING

Public portfolio page:

- Server Component
- fetch directly through server-side Prisma utility
- order projects predictably
- generate static/dynamic metadata where appropriate

Project detail:

```text
findUnique({ where: { slug } })
```

Project images:

```text
orderBy: {
  orderIndex: "asc"
}
```

Gallery:

```text
orderBy: {
  createdAt: "desc"
}
```

---

# 52. DATABASE QUERY RULES

Avoid N+1 queries.

Use Prisma `include` or `select` intentionally.

Public page should fetch only necessary fields.

Example:

```text
portfolio listing
→ id
→ title
→ slug
→ coverImageUrl
→ clientName
→ completionDate
```

Do not fetch all project images for listing pages unless necessary.

---

# 53. SLUG RULES

Project slug must be unique.

Example:

```text
modern-japanese-residence
warm-minimalist-apartment
tropical-contemporary-villa
```

Normalize:

```text
lowercase
spaces → hyphen
remove unsupported characters
```

When editing project title:

- do not automatically break an existing slug
- keep slug stable unless admin explicitly changes it

---

# 54. DATE & LOCALE

Use Indonesian-friendly presentation on UI.

Example:

```text
12 September 2026
```

Use `Intl.DateTimeFormat` or `date-fns`.

Store dates in database as `DateTime`.

Do not store presentation strings as date fields.

---

# 55. SECURITY

Required:

- authenticated admin API
- server-side Zod validation
- secure password hashing
- secret env vars
- upload MIME validation
- upload size validation
- rate limiting for public contact
- CSRF considerations for mutation endpoints
- no credential exposure
- no stack trace exposure
- no raw database error exposure

Never expose:

```text
DATABASE_URL
DIRECT_URL
CLOUDINARY_API_SECRET
NEXTAUTH_SECRET
```

to client code.

---

# 56. ENVIRONMENT VARIABLES

Recommended `.env.local`:

```env
DATABASE_URL=""
DIRECT_URL=""

AUTH_SECRET=""

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

NEXT_PUBLIC_SITE_URL=""
```

Optional future:

```env
CONTACT_RATE_LIMIT=""
```

Rules:

- `.env.local` must be gitignored
- production secrets belong in deployment platform environment variables
- never commit secrets

---

# 57. INITIAL PROJECT COMMANDS

## Create project

Using npm:

```bash
npx create-next-app@latest custom-interior \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --use-npm \
  --import-alias "@/*"
```

Then:

```bash
cd custom-interior
```

---

# 58. INSTALL APPLICATION DEPENDENCIES

```bash
npm install \
  framer-motion \
  next-auth \
  cloudinary \
  next-cloudinary \
  react-hook-form \
  zod \
  @hookform/resolvers \
  clsx \
  tailwind-merge \
  lucide-react \
  sonner \
  bcryptjs \
  date-fns
```

---

# 59. INSTALL PRISMA + POSTGRES ADAPTER

for struktur ini, use Prisma 7-compatible setup:

```bash
npm install @prisma/client@^7 @prisma/adapter-pg pg dotenv
npm install -D prisma@^7 @types/pg tsx
```

then:

```bash
npx prisma init --datasource-provider postgresql
```

Pastikan hasil akhir using:

```text
prisma/schema.prisma
prisma.config.ts
```

and konfigurasi koneksi database mengikuti environment variables.

---

# 60. SHADCN UI

Inisialisasi:

```bash
npx shadcn@latest init
```

then tambahkan component that dibutuhkan:

```bash
npx shadcn@latest add \
  button \
  input \
  textarea \
  label \
  select \
  card \
  badge \
  dialog \
  alert-dialog \
  dropdown-menu \
  sheet \
  separator \
  skeleton \
  table \
  form \
  sonner
```

do not meng-install seluruh component library in a sekaligus if not yet required.

Tambahkan component according to kebutuhan feature.

---

# 61. PACKAGE MANAGER RULE

Default proyek:

```text
npm
```

do not mencampur:

```text
npm
pnpm
yarn
bun
```

in satu repository.

use satu lockfile:

```text
package-lock.json
```

---

# 62. PRETTIER

Project must menghormati konfigurasi Prettier lokal.

do not memaksakan style formatting sendiri.

if not yet ada config, minimal:

```text
.prettierrc
.prettierignore
```

AI must:

- not mengubah formatting that already according to project
- menjalankan formatter on file that changed
- not melakukan formatting massal without kebutuhan

---

# 63. TYPESCRIPT RULES

use strict TypeScript.

Hinfrom:

```ts
any;
```

without alasan.

Prefer:

```ts
unknown;
```

for nilai not terpercaya lalu lakukan narrowing.

all utility main must typed.

do not using `as any` as workaround error.

---

# 64. ERROR BOUNDARIES

Tambahkan if required:

```text
app/error.tsx
app/not-found.tsx
app/global-error.tsx
```

Admin juga can has error boundary khusus.

Error UI still mengikuti design system.

---

# 65. LOADING STATES

Use:

```text
loading.tsx
Skeleton
```

for:

- portfolio loading
- gallery loading
- dashboard loading

do not menampilkan spinner kecil di seluruh page if skeleton layout more informatif.

---

# 66. EMPTY STATES

Admin:

```text
No projects yet.
No gallery images yet.
No messages yet.
```

Empty state must menjelaskan action followingnya.

Example:

```text
No portfolio projects yet.

Create your first project to begin building the public portfolio.

[Create Project]
```

---

# 67. PUBLIC EMPTY/FAILURE STATES

if gallery kosong:

do not provide broken layout.

use editorial empty state that minimal.

---

# 68. ADMIN TABLE RULES

Project table:

```text
Cover
Title
Client
Completion
Updated
Actions
```

Gallery:

```text
Thumbnail
Orientation
Created
Actions
```

Messages:

```text
Sender
Email
Preview
Date
Status
Actions
```

Desktop:

table.

Mobile:

stacked cards/list.

---

# 69. ADMIN UI INTERACTION

Use confirmation dialogs for destructive actions:

```text
Delete project?
Delete gallery item?
Delete message?
```

Destructive buttons must jelas.

do not mengandalkan color saja.

---

# 70. TOAST RULES

Sonner for:

```text
Saved successfully
Uploaded successfully
Deleted successfully
Something went wrong
```

Tetapi validation errors still berada dekat field.

Toast bukan pengganti inline validation.

---

# 71. GALLERY MASONRY IMPLEMENTATION

Prefer CSS Grid rather than an unnecessary masonry dependency.

use orientation as visual input.

Possible strategy:

```text
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
```

Atur span/ratio with data orientation.

do not create layout too dense.

---

# 72. PROJECT DETAIL GALLERY

Project detail can using:

```text
1 large image
2 supporting images
full-width image
2-column detail grid
```

use rhythm.

do not using uniform cards for all images.

---

# 73. MICRO-INTERACTIONS

Allowed:

- nav underline
- image scale on hover
- text arrow movement
- subtle opacity
- button background transition
- image reveal
- active state

Example:

```text
View Project →
```

Arrow can bergerak a few pixels when hover.

not may over-animated.

---

# 74. BUTTON DESIGN

Primary:

```text
dark charcoal background
soft white text
```

Secondary:

```text
transparent
thin border
```

Ghost:

```text
no border
minimal hover
```

Radius:

```text
small / restrained
```

Hinfrom pill-shaped button for all CTA.

Pills only may for metadata/badge.

---

# 75. CARD DESIGN

Default card:

```text
background: transparent / surface
border: subtle
shadow: none or extremely subtle
```

Image is fokus.

Avoid:

```text
heavy shadows
glass cards
huge rounded corners
gradient card backgrounds
```

---

# 76. ARCHITECTURAL VISUAL LANGUAGE

Use:

- horizontal rules
- section numbering
- uppercase metadata
- tiny labels
- large serif titles
- asymmetric spacing
- editorial image crops
- generous margins

Example:

```text
01
Selected Projects
```

or:

```text
SELECTED WORKS
```

Do not make every section look like a poster.

---

# 77. CONTENT TONE

Public copy should be:

- calm
- confident
- concise
- premium
- human

Hinfrom:

- hype bermorean
- marketing cliché
- terlalu banyak exclamation marks
- copy terlalu panjang

Example style:

```text
Spaces designed around the way you live.

We create interiors that balance material,
light, proportion, and everyday function.
```

---

# 78. SEO CONTENT RULE

Do not use keyword stuffing.

Use semantic titles.

Example:

```text
Custom Interior Design Studio in Jakarta
```

when it is actually accurate for the business location.

Do not claim a location or service area that is not true.

---

# 79. IMAGE SEO

Every image must have descriptive alt text.

Do not:

```text
image1
photo123
IMG_2048
```

Use:

```text
Warm minimalist living room with oak cabinetry
```

---

# 80. FILE NAMING

Use kebab-case:

```text
project-card.tsx
project-gallery.tsx
public-navbar.tsx
admin-sidebar.tsx
```

Database model:

```text
PascalCase
```

Functions:

```text
camelCase
```

Routes:

```text
lowercase
```

---

# 81. IMPORT CONVENTION

Prefer:

```ts
import { ... } from "@/components/..."
import { ... } from "@/lib/..."
```

Avoid deep relative imports such as:

```ts
../../../components
```

---

# 82. BARREL EXPORT RULE

Do not create barrel files for every folder automatically.

Use barrel exports only when they genuinely help API internal and not menyebabkan circular dependency.

---

# 83. PRISMA QUERY LAYER

For reusable queries, create:

```text
lib/queries/
├── projects.ts
├── gallery.ts
└── messages.ts
```

Example responsibilities:

```text
getFeaturedProjects()
getProjects()
getProjectBySlug()
getGalleryItems()
getUnreadMessageCount()
getRecentMessages()
```

UI component must not contains query Prisma mentah if query that reusable.

---

# 84. MUTATION LAYER

Buat:

```text
lib/actions/
├── projects.ts
├── gallery.ts
└── messages.ts
```

or Server Actions with struktur that jelas.

Mutations:

```text
createProject
updateProject
deleteProject
reorderProjectImages

createGalleryItem
updateGalleryItem
deleteGalleryItem

markMessageAsRead
deleteMessage
```

---

# 85. TRANSACTION RULE

Use a transaction when one user action requires multiple database changes that must succeed together.

Example:

```text
Create Project
+
Create ProjectImage[]
```

A transaction may be used when the changes are atomic.

Do not automatically use transactions for every simple query.

---

# 86. PROJECT CREATION ATOMIC FLOW

Recommended:

```text
Upload images
    ↓
Validate form
    ↓
Create Project
    ↓
Create ProjectImage rows
    ↓
Return success
```

Database mutation must gagal in a atomic if wrong satu bagian inti gagal.

Catatan:
Cloudinary upload occur di luar database transaction. If the database mutation fails after the upload succeeds, asset Cloudinary can tersisa and need cleanup strategy on fase followingnya.

---

# 87. CONTACT SPAM PROTECTION

Contact endpoint is public.

Implementasikan minimal:

```text
rate limiting
input length limits
basic anti-spam strategy
```

When using CAPTCHA, integrate server-side verification.

Do not treat a hidden field/honeypot as the only security layer.

---

# 88. ADMIN ROUTE PROTECTION

Use the Auth.js session.

Protection can be implemented through:

```text
proxy/middleware strategy
```

or server-side redirect on protected layout.

Do not merely hide admin navigation in the frontend.

Security must be enforced on the server.

---

# 89. NO SECRET ON CLIENT

The AI must stop and correct the implementation if it finds a pattern such as:

```ts
process.env.CLOUDINARY_API_SECRET;
```

di Client Component.

Secrets may only exist in:

```text
server component
route handler
server action
server utility
```

---

# 90. PUBLIC / PRIVATE DATA

Public:

```text
Projects
Project Images
Gallery Items
```

Private:

```text
Admin
Messages
Cloudinary secret
Database credentials
Auth secret
```

Do not expose the Message API publicly.

---

# 91. CACHING / REVALIDATION

Public content should use appropriate caching/revalidation.

Example:

```text
portfolio listing
gallery
project detail
```

After an admin mutation:

```text
revalidatePath("/portfolio")
revalidatePath("/gallery")
revalidatePath("/portfolio/[slug]")
```

Do not invalidate the entire site without a reason.

---

# 92. ADMIN UX PRIORITY

The admin dashboard is not the place to showcase animation.

Prioritas:

```text
speed
clarity
accuracy
safe destructive actions
simple upload
easy editing
```

Admin still premium in a visual stilli functional-first.

---

# 93. LOGGING

Use structured server-side logs.

Allowed:

```text
[Upload]
[Contact]
[Auth]
[Projects]
[Gallery]
```

Do not log:

```text
password
passwordHash
API secret
auth token
database credentials
```

---

# 94. GIT WORKFLOW

Use structured conventional commits.

Examples:

```text
feat: add public portfolio page
feat: add Cloudinary upload handler

fix: prevent duplicate project slugs

refactor: extract project query helpers

style: refine typography hierarchy

perf: optimize portfolio image loading

chore: configure Prisma

docs: update project architecture
```

---

# 95. BRANCH STRATEGY

Recommended:

```text
main
develop
feature/*
fix/*
```

Example:

```text
feature/public-home
feature/admin-portfolio
feature/cloudinary-upload
fix/contact-validation
```

Do not create giant commits containing unrelated features.

---

# 96. DEFINITION OF DONE

A feature is complete only when:

```text
typecheck passes
lint passes
build passes
UI works on mobile
UI works on desktop
validation works
loading state exists where needed
error state exists where needed
accessibility basics pass
no secret leaks
database query is server-side
image is optimized
```

---

# 97. TESTING PRIORITY

Minimum critical flows:

### Public

```text
Home loads
portfolio loads
Project detail loads
Gallery loads
Contact submits
Invalid contact is rejected
```

### Admin

```text
Login works
Unauthenticated admin route redirects
Project can be created
Cover image uploads
Project images upload
Project can be edited
Project can be deleted
Gallery item can be created
Gallery item can be edited
Gallery item can be deleted
Message can be marked read
```

---

# 98. BUILD ORDER

Implement in phases.

## Phase 1

Infrastructure:

```text
Next.js
Tailwind
shadcn
Prisma
Supabase connection
Auth.js
Cloudinary configuration
environment variables
```

## Phase 2

Design foundation:

```text
fonts
globals.css
layout
container
typography
buttons
navigation
footer
motion primitives
```

## Phase 3

Public:

```text
Home
Services
portfolio
Project detail
About
Gallery
Contact
```

## Phase 4

Admin:

```text
Login
Dashboard
portfolio CRUD
Gallery CRUD
Messages
```

## Phase 5

Hardening:

```text
SEO
performance
security
validation
rate limiting
error states
loading states
accessibility
```

---

# 99. IMPORTANT IMPLEMENTATION RULE FOR AI

when mengerjakan task followingnya:

1. **do not mengubah stack** without alasan.
2. **do not menambahkan library baru** if feature can created with stack that already ada.
3. **do not create component terlalu besar.**
4. **do not mengubah schema database** without requirement that jelas.
5. **do not store image binary/base64 di database.**
6. **do not menaruh Cloudinary secret on client.**
7. **do not create seluruh app menjadi Client Components.**
8. **do not using animation bermorean.**
9. **do not using pure white as background main.**
10. **do not using pure black as text main.**
11. **do not create dashboard menjadi terlalu dekoratif.**
12. **do not mengorbankan accessibility demi visual.**
13. **do not mengorbankan performance demi animation.**
14. **do not mengandalkan validasi client saja.**
15. **do not expose internal server/database errors keon user.**

---

# 100. RESPONSE FORMAT FOR AI CODING ASSISTANT

When asked to build a new feature, the AI must provide:

```text
1. Files created/changed
2. Alasan change singkat
3. Full code for relevant files
4. Migration when required
5. Environment variables when required
6. Commands to run
7. Testing/checklist
```

Do not provide pseudo-code when the user requests implementation.

Do not omit important parts of a file with:

```text
// rest of code...
```

When a complete file is requested, provide the complete file.

---

# 101. RULE FOR COMPONENT GENERATION

Before building a React component:

- make sure the database layer is clear
- make sure validation is clear
- tentukan server/client boundary
- tentukan loading/error/empty state
- tentukan responsive behavior
- tentukan accessibility behavior

Component bukan only tampilan.

Every component must have:

```text
purpose
data contract
interaction behavior
responsive behavior
accessibility
```

---

# 102. SUGGESTED INITIAL DIRECTORY

Final target:

```text
custom-interior/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── about/
│   │   ├── gallery/
│   │   └── contact/
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       ├── login/
│   │       ├── dashboard/
│   │       ├── portfolio/
│   │       ├── gallery/
│   │       └── messages/
│   │
│   ├── api/
│   │   ├── upload/
│   │   ├── contact/
│   │   └── admin/
│   │
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── error.tsx
│   └── not-found.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   ├── portfolio/
│   ├── gallery/
│   ├── forms/
│   ├── admin/
│   └── shared/
│
├── lib/
│   ├── actions/
│   ├── queries/
│   ├── validations/
│   ├── prisma.ts
│   ├── cloudinary.ts
│   ├── auth.ts
│   └── utils.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── generated/
│   └── prisma/
│
├── public/
│   └── fonts/        # only if local fonts are used later
│
├── auth.ts
├── prisma.config.ts
├── components.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── package.json
├── .env.local
├── .env.example
├── .gitignore
└── README.md
```

---

# 103. INITIAL ENV TEMPLATE

Buat:

```text
.env.example
```

with:

```env
DATABASE_URL=
DIRECT_URL=

AUTH_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

It must not contain real credentials.

---

# 104. INITIAL SEED STRATEGY

The seed should create one Admin only when one does not already exist.

Pseudo flow:

```text
check existing admin
↓
if exists:
    stop
↓
hash password
↓
create admin
```

The seed password must come from an environment variable.

Do not hard-code:

```text
admin123
password
123456
```

---

# 105. DATABASE INDEXING

Required indexes:

```text
Project.slug        → unique
Project.completionDate
Project.createdAt

ProjectImage(projectId, orderIndex)

GalleryItem.orientation
GalleryItem.createdAt

Message(isRead, createdAt)

Admin.username      → unique
```

The purpose is to keep simple list/sort queries efficient.

---

# 106. PROJECT CONTENT MODEL

Walaupun model bernama `Project`, UI menyebut:

```text
portfolio
Project
Selected Work
```

Use consistent terminology.

Recommended:

```text
Public navigation → portfolio
Database           → Project
Admin navigation   → portfolio
```

---

# 107. ARCHITECTURAL PRINCIPLE

Use these principles:

```text
content first
image first
whitespace first
performance first
accessibility always
```

Do not build an interface that only looks good in screenshots but performs poorly when:

- loading
- error
- mobile
- keyboard navigation
- slow connection
- empty database

---

# 108. FINAL QUALITY BAR

Hasil akhir must feels seperti:

```text
premium interior studio
+
editorial magazine
+
modern architectural portfolio
```

and not:

```text
generic SaaS dashboard
+
template marketplace
+
over-animated landing page
```

The public website should feel calm and aspirational.

The admin experience should feel fast and easy to use.

The database should remain simple.

The image workflow must be safe.

The codebase must remain maintainable.

---

# 109. OFFICIAL DOCUMENTATION REFERENCES

Use official documentation as the reference for APIs that may change:

- Next.js Documentation
- Prisma Documentation
- Supabase Documentation
- shadcn/ui Documentation
- Auth.js Documentation
- Cloudinary Documentation
- Framer Motion Documentation
- Tailwind CSS Documentation

When an API/library changes, prioritize the official documentation for the version used by the project over outdated tutorials.

---

# 110. INITIAL IMPLEMENTATION CHECKLIST

Before building a complex UI component:

```text
[ ] Next.js App Router initialized
[ ] TypeScript configured
[ ] Tailwind configured
[ ] shadcn initialized
[ ] Prisma configured
[ ] Supabase PostgreSQL connected
[ ] prisma.config.ts configured
[ ] Prisma schema created
[ ] Prisma migration created
[ ] Prisma client working
[ ] Auth.js configured
[ ] Single Admin seed ready
[ ] Cloudinary credentials configured
[ ] Upload API protected
[ ] Zod validation structure ready
[ ] React Hook Form installed
[ ] Framer Motion installed
[ ] Global CSS variables ready
[ ] Font system ready
[ ] Public/Admin route bounfromes ready
[ ] Git initialized
```

---

# 111. SOURCE-OF-TRUTH RULE

Dokumen ini menjadi baseline.

When a new requirement appears:

1. preserve the existing architecture when it still meets the requirement
2. change only what is actually necessary
3. do not add complexity without a reason
4. dokumentasikan change architecture
5. create a migration when a database change is required
6. do not remove backward compatibility without a reason

---

## END OF SPECIFICATION
