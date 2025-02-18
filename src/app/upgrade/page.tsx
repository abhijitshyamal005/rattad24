"use client";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseAuth, firestore } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import React from "react";
import { HashLoader } from "react-spinners";
import Pricing from "../(root)/pricing/components";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Upgrade() {
    const router = useRouter();
    const [userUid, setUserUid] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const getUserByUid = async (uid: string) => {
        //   try {
        //       const db = firestore;
        //       const userDocRef = doc(db, "users", uid);
        //       const userDoc = await getDoc(userDocRef);
          
        //       if (userDoc.exists()) {
        //         setUserUid(uid)
        //       } else {
        //         console.error("No user data found in Firestore.");
        //       }
        //   } catch (error) {
        //       console.error('Error fetching user data:', error);
        //   }
        // };

        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
            if (!user) {
                router.push('/login');
            } else {
                setUserUid(user.uid);
                setLoading(false);
                // await getUserByUid(user.uid);
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
            <main className="flex bg-black text-white font-inter items-center gap-5 w-full flex-col justify-start pt-10 min-h-screen">
                <Button className="bg-transparent hover:bg-transparent absolute top-5 left-0" onClick={() => router.back()}>
                    <ArrowLeft className="min-w-[30px] min-h-[30px] text-white" />
                </Button>
                <Pricing uid={userUid} />
            </main>
        // </div>
    )
}