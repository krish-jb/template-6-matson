import { ExternalLink } from "lucide-react";
import useWedding from "@/hooks/useWedding";
import BangleDecoration from "../decorations/BangleDecoration";
import FlowerDecoration from "../decorations/FlowerDecoration";

const JewellerySection = () => {
    const { weddingAd } = useWedding();
    if (!weddingAd || !weddingAd.Ad_section) {
        return null;
    }
    // Provide default values if weddingAd is null/undefined
    const safeWeddingAd = {
        Ad_section: {
            title: weddingAd.Ad_section.title || 'Our wedding cards',
            image: weddingAd.Ad_section.image || '/jeweller/ad-1.jpg',
            description: weddingAd.Ad_section.description || 'Discover our exclusive collection of fine wedding cards.',
            shopName: weddingAd.Ad_section.shopName || 'Luxury Cards',
            website: weddingAd.Ad_section.website || 'matson.app',
            disabled: weddingAd.Ad_section.disabled || false
        }
    };
    if (safeWeddingAd.Ad_section.disabled) {
        return null;
    }
    return (
        <section id={"jewellery"} className="relative py-20 bg-card">
            <FlowerDecoration />
            <BangleDecoration />
            <div className="container flex items-center mx-auto px-4 z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Text Content */}
                    <div className="text-center mb-16">
                        <div className="text-3xl ornament mb-8 text-primary">
                            ✤
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                            {safeWeddingAd.Ad_section.title}
                        </h2>
                    </div>
                    <div className="group grid max-w-xl gap-2 place-items-center">
                        <a
                            href={safeWeddingAd.Ad_section.website}
                            className="underno-underline"
                            target="_blank"
                        >
                            {/* Image/Ad Banner Slot */}
                            <div className="group border-2 border-primary/20 bg-background/80 group-hover:bg-secondary/10 duration-200 rounded-lg h-full p-2 md:p-6 flex flex-col">
                                <div className="w-full bg-primary rounded-lg flex items-center justify-center border-2 border-primary overflow-hidden">
                                    <img
                                         src={safeWeddingAd.Ad_section.image}
                                        alt="jewellery"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </a>
                        <a
                            href={safeWeddingAd.Ad_section.website}
                            className="underno-underline w-full"
                            target="_blank"
                        >
                            <div className="w-full">
                                <div className="group border-2 border-primary/20 bg-background/80 group-hover:bg-secondary/10 duration-200 rounded-lg h-full p-2 md:p-6 flex flex-col w-full">
                                    <p className="text-lg text-gray-700 mb-6">
                                        {safeWeddingAd.Ad_section.description}
                                    </p>
                                    <h3 className="text-2xl font-serif text-amber-800 mb-4">
                                        {safeWeddingAd.Ad_section.shopName}
                                    </h3>
                                    <span className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium">
                                        Visit Our Store
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default JewellerySection;
