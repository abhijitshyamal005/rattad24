
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FormData } from "../types/formData";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { Separator } from "@/components/ui/separator";

interface CreatorInfoProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    progress: number;
}


export const CreatorInfo: React.FC<CreatorInfoProps> = ({ formData, setFormData, setStage, progress }) => {
    
    const creatorTypes = [
        "Content Creator",
        "Influencer",
        "Freelancer",
        "Coach / Educator",
        "Blogger / Writer",
        "Social Media Marketer",
        "Hobbyist (Just exploring AI-powered content)",
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const db = getFirestore();

            const userDocRef = doc(db, "users", formData.userUid);

            await updateDoc(userDocRef, {
                creatorType: formData.creatorType,
            });
            setStage(2);

        } catch(error: any) {
            console.error("An error occurred: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-5 w-full flex-col justify-start h-full">
            <Image
                src="/logo.png"
                alt="simplecx logo"
                width={300}
                height={30}
                className="w-[150px] h-fit"
                />
            <Separator orientation="horizontal" />
            
            <p className="text-white lg:text-4xl text-2xl mt-5 font-moranga">Personalization Set Up!</p>

            <div className="flex items-center w-full lg:w-[70%] justify-center">
                <Button className="bg-transparent hover:bg-transparent shadow-none" onClick={() => setStage(0)}>
                    <ChevronLeft className="min-w-[30px] min-h-[30px]" />
                </Button>
                <Progress value={progress} className="h-[20px] rounded-xl" />
            </div>

            <div className="flex items-center gap-1.5 justify-center w-[90%]">
                <Image src="/mascot/mascot-ft.png" className="-ml-10" width={200} height={400} alt="Mascot" priority />
                <div className="-ml-10 lg:rounded-full rounded-2xl p-5 bg-gradient-to-r from-red to-purple">
                    <TypingAnimation className="text-white font-inter text-sm" duration={30}>Nice name. Please tell me more about yourself. What best describes you?</TypingAnimation>
                </div>
            </div>

            <div className="flex lg:max-w-[50%] w-full flex-col gap-5 items-center justify-center">
                {/* creator info */}
                <div className="flex flex-col w-fit items-center justify-center gap-1.5">
                    <p className="text-white font-inter text-lg">Select your creator type(s)</p>
                    <ToggleGroup
                        type="single"
                        className="flex flex-wrap lg:w-[60%] gap-3"
                        value={formData.creatorType}
                        onValueChange={(value: string) => {
                            setFormData(prevState => ({
                                ...prevState,
                                creatorType: value,
                            }));
                        }}>
                        {
                            creatorTypes.map((type, index) => (
                                <ToggleGroupItem key={index} value={type} className="bg-primary text-white" aria-label="Toggle bold">
                                    {type}
                                </ToggleGroupItem>
                            ))
                        }
                    </ToggleGroup>
                </div>
                
            </div>
            
            <div className="flex w-[90%] lg:max-w-[50%] items-center justify-end">
                <Button disabled={formData.creatorType === ''} type="submit" className="text-white rounded-full shadow-2xl h-[54px] px-1 bg-gradient-to-r from-red to-purple">
                    <div className="bg-black rounded-full h-[50px] flex items-center p-5">
                        Continue
                    </div>
                </Button>
            </div>
        </form>
    );
}