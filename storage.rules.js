rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can upload their own documents
    match /users/{userId}/documents/{document} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admin can read all documents
    match /{allPaths=**} {
      allow read: if request.auth != null && isAdmin();
    }
  }
  
  // Helper function to check if user is admin
  function isAdmin() {
    return request.auth.token.admin == true;
  }
}