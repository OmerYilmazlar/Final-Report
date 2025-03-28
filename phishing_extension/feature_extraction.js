function extractUrlBasedFeatures(urlString) {
  // Attempt to parse the URL:
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    // If invalid URL, return an object with default zeros
    return getZeroUrlFeatures();
  }

  const hostname = url.hostname || "";
  const path = url.pathname || "";
  const query = url.search || "";

  // Create a container for URL-based features:
  const featuresUrl = {};

  // (1) NumDots
  featuresUrl.numDots = (urlString.match(/\./g) || []).length;

  // (2) SubdomainLevel (rough guess: # of dots in hostname - 1)
  featuresUrl.subdomainLevel = Math.max(0, (hostname.match(/\./g) || []).length - 1);

  // (3) PathLevel (# of "/" segments in the path)
  const pathSegments = path.split("/").filter(seg => seg.length > 0);
  featuresUrl.pathLevel = pathSegments.length;

  // (4) UrlLength
  featuresUrl.urlLength = urlString.length;

  // (5) NumDash
  featuresUrl.numDash = (urlString.match(/-/g) || []).length;

  // (6) NumDashInHostname
  featuresUrl.numDashInHostname = (hostname.match(/-/g) || []).length;

  // (7) AtSymbol (1 if '@' present)
  featuresUrl.atSymbol = urlString.includes("@") ? 1 : 0;

  // (8) TildeSymbol (1 if '~' present)
  featuresUrl.tildeSymbol = urlString.includes("~") ? 1 : 0;

  // (9) NumUnderscore
  featuresUrl.numUnderscore = (urlString.match(/_/g) || []).length;

  // (10) NumPercent
  featuresUrl.numPercent = (urlString.match(/%/g) || []).length;

  // (11) NumQueryComponents (# of '&' in the query)
  let numQueryComponents = 0;
  if (query.startsWith("?")) {
    const queryString = query.substring(1);
    numQueryComponents = queryString.split("&").length;
  }
  featuresUrl.numQueryComponents = numQueryComponents;

  // (12) NumAmpersand
  featuresUrl.numAmpersand = (urlString.match(/&/g) || []).length;

  // (13) NumHash
  featuresUrl.numHash = (urlString.match(/#/g) || []).length;

  // (14) NumNumericChars
  featuresUrl.numNumericChars = (urlString.match(/[0-9]/g) || []).length;

  // (15) NoHttps (1 if not https)
  featuresUrl.noHttps = urlString.startsWith("https://") ? 0 : 1;

  // (16) RandomString (placeholder - real logic might detect gibberish subdomains)
  featuresUrl.randomString = 0; // or compute your own logic

  // (17) IpAddress (1 if hostname is purely an IP)
  const isIp = /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/.test(hostname) ? 1 : 0;
  featuresUrl.ipAddress = isIp;

  // (18) DomainInSubdomains, (19) DomainInPaths, etc. placeholders
  featuresUrl.domainInSubdomains = 0;
  featuresUrl.domainInPaths = 0;

  // (20) HttpsInHostname (1 if "https" found in hostname)
  featuresUrl.httpsInHostname = hostname.includes("https") ? 1 : 0;

  // (21) HostnameLength
  featuresUrl.hostnameLength = hostname.length;

  // (22) PathLength
  featuresUrl.pathLength = path.length;

  // (23) QueryLength
  featuresUrl.queryLength = query.length;

  // (24) DoubleSlashInPath (1 if "//" found in path)
  featuresUrl.doubleSlashInPath = path.includes("//") ? 1 : 0;

  // (25) NumSensitiveWords (placeholder - e.g., "password", "login", etc.)
  featuresUrl.numSensitiveWords = 0;

  // (26) EmbeddedBrandName (placeholder)
  featuresUrl.embeddedBrandName = 0;

  // (27) PctExtHyperlinks (placeholder)
  featuresUrl.pctExtHyperlinks = 0;

  // (28) PctExtResourceUrls (placeholder)
  featuresUrl.pctExtResourceUrls = 0;

  // (29) ExtFavicon (placeholder)
  featuresUrl.extFavicon = 0;

  // (34) PctNullSelfRedirectHyperlinks (placeholder)
  featuresUrl.pctNullSelfRedirectHyperlinks = 0;

  // (35) FrequentDomainNameMismatch (placeholder)
  featuresUrl.frequentDomainNameMismatch = 0;

  // (36) FakeLinkInStatusBar (placeholder)
  featuresUrl.fakeLinkInStatusBar = 0;

  // (37) RightClickDisabled (placeholder)
  featuresUrl.rightClickDisabled = 0;

  // (38) PopUpWindow (placeholder)
  featuresUrl.popUpWindow = 0;

  // (43) SubdomainLevelRT, (44) UrlLengthRT, (45) PctExtResourceUrlsRT, etc. placeholders
  featuresUrl.subdomainLevelRT = 0;
  featuresUrl.urlLengthRT = 0;
  featuresUrl.pctExtResourceUrlsRT = 0;
  featuresUrl.abnormalExtFormActionR = 0;
  featuresUrl.extMetaScriptLinkRT = 0;
  featuresUrl.pctExtNullSelfRedirectHyperlinksRT = 0;

  return featuresUrl;
}

/**
 * Returns an object with all the URL-based features set to 0.
 * Useful if the URL parsing fails.
 */
function getZeroUrlFeatures() {
  return {
    numDots: 0,
    subdomainLevel: 0,
    pathLevel: 0,
    urlLength: 0,
    numDash: 0,
    numDashInHostname: 0,
    atSymbol: 0,
    tildeSymbol: 0,
    numUnderscore: 0,
    numPercent: 0,
    numQueryComponents: 0,
    numAmpersand: 0,
    numHash: 0,
    numNumericChars: 0,
    noHttps: 0,
    randomString: 0,
    ipAddress: 0,
    domainInSubdomains: 0,
    domainInPaths: 0,
    httpsInHostname: 0,
    hostnameLength: 0,
    pathLength: 0,
    queryLength: 0,
    doubleSlashInPath: 0,
    numSensitiveWords: 0,
    embeddedBrandName: 0,
    pctExtHyperlinks: 0,
    pctExtResourceUrls: 0,
    extFavicon: 0,
    pctNullSelfRedirectHyperlinks: 0,
    frequentDomainNameMismatch: 0,
    fakeLinkInStatusBar: 0,
    rightClickDisabled: 0,
    popUpWindow: 0,
    subdomainLevelRT: 0,
    urlLengthRT: 0,
    pctExtResourceUrlsRT: 0,
    abnormalExtFormActionR: 0,
    extMetaScriptLinkRT: 0,
    pctExtNullSelfRedirectHyperlinksRT: 0
  };
}

/**
 * buildFeatureArray(urlFeatures, domFeatures)
 * Creates the final array of length 48 in the exact column order.
 */
function buildFeatureArray(urlFeatures, domFeatures) {
  return [
    urlFeatures.numDots,
    urlFeatures.subdomainLevel,
    urlFeatures.pathLevel,
    urlFeatures.urlLength,
    urlFeatures.numDash,
    urlFeatures.numDashInHostname,
    urlFeatures.atSymbol,
    urlFeatures.tildeSymbol,
    urlFeatures.numUnderscore,
    urlFeatures.numPercent,
    urlFeatures.numQueryComponents,
    urlFeatures.numAmpersand,
    urlFeatures.numHash,
    urlFeatures.numNumericChars,
    urlFeatures.noHttps,
    domFeatures.insecureForms || 0,
    domFeatures.relativeFormAction || 0,
    domFeatures.extFormAction || 0,
    domFeatures.abnormalFormAction || 0,
    domFeatures.submitInfoToEmail || 0,
    domFeatures.iframeOrFrame || 0,
    domFeatures.missingTitle || 0,
    domFeatures.imagesOnlyInForm || 0,
    urlFeatures.subdomainLevelRT,
    urlFeatures.urlLengthRT,
    urlFeatures.pctExtResourceUrlsRT,
    urlFeatures.abnormalExtFormActionR,
    urlFeatures.extMetaScriptLinkRT,
    urlFeatures.pctExtNullSelfRedirectHyperlinksRT
  ];
}

/**
 * extractFeatures(urlString, domFeatures)
 * Combines URL and DOM features into one feature array.
 */
function extractFeatures(urlString, domFeatures) {
  const urlFeats = extractUrlBasedFeatures(urlString);
  return buildFeatureArray(urlFeats, domFeatures);
}
