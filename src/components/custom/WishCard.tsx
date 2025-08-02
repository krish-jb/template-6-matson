import { Card, CardContent } from "../ui/card";

interface WishCardProps {
    key: string;
    name: string;
    message: string;
}
const WishCard: React.FC<WishCardProps> = ({ key: id, name, message }) => {
    return (
        <Card key={id} className="border border-primary/20 bg-background/60">
            <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    <div className="text-primary">❋</div>
                    <div className="flex-1 overflow-hidden">
                        <h4 className="font-semibold text-foreground font-display">
                            {name}
                        </h4>
                        <p className="text-muted-foreground font-serif text-sm mt-1">
                            {message}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default WishCard;
