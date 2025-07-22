import React from "react";
import { useWedding } from "@/hooks/useWedding";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GallerySection = () => {
  const { weddingData } = useWedding();

  return (
    <section id="gallery" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl ornament mb-8 text-primary">✤</div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Our Gallery
            </h2>
            <p className="text-lg text-muted-foreground font-serif">
              Capturing precious moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {weddingData.gallery.slice(0, 6).map((image, index) => (
              <div key={image.id} className="group relative">
                <div className="aspect-square overflow-hidden rounded-lg border-2 border-primary/20 shadow-lg">
                  <img
                    src={image.url}
                    alt={image.caption || `Gallery image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 sepia-overlay"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                      <p className="text-sm font-serif">{image.caption}</p>
                    </div>
                  )}
                </div>
                <div className="absolute -top-2 -left-2 text-2xl ornament text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                  ❋
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/gallery">
              <Button className="bg-primary hover:bg-primary/90 font-serif">
                View All Photos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;