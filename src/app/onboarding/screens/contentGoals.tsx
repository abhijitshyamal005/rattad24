
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FormData } from "../types/formData";
import { Separator } from "@/components/ui/separator";

interface ContentGoalsProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    progress: number;
}


export const ContentGoals: React.FC<ContentGoalsProps> = ({ formData, setFormData, setStage, progress }) => {

    const businessContentGoals = [
        "Brand Awareness",
        "Lead Generation & Sales",
        "Customer Engagement & Community Building",
        "SEO & Website Traffic",
        "Thought Leadership & Industry Influence",
        "Product & Feature Promotion",
        "Recruitment & Employer Branding",
        "Customer Education & Support",
        "Social Proof & Testimonials",
        "Event & Campaign Promotion",
    ];
    
    const creatorContentGoals = [
        "Personal Branding & Thought Leadership",
        "Growing My Social Media Presence",
        "Building a Loyal Audience / Community",
        "Monetizing My Content (Sponsorships, courses, etc.)",
        "Improving Engagement & Interaction",
        "Becoming a Better Content Writer",
        "Increasing Website or Blog Traffic",
        "Creating High-Quality Visuals & Graphics",
        "Automating My Content Creation Process",
    ]

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
                contentGoals: formData.contentGoals,
            });
            setStage(5);

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

            <p className="mt-5 text-white lg:text-4xl text-2xl font-moranga text-center">Content Goals!</p>

            <div className="flex items-center w-full lg:w-[70%] justify-center">
                <Button className="bg-transparent hover:bg-transparent shadow-none" onClick={() => setStage(3)}>
                    <ChevronLeft className="min-w-[30px] min-h-[30px]" />
                </Button>
                <Progress value={progress} className="h-[20px] rounded-xl" />
            </div>

            <div className="flex items-center gap-1.5 justify-center w-[90%]">
                <Image src="/mascot/mascot-ft.png" className="-ml-10" width={200} height={400} alt="Mascot" priority />
                <div className="-ml-10 lg:rounded-full rounded-2xl p-3 bg-gradient-to-r from-red to-purple">
                    <TypingAnimation className="text-white font-inter text-sm text-left" duration={30}>What do you want to achieve with your content?</TypingAnimation>
                </div>
            </div>

            <div className="flex flex-col w-full gap-5 items-center justify-center">
                <div className="flex flex-col items-center gap-1.5">
                    <p className="text-white text-xl font-moranga">Select your content goals</p>
                    <p className="text-white text-sm font-inter text-lg">Select one or more.</p>
                </div>
                
                {
                    formData.accountType === "business" ? (
                        <ToggleGroup
                            type="multiple"
                            className="mt-10 flex flex-wrap lg:w-[60%] gap-3"
                            value={formData.contentGoals}
                            onValueChange={(value: string[]) => {
                            setFormData(prevState => ({
                                ...prevState,
                                contentGoals: value,
                            }));
                    }}>
                        {
                            businessContentGoals.map((goal, index) => (
                                <ToggleGroupItem
                                    key={index}
                                    value={goal}
                                    className="bg-primary text-white"
                                    aria-label="Toggle bold"
                                    disabled={formData.contentGoals.length > 2 && !formData.contentGoals.includes(goal)}
                                >
                                    {goal}
                                </ToggleGroupItem>
                            ))
                        }
                    </ToggleGroup>
                    
                    ) : (
                        <ToggleGroup type="multiple"
                            className="mt-10 flex flex-wrap lg:w-[60%] gap-3"
                            value={formData.contentGoals}
                            onValueChange={(value: string[]) => {
                                setFormData(prevState => ({
                                    ...prevState,
                                    contentGoals: value,
                                }));
                            }}
                        >
                        {
                            creatorContentGoals.map((goal, index) => (
                                <ToggleGroupItem
                                    key={index}
                                    value={goal}
                                    className="bg-primary text-white"
                                    aria-label="Toggle bold"
                                    disabled={formData.contentGoals.length > 4 && !formData.contentGoals.includes(goal)}
                                >
                                    {goal}
                                </ToggleGroupItem>
                            ))
                        }
                    </ToggleGroup>
                    
                    )
                }

                <div className="flex w-[90%] lg:max-w-[50%] items-center justify-end">
                    <Button
                        type="submit"
                        className="text-white rounded-full shadow-2xl h-[54px] px-1 bg-gradient-to-r from-red to-purple"
                        disabled={formData.contentGoals.length < 1}>
                        <div className="bg-black rounded-full h-[50px] flex items-center p-5">
                            Continue
                        </div>
                    </Button>
                </div>
            </div>
        </form>
    );
}