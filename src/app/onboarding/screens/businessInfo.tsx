
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { FormData } from "../types/formData";
import { Separator } from "@/components/ui/separator";

interface BusinessInfoProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    progress: number;
}


export const BusinessInfo: React.FC<BusinessInfoProps> = ({ formData, setFormData, setStage, progress }) => {
    
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
                businessName: formData.businessName,
                websiteURL: formData.websiteURL,
                companySize: formData.companySize,
            });
            setStage(2);

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

            <p className="mt-5 text-white lg:text-4xl text-2xl font-moranga text-center">Set Up Your Business!</p>

            <div className="flex items-center w-full lg:w-[70%] justify-center">
                <Button className="bg-transparent hover:bg-transparent shadow-none" onClick={() => setStage(0)}>
                    <ChevronLeft className="min-w-[30px] min-h-[30px]" />
                </Button>
                <Progress value={progress} className="h-[20px] rounded-xl" />
            </div>

            <div className="flex items-center gap-1.5 justify-center w-[90%]">
                <Image src="/mascot/mascot-ft.png" className="-ml-10" width={200} height={400} alt="Mascot" priority />
                <div className="-ml-10 lg:rounded-full rounded-2xl p-3 bg-gradient-to-r from-red to-purple">
                    <TypingAnimation className="text-white font-inter" duration={30}>Nice name. Please tell me more about your business.</TypingAnimation>
                </div>
            </div>

            <div className="flex lg:max-w-[50%] w-full flex-col gap-5 items-center justify-center">
                <div className="flex flex-col lg:w-[50%] w-full gap-5 items-center justify-center">   
                    {/* business name */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="lname" className="text-white font-inter">Business Name</label>
                        <Input
                            className="rounded-lg h-[54px] w-[90%] lg:max-w-sm text-white"
                            type="text"
                            placeholder="What's your business name?"
                            value={formData.businessName}
                            name="businessName"
                            onChange={handleChange} />
                    </div>

                    {/* website */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="lname" className="text-white font-inter">Website URL</label>
                        <Input
                            className="rounded-lg h-[54px] w-[90%] lg:max-w-sm text-white"
                            type="text"
                            placeholder="Website URL (optional)"
                            value={formData.websiteURL}
                            name="websiteURL"
                            onChange={handleChange} />
                    </div>

                    {/* company size */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <label htmlFor="lname" className="text-white font-inter">Company Size</label>
                        <Select
                            value={formData.companySize}
                            onValueChange={(value) => {
                            setFormData(prevState => ({
                                ...prevState,
                                companySize: value,
                            }));
                        }}>
                            <SelectTrigger className="h-[54px] w-[90%] text-white">
                                <SelectValue placeholder="Select your company size" className="text-white placehoder:text-red" />
                            </SelectTrigger>
                            <SelectContent className="bg-black text-white">
                                <SelectItem value="Solo">Solo</SelectItem>
                                <SelectItem value="Small (1-10)">Small (1-10)</SelectItem>
                                <SelectItem value="Medium (11-50)">Medium (11-50)</SelectItem>
                                <SelectItem value="Large (50+)">Large (50+)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
            </div>
            
            <div className="flex w-[90%] lg:max-w-[50%] items-center justify-end">
                <Button
                    disabled={formData.businessName === '' || formData.companySize === ''}
                    type="submit"
                    className="text-white rounded-full shadow-2xl h-[54px] px-1 bg-gradient-to-r from-red to-purple">
                    <div className="bg-black rounded-full h-[50px] flex items-center p-5">
                        Continue
                    </div>
                </Button>
            </div>
        </form>
    );
}