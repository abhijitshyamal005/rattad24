"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import MorphingText from "@/components/ui/morphing-text";
import { Chip } from "./components/chip";
import { ArrowUp, AudioLines, FileImage, FolderOpenDot, Link2Icon, LucideUsers, Menu, MenuIcon, MessageSquareTextIcon, MessageSquareWarning, PanelLeft, Plus, Telescope, X } from "lucide-react";
import Image from "next/image";
import { Suggestions } from "./components/suggestions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseAuth, firestore } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserMenu } from "./components/userMenu";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SideBar } from "./components/sideBar";


export default function Create() {
    const [formData, setFormData] = useState({
        prompt: '',
        feedback: '',
        firstName: '',
        lastName: '',
        email: '',
        credits: 0,
        accountType: '',
        userUid: '',
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const dashboardHeaderTexts = [
        "What Would You Like to Create Today?",
        "Write Your Single Master Prompt",
        "And Let simplecx Do the Magic!",
    ];
    const actions = [
        {
            text: 'Create image',
            icon: 'Image',
            action: 'Generate an image',
        },
        {
            text: 'Create a video',
            icon: 'Video',
            action: 'Create a video',
        },
        {
            text: 'Write an article',
            icon: 'NotebookPen',
            action: 'Write an article about',
        },
        {
            text: 'Create audio',
            icon: 'Headphones',
            action: 'Generate an audio voiceover',
        },
    ];
    const router = useRouter();
    const [credits, setCredits] = React.useState(0);
    const [userUid, setUserUid] = useState('');
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(0);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
    };

    const setPrompt = (prompt: string) => {
        setFormData(prevState => ({
            ...prevState,
            prompt: prompt,
        }));
    };

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    useEffect(() => {
        const getUserByUid = async (uid: string) => {
          try {
              const db = firestore;
              const userDocRef = doc(db, "users", uid);
              const userDoc = await getDoc(userDocRef);
          
              if (userDoc.exists()) {
                console.log("User data:", userDoc.data());
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
                  }
                ));
                setCredits((userDoc.data().credits / 500) * 100);
                if (!userDoc.data().profileComplete) {
                    router.push('/onboarding');
                }
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
                // console.log('USER UID:', userUid);
                setLoading(false);
                await getUserByUid(user.uid);
            }
        });
    
        return () => unsubscribe();
    }, [router, userUid]);
    

    

    return (
        <div className="grid min-h-screen w-[100vw] gap-16 font-inter">
            <main className="flex items-center gap-5 w-full flex-col justify-center h-full">
                <div className="flex absolute lg:p-5 p-2.5 top-0 w-full h-full items-center justify-between">
                    <Button className={`${isSideBarOpen ? 'flex lg:hidden' : 'hidden'} bg-black w-full h-full z-30 opacity-90`} onClick={toggleSideBar}></Button>

                    <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} formData={formData} setFormData={setFormData} />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="lg:flex hidden lg:absolute top-5 right-5 bg-primary border-2 w-[40px] h-[40px]">
                                <AvatarImage src="/mascot/mascot-ft.png" />
                                <AvatarFallback className="bg-primary">{formData.firstName.charAt(0).concat(formData.lastName.charAt(0))}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" alignOffset={20} className="bg-primary border-none rounded-2xl">
                            <UserMenu formData={formData} setFormData={setFormData} />
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="absolute top-5 left-2 flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="simplecx name logo"
                            width={300}
                            height={30}
                            className="w-[150px] h-fit"
                            />
                        <Button className="lg:flex hidden bg-transparent shadow-none hover:bg-transparent" onClick={toggleSideBar}>
                            <PanelLeft className="min-w-[22px] min-h-[22px]" />
                        </Button>
                    </div>
                    
                    <Button className="lg:hidden z-50 absolute top-5 right-2 bg-transparent shadow-none hover:bg-transparent" onClick={toggleSideBar}>
                        {isSideBarOpen ? 
                            (
                                <X className="min-w-[22px] min-h-[22px] text-white" />
                            )
                            : (
                                <MenuIcon className="min-w-[22px] min-h-[22px] text-white" />
                            )
                        }
                    </Button>
                </div>
                <MorphingText texts={dashboardHeaderTexts} className="text-white mb-5 mt-5 lg:mt-0 text-3xl" />

                <div className="flex z-20 gap-3 flex-wrap items-center justify-center">
                    {actions.map((action, index) => (
                    <Button key={index} className="mt-5 bg-primary px-0 rounded-full" onClick={() => setPrompt(action.action)}>
                        <Chip text={action.text} icon={action.icon} />
                    </Button>
                    ))}
                </div>

                <NeonGradientCard className="mt-5 p-[1px] h-40 w-[90%] lg:max-w-[600px] rounded-2xl bg-gradient-to-r from-red to-purple">
                    <Textarea
                        className="w-full h-full bg-black text-sm lg:text-sm rounded-2xl border-none hover:border-white text-white"
                        id="prompt"
                        name="prompt"
                        disabled={isGenerating}
                        placeholder="Enter your master prompt here..."
                        value={formData.prompt}
                        onChange={handleChange} />
                    <Button disabled className="absolute bottom-3 left-0 bg-transparent shadow-none hover:bg-transparent">
                        <FileImage className="min-w-[22px] min-h-[22px]" />
                        Attach image
                    </Button>

                    { formData.prompt == '' ? (
                        <Button className="absolute w-[40px] h-[40px] bottom-3 right-3 bg-gradient-to-r from-red to-purple rounded-full px-0 shadow-none hover:bg-transparent">
                            <AudioLines className="min-w-[22px] min-h-[22px]" />
                        </Button>
                    ) : (
                        <Button className="absolute w-[40px] h-[40px] bottom-3 right-3 bg-gradient-to-r from-red to-purple rounded-full px-0 shadow-none hover:bg-transparent">
                            <ArrowUp className="min-w-[22px] min-h-[22px]" />
                        </Button>
                    )}
                </NeonGradientCard>

                <Suggestions formData={formData} setFormData={setFormData} />
                
                <div className="hi"></div>
            </main>
        </div>
    )
};