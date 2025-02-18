import { getFirestore, collection, doc, addDoc, getDoc, onSnapshot } from "firebase/firestore";
import getStripe from "./initializeStripe";
import { firestore } from "@/app/utils/firebaseConfig";


type PlanTypes = "dynamicFree" | "dynamicMonthlyStarter" | "dynamicMonthlyPro" | "dynamicYearlyStarter" | "dynamicYearlyPro" |
                  "bundleFree" | "bundleMonthlyUnicorn" | "bundleMonthlySuperUnicorn" | "bundleYearlyUnicorn" | "bundleYearlySuperUnicorn" |
                  "creditFree" | "creditMonthlyUnique" | "creditMonthlyUnicorn" | "creditMonthlyCustom" | "creditYearlyUnique" | "creditYearlyUnicorn" |
                  "freelanceFree" | "freelanceMonthlyPro" | "freelanceYearlyStarter" | "freelanceYearlyPro";

export async function createCheckoutSession(uid: string, planType: PlanTypes ) {
  if (!uid) throw new Error("User ID is required");

  try {
    const productRef = doc(firestore, "products", planType);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) throw new Error(`Plan ${planType} does not exist`);
    
    const { priceId } = productSnap.data();
    
    if (!priceId) throw new Error("Price ID is missing for the selected plan");
    console.log("Price Id: ", priceId, planType);

    const checkoutSessionRef = collection(doc(firestore, "users", uid), "checkout_sessions");

    const docRef = await addDoc(checkoutSessionRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    console.log("Doc Ref: ", docRef);

    onSnapshot(docRef, async (snap) => {
      const data = snap.data();

      console.log("Data: ", data);
      if (data?.sessionId) {
        const stripe = await getStripe();
        console.log("Stripe: ", stripe);
        stripe?.redirectToCheckout({ sessionId: data.sessionId });
      }
    });

  } catch (error) {
    console.error("Error creating checkout session:", error);
  }
}
