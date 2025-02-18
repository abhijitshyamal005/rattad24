import { firebaseAuth } from "@/app/utils/firebaseConfig";

export default async function isUserPremium(): Promise<boolean> {
  await firebaseAuth.currentUser?.getIdToken(true);
  const decodedToken = await firebaseAuth.currentUser?.getIdTokenResult();

  return decodedToken?.claims?.stripeRole ? true : false;
}