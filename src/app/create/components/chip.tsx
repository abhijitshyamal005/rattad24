
import * as Lucide from 'lucide-react';

interface ChipProps {
    text: string;
    icon: string;
}
  
export const Chip: React.FC<ChipProps> = ({ text, icon }) => {
    const SelectedIcon = Lucide[icon as keyof typeof Lucide] as React.ComponentType<Lucide.LucideProps> | undefined || Lucide.Home;

    if (!SelectedIcon) {
        return <div>Icon not found</div>;
    }

    return (
    <div className="rounded-full font-inter flex bg-primary items-center p-5">
        <SelectedIcon className="mr-2" />
        {text}
    </div>
);
};
