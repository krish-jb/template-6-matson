import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import HeroDecoration from "@/components/decorations/HeroDecoration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useWedding from "@/hooks/useWedding";

const Login: React.FC = () => {
    const { login, isLoggedIn } = useWedding();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() && !password) {
            toast.error("Both email and password fields are required!");
            return;
        }
        setIsSubmitting(true);
        try {
            const { error } = await login(email, password);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Welcome back! You are now logged in!");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center wedding-gradient">
            <HeroDecoration />
            <div className="border-2 border-primary/20 bg-background/80 rounded-lg h-96 w-full p-6 flex flex-col max-w-md">
                <h3 className="text-xl font-display font-semibold text-primary mb-6 text-center">
                    Admin Login
                </h3>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 flex flex-col flex-grow justify-between"
                >
                    <div className="flex flex-col flex-grow space-y-4">
                        <div>
                            <Label
                                htmlFor="email"
                                className="font-ibarra text-primary text-lg"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="font-serif"
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="password"
                                className="font-ibarra text-primary text-lg"
                            >
                                Password
                            </Label>
                            <Input
                                placeholder="Your password"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="font-serif resize-none "
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 font-serif"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Loghing in.." : "Login"}
                    </Button>
                    <div className="mx-auto">
                        <Link to="/">
                            <p className="border-b hover:border-foreground text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Go back home
                            </p>
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
