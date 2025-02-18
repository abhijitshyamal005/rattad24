
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FormData } from "../types/formData";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { Separator } from "@/components/ui/separator";

interface ContentPreferencesProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    progress: number;
}


export const ContentPreferences: React.FC<ContentPreferencesProps> = ({ formData, setFormData, setStage, progress }) => {

    const contentPlatforms = [
        "Website & Blog",
        "Social Media (Instagram, LinkedIn, X, TikTok)",
        "Email Newsletters",
        "YouTube / Video Content",
        "Podcasting / Audio Content",
        "Ads & Paid Promotions",
    ];

    const creatorContentTypes = [
        "Short-form social media posts (Instagram, X, LinkedIn)",
        "Long-form articles / Blogs",
        "Video scripts & captions (YouTube, TikTok, Reels)",
        "Email Newsletters",
        "Podcast scripts & show notes",
        "Ads & promotional content",
        "Educational & tutorial content",    
    ];
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const db = getFirestore();

            const userDocRef = doc(db, "users", formData.userUid);

            await updateDoc(userDocRef, {
                contentPreferences: formData.contentPreferences,
                profileComplete: true,
            });
            setStage(6);

        } catch(error: any) {
            console.error("An error occurred: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-5 w-full flex-col justify-start pb-10 h-full">
            <Image
                src="/logo.png"
                alt="simplecx logo"
                width={300}
                height={30}
                className="w-[150px] h-fit"
                />
            <Separator orientation="horizontal" />
            
            <p className="text-white mt-5 lg:text-4xl text-2xl font-moranga text-center">
                { formData.accountType === "business" ? 'Content Preferences & Platforms' : 'Preferred Content Types' }
            </p>

            <div className="flex items-center w-[95%] lg:w-[70%] justify-center">
                <Button className="bg-transparent hover:bg-transparent shadow-none" onClick={() => setStage(4)}>
                    <ChevronLeft className="min-w-[30px] min-h-[30px]" />
                </Button>
                <Progress value={progress} className="h-[20px] rounded-xl" />
            </div>

            <div className="flex items-center gap-1.5 justify-center w-[90%]">
                <Image src="/mascot/mascot-ft.png" className="-ml-10" width={200} height={400} alt="Mascot" priority />
                <div className="-ml-10 lg:rounded-full rounded-2xl p-3 bg-gradient-to-r from-red to-purple">
                    <TypingAnimation className="text-white font-inter text-sm text-left" duration={30}>
                        { formData.accountType === "business" ? 'Finally, where do you plan to publish content?' : 'Finally, what type of content do you create?' }
                    </TypingAnimation>
                </div>
            </div>

            <div className="flex flex-col w-full gap-5 items-center justify-center">
                <div className="flex flex-col items-center gap-1.5">
                    <p className="text-white text-xl font-moranga">Select your content platforms</p>
                    <p className="text-white text-sm font-inter text-lg">Select one or more.</p>
                </div>
                <ToggleGroup type="multiple" className="mt-10 flex flex-wrap lg:w-[60%] gap-3"
                    value={formData.contentPreferences}
                    onValueChange={(value: string[]) => {
                    setFormData(prevState => ({
                        ...prevState,
                        contentPreferences: value,
                    }));
                    }}>
                    {
                        contentPlatforms.map((platform, index) => (
                            <ToggleGroupItem key={index} value={platform} className="bg-primary text-white" aria-label="Toggle bold"
                                disabled={formData.contentPreferences.length > 2 && !formData.contentPreferences.includes(platform)}
                            >
                                {platform}
                            </ToggleGroupItem>
                        ))
                    }
                </ToggleGroup>
                

                <div className="flex w-[90%] lg:max-w-[50%] items-center justify-end">
                    <Button
                        disabled={formData.contentPreferences.length < 1}
                        type="submit"
                        className="text-white rounded-full shadow-2xl h-[54px] px-1 bg-gradient-to-r from-red to-purple">
                        <div className="bg-black rounded-full h-[50px] flex items-center p-5">
                            Done
                        </div>
                    </Button>
                </div>
            </div>
        </form>
    );
}