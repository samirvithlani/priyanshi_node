const { processBulkMail } = require("./MailScript");
const sendMailFn = require("./SendMailScript");
processBulkMail(sendMailFn, 3000);
