import React from "react";
import { useWedding } from "@/hooks/useWedding";
import EditableText from "@/components/EditableText";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Calendar } from "lucide-react";

const WeddingDetailsSection = () => {
  const { weddingData, updateWeddingData } = useWedding();

  const handleEvent1Update = (field: string, value: string) => {
    updateWeddingData({
      weddingDetails: {
        ...weddingData.weddingDetails,
        event1: { ...weddingData.weddingDetails.event1, [field]: value },
      },
    });
  };

  const handleEvent2Update = (field: string, value: string) => {
    updateWeddingData({
      weddingDetails: {
        ...weddingData.weddingDetails,
        event2: { ...weddingData.weddingDetails.event2, [field]: value },
      },
    });
  };

  const handleToKnowUpdate = (section: 'toKnow1' | 'toKnow2' | 'toKnow3', field: 'title' | 'description', value: string) => {
    updateWeddingData({
      weddingDetails: {
        ...weddingData.weddingDetails,
        [section]: { ...weddingData.weddingDetails[section], [field]: value },
      },
    });
  };

  return (
    <section id="details" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-3xl ornament mb-8 text-primary">✤</div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Wedding Details
            </h2>
            <p className="text-lg text-muted-foreground font-serif">
              Join us for these special moments
            </p>
          </div>

          {/* Events */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Event 1 */}
            <Card className="border-2 border-primary/20 bg-background/80">
              <CardContent className="p-8 text-center">
                <div className="text-2xl ornament mb-4 text-primary">❋</div>
                <EditableText
                  value={weddingData.weddingDetails.event1.title}
                  onSave={(value) => handleEvent1Update('title', value)}
                  as="h3"
                  className="text-2xl font-display font-semibold text-primary mb-6"
                />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <EditableText
                      value={weddingData.weddingDetails.event1.date}
                      onSave={(value) => handleEvent1Update('date', value)}
                      as="span"
                      className="font-semibold"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <EditableText
                      value={weddingData.weddingDetails.event1.time}
                      onSave={(value) => handleEvent1Update('time', value)}
                      as="span"
                      className="font-semibold"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div className="text-center">
                      <EditableText
                        value={weddingData.weddingDetails.event1.venue}
                        onSave={(value) => handleEvent1Update('venue', value)}
                        as="div"
                        className="font-semibold"
                      />
                      <EditableText
                        value={weddingData.weddingDetails.event1.address}
                        onSave={(value) => handleEvent1Update('address', value)}
                        as="div"
                        className="text-sm text-muted-foreground mt-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event 2 */}
            <Card className="border-2 border-primary/20 bg-background/80">
              <CardContent className="p-8 text-center">
                <div className="text-2xl ornament mb-4 text-primary">❋</div>
                <EditableText
                  value={weddingData.weddingDetails.event2.title}
                  onSave={(value) => handleEvent2Update('title', value)}
                  as="h3"
                  className="text-2xl font-display font-semibold text-primary mb-6"
                />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <EditableText
                      value={weddingData.weddingDetails.event2.date}
                      onSave={(value) => handleEvent2Update('date', value)}
                      as="span"
                      className="font-semibold"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <EditableText
                      value={weddingData.weddingDetails.event2.time}
                      onSave={(value) => handleEvent2Update('time', value)}
                      as="span"
                      className="font-semibold"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div className="text-center">
                      <EditableText
                        value={weddingData.weddingDetails.event2.venue}
                        onSave={(value) => handleEvent2Update('venue', value)}
                        as="div"
                        className="font-semibold"
                      />
                      <EditableText
                        value={weddingData.weddingDetails.event2.address}
                        onSave={(value) => handleEvent2Update('address', value)}
                        as="div"
                        className="text-sm text-muted-foreground mt-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Good to Know */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { key: 'toKnow1' as const, data: weddingData.weddingDetails.toKnow1 },
              { key: 'toKnow2' as const, data: weddingData.weddingDetails.toKnow2 },
              { key: 'toKnow3' as const, data: weddingData.weddingDetails.toKnow3 },
            ].map(({ key, data }) => (
              <Card key={key} className="border border-primary/20 bg-background/60">
                <CardContent className="p-6 text-center">
                  <EditableText
                    value={data.title}
                    onSave={(value) => handleToKnowUpdate(key, 'title', value)}
                    as="h4"
                    className="text-xl font-display font-semibold text-primary mb-4"
                  />
                  <EditableText
                    value={data.description}
                    onSave={(value) => handleToKnowUpdate(key, 'description', value)}
                    multiline
                    as="p"
                    className="text-foreground font-serif leading-relaxed"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetailsSection;