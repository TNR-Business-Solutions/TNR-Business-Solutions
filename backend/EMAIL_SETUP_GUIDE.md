# TNR Business Solutions - Email Notification Setup Guide

## 🚀 Overview
The intake form system can send email notifications when new leads submit forms through the chatbot. This guide explains how to set up email notifications.

## 📧 Email Configuration

### Option 1: Gmail (Recommended)
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Set Environment Variables**:
   ```bash
   set EMAIL_PASSWORD=your_app_password_here
   set EMAIL_ADDRESS=your_email@gmail.com
   set NOTIFICATION_EMAIL=Roy.Turner@TNRBusinessSolutions.com
   ```

### Option 2: Other Email Providers
- **Outlook/Hotmail**: Use your regular password or app password
- **Business Email**: Use your SMTP credentials
- **Custom SMTP**: Modify the SMTP settings in `intake-server.js`

## 🔧 Setup Instructions

### Windows (PowerShell)
```powershell
# Set email configuration
$env:EMAIL_PASSWORD = "your_app_password"
$env:EMAIL_ADDRESS = "Roy.Turner@TNRBusinessSolutions.com"
$env:NOTIFICATION_EMAIL = "Roy.Turner@TNRBusinessSolutions.com"

# Start the server
npm run intake:start
```

### Windows (Command Prompt)
```cmd
set EMAIL_PASSWORD=your_app_password
set EMAIL_ADDRESS=Roy.Turner@TNRBusinessSolutions.com
set NOTIFICATION_EMAIL=Roy.Turner@TNRBusinessSolutions.com
npm run intake:start
```

### Linux/Mac
```bash
export EMAIL_PASSWORD="your_app_password"
export EMAIL_ADDRESS="Roy.Turner@TNRBusinessSolutions.com"
export NOTIFICATION_EMAIL="Roy.Turner@TNRBusinessSolutions.com"
npm run intake:start
```

## ✅ Testing Email Setup

1. **Start the server** with email configuration
2. **Test the health endpoint**:
   ```bash
   curl http://localhost:8000/api/health
   ```
   Should show `"email_configured": true`

3. **Submit a test form** through the chatbot or API
4. **Check your email** for the notification

## 📁 Local Storage (Fallback)

Even without email configuration, all form submissions are saved locally in:
```
backend/submissions/
```

You can view submissions at:
```
http://localhost:8000/api/submissions
```

## 🚨 Troubleshooting

### Email Not Sending
- ✅ Check email password is correct
- ✅ Verify 2FA is enabled (for Gmail)
- ✅ Use app password, not regular password
- ✅ Check spam folder
- ✅ Verify SMTP settings

### Server Won't Start
- ✅ Check if port 8000 is available
- ✅ Verify Node.js dependencies are installed
- ✅ Check console for error messages

### Form Submissions Not Working
- ✅ Ensure chatbot is pointing to correct API endpoint
- ✅ Check browser console for errors
- ✅ Verify CORS is enabled
- ✅ Test API endpoint directly

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:8000/api/health
```

### View Recent Submissions
```bash
curl http://localhost:8000/api/submissions
```

### Server Logs
Monitor the console output for:
- ✅ Successful email sends
- ❌ Email errors
- 📁 Local file saves
- 📝 New form submissions

## 🔒 Security Notes

- **Never commit email passwords** to version control
- **Use environment variables** for sensitive data
- **Consider using a dedicated email account** for notifications
- **Regularly rotate app passwords**

## 📞 Support

If you need help setting up email notifications:
1. Check the server logs for error messages
2. Test with a simple email client first
3. Verify your email provider's SMTP settings
4. Contact your IT administrator for business email setup

---

**🎯 Ready to capture leads!** Once email is configured, you'll receive instant notifications for every form submission from your website chatbot.

