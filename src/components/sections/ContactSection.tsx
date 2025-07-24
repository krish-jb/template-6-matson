import { Mail, MapPin, Phone } from "lucide-react";
import EditableText from "@/components/Editable/EditableText.tsx";
import { Card, CardContent } from "@/components/ui/card";
import { useWedding } from "@/hooks/useWedding";
import FlowerDecoration from "../decorations/FlowerDecoration";
import CarDecoration from "../decorations/CarDecoration";

const ContactSection = () => {
    const { weddingData, updateWeddingData } = useWedding();

    const handleContactUpdate = (
        field: keyof typeof weddingData.contact,
        value: string,
    ) => {
        updateWeddingData({
            contact: { ...weddingData.contact, [field]: value },
        });
    };

    return (
        <section id="contact" className="relative py-20 wedding-gradient">
            <FlowerDecoration />
            <CarDecoration />
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-3xl ornament mb-8 text-primary">✤</div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                        Contact Us
                    </h2>
                    <p className="text-lg text-muted-foreground font-serif mb-12">
                        Get in touch for any queries
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-2 border-primary/20">
                            <CardContent className="p-6 text-center">
                                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                                <h3 className="font-display font-semibold text-foreground mb-2">
                                    Phone
                                </h3>
                                <EditableText
                                    value={weddingData.contact.phone}
                                    onSave={(value) =>
                                        handleContactUpdate("phone", value)
                                    }
                                    as="p"
                                    className="text-muted-foreground font-serif"
                                />
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-primary/20">
                            <CardContent className="p-6 text-center">
                                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                                <h3 className="font-display font-semibold text-foreground mb-2">
                                    Email
                                </h3>
                                <EditableText
                                    value={weddingData.contact.email}
                                    onSave={(value) =>
                                        handleContactUpdate("email", value)
                                    }
                                    as="p"
                                    className="text-muted-foreground font-serif"
                                />
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-primary/20">
                            <CardContent className="p-6 text-center">
                                <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                                <h3 className="font-display font-semibold text-foreground mb-2">
                                    Address
                                </h3>
                                <EditableText
                                    value={weddingData.contact.address}
                                    onSave={(value) =>
                                        handleContactUpdate("address", value)
                                    }
                                    multiline
                                    as="p"
                                    className="text-muted-foreground font-serif"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
