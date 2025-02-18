
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { FormData } from "../types/formData";
import { Separator } from "@/components/ui/separator";

interface AvatarScreenProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    setStage: React.Dispatch<React.SetStateAction<number>>;
}


export const AvatarScreen: React.FC<AvatarScreenProps> = ({ formData, setFormData, setStage }) => {

    const welcomeText = `Hey, Creator! Welcome to simplecx, my name is rai and I'm your personal avatar. I would like to get to know you.`
    
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
                avatarName: formData.avatarName,
            });
            setStage(1);

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

            <p className="text-white mt-5 lg:text-4xl text-2xl font-moranga">Let&apos;s Set Up!</p>
            <div className="flex items-start gap-1.5 justify-center w-[90%]">
                <Image src="/mascot/mascot-ft.png" className="-ml-10" width={200} height={400} alt="Mascot" priority />
                <div className="-ml-10 lg:rounded-full lg:max-w-[60%] rounded-2xl p-3 bg-gradient-to-r from-red to-purple">
                    <TypingAnimation className="text-white font-inter text-sm text-left" duration={20}>{welcomeText}</TypingAnimation>
                </div>
            </div>

            <div className="flex flex-col lg:w-[60%] gap-5 items-end justify-center">
                <p className="text-white font-moranga">You can change my name here, or call me rai</p>

                <Input
                    className="rounded-lg h-[54px] w-[90%] lg:max-w-sm text-white"
                    type="text"
                    placeholder="What's my name?"
                    value={formData.avatarName}
                    name="avatarName"
                    onChange={handleChange} />
                <p className="text-white text-sm font-inter">You can change the avatar image later.</p>
                

                <div className="flex w-[90%] lg:max-w-[50%] items-center justify-end">
                    <Button
                        disabled={formData.avatarName === ''}
                        type="submit" className="text-white rounded-full shadow-2xl h-[54px] px-1 bg-gradient-to-r from-red to-purple">
                        <div className="bg-black rounded-full h-[50px] flex items-center p-5">
                            Let&apos;s go!
                        </div>
                    </Button>
                </div>
            </div>
        </form>
    );
}