"use client";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseAuth, firestore } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import React from "react";
import { HashLoader } from "react-spinners";
import { AvatarScreen } from "./screens/avatarName";
import { BusinessInfo } from "./screens/businessInfo";
import { TargetAudience } from "./screens/targetAudience";
import { BusinessIndustry } from "./screens/businessIndustry";
import { ContentGoals } from "./screens/contentGoals";
import { ContentPreferences } from "./screens/contentPreferences";
import { Upgrade } from "./screens/upgrade";
import { CreatorInfo } from "./screens/creatorInfo";

export default function Onboarding() {
    const [formData, setFormData] = useState({
        userUid: '',
        firstName: '',
        lastName: '',
        email: '',
        avatarName: '',
        profileComplete: false,
        businessName: '',
        websiteURL: '',
        companySize: '',
        creatorType: '',
        businessIndustry: '',
        customBusinessIndustry: '',
        brandIdentity: '',
        brandGuidelines: '',
        accountType: '',
        targetAudience: [] as string[],
        contentGoals: [] as string[],
        contentPreferences: [] as string[],
    });
    const router = useRouter();
    const [userUid, setUserUid] = useState('');
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const getUserByUid = async (uid: string) => {
          try {
              const db = firestore;
              const userDocRef = doc(db, "users", uid);
              const userDoc = await getDoc(userDocRef);
          
              if (userDoc.exists()) {
                setFormData(
                    prevState => ({
                        ...prevState,
                        firstName: userDoc.data().firstName,
                        lastName: userDoc.data().lastName,
                        email: userDoc.data().email,
                        credits: userDoc.data().credits,
                        profileComplete: userDoc.data().profileComplete,
                        accountType: userDoc.data().accountType,
                        userUid: uid,
                        avatarName: userDoc.data().avatarName || 'rai',
                        businessName: userDoc.data().businessName || '',
                        websiteURL: userDoc.data().websiteURL || '',
                        companySize: userDoc.data().companySize || '',
                        businessIndustry: userDoc.data().businessIndustry || '',
                        customBusinessIndustry: userDoc.data().customBusinessIndustry || '',
                        brandIdentity: userDoc.data().brandIdentity || '',
                        brandGuidelines: userDoc.data().brandGuidelines || '',
                        targetAudience: userDoc.data().targetAudience || [],
                        contentGoals: userDoc.data().contentGoals || [],
                        contentPreferences: userDoc.data().contentPreferences || [],
                    }
                ));
              } else {
                console.error("No user data found in Firestore.");
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
        };

        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
            if (!user) {
                router.push('/login');
            } else {
                setUserUid(user.uid);
                setLoading(false);
                await getUserByUid(user.uid);
            }
        });
    
        return () => unsubscribe();
    }, [router, userUid]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
          if (!user) {
            router.push('/login');
          } else {
            setLoading(false);
          }
        });
    
        return () => unsubscribe();
        }, [router]);
    
        if (loading) {
          return (
            <div className="flex bg-black justify-center h-[100vh] flex-col items-center w-full">
                <div className="flex w-full h-full gap-3 items-center justify-center">
                    <HashLoader color="#ffffff" />
                </div>
            </div>
          );
        }

    return (
        // <div className="grid min-h-screen w-[100vw] gap-16 font-inter bg-black">
            <main className="flex bg-black font-inter items-center gap-5 w-full flex-col justify-start pt-10 min-h-screen">
                { stage === 0 && (
                    <AvatarScreen formData={formData} setFormData={setFormData} setStage={setStage} />
                )}

                { stage === 1 && formData.accountType === "business" && (
                    <BusinessInfo formData={formData} setFormData={setFormData} setStage={setStage} progress={20} />
                )}

                { stage === 1 && formData.accountType === "creator" && (
                  <CreatorInfo formData={formData} setFormData={setFormData} setStage={setStage} progress={20} />
                )}

                { stage === 2 && (
                    <BusinessIndustry formData={formData} setFormData={setFormData} setStage={setStage} progress={40} />
                )}

                { stage === 3 && (
                    <TargetAudience formData={formData} setFormData={setFormData} setStage={setStage} progress={60} />
                )}

                { stage === 4 && (
                    <ContentGoals formData={formData} setFormData={setFormData} setStage={setStage} progress={80} />
                )}

                { stage === 5 && (
                    <ContentPreferences formData={formData} setFormData={setFormData} setStage={setStage} progress={100} />
                )}

                {/* last page */}
                { stage === 6 && (
                    <Upgrade />
                )}

            </main>
        // </div>
    )
}