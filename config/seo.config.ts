// ─── PER-PAGE SEO CONFIGURATION ───────────────────────────────────────────────
// Edit the title and description for each page below.
// Slug ""  = homepage  ( / )
// Slug "about" = /about, etc.
//
// Running `npm run build` scrapes the Framer sitemap and automatically adds
// any new pages as placeholder entries — your existing edits are never touched.
// ─────────────────────────────────────────────────────────────────────────────

export interface PageSeo {
  title: string;
  description: string;
}

const seoConfig: Record<string, PageSeo> = {
  "": {
    title: "OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Your homepage description.",
  },
  "blog": {
    title: "Blog | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Blog page.",
  },
  "contact": {
    title: "Contact | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Contact page.",
  },
  "privacy-policy": {
    title: "Privacy Policy | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Privacy Policy page.",
  },
  "terms-conditions": {
    title: "Terms Conditions | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Terms Conditions page.",
  },
  "refund-policy": {
    title: "Refund Policy | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Refund Policy page.",
  },
  "awards": {
    title: "Awards | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Awards page.",
  },
  "blog/create-a-landing-page-that-performs-great": {
    title: "Create A Landing Page That Performs Great | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Create A Landing Page That Performs Great page.",
  },
  "blog/why-every-business-needs-a-professional-website-in-2025": {
    title: "Why Every Business Needs A Professional Website In 2025 | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Why Every Business Needs A Professional Website In 2025 page.",
  },
  "blog/starting-and-growing-a-career-in-web-design": {
    title: "Starting And Growing A Career In Web Design | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Starting And Growing A Career In Web Design page.",
  },
  "blog/top-web-design-trends-to-watch-in-2025": {
    title: "Top Web Design Trends To Watch In 2025 | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Top Web Design Trends To Watch In 2025 page.",
  },
  "blog/ux-vs-ui-design-what-s-the-difference-and-why-it-matters": {
    title: "Ux Vs Ui Design What S The Difference And Why It Matters | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Ux Vs Ui Design What S The Difference And Why It Matters page.",
  },
  "blog/how-can-designers-prepare-for-the-future": {
    title: "How Can Designers Prepare For The Future | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the How Can Designers Prepare For The Future page.",
  },
  "awards/global-green-award": {
    title: "Global Green Award | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Global Green Award page.",
  },
  "awards/community-impact-award": {
    title: "Community Impact Award | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Community Impact Award page.",
  },
  "awards/climate-standards-certification": {
    title: "Climate Standards Certification | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Climate Standards Certification page.",
  },
  "awards/sustainability-leadership-prize": {
    title: "Sustainability Leadership Prize | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Sustainability Leadership Prize page.",
  },
  "awards/green-innovation-award": {
    title: "Green Innovation Award | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Green Innovation Award page.",
  },
  "awards/global-reforestation-achievement": {
    title: "Global Reforestation Achievement | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Global Reforestation Achievement page.",
  },
  "legal/privacy-policy": {
    title: "Privacy Policy | OMG (Oh My Goodness) - Kebabs. Done Right.",
    description: "Description for the Privacy Policy page.",
  },
};

export default seoConfig;
