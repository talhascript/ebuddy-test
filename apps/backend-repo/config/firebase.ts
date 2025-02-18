import admin, { ServiceAccount } from "firebase-admin";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";

dotenv.config();

class FirebaseService {
  private static instance: FirebaseService;
  public adminApp: admin.app.App;
  public db: Firestore;

  private constructor() {
    this.adminApp = this.initializeFirebase();
    this.db = getFirestore(this.adminApp);
  }

  private initializeFirebase(): admin.app.App {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
      console.error("❌ FIREBASE_SERVICE_ACCOUNT_KEY is missing in the .env file.");
      process.exit(1);
    }

    let serviceAccount: ServiceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountKey);
    } catch (error) {
      console.error("❌ Invalid FIREBASE_SERVICE_ACCOUNT_KEY JSON:", error);
      process.exit(1);
    }

    return admin.apps.length
      ? admin.app()
      : admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }
}

export const firebaseService = FirebaseService.getInstance();
export const db = firebaseService.db;
