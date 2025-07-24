import React from "react";
import { useWedding } from "@/hooks/useWedding";
import EditableText from "@/components/Editable/EditableText.tsx";
import SectionDecoration from "@/components/decorations/SectionDecoration.tsx";

const StorySection = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const handleTitleUpdate = (newTitle: string) => {
        updateWeddingData({
            story: { ...weddingData.story, title: newTitle },
        });
    };

    const handleContentUpdate = (newContent: string) => {
        updateWeddingData({
            story: { ...weddingData.story, content: newContent },
        });
    };

    return (
        <section
            id="story"
            className="relative flex justify-center items-center min-h-screen py-10 wedding-gradient"
        >
            <SectionDecoration />
            <div className="container mx-auto px-4 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-3xl ornament mb-8 text-primary">✤</div>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                            <EditableText
                                value={weddingData.story.title}
                                onSave={handleTitleUpdate}
                                placeholder="Story title..."
                                as="h2"
                                className="text-3xl md:text-4xl font-display font-bold text-primary"
                            />
                        </h2>
                        <p className="text-lg text-muted-foreground font-serif">
                            Our Story
                        </p>
                    </div>

                    <div className="flex flex-col-reverse px-2 lg:px-0 lg:flex-row gap-12 items-center">
                        <div className="space-y-6">
                            <EditableText
                                value={weddingData.story.content}
                                onSave={handleContentUpdate}
                                multiline
                                placeholder="Your love story..."
                                as="p"
                                className="text-lg leading-relaxed text-foreground font-serif text-left"
                            />
                        </div>

                        <div className="relative max-w-[430px]">
                            <div className="aspect-square rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                                <img
                                    src={weddingData.story.image}
                                    alt="Couple"
                                    className="w-full h-full object-cover sepia-overlay"
                                />
                            </div>
                            <div className="absolute -top-4 -left-4 text-4xl ornament text-primary opacity-60">
                                ❋
                            </div>
                            <div className="absolute -bottom-4 -right-4 text-4xl ornament text-primary opacity-60">
                                ❋
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StorySection;
