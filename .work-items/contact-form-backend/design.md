# Contact Form Backend Integration Design

## 1. Objective

Complete the contact form implementation by integrating with a Google Apps Script backend that securely processes form submissions, optionally validates reCAPTCHA, and delivers messages to a Google Chat space for inbound marketing.

## 2. Technical Design

The contact form will be enhanced to submit data to a Google Apps Script web app endpoint. The backend will handle form validation, optional reCAPTCHA verification, and forward messages to a Google Chat space via the Google Chat API. This approach leverages Google's infrastructure without requiring a dedicated backend server.

**Architecture Reference**: This design follows the stateless services principle from the project's core engineering principles. The Google Apps Script acts as a stateless webhook handler that processes requests and forwards them to Google Chat.

**Flow**:

1. User fills out contact form in Vue.js frontend
2. Frontend optionally validates reCAPTCHA (if enabled)
3. Frontend sends POST request to Google Apps Script web app URL
4. Google Apps Script validates request and optional reCAPTCHA token
5. Google Apps Script formats message and posts to Google Chat space
6. Frontend receives success/error response and displays appropriate message

## 3. Key Changes

### 3.1. API Contracts

**Google Apps Script Web App Endpoint**

- **URL**: Configurable via environment variable `VITE_GOOGLE_APPS_SCRIPT_URL`
- **Method**: POST
- **Content-Type**: `application/json`
- **Request Body**:
  ```typescript
  {
    name: string
    email: string
    organizationName?: string
    organizationDescription?: string
    referralSource?: string
    message: string
    recaptchaToken?: string  // Optional, if reCAPTCHA is enabled
  }
  ```
- **Response**:
  - **Success (200)**:
    ```typescript
    {
      success: true
      message: string
    }
    ```
  - **Error (400/500)**:
    ```typescript
    {
      success: false
      error: string
    }
    ```

**Google Chat API Integration** (handled by Google Apps Script)

- The Google Apps Script will use the Google Chat API to post messages to a configured space
- Message format will include all form fields in a structured format for easy reading

### 3.2. Data Models

No new data models are required. The existing `ContactFormData` interface in `ContactForm.vue` will be extended to optionally include `recaptchaToken`.

**Updated Interface**:

```typescript
export interface ContactFormData {
  name: string
  email: string
  organizationName?: string
  organizationDescription?: string
  referralSource?: string
  message: string
  recaptchaToken?: string
}
```

### 3.3. Component Responsibilities

**Frontend Components**:

- **`ContactForm.vue`** (Modified):
  - Integrate reCAPTCHA v3 (optional, configurable via environment variable)
  - Replace placeholder `handleContactSubmit` with actual API call to Google Apps Script
  - Handle API errors gracefully with user-friendly messages
  - Maintain existing validation and UI behavior

- **New Service Module** (Optional):
  - `src/services/contactFormService.ts`: Encapsulate API communication logic
  - Provides `submitContactForm(data: ContactFormData, recaptchaToken?: string): Promise<void>`
  - Handles HTTP errors and transforms them to user-friendly messages

**Backend (Google Apps Script)**:

- Web app handler function that:
  - Validates incoming POST requests
  - Optionally verifies reCAPTCHA token with Google's reCAPTCHA API
  - Formats message for Google Chat
  - Posts message to configured Google Chat space
  - Returns appropriate HTTP responses

**Configuration**:

- Environment variables:
  - `VITE_GOOGLE_APPS_SCRIPT_URL`: Google Apps Script web app deployment URL
  - `VITE_RECAPTCHA_SITE_KEY`: reCAPTCHA site key (optional, only if reCAPTCHA is enabled)
  - `VITE_RECAPTCHA_ENABLED`: Boolean flag to enable/disable reCAPTCHA (optional, defaults to false)

## 4. Out of Scope

- Email notifications (only Google Chat delivery)
- Form submission storage/database (messages only delivered to Google Chat)
- Admin dashboard for viewing submissions
- Multiple Google Chat spaces or routing logic
- Rate limiting (handled by Google Apps Script quotas)
- Form analytics or tracking
- Multi-language support for form fields
- File attachments in contact form
- Automated email responses to form submitters
