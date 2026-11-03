# ESTATEFLOW CRM — Enterprise Multi-Tenant Real Estate SaaS Platform

**Document Version:** 1.0  
**Product Type:** Multi-Tenant Real Estate CRM SaaS  
**Platform:** Web Application  
**Target Market:** Builders, Developers, Real Estate Brokers and Channel Partners  
**Reference Benchmark:** Vastu CRM  
**Technology Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Lucide Icons + Recharts + Prisma ORM + PostgreSQL / SQLite  

---

## 🌟 Executive Overview

**ESTATEFLOW CRM** is an end-to-end, multi-tenant real estate operating system managing the complete property sales lifecycle: from omni-channel enquiry acquisition to visual architectural unit inventory, automated cost calculation, booking approvals, construction milestone collections, and AI sales assistance.

Every real estate company (tenant) operates with strict data isolation for users, projects, leads, inventory, bookings, and financial records.

---

## 🚀 Quick Start (Running Locally)

### 1. Set Active Workspace
Ensure your workspace is set to:
```bash
C:\Users\Avita\.gemini\antigravity\scratch\estateflow-crm
```

### 2. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🎨 UI/UX Design System Specification (Section 2)

* **Primary Navy:** `#17324D` (Deep blue header & sidebar)
* **Secondary Navy:** `#244761` (Card accents & headers)
* **Primary Action:** `#3478C9` (Buttons & links)
* **Secondary Action:** `#159D91` (Teal badges & highlights)
* **Success:** `#16A36A` (Available units, realized receipts)
* **Warning / Hold:** `#E9A23B` (Blocked units, pending payments)
* **Danger:** `#DC5555` (Hot priority leads, overdue alerts)
* **Background:** `#F5F7FA` | **Card:** `#FFFFFF`

### Unit Inventory Status Color System
* **Available:** Green `#16A36A`
* **Blocked (72-hr Lock):** Orange `#E9A23B`
* **Reserved / Hold:** Purple `#8965C7`
* **Booked:** Blue `#3478C9`
* **Sold:** Grey `#7B8794`

---

## 🛡️ Role-Based Access Control (RBAC) Switcher

A live **Role Switcher** is built directly into the top header navigation bar. You can instantly toggle between all 6 roles defined in Section 3:
1. **Company Owner / Company Admin:** Complete management of company profile, team, projects, and inventory.
2. **Sales Manager:** Team assignment, approval of special discounts, booking authorizations.
3. **Sales Executive:** Lead follow-up tracking, outbound calls, site visits, unit blocking.
4. **Accounts Manager:** Milestone demand notes, payment recording, official stamped receipts.
5. **Channel Partner / Broker:** Attributed deals, commission statements, and client registrations.
6. **Super Admin (Platform Root):** Tenant isolation controls, company quotas, subscription plan billing.

---

## 📑 17 Core Modules Implemented

| Module | Route | Highlights |
|---|---|---|
| **1. Executive Dashboard** | `/dashboard` | Real-time KPIs, Recharts acquisition & conversion funnels, monthly booking trends, sales leaderboard. |
| **2. Lead 360 & Deduplication** | `/leads`, `/leads/[id]` | Inbound intake, phone deduplication alerts, Lead 360 (Overview, Activities, Follow-ups, Site Visits, Properties, Documents, Timeline). |
| **3. Kanban Sales Pipeline** | `/leads/pipeline` | 9 visual drag-and-drop lifecycle stages (New to Booked). |
| **4. Follow-up & Task Engine** | `/follow-ups` | Today, Upcoming, Overdue, and Completed logs with one-click resolution. |
| **5. Project Portfolio** | `/projects`, `/projects/[id]` | RERA tracking, master plan amenities, launch and possession milestones. |
| **6. Visual Tower Floor Grid** | `/inventory` | Interactive stacking plan with color-coded unit statuses, 72-hr transactional locking, and Excel import simulation. |
| **7. Dynamic Cost Sheets** | `/cost-sheets` | Real-time calculation of base price, floor rise, PLC, parking, clubhouse, GST, manager discount approvals, and PDF export. |
| **8. Bookings & Allotments** | `/bookings` | Manager approval workflows, booking token realization, and provisional allotment letter generator. |
| **9. Collections & Receipts** | `/collections` | Construction milestone schedules (10:10:15:25:20:20), demand notes, and official stamped digital receipts. |
| **10. Channel Partner Network** | `/brokers` | RERA broker directory, deal attribution, tiered commission calculation, and payout approvals. |
| **11. Property Listings** | `/property-listings` | Public and broker catalog with carpet area, facing, and shareable brochure links. |
| **12. WhatsApp Automation** | `/communications` | Meta Cloud API console, verified templates, live preview chat sandbox, and visual drip nurturing workflows. |
| **13. AI Sales Assistant & BI** | `/ai-assistant` | 0-100 purchase intent scoring, automated WhatsApp copywriting, and conversational natural language analytics queries. |
| **14. Reports & BI** | `/reports` | Multi-project sales velocity, inventory ageing, escrow collection status with CSV, Excel, and Print options. |
| **15. Team & RBAC Matrix** | `/employees` | Configurable permission matrix across View, Create, Edit, Delete, and Approve permissions. |
| **16. Documents Vault** | `/documents` | S3 private signed URL document repository for customer KYC and sale deeds. |
| **17. Super Admin SaaS** | `/super-admin` | Platform-level tenant onboarding, company status toggling, and subscription plan editor. |

---

## 🔌 API Endpoints (`/api/v1`)

* `GET /api/v1/dashboard/summary` — Company KPI aggregates
* `GET /api/v1/leads` — Filtered leads with pagination
* `POST /api/v1/leads` — Create lead with duplicate check
* `GET /api/v1/units` — Floor-by-floor unit inventory
* `POST /api/v1/units/:id/block` — Transactional 72-hr hold
* `POST /api/v1/cost-sheets` — Real-time price breakdown
* `GET /api/v1/bookings` — Booking requests
* `POST /api/v1/bookings` — Submit new booking
* `GET /api/v1/payments` — Receipts and collections
* `POST /api/v1/payments` — Record payment & stamp receipt

---

## 🗄️ Database Architecture

The schema is configured in `prisma/schema.prisma` with UUID primary keys, foreign key constraints, company-level data isolation, and fixed-precision decimal types for financial safety.

