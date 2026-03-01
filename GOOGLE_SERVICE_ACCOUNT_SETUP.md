# Google Service Account Setup (Optional but Recommended)

A service account allows your site to access Google Calendar and Drive on behalf of the organization, without needing user authentication.

## When to Use Service Account

- **Organization-wide calendar** that the site manages
- **Shared Google Drive folder** for member resources
- **Automated operations** like creating events, uploading files

## Setup Steps

### 1. Create Service Account

1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to **"IAM & Admin"** → **"Service Accounts"**
4. Click **"Create Service Account"**
5. Fill in:
   - **Name**: PLAST Site Service Account
   - **Description**: Server-side access to Calendar and Drive
6. Click **"Create and Continue"**
7. Skip role assignment (click "Continue")
8. Click **"Done"**

### 2. Create Service Account Key

1. Click on the service account you just created
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Choose **JSON** format
5. Click **"Create"**
6. Save the downloaded JSON file as `google-service-account.json` in your project root
7. **IMPORTANT**: Add to `.gitignore` to keep it secret

### 3. Add to .env.local

Add this line to your `.env.local`:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./google-service-account.json
```

### 4. Share Calendar/Drive with Service Account

**For Calendar:**
1. Open Google Calendar with your plastduesseldorfsite.com account
2. Create or select the calendar to share
3. Click Settings → Share with specific people
4. Add the service account email: `your-service-account@your-project.iam.gserviceaccount.com`
5. Give it "Make changes to events" permission

**For Google Drive:**
1. Create a shared folder for PLAST resources
2. Share it with the service account email
3. Give it "Editor" permission

### 5. Use Service Account in Code

Create `/src/lib/google-service-account.ts`:

```typescript
import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

const keyPath = path.join(process.cwd(), process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH!)
const credentials = JSON.parse(fs.readFileSync(keyPath, 'utf-8'))

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/drive.file',
  ],
})

export const calendar = google.calendar({ version: 'v3', auth })
export const drive = google.drive({ version: 'v3', auth })
```

### 6. Install googleapis

```bash
npm install googleapis
```

## Benefits

- ✅ No user authentication needed for site operations
- ✅ Consistent access to organization resources
- ✅ Better for automated tasks
- ✅ Doesn't expire like user tokens

## Security

- 🔒 Keep `google-service-account.json` secret
- 🔒 Never commit it to git
- 🔒 Add to `.gitignore`
- 🔒 In production, use environment variables or secret manager
