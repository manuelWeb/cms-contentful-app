// simple example for testing it manually from your browser.
export default function handler(req, res) {
  res.setPreviewData({});
  res.end('Preview mode enabled');
}
/**
 * show devtool cookies
 * open url http://localhost:3000/api/next-preview-test
 * req set cookies:
 * __prerender_bypass, __next_preview_data
 */