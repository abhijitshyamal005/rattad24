
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

interface BusinessIndustryProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    progress: number;
}


export const BusinessIndustry: React.FC<BusinessIndustryProps> = ({ formData, setFormData, setStage, progress }) => {

    const industries = [
        "🔹 Content Creation & Digital Media",
        "🔹 E-Commerce & Product-Based Business",
        "🔹 Education & Coaching",
        "🔹 Marketing & Branding",
        "🔹 Service-Based Business",
        "🔹 Health & Wellness",
        "🔹 Real Estate & Finance",
        "🔹 Other Unique Niche",
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
                businessIndustry: formData.businessIndustry,
                customBusinessIndustry: formData.customBusinessIndustry,
            });
            setStage(3);

        } catch(error: any) {
            console.error("An error occurred: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-5 w-full flex-col justify-start text-center pb-10 h-full">
            <Image
                src="/logo.png"
                alt="simplecx logo"
                width={300}
                height={30}
                className="w-[150px] h-fit"
                />
            <Separator orientation="horizontal" />
            
            <p className="text-white lg:text-4xl mt-5 text-2xl font-moranga">What&apos;s Your Industry/Niche?</p>

            <div className="flex items-center w-full lg:w-[70%] justify-center">
                <Button className="bg-transparent hover:bg-transparent shadow-none" onClick={() => setStage(1)}>
                    <ChevronLeft className="min-w-[30px] min-h-[30px]" />
                </Button>
                <Progress value={progress} className="h-[20px] rounded-xl" />
            </div>

            <div className="flex items-center gap-1.5 justify-center w-[90%]">
                <Image src="/mascot/mascot-ft.png" className="-ml-10" width={200} height={400} alt="Mascot" priority />
                <div className="-ml-10 lg:rounded-full rounded-2xl p-3 bg-gradient-to-r from-red to-purple">
                    <TypingAnimation className="text-white font-inter text-sm text-left" duration={30}>Okay, tell me about your industry or specific niche.</TypingAnimation>
                </div>
            </div>

            <div className="flex lg:max-w-[50%] w-full flex-col gap-5 items-center justify-center">
                {/* business industry */}
                <div className="flex flex-col w-fit items-center justify-center gap-1.5">
                    <p className="text-white font-inter text-lg">Select your industry</p>
                    <ToggleGroup
                        type="single"
                        className="flex flex-wrap lg:w-[60%] gap-3"
                        value={formData.businessIndustry}
                        onValueChange={(value) => {
                            setFormData(prevState => ({
                                ...prevState,
                                businessIndustry: value,
                            }));
                        }}>
                        {
                            industries.map((industry, index) => (
                                <ToggleGroupItem key={index} value={industry} className="bg-primary text-white" aria-label="Toggle bold">
                                    {industry}
                                </ToggleGroupItem>
                            ))
                        }
                    </ToggleGroup>
                </div>

                <div className={`${formData.businessIndustry === "🔹 Other Unique Niche" ? 'grid' : 'hidden'} w-full max-w-sm items-center gap-1.5`}>
                    <label htmlFor="lname" className="text-white font-inter">Custom Industry/Niche</label>
                    <Input
                        className="rounded-lg h-[54px] w-[100%] lg:max-w-sm text-white"
                        type="text"
                        placeholder="Enter your custom industry"
                        value={formData.customBusinessIndustry}
                        name="customBusinessIndustry"
                        onChange={handleChange} />
                </div>
                
            </div>
            
            <div className="flex w-[90%] lg:max-w-[50%] items-center justify-end">
                <Button
                    disabled={formData.businessIndustry === '' || (formData.customBusinessIndustry === '' && formData.businessIndustry === '🔹 Other Unique Niche')}
                    type="submit" className="text-white rounded-full shadow-2xl h-[54px] px-1 bg-gradient-to-r from-red to-purple">
                    <div className="bg-black rounded-full h-[50px] flex items-center p-5">
                        Continue
                    </div>
                </Button>
            </div>
        </form>
    );
}