"use client";

import { useEffect, useState } from "react";
import { firebaseAuth, firestore } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';
import React from "react";
import { HashLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Image } from "lucide-react";

import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";

export default function Templates() {
    const router = useRouter();
    const [userUid, setUserUid] = useState('');
    const [loading, setLoading] = useState(false);
    // const templates = [
    //     {
    //         Icon: Image,
    //         name: "AI generated image of man",
    //         cta: "Show prompt",
    //         background: <img src="/ai/man.png" className="w-full h-fit object-cover" />,
    //         className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 bg-primary h-full",
    //       },
    //     {
    //         Icon: Image,
    //         name: "AI generated image of girl",
    //         cta: "Show prompt",
    //         background: <img src="/ai/girl.png" className="w-full h-fit object-cover" />,
    //         className: "lg:row-start-1 lg:col-start-3 lg:col-end-2 lg:row-end-2 bg-primary h-full",
    //       },
    //       {
    //         Icon: Image,
    //         name: "AI generated image of wolf",
    //         cta: "Show prompt",
    //         background: <img src="/ai/wolf.jpg" className="w-full h-fit object-cover" />,
    //         className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2 bg-primary h-full",
    //     },
    //     {
    //         Icon: Image,
    //         name: "AI generated image of ice cubes",
    //         cta: "Show prompt",
    //         background: <img src="/ai/ice-cubes.png" className="w-full h-fit object-cover" />,
    //         className: "lg:col-start-4 lg:row-start-1 lg:row-end-4  lg:col-end-4 bg-primary h-full",
    //     },
    //     {
    //         Icon: Image,
    //         name: "AI generated image of auto",
    //         cta: "Show prompt",
    //         background: <img src="/ai/auto.jpg" className="w-full h-fit object-cover" />,
    //         className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 bg-primary h-full",
    //       },
    //     {
    //         Icon: Image,
    //         name: "AI generated image of kitten",
    //         cta: "Show prompt",
    //         background: <img src="/ai/kitten.png" className="w-full h-fit object-cover" />,
    //         className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 bg-primary h-full",
    //     },
    //     {
    //         Icon: Image,
    //         name: "AI generated image of bubbles",
    //         cta: "Show prompt",
    //         background: <img src="/ai/bubbles.png" className="w-full h-fit object-cover" />,
    //         className: "lg:col-start-3 lg:row-start-1 lg:row-end-2 lg:col-end-4 bg-primary h-full",
    //     },
    //     {
    //         Icon: Image,
    //         name: "AI generated image of soldier",
    //         cta: "Show prompt",
    //         background: <img src="/ai/soldier.jpg" className="w-full h-fit object-cover" />,
    //         className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4 bg-primary h-full",
    //       },
    //     {
    //         Icon: Image,
    //         name: "AI generated image of animal",
    //         cta: "Show prompt",
    //         background: <img src="/ai/animal.jpg" className="w-full h-full" />,
    //         className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 bg-primary max-h-[300px]",
    //     },
    // ];
    const templates = [
        {
          Icon: Image,
          name: "AI generated image of man",
          cta: "Show prompt",
          background: <img src="/ai/man.png" className="bg-red w-full h-full object-contain rounded-lg" />,
          className: "lg:col-span-1 lg:row-span-1 bg-primary h-full max-h-[400px]",
        },
        {
          Icon: Image,
          name: "AI generated image of girl",
          cta: "Show prompt",
          background: <img src="/ai/girl.png" className="w-full h-full object-contain rounded-lg" />,
          className: "lg:col-span-1 lg:row-span-1 bg-primary h-full max-h-[600px]",
        },
        {
          Icon: Image,
          name: "AI generated image of wolf",
          cta: "Show prompt",
          background: <img src="/ai/wolf.jpg" className="w-full h-full object-contain rounded-lg" />,
          className: "lg:col-span-1 lg:row-span-1 bg-primary h-full max-h-[400px]",
        },
        {
          Icon: Image,
          name: "AI generated image of ice cubes",
          cta: "Show prompt",
          background: <img src="/ai/ice-cubes.png" className="w-full h-full object-contain rounded-lg" />,
          className: "lg:row-start-2 lg:col-start-1 lg:col-end-3 bg-primary h-full max-h-[500px]",
        },
        {
          Icon: Image,
          name: "AI generated image of auto",
          cta: "Show prompt",
          background: <img src="/ai/auto.jpg" className="w-full h-full object-contain rounded-lg" />,
          className: "lg:col-span-1 lg:row-span-1 bg-primary h-full max-h-[300px]",
        },
        {
          Icon: Image,
          name: "AI generated image of kitten",
          cta: "Show prompt",
          background: <img src="/ai/kitten.png" className="w-full h-full object-contain rounded-lg" />,
          className: "lg:col-span-1 lg:row-span-1 bg-primary h-full max-h-[400px]",
        },
        {
          Icon: Image,
          name: "AI generated image of bubbles",
          cta: "Show prompt",
          background: <img src="/ai/bubbles.png" className="w-full h-full object-contain rounded-lg" />,
          className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 bg-primary h-full max-h-[400px]",
        },
        {
          Icon: Image,
          name: "AI generated image of soldier",
          cta: "Show prompt",
          background: <img src="/ai/soldier.jpg" className="w-full h-full object-contain rounded-lg" />,
          className: "lg:col-span-1 lg:row-span-1 bg-primary h-full max-h-[450px]",
        },
        {
          Icon: Image,
          name: "AI generated image of animal",
          cta: "Show prompt",
          background: <img src="/ai/animal.jpg" className="w-full h-full object-contain rounded-lg" />,
          className: "lg:col-span-1 lg:row-span-1 bg-primary max-h-[300px]",
        },
      ];
      

    useEffect(() => {

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
                <div className="flex flex-col lg:p-5 p-2.5 pt-10 w-full h-full items-center justify-between">
                    <p className="text-white font-moranga text-2xl lg:text-4xl">Bad Prompts? No Problem!</p>
                    <p className="text-white font-inter text-sm mt-5 text-center">Get inspired by creators like you and choose your best customizable prompt to generate content like what you see.</p>
                    <BentoGrid className="lg:grid-rows-4 mt-10">
                        {templates.map((template) => (
                            <BentoCard key={template.name} {...template} />
                        ))}
                    </BentoGrid>
                </div>
            </main>
        // </div>
    )
}