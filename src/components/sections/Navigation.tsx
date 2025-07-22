import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWedding } from "@/hooks/useWedding";
import { Menu, X, LogOut } from "lucide-react";

const Navigation = () => {
  const { isLoggedIn, logout } = useWedding();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Our Story", href: "#story" },
    { name: "Wedding Details", href: "#details" },
    { name: "Schedule", href: "#schedule" },
    { name: "Gallery", href: "#gallery" },
    { name: "Wishes", href: "#wishes" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl ornament text-primary">❋</div>
            <span className="text-xl font-display font-semibold text-primary">
              V & P
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            
            {isLoggedIn && (
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              
              {isLoggedIn && (
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="mx-4 mt-4"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;