interface SiteConfig {
  /** Framer project publish URL */
  framerUrl: string;
  /** Production domain — no trailing slash */
  domain: string;
  /** Site name appended to every page title: "Page | {name}" */
  name: string;
}

const siteConfig: SiteConfig = {
  framerUrl: "https://omgkebabs.framer.website",
  domain: "https://fintrack-dashboard-beryl.vercel.app",
  name: "OMG (Oh My Goodness) - Kebabs. Done Right.",
};

export default siteConfig;
