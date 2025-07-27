import HeroDecoration from "@/components/decorations/HeroDecoration.tsx";
import HeroImage from "@/components/decorations/HeroImage.tsx";
import EditableText from "@/components/Editable/EditableText.tsx";
import useUpdateCouple from "@/hooks/useUpdateCouple";
import useUpdateWeddingDetails from "@/hooks/useUpdateWeddingDetails";
import useWedding from "@/hooks/useWedding";

const HeroSection = () => {
    const { weddingData } = useWedding();
    const { updateBrideName, updateGroomName, updateWeddingQuote } =
        useUpdateCouple();
    const { updateEventDetails } = useUpdateWeddingDetails();

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center wedding-gradient relative overflow-hidden"
        >
            {/* Background decorative elements */}
            <HeroImage />
            <HeroDecoration disable />

            <div className="container mx-auto px-4 text-center relative z-20">
                <div className="max-w-4xl mx-auto fade-in">
                    {/* Wedding Quote */}
                    <div className="mb-12">
                        <div className="text-2xl ornament mb-4">✧</div>
                        <EditableText
                            value={weddingData.couple.weddingQuote}
                            onSave={updateWeddingQuote}
                            multiline
                            placeholder="Enter wedding quote..."
                            as="p"
                            label="Edit wedding quote"
                            className="text-xl md:text-2xl lg:text-3xl font-light text-foreground leading-relaxed mb-4 font-serif italic"
                        />
                        <div className="text-2xl ornament mt-4">✧</div>
                    </div>

                    {/* Couple Names */}
                    <div className="space-y-8">
                        <div>
                            <EditableText
                                value={weddingData.couple.groomName}
                                onSave={updateGroomName}
                                placeholder="Groom's name..."
                                as="h1"
                                label="Edit groom's name"
                                className="text-5xl md:text-7xl font-bold text-primary mb-4 font-display font-saman tracking-wide"
                            />
                            <div className="text-2xl text-muted-foreground font-serif italic">
                                with
                            </div>
                        </div>

                        <div>
                            <EditableText
                                value={weddingData.couple.brideName}
                                onSave={updateBrideName}
                                placeholder="Bride's name..."
                                as="h1"
                                label="Edit bride's name"
                                className="text-4xl md:text-6xl font-bold text-primary font-display font-saman tracking-wide"
                            />
                        </div>

                        <div className="text-sm md:text-base text-muted-foreground">
                            <EditableText
                                value={weddingData.weddingDetails.event1.date}
                                onSave={(value) =>
                                    updateEventDetails("event1", "date", value)
                                }
                                placeholder={`${weddingData.weddingDetails.event1.title} date..`}
                                as="p"
                                label={`Edit ${weddingData.weddingDetails.event1.title} date`}
                            />
                            <EditableText
                                value={weddingData.weddingDetails.event1.time}
                                onSave={(value) =>
                                    updateEventDetails("event1", "time", value)
                                }
                                placeholder={`${weddingData.weddingDetails.event1.title} time..`}
                                as="p"
                                label={`Edit ${weddingData.weddingDetails.event1.title} time`}
                            />
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="mt-16 animate-bounce">
                        <div className="w-6 h-10 border-2 border-primary rounded-full mx-auto flex justify-center">
                            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
