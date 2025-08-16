import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import LinkButton from "./LinkButton";
import useWedding from "@/hooks/useWedding";

interface BackButtonProps {
    borderClassName?: string;
    className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
    borderClassName,
    className,
}) => {
    const { user } = useWedding();
    return (
        <LinkButton to={`/${user?.username}`} className={borderClassName}>
            <span
                className={cn(
                    "flex items-center justify-center gap-2 font-ibarra italic text-2xl text-primary px-2 md:px-0",
                    className,
                )}
            >
                <ArrowLeft size={16} />
                <p className="hidden md:block">Go to home</p>
            </span>
        </LinkButton>
    );
};
export default BackButton;
