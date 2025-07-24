import { useWedding } from "@/hooks/useWedding";
import HeroDecoration from "../decorations/HeroDecoration";
import EditableText from "../Editable/EditableText";

const MoreInfo: React.FC = () => {
    const { weddingData } = useWedding();
    return (
        <section id="wishes" className="relative py-20 bg-card">
            <HeroDecoration />
            <div className="container mx-auto lg:px-96 z-10 text-center">
                <div className="text-center mb-16">
                    <div className="text-3xl ornament mb-8 text-primary">✤</div>
                    <EditableText
                        value={weddingData.moreInfo.title}
                        onSave={() => {}}
                        multiline
                        placeholder="Your love story..."
                        as="h2"
                        className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
                    />
                </div>
                <div>
                    <EditableText
                        value={weddingData.moreInfo.content}
                        onSave={() => {}}
                        multiline
                        placeholder="Your love story..."
                        as="p"
                        className="text-lg leading-relaxed text-foreground font-serif text-center"
                    />
                </div>
            </div>
        </section>
    );
};

export default MoreInfo;
