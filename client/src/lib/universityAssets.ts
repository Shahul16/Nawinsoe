export type CountryCode = "UK" | "CA" | "AU" | "IE" | "DE";

export type UniversityAsset = {
  /** Must match `universities.name` or fallbackUniversities.name exactly */
  name: string;
  country: CountryCode;
  /** For the logo (use official media where possible) */
  logoUrl: string;
  /** For the campus image (use official media where possible) */
  campusImageUrl: string;
  /** Official website (Learn More) */
  websiteUrl: string;
  /** Optional extra description snippet */
  shortDescription?: string;
};

const UNIVERSITY_ASSETS: UniversityAsset[] = [
  // United Kingdom
  {
    name: "University of Oxford",
    country: "UK",
    logoUrl: "https://www.ox.ac.uk/sites/files/oxford/styles/og_image/public/oxford_logo_0.svg",
    campusImageUrl: "https://www.ox.ac.uk/sites/files/oxford/styles/large/public/2021-04/ashmolean-museum.jpg",
    websiteUrl: "https://www.ox.ac.uk",
  },
  {
    name: "University of Cambridge",
    country: "UK",
    logoUrl: "https://www.cam.ac.uk/sites/www.cam.ac.uk/files/styles/og_image/public/cambridge-logo.svg",
    campusImageUrl: "https://www.cam.ac.uk/sites/www.cam.ac.uk/files/styles/large/public/thumbnails/bridge.jpg",
    websiteUrl: "https://www.cam.ac.uk",
  },
  {
    name: "Imperial College London",
    country: "UK",
    logoUrl: "https://www.imperial.ac.uk/media/imperial-college/alumni-and-friends/general/imperial-logo.png",
    campusImageUrl: "https://www.imperial.ac.uk/media/imperial-college/foundation/imperial-campus.jpg",
    websiteUrl: "https://www.imperial.ac.uk",
  },
  {
    name: "University College London (UCL)",
    country: "UK",
    logoUrl: "https://www.ucl.ac.uk/sites/default/files/ucl-logo.svg",
    campusImageUrl: "https://www.ucl.ac.uk/sites/default/files/styles/large/public/campus.jpg",
    websiteUrl: "https://www.ucl.ac.uk",
  },
  {
    name: "London School of Economics (LSE)",
    country: "UK",
    logoUrl: "https://www.lse.ac.uk/images/brand/lse-logo.svg",
    campusImageUrl: "https://www.lse.ac.uk/images/campus/campus-tower.jpg",
    websiteUrl: "https://www.lse.ac.uk",
  },
  {
    name: "University of Edinburgh",
    country: "UK",
    logoUrl: "https://www.ed.ac.uk/sites/default/files/atoms/files/edinburgh-university-logo.svg",
    campusImageUrl: "https://www.ed.ac.uk/sites/default/files/atoms/files/campus-edinburgh.jpg",
    websiteUrl: "https://www.ed.ac.uk",
  },
  {
    name: "University of Manchester",
    country: "UK",
    logoUrl: "https://www.manchester.ac.uk/assets/images/university-manchester-logo.svg",
    campusImageUrl: "https://www.manchester.ac.uk/assets/images/campus.jpg",
    websiteUrl: "https://www.manchester.ac.uk",
  },
  {
    name: "King's College London",
    country: "UK",
    logoUrl: "https://www.kcl.ac.uk/resources/logo/kcl-logo.svg",
    campusImageUrl: "https://www.kcl.ac.uk/images/campus-london.jpg",
    websiteUrl: "https://www.kcl.ac.uk",
  },
  {
    name: "University of Warwick",
    country: "UK",
    logoUrl: "https://www.warwick.ac.uk/services/marketing/brand/imagery/warwick-logo.svg",
    campusImageUrl: "https://www2.warwick.ac.uk/services/marketing/brand/imagery/warwick-campus.jpg",
    websiteUrl: "https://www.warwick.ac.uk",
  },

  // Canada
  {
    name: "University of British Columbia",
    country: "CA",
    logoUrl: "https://www.ubc.ca/brand/assets/logo-ubc.svg",
    campusImageUrl: "https://www.ubc.ca/images/campus.jpg",
    websiteUrl: "https://www.ubc.ca",
  },

  // Australia
  {
    name: "University of Melbourne",
    country: "AU",
    logoUrl: "https://www.unimelb.edu.au/__data/assets/file/0019/490123/unimelb-logo.svg",
    campusImageUrl: "https://www.unimelb.edu.au/__data/assets/file/0019/490124/unimelb-campus.jpg",
    websiteUrl: "https://www.unimelb.edu.au",
  },

  // Ireland
  {
    name: "Trinity College Dublin",
    country: "IE",
    logoUrl: "https://www.tcd.ie/assets/img/logo.svg",
    campusImageUrl: "https://www.tcd.ie/assets/img/campus.jpg",
    websiteUrl: "https://www.tcd.ie",
  },

  // Germany
  {
    name: "Technical University of Munich (TUM)",
    country: "DE",
    logoUrl: "https://www.tum.de/fileadmin/w00b2k5m/organisation/Logo/TUM-Logo.svg",
    campusImageUrl: "https://www.tum.de/fileadmin/w00b2k5m/fakultaeten/campus.jpg",
    websiteUrl: "https://www.tum.de",
  },
];

export function getUniversityAssetByName(name: string): UniversityAsset | undefined {
  return UNIVERSITY_ASSETS.find((u) => u.name === name);
}

export function getUniversityAssetsByCountries(
  countries: CountryCode[],
): UniversityAsset[] {
  const set = new Set(countries);
  return UNIVERSITY_ASSETS.filter((u) => set.has(u.country));
}
