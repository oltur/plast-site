# Google Calendar Admin Setup Guide

This guide will help you set up admin-only Google Calendar management for the PLAST Düsseldorf site.

## What This Does

- ✅ **Admin-only access**: Only users with `role: "admin"` can manage calendar
- ✅ **Specific calendar**: Always works with plastduesseldorfsite@gmail.com calendar
- ✅ **Server-side operations**: Uses service account (no user login required)
- ✅ **Full CRUD**: Create, read, update, and delete calendar events

## Step 1: Create Service Account

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project** (the one with your OAuth credentials)
3. **Navigate to**: "IAM & Admin" → "Service Accounts"
4. **Click**: "Create Service Account"
5. **Fill in**:
   - Name: `PLAST Calendar Service Account`
   - Description: `Server-side access to manage PLAST calendar`
6. **Click**: "Create and Continue"
7. **Skip** role assignment (click "Continue")
8. **Click**: "Done"

## Step 2: Create Service Account Key

1. **Click** on the service account you just created
2. Go to **"Keys"** tab
3. **Click**: "Add Key" → "Create new key"
4. **Choose**: JSON format
5. **Click**: "Create"
6. **Save** the downloaded JSON file somewhere safe

The file will look like this:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "plast-calendar-service@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  ...
}
```

## Step 3: Enable Google Calendar API

1. In Google Cloud Console, go to **"APIs & Services"** → **"Library"**
2. **Search** for "Google Calendar API"
3. **Click** on it and then **"Enable"**

## Step 4: Share Calendar with Service Account

1. **Open Google Calendar** using your plastduesseldorfsite@gmail.com account
2. Go to **Settings** (gear icon) → **Settings**
3. On the left sidebar, find your calendar under **"Settings for my calendars"**
4. Click on the calendar name
5. Scroll to **"Share with specific people or groups"**
6. **Click**: "Add people and groups"
7. **Enter** the service account email from the JSON file:
   - It looks like: `plast-calendar-service@your-project.iam.gserviceaccount.com`
8. **Set permission** to: "Make changes to events"
9. **Click**: "Send"

## Step 5: Add Credentials to Environment

1. **Open** the JSON file you downloaded in Step 2
2. **Copy the entire JSON content** (all of it, from `{` to `}`)
3. **Open** `.env.local` in your project
4. **Replace** the `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS=` line with:

```bash
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='{"type":"service_account","project_id":"your-project-id",...}'
```

⚠️ **Important**: Put the entire JSON on ONE line and wrap it in single quotes!

Example:
```bash
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='{"type":"service_account","project_id":"plast-project","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIE...","client_email":"plast-calendar@plast-project.iam.gserviceaccount.com","client_id":"123456789"}'
```

4. **Verify** the calendar ID is set:
```bash
GOOGLE_CALENDAR_ID=plastduesseldorfsite@gmail.com
```

## Step 6: Make a User Admin

For testing, make your user account an admin in Sanity:

1. Go to Sanity Studio: http://localhost:3001/studio
2. Navigate to "Users" (or access via Vision)
3. Find your user
4. Change `role` field to `"admin"`
5. Save the document

Or use this GROQ query in Sanity Vision:
```groq
*[_type == "user" && email == "your-email@gmail.com"][0] {
  _id,
  name,
  email,
  role
}
```

Then manually update the role to "admin" in the Studio.

## Step 7: Restart Server and Test

1. **Stop** your development server (Ctrl+C)
2. **Start** it again:
   ```bash
   npm run dev
   ```
3. **Navigate** to: http://localhost:3001/uk/admin/calendar
4. **You should see**: Calendar management interface
5. **Test**: Create a test event

## Accessing the Admin Calendar

Once set up, admins can access it at:
- **English**: http://localhost:3001/en/admin/calendar
- **German**: http://localhost:3001/de/admin/calendar
- **Ukrainian**: http://localhost:3001/uk/admin/calendar

## Troubleshooting

### Error: "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS not found"
- Check that you added the credentials to `.env.local`
- Make sure they're wrapped in single quotes
- Restart your dev server after adding

### Error: "Invalid GOOGLE_SERVICE_ACCOUNT_CREDENTIALS format"
- Ensure the JSON is valid (copy the entire content from the file)
- Check there are no line breaks in the `.env.local` value
- Make sure it's wrapped in single quotes

### Error: "Forbidden: Admin access required"
- Your user role must be `"admin"` in Sanity
- Check with GROQ query: `*[_type == "user" && email == "your@email.com"][0]`

### Error: "Not Found" or "Calendar not found"
- Check that the service account email is shared with the calendar
- Verify the `GOOGLE_CALENDAR_ID` matches your calendar email
- Make sure Google Calendar API is enabled

### Events don't show up
- Wait a few seconds and refresh the page
- Check the calendar directly at calendar.google.com
- Verify the service account has "Make changes to events" permission

## Security Notes

- 🔒 **Never commit** `.env.local` to git (it should be in `.gitignore`)
- 🔒 **Keep the service account JSON file secret**
- 🔒 Only give admin role to trusted users
- 🔒 In production, use environment variables or secret manager for credentials

## Production Deployment

When deploying to production (Vercel, etc.):

1. Add environment variables in your hosting platform:
   - `GOOGLE_CALENDAR_ID`
   - `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`
2. Use the same values from your `.env.local`
3. Make sure to keep the JSON credentials on one line

## Features Available

- ✅ View all upcoming events from the calendar
- ✅ Create new events (with dates, times, locations, descriptions)
- ✅ Delete events
- ✅ All-day or timed events
- ✅ Automatic timezone handling (Europe/Berlin)
- ✅ Direct links to edit events in Google Calendar
- ✅ Real-time updates

## Next Steps

Once set up, you can:
- Integrate calendar events into your public pages
- Sync Sanity events with Google Calendar
- Add email notifications for new events
- Create recurring events
- Add attendees to events

Enjoy managing your PLAST calendar! 📅
