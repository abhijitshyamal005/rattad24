import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from "@/app/utils/firebaseConfig";
import { useRouter } from 'next/navigation';
import { addDoc, collection, doc, getDocs, getFirestore, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { generateReferralCode } from '../../utils/generateReferralCode';
import React from 'react';

interface FormData {
    firstName: string;
    lastName: string;
    accountType: string;
    email: string;
    password: string;
    profileComplete: boolean;
    referralCode: string;
}

interface FormProps {
    router: ReturnType<typeof useRouter>;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    isLoggingIn: boolean;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

const addToSelzy = async (userData: { email: string; firstName: string; lastName: string }) => {
    try {
      const response = await fetch("/api/addToSelzy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
    //   console.log(result);
    //   console.log("User added to Selzy successfully!");

    } catch (error) {
      console.error("Failed to add user to Selzy:", error);
    }
};

const handleSubmit = async ({router, isLoggingIn, formData, setFormData, setIsSubmitting} : FormProps) => {

    if (isLoggingIn) {
      const areAllFieldsFilled = formData.email !== '' && formData.password !== '';

      if (areAllFieldsFilled) {
        try {
            setIsSubmitting(true);
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, formData.email, formData.password);
            const user = userCredential.user;
            router.push('/create');
    
        } catch (err: any) {
          const errorMessage = err.response?.data?.error || 'Something went wrong, please try again.';
          alert(errorMessage);
    
          alert({
            title: "Error",
            description: errorMessage,
          });
          console.log("Error: ", errorMessage);
          console.error(err);
        } finally {
            setFormData({
                firstName: '',
                lastName: '',
                accountType: '',
                email: '',
                password: '',
                profileComplete: false,
                referralCode: '',
            });
            setIsSubmitting(false);
        }
      }
    }
    // user is signing up
    else {
      const areAllFieldsFilled = formData.email !== '' &&
            formData.password !== '' &&
            formData.firstName !== '' &&
            formData.lastName !== '' &&
            formData.accountType !== '';

      if (areAllFieldsFilled) {
        try {
            setIsSubmitting(true);
            const db = getFirestore();
            const userCredential = await createUserWithEmailAndPassword(
                firebaseAuth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            const referralCode = generateReferralCode();

            await setDoc(userDocRef, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                accountType: formData.accountType,
                email: formData.email,
                profileComplete: formData.profileComplete,
                referralCode: referralCode,
                referralCodeUsed: formData.referralCode,
                plan: 'free',
                credits: 500,
            });

            if (firebaseAuth.currentUser) {
                sendEmailVerification(firebaseAuth.currentUser)
                .then(() => {
                    alert("Verification email sent.");
                })
                .catch((error: any) => {
                    alert("Error sending verification email:");
                    console.error("Error: ", error);
                });
            } else {
                console.error("No user is currently signed in.");
            }

            try {
                await addDoc(collection(db, "referrals"), {
                    referralCode,
                    owner: user.uid,
                    totalReferrals: 0,
                    createdAt: serverTimestamp(),
                });
                console.log("Referral added successfully!");
                
                // add to Selzy
                await addToSelzy({
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                });
                router.push("/onboarding");
            } catch (error) {
                console.error("Error adding referral:", error);
            }


        } catch (error: any) {
            const errorMessage = error.message || "An error occurred, please try again.";
            console.error('Error saving user data:', error);

            alert(`Error saving user data!, ${errorMessage}`);

            console.log("Error:", errorMessage);
        } finally {
            setFormData({
                firstName: '',
                lastName: '',
                accountType: '',
                email: '',
                password: '',
                profileComplete: false,
                referralCode: '',
            });
            setIsSubmitting(false);
        }
      }
    }
};

export default handleSubmit;