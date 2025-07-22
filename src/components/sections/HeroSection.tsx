import React from "react";
import { useWedding } from "@/hooks/useWedding";
import EditableText from "@/components/EditableText";

const HeroSection = () => {
  const { weddingData, updateWeddingData } = useWedding();

  const handleQuoteUpdate = (newQuote: string) => {
    updateWeddingData({
      couple: { ...weddingData.couple, weddingQuote: newQuote },
    });
  };

  const handleGroomNameUpdate = (newName: string) => {
    updateWeddingData({
      couple: { ...weddingData.couple, groomName: newName },
    });
  };

  const handleBrideNameUpdate = (newName: string) => {
    updateWeddingData({
      couple: { ...weddingData.couple, brideName: newName },
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center wedding-gradient relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl ornament">❋</div>
        <div className="absolute bottom-10 right-10 text-6xl ornament">❋</div>
        <div className="absolute top-1/3 right-20 text-4xl ornament">✤</div>
        <div className="absolute bottom-1/3 left-20 text-4xl ornament">✤</div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto fade-in">
          {/* Wedding Quote */}
          <div className="mb-12">
            <div className="text-2xl ornament mb-4">✧</div>
            <EditableText
              value={weddingData.couple.weddingQuote}
              onSave={handleQuoteUpdate}
              multiline
              placeholder="Enter wedding quote..."
              as="p"
              className="text-xl md:text-2xl lg:text-3xl font-light text-foreground leading-relaxed mb-4 font-serif italic"
            />
            <div className="text-2xl ornament mt-4">✧</div>
          </div>

          {/* Sanskrit Prayer */}
          <div className="mb-12 slide-up">
            <div className="text-lg text-muted-foreground mb-2 font-serif">
              ॐ
            </div>
            <p className="text-base md:text-lg text-muted-foreground font-serif mb-2">
              त्व सामे सुमयी गयो यशा तत: कवि सि स समाज व सीमयू व सीमयस व सीशिविि।
            </p>
            <p className="text-sm md:text-base text-muted-foreground italic">
              "O Agni, the divine energy, you are the carrier of blessings. Grant the couple sovereignty,
              prosperity, good fortune. And an abundance of harmony and joy."
            </p>
          </div>

          {/* Names */}
          <div className="mb-8">
            <p className="text-lg md:text-xl text-muted-foreground mb-4 font-serif">
              Mr. Vijayan Pillai & Mrs. Lalitha G
            </p>
            <p className="text-sm md:text-base text-muted-foreground mb-8">
              Kailasam, Parakode P.O, Adoor, Mob : 9946981614, 8086501980.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-4">
              "We cordially invite your esteemed presence with family<br />
              on the auspicious occasion of the wedding of our son"
            </p>
          </div>

          {/* Couple Names */}
          <div className="space-y-8">
            <div>
              <EditableText
                value={weddingData.couple.groomName}
                onSave={handleGroomNameUpdate}
                placeholder="Groom's name..."
                as="h1"
                className="text-5xl md:text-7xl font-bold text-primary mb-4 font-display tracking-wide"
              />
              <div className="text-2xl text-muted-foreground font-serif">with</div>
            </div>

            <div>
              <EditableText
                value={weddingData.couple.brideName}
                onSave={handleBrideNameUpdate}
                placeholder="Bride's name..."
                as="h1"
                className="text-4xl md:text-6xl font-bold text-primary font-display tracking-wide"
              />
            </div>

            <div className="text-sm md:text-base text-muted-foreground">
              <p>D/o Mr. Prakash Babu (Late) and Mrs. Maya Prakash</p>
              <p>Keshavamandiram, Nedumudy.p.o, Alappuzha</p>
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