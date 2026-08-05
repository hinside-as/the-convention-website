/**
 * Paste this into Extensions > Apps Script on the Google Sheet used for
 * email signups. See SETUP.md for the full step-by-step.
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([data.email, data.submittedAt]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
