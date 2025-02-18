
import { Button } from "@/components/ui/button";
import { FormData } from "../types/formData";

interface SuggestionsProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

  
export const Suggestions: React.FC<SuggestionsProps> = ({ formData, setFormData }) => {
    const textSuggestions = [
        "a blog post for my business",
        "an article about content creation",
        "a caption for a post about my brand",
        "a product description for my business",
        "an email copy for my business",
    ];

    const imageSuggestions = [
        "for my shoe store business",
        "of a business influencer recording video",
        "of a vibrant personal brand logo",
        "about laptop, coffee, productivity",
        "of a presentation slide for my business",
    ];

    const audioSuggestions = [
        "for my brand description",
        "of a social media post about my business",
        "of an ad about my business",
        "for people ",
        "",
    ];

    const videoSuggestions = [
        "for my shoe store business",
        "of a business influencer recording video",
        "of a vibrant personal brand logo",
        "about laptop, coffee, productivity",
        "",
    ];

    const setPrompt = (prompt: string) => {
        setFormData(prevState => ({
            ...prevState,
            prompt: prompt,
        }));
    };

    return (
    <div>
        {/* text */}
        {
            formData.prompt.startsWith("Write an article about") && (
                <div className="flex flex-col items-center justify-center lg:min-w-[600px]">
                    {
                        textSuggestions.map((suggestion, index) => (
                            <Button key={index} className="text-xs lg:text-sm bg-transparent hover:bg-primary rounded-none h-[52px] border-b-[1px] border-b-primary w-full flex justify-start items-center"
                                onClick={() => setPrompt(`Write ${suggestion}`)}>
                                <p className="text-gray-500">Write</p>{suggestion.slice(0, 25)}...
                            </Button>
                        ))
                    }
                </div>
            )
        }

        {/* image */}
        {
            formData.prompt.startsWith("Generate an image") && (
                <div className="flex flex-col items-center justify-center lg:min-w-[600px]">
                    {
                        imageSuggestions.map((suggestion, index) => (
                            <Button key={index} className="text-xs lg:text-sm bg-transparent hover:bg-primary rounded-none h-[52px] border-b-[1px] border-b-primary w-full flex justify-start items-center"
                                onClick={() => setPrompt(`Generate an image ${suggestion}`)}>
                                <p className="text-gray-500">Generate an image</p>{suggestion.slice(0, 25)}...
                            </Button>
                        ))
                    }
                </div>
            )
        }

        {/* audio */}
        {
            formData.prompt.startsWith("Generate an audio voiceover") && (
                <div className="flex flex-col items-center justify-center lg:min-w-[600px]">
                    {
                        audioSuggestions.map((suggestion, index) => (
                            <Button key={index} className="text-xs lg:text-sm bg-transparent hover:bg-primary rounded-none h-[52px] border-b-[1px] border-b-primary w-full flex justify-start items-center"
                                onClick={() => setPrompt(`Generate an audio ${suggestion}`)}>
                                <p className="text-gray-500">Generate an audio</p>{suggestion.slice(0, 25)}...
                            </Button>
                        ))
                    }
                </div>
            )
        }

        {/* video */}
        {
            formData.prompt.startsWith("Create a video") && (
                <div className="flex flex-col items-center justify-center lg:min-w-[600px]">
                    {
                        videoSuggestions.map((suggestion, index) => (
                            <Button key={index} className="text-xs lg:text-sm bg-transparent hover:bg-primary rounded-none h-[52px] border-b-[1px] border-b-primary w-full flex justify-start items-center"
                                onClick={() => setPrompt(`Create a video ${suggestion}`)}>
                                <p className="text-gray-500">Create a video</p>{suggestion.slice(0, 25)}...
                            </Button>
                        ))
                    }
                </div>
            )
        }
    </div>
);
};
