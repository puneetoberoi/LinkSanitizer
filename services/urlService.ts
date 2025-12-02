import { CleanResult } from '../types';

const TRACKING_PARAMS = new Set([
  // Google / Analytics
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gclsrc', 'dclid',
  // Facebook / Meta
  'fbclid',
  // TikTok
  'ttclid', 'si', // 'si' is often used by TikTok for session sharing ID
  // Twitter / X
  't', 's',
  // Amazon
  'tag', 'ascsubtag',
  // LinkedIn
  'li_fat_id',
  // General Affiliate / Ad
  'ref', 'ref_src', 'click_id', 'affiliate_id', 'mc_eid', 'mc_cid'
]);

export const cleanUrl = (inputUrl: string): CleanResult => {
  let urlObj: URL;
  try {
    urlObj = new URL(inputUrl);
  } catch (e) {
    // If invalid URL, return as is but mark as 0 changes
    return {
      originalUrl: inputUrl,
      cleanedUrl: inputUrl,
      removedParams: [],
      paramCount: 0,
      reductionPercentage: 0
    };
  }

  const paramsToDelete: string[] = [];
  const searchParams = urlObj.searchParams;
  
  // Convert iterator to array to avoid modification issues during iteration
  const keys = Array.from(searchParams.keys());

  keys.forEach(key => {
    if (TRACKING_PARAMS.has(key.toLowerCase()) || key.startsWith('utm_')) {
      paramsToDelete.push(key);
      searchParams.delete(key);
    }
  });

  // Amazon Specific: Clean path /ref=...
  if (urlObj.hostname.includes('amazon') || urlObj.hostname.includes('amzn')) {
    // Amazon often puts tracking in the path like /dp/B00000/?ref=... or /ref=...
    // We strictly keep the searchParams clean from above, but also check path quirks if needed.
    // For now, regex removal of specific amazon path segments is risky without more complex logic,
    // so we rely on searchParams cleaning which handles 90% of cases.
  }

  const cleanedUrl = urlObj.toString();
  const originalLength = inputUrl.length;
  const cleanedLength = cleanedUrl.length;
  const reduction = originalLength > 0 ? ((originalLength - cleanedLength) / originalLength) * 100 : 0;

  return {
    originalUrl: inputUrl,
    cleanedUrl: cleanedUrl,
    removedParams: paramsToDelete,
    paramCount: paramsToDelete.length,
    reductionPercentage: Math.round(reduction)
  };
};