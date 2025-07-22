import React, { useState } from "react";
import { useWedding } from "@/hooks/useWedding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const WishesSection = () => {
  const { weddingWishes, addWish } = useWedding();
  const [wishForm, setWishForm] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      toast.error("Please fill in both name and message");
      return;
    }

    setIsSubmitting(true);
    try {
      await addWish(wishForm);
      setWishForm({ name: '', message: '' });
      toast.success("Thank you for your beautiful wishes!");
    } catch (error) {
      toast.error("Failed to submit wish. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="py-20 wedding-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl ornament mb-8 text-primary">✤</div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Guest Wishes
            </h2>
            <p className="text-lg text-muted-foreground font-serif">
              Share your blessings with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Wish Form */}
            <div>
              <Card className="border-2 border-primary/20 bg-background/80">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-semibold text-primary mb-6 text-center">
                    Leave Your Wishes
                  </h3>
                  <form onSubmit={handleSubmitWish} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={wishForm.name}
                        onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                        className="font-serif"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your wishes for the couple..."
                        value={wishForm.message}
                        onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                        rows={4}
                        className="font-serif"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 font-serif"
                      disabled={isSubmitting}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Wishes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Recent Wishes */}
            <div>
              <h3 className="text-xl font-display font-semibold text-primary mb-6 text-center">
                Recent Wishes
              </h3>
              <div className="space-y-4 mb-6">
                {weddingWishes.length > 0 ? (
                  weddingWishes.slice(0, 3).map((wish) => (
                    <Card key={wish.id} className="border border-primary/20 bg-background/60">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="text-primary">❋</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground font-display">
                              {wish.name}
                            </h4>
                            <p className="text-muted-foreground font-serif text-sm mt-1">
                              {wish.message}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl ornament mb-4 text-primary/60">❋</div>
                    <p className="text-muted-foreground font-serif">
                      Be the first to share your wishes!
                    </p>
                  </div>
                )}
              </div>

              {weddingWishes.length > 0 && (
                <div className="text-center">
                  <Link to="/wishes">
                    <Button variant="outline" className="font-serif">
                      View All Wishes
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;