# Google Drive API Setup Guide for TNR Business Solutions

## Overview
This guide will help you set up Google Drive API integration for content management and file synchronization.

## Prerequisites
- Google Cloud Console access
- Python 3.7+ installed
- pip package manager

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it "TNR Business Solutions" or similar

## Step 2: Enable Google Drive API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on it and press "Enable"

## Step 3: Create Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Desktop application"
4. Name it "TNR Business Solutions Desktop"
5. Download the JSON file
6. Rename it to `credentials.json`
7. Place it in `backend/credentials/` directory

## Step 4: Install Required Packages

```bash
cd backend
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

## Step 5: Test the Integration

```bash
cd backend/api_connectors
python google_drive.py
```

## Step 6: Configure Environment Variables

Add to your `.env` file:
```env
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
GOOGLE_DRIVE_SYNC_ENABLED=true
```

## Usage Examples

### List Files
```python
from api_connectors.google_drive import GoogleDriveConnector

connector = GoogleDriveConnector()
if connector.authenticate():
    files = connector.list_files()
    print(f"Found {len(files)} files")
```

### Search Files
```python
# Search for specific files
files = connector.search_files("marketing", "application/pdf")
```

### Get Recent Files
```python
# Get files modified in last 7 days
recent = connector.get_recent_files(days=7)
```

### Sync Content
```python
# Sync Drive content to local directory
result = sync_drive_content("./content/drive-sync/")
print(f"Synced {len(result['synced_files'])} files")
```

## Security Notes

- Keep `credentials.json` secure and never commit to version control
- Use environment variables for sensitive data
- Regularly rotate API keys
- Monitor API usage in Google Cloud Console

## Troubleshooting

### Common Issues

1. **"Credentials file not found"**
   - Ensure `credentials.json` is in `backend/credentials/`
   - Check file permissions

2. **"Authentication failed"**
   - Verify Google Drive API is enabled
   - Check OAuth client configuration
   - Ensure correct scopes are set

3. **"Permission denied"**
   - Check folder sharing permissions
   - Verify API access rights

### Getting Help

- Check Google Drive API documentation
- Review error logs in `backend/logs/`
- Test with Google Drive API Explorer

## Next Steps

1. Set up automated content sync
2. Configure webhook notifications
3. Implement file versioning
4. Add content approval workflows
