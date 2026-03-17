// Trigger function to run when form is submitted
function onSubmitForm(e) {
  // Get form responses
  const formResponses = e.namedValues;
  
  // Extract school name from form response
  const schoolName = formResponses['School'][0]; // Assuming 'School' is the question title in the form
  
  // Get the email addresses of the corresponding school
  const schoolEmails = getSchoolEmails(schoolName);
  
  // If school emails are found, proceed to create documents and send emails
  if (schoolEmails) {
    createNewGoogleDocs(formResponses, schoolEmails);
  } else {
    Logger.log("School email not found for " + schoolName);
  }
}



// Function to get the email addresses of the corresponding school from the spreadsheet
function getSchoolEmails(schoolName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Schools'); // Assuming school data is in a sheet named 'Schools'
  const data = sheet.getDataRange().getValues();
  const emails = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === schoolName) { // Assuming school names are in Column A
      emails.push(data[i][1]); // Assuming email addresses are in Column B
    }
  }
  
  return emails.length > 0 ? emails : null; // Return null if school name not found
}

///----///

// Custom function to trigger the entire script
function manuallyTriggerEntireScript() {
  // Trigger the form submission
  const e = {
    namedValues: {
      'School': ['Test School'] // Mocking a school name
    }
  };
  onSubmitForm(e);

  // Trigger the creation of Google Docs
  createNewGoogleDocs();
}

// Add a custom menu to the Google Sheets UI
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Create Links')
    .addItem('Create Missing Links to Documents', 'manuallyTriggerEntireScript')
    .addToUi();
}




///----///






// Function to create documents and send email to multiple recipients
function createNewGoogleDocs(formResponses, schoolEmails) {
  // Assign the template .doc by file id
  const googleDocTemplate = DriveApp.getFileById('DOC ID HERE');
  // Get destination folder
  const destinationFolder = DriveApp.getFolderById('FOLDER ID HERE');
  // Get data out of sheet and specify the sheet name 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  // Get rows from sheet
  const rows = sheet.getDataRange().getValues();
  
  rows.forEach(function(row, index){
    if(index === 0) return;
    // Index for document link if exists skip line
    if (row[0]) return;
    // For each row create copy of document template
    const copy = googleDocTemplate.makeCopy(`${row[5]}, ${row[6]} `, destinationFolder)
    const doc = DocumentApp.openById(copy.getId())
    const body = doc.getBody();
    const friendlyDate1 = new Date(row[1]).toLocaleDateString();
    const friendlyDate4 = new Date(row[4]).toLocaleDateString();
    const friendlyDate7 = new Date(row[7]).toLocaleDateString();
    const friendlyDate10 = new Date(row[10]).toLocaleDateString();

    // Replace placeholders with form responses
        body.replaceText('{{Timestamp}}', friendlyDate1);
        body.replaceText('{{Email Address}}', row[2]);
        body.replaceText('{{School}}', row[3]);
        body.replaceText('{{Today\'s Date}}', friendlyDate4);
        body.replaceText('{{Student Last Name}}', row[5]);
        body.replaceText('{{Student First Name}}', row[6]);
        body.replaceText('{{DOB}}', friendlyDate7);
        body.replaceText('{{Eligibility}}', row[8]);
        body.replaceText('{{Grade}}', row[9]);
        body.replaceText('{{Student Start Date}}', friendlyDate10);
        body.replaceText('{{Parent/Guardian Name/s}}', row[11]);
        body.replaceText('{{Parent/Guardian email}}', row[12]);
        body.replaceText('{{Home Address}}', row[13]);
        body.replaceText('{{Parent home phone}}', row[14]);
        body.replaceText('{{Parent cell phone}}', row[15]);
        body.replaceText('{{Parent work phone}}', row[16]);
        body.replaceText('{{Pick Up Location}}', row[17]);
        body.replaceText('{{Take the student to: School}}', row[18]);
        body.replaceText('{{Arrival Time}}', row[19]);
        body.replaceText('{{Departure Time}}', row[20]);
        body.replaceText('{{Pick the student up from: School}}', row[21]);
        body.replaceText('{{Drop Off Location}}', row[22]);
        body.replaceText('{{Does this student require adult supervision}}', row[23]);
        body.replaceText('{{If yes, explain.}}', row[24]);
        body.replaceText('{{Does the student have equipment needs}}', row[25]);
        body.replaceText('{{Equipment continued}}', row[26]);
        body.replaceText('{{Wheelchair details}}', row[27]);
        body.replaceText('{{Does the student use any of these items}}', row[28]);
        body.replaceText('{{Does the student have a physical disability, a medical diagnosis and/or associated medical problems that may impact transportation}}', row[29]);
        body.replaceText('{{Does the student have difficulty communicating}}', row[30]);
        body.replaceText('{{Does the student have increased sensitivity to any of the following}}', row[31]);
        body.replaceText('{{Are there any other characteristics, behaviors, or needs that may impact transportation}}', row[32]);
        body.replaceText('{{Describe any other specific types of assistance that the student needs.}}', row[33]);
        body.replaceText('{{Does the student have an alternative schedule}}', row[34]);
        body.replaceText('{{If yes, please explain alternative schedule:}}', row[35]);
        body.replaceText('{{PowerSchool Student Number}}', row[36]);
        body.replaceText('{{Admin Name and Contact Information}}', row[37]);
    // Replace other placeholders...

    doc.saveAndClose();
    const url = doc.getUrl();
    sheet.getRange(index + 1, 1).setValue(url);
    
    // Send email to each corresponding school email
    schoolEmails.forEach(function(email) {
      GmailApp.sendEmail(email, 'Special Transportation From', 'The Special Transportation Form was filled out for your building.  You can find the results here. URL: ' + url);
    });
  });
}
