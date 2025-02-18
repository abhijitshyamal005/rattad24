
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FormData } from "../types/formData";
import { Separator } from "@/components/ui/separator";

interface TargetAudienceProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    progress: number;
}


export const TargetAudience: React.FC<TargetAudienceProps> = ({ formData, setFormData, setStage, progress }) => {

    const targetAudience = [
        "Consumers (B2C)",
        "Businesses (B2B)",
        "Creators & Entrepreneurs",
        "Students & Learners",
        "Corporate Professionals",
        "Freelancers & Solopreneurs",
        "Social Media Enthusiasts",
        "Podcast Listeners",
        "YouTube Viewers",
        "Blog Readers",
        "Gamers & Esports Fans",
        "Small Business Owners",
        "E-commerce Shoppers",
        "Health & Fitness Enthusiasts",
        "Tech Enthusiasts & Developers",
        "Finance & Investment Seekers",
        "Fashion & Beauty Lovers",
        "Artists & Designers",
        "Students & College Grads",
        "Lifelong Learners",
        "Corporate Teams & Employees",
        "Travel Enthusiasts",
        "Parenting & Family-Oriented Audience",
        "Sustainability & Eco-Conscious Audience",
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
                targetAudience: formData.targetAudience,
            });
            setStage(4);

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

            <p className="mt-5 text-white lg:text-4xl text-2xl font-moranga">Your Target Audience!</p>

            <div className="flex items-center w-full lg:w-[70%] justify-center">
                <Button className="bg-transparent hover:bg-transparent shadow-none" onClick={() => setStage(2)}>
                    <ChevronLeft className="min-w-[30px] min-h-[30px]" />
                </Button>
                <Progress value={progress} className="h-[20px] rounded-xl" />
            </div>

            <div className="flex items-center gap-1.5 justify-center w-[90%]">
                <Image src="/mascot/mascot-ft.png" className="-ml-10" width={200} height={400} alt="Mascot" priority />
                <div className="-ml-10 lg:rounded-full rounded-2xl p-3 bg-gradient-to-r from-red to-purple">
                    <TypingAnimation className="text-white font-inter text-sm text-left" duration={30}>Who should see your content?</TypingAnimation>
                </div>
            </div>

            <div className="flex flex-col w-full gap-5 items-center justify-center">
                <div className="flex flex-col items-center gap-1.5">
                    <p className="text-white text-xl font-moranga">Select your target audience</p>
                    <p className="text-white text-sm font-inter text-lg">Select all that apply.</p>
                </div>
                <ToggleGroup
                    type="multiple"
                    value={formData.targetAudience}
                    className="mt-10 flex flex-wrap lg:w-[60%] gap-3"
                    onValueChange={(value: string[]) => {
                        setFormData(prevState => ({
                            ...prevState,
                            targetAudience: value,
                        }));
                    }}
                    >
                    {
                        targetAudience.map((target, index) => (
                            <ToggleGroupItem
                                disabled={formData.targetAudience.length > 4 && !formData.targetAudience.includes(target)}
                                key={index}
                                value={target}
                                className="bg-primary text-white" aria-label="Toggle bold">
                                {target}
                            </ToggleGroupItem>
                        ))
                    }
                </ToggleGroup>
                

                <div className="flex w-[90%] lg:max-w-[50%] items-center justify-end">
                    <Button
                        type="submit"
                        disabled={formData.targetAudience.length < 1}
                        className="text-white rounded-full shadow-2xl h-[54px] px-1 bg-gradient-to-r from-red to-purple">
                        <div className="bg-black rounded-full h-[50px] flex items-center p-5">
                            Continue
                        </div>
                    </Button>
                </div>
            </div>
        </form>
    );
}