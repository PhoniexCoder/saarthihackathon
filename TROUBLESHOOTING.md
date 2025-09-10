# Troubleshooting Guide

## Firebase "Client is Offline" Error

If you're seeing the error `FirebaseError: Failed to get document because the client is offline`, here are the steps to resolve it:

### 1. Check Your Internet Connection
- Make sure you have a stable internet connection
- Try refreshing the page
- Check if other websites are loading properly

### 2. Verify Firebase Configuration
Make sure your `.env.local` file has the correct Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Check Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Check if there are any service disruptions
4. Verify that Firestore Database is enabled
5. Check if your project is on the correct plan (Blaze or Spark)

### 4. Browser Issues
- Clear browser cache and cookies
- Try opening in an incognito/private window
- Disable browser extensions that might interfere
- Try a different browser

### 5. Development Server Issues
- Stop the development server (`Ctrl+C`)
- Clear Next.js cache: `rm -rf .next`
- Restart the development server: `npm run dev`

### 6. Firebase Rules
Make sure your Firestore security rules allow read access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 7. Network/Firewall Issues
- Check if your network blocks Firebase domains
- Try using a different network (mobile hotspot)
- Disable VPN if you're using one

### 8. Environment Variables
- Make sure you're using `.env.local` (not `.env`)
- Restart the development server after changing environment variables
- Verify that all variables start with `NEXT_PUBLIC_`

### 9. Firebase Project Setup
Ensure your Firebase project is properly configured:

1. **Authentication**: Enable Google sign-in
2. **Firestore**: Create database in test mode
3. **Authorized Domains**: Add `localhost` for development

### 10. Common Solutions

#### Solution 1: Restart Everything
```bash
# Stop the server
Ctrl+C

# Clear cache
rm -rf .next
rm -rf node_modules/.cache

# Reinstall dependencies
npm install

# Start server
npm run dev
```

#### Solution 2: Check Firebase Status
- Visit [Firebase Status Page](https://status.firebase.google.com/)
- Check if there are any ongoing issues

#### Solution 3: Verify Project ID
- Make sure the project ID in your `.env.local` matches your Firebase project
- Check for typos in the configuration

### 11. Debug Information
To help debug, check the browser console for:
- Network errors
- Firebase initialization errors
- Authentication errors

### 12. Still Having Issues?
If the problem persists:
1. Check the browser console for specific error messages
2. Verify your Firebase project settings
3. Try creating a new Firebase project for testing
4. Contact Firebase support if it's a service issue

## Quick Fix Checklist

- [ ] Internet connection is stable
- [ ] Firebase configuration is correct
- [ ] Environment variables are properly set
- [ ] Development server restarted
- [ ] Browser cache cleared
- [ ] Firebase project is active
- [ ] Firestore database is created
- [ ] Authentication is enabled
- [ ] Security rules allow access

## Emergency Fallback
If you need to test the application without Firebase:
1. Comment out Firebase imports temporarily
2. Use mock data for development
3. Implement offline-first features


