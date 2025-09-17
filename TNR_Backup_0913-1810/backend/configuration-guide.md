# TNR Business Solutions Backend Configuration Guide

## Environment Variables Setup

Create a `.env` file in the backend directory with the following variables:

```bash
# OpenAI API Configuration (Required for AI Chatbot)
OPENAI_API_KEY=your_openai_api_key_here

# Wix API Configuration (Required for content management)
WIX_CLIENT_ID=your_wix_client_id
WIX_CLIENT_SECRET=your_wix_client_secret
WIX_SITE_ID=your_wix_site_id

# Google Drive Integration (Optional)
GOOGLE_DRIVE_CREDENTIALS_FILE=path/to/credentials.json

# Video Generation APIs (Optional)
KAIBER_API_TOKEN=your_kaiber_api_token

# Database Configuration (if needed)
DATABASE_URL=sqlite:///./tnr_business.db

# Email Configuration (for contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Analytics Configuration
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Security
SECRET_KEY=your_secret_key_for_jwt_tokens
```

## Setup Instructions

### 1. Install Backend Dependencies
```bash
npm run backend:install
```

### 2. Configure OpenAI API
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add it to your `.env` file as `OPENAI_API_KEY`

### 3. Start the Backend Server
```bash
npm run backend:start
```

The API will be available at `http://localhost:8000`

### 4. Test the Chatbot
```bash
npm run chatbot:test
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/services` - Get available services
- `POST /api/contact` - Submit contact form
- `WebSocket /ws/chat` - AI chatbot connection
- `WebSocket /ws` - Legacy WebSocket endpoint

## Features

- **AI Chatbot**: Intelligent customer assistance with business context
- **Real-time Communication**: WebSocket-based chat
- **Contact Form Handling**: Process customer inquiries
- **Service Information**: Dynamic service data
- **Performance Monitoring**: Built-in health checks

