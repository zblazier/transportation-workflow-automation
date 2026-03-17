# transportation-workflow-automation
Form and Sheets automation to create documents that are printable and notify via email appropriate parties

# Transportation Workflow Automation

## Overview
This project demonstrates an automated workflow built using Google Apps Script to manage special transportation requests in a school environment.

The system connects Google Forms, Sheets, Docs, and Gmail to streamline communication and documentation.

---

## Problem
Special transportation requests require:

- detailed data collection
- communication between schools and transportation staff
- document generation
- tracking and validation

Manual handling of this process is time-consuming and error-prone.

---

## Solution
This workflow automates the entire process:

1. Staff submit a Google Form
2. Data is stored in Google Sheets
3. A formatted Google Doc is generated from a template
4. The document is linked back to the spreadsheet
5. Notification emails are sent to relevant staff
6. Duplicate entries are identified for review

---

## Features

- Automated document generation from template
- Dynamic email routing based on school
- Duplicate record detection and validation
- Centralized tracking of submissions
- Integration across Google Forms, Sheets, Docs, and Gmail

---

## Technologies Used

- JavaScript (Google Apps Script)
- Google Forms
- Google Sheets
- Google Docs
- Gmail API

---

## File Structure

---

## How It Works

- Trigger: Form submission (`onSubmitForm`)
- Data is processed and matched to school-specific email recipients
- A Google Doc is generated using a template
- Placeholders are replaced with form data
- Document link is written back to the spreadsheet
- Notification emails are sent automatically

---

## Notes

- File and folder IDs have been replaced with placeholders
- No real student data is included
- Designed to reflect real-world workflow automation in an educational setting

---

## Purpose

This project demonstrates:

- workflow automation across multiple systems
- event-driven scripting
- document generation pipelines
- real-world operational problem solving
