function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 1. فحص وجود بيانات داخل الطلب
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(
        JSON.stringify({
          status: "error",
          message: "No data received",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);

    // 2. التحقق من وجود الإيميل
    if (!data.email || data.email.toString().trim() === "") {
      return ContentService.createTextOutput(
        JSON.stringify({
          status: "error",
          message: "Email is required",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var userEmail = data.email.toString().trim();
    var searchEmail = userEmail.toLowerCase();

    // 3. قراءة البيانات من الشيت للتحقق من عدد المحاولات
    var dataRange = sheet.getDataRange().getValues();
    var count = 0;

    if (dataRange.length > 1) {
      for (var i = 1; i < dataRange.length; i++) {
        var row = dataRange[i];
        if (row && row.length > 1 && row[1]) {
          var sheetEmail = row[1].toString().trim().toLowerCase();
          if (sheetEmail === searchEmail) {
            count++;
          }
        }
      }
    }

    // 4. إذا تجاوز الحد المسموح (محاولتان)
    if (count >= 2) {
      return ContentService.createTextOutput(
        JSON.stringify({
          status: "limit_reached",
          message:
            "You have reached the maximum number of messages (2). Please sign up to send more.",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // 5. إرسال الإيميل أولاً (إذا فشل بسبب الصلاحيات أو غيرها سينتقل لـ catch فوراً ولن يُسجل شيء في الشيت)
    var recipient = "mortaqiac@gmail.com";
    var subject = 'message from "' + userEmail + '"';
    var body =
      "name : " +
      (data.name || "") +
      "\n" +
      "email : " +
      userEmail +
      "\n" +
      "msg : " +
      (data.message || "");

    GmailApp.sendEmail(recipient, subject, body);

    // 6. تسجيل البيانات في الشيت بعد نجاح إرسال الإيميل فقط
    sheet.appendRow([data.name || "", userEmail, data.phone || "", new Date()]);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Your message was sent successfully.",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
function testAuth() {
  GmailApp.sendEmail("mortaqiac@gmail.com", "Test Subject", "Test Body");
}
//this for testing
