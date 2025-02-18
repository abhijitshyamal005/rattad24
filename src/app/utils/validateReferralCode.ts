import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

export default async function validateReferralCode(referralCode: string, setReferralStatus: React.Dispatch<React.SetStateAction<"valid" | "invalid" | null>>): Promise<any> {

    if (!referralCode) return setReferralStatus(null);
    try {
      const enteredReferralCode = referralCode.trim();
      const db = getFirestore();

      if (enteredReferralCode) {
          const referralsQuery = query(
            collection(db, "referrals"),
            where("referralCode", "==", enteredReferralCode)
          );
          const querySnapshot = await getDocs(referralsQuery);
    
          if (querySnapshot.empty) {
            alert("Invalid referral code. Signing up nevertheless.");
            setReferralStatus("invalid");
            return;
          } else {
            console.log("Referral code is valid.");
            setReferralStatus("valid");
          }
      }
    } catch (error) {
      console.error("Failed to validate referral code:", error);
      setReferralStatus(null);
    }

  };