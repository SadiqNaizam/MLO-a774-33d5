import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import { Menu, X } from 'lucide-react'; // Icons for mobile menu

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface NavigationMenuProps {
  siteName?: string;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' }, // Example, adjust as needed
  { label: 'Search', href: '/search' }, // Example
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  siteName = "TechHub",
  navItems = defaultNavItems,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu");

  const renderNavLinks = (isMobile: boolean = false) => (
    navItems.map((item) => (
      item.isExternal ? (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-medium text-sm hover:text-primary ${isMobile ? 'block py-2 px-3 rounded-md hover:bg-accent' : 'px-3 py-2'}`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {item.label}
        </a>
      ) : (
        <Link
          key={item.label}
          to={item.href}
          className={`font-medium text-sm hover:text-primary ${isMobile ? 'block py-2 px-3 rounded-md hover:bg-accent' : 'px-3 py-2'}`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      )
    ))
  );

  return (
    <nav className="bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Site Name */}
          <Link to="/" className="text-2xl font-bold text-primary">
            {siteName}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {renderNavLinks()}
            {/* Potentially add UserAuth Button/Dropdown here */}
             <Link to="/auth">
                <Button variant="ghost" size="sm">Login/Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[300px] p-0">
                <div className="flex justify-between items-center p-4 border-b">
                    <Link to="/" className="text-xl font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                        {siteName}
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <div className="flex flex-col space-y-1 p-4">
                  {renderNavLinks(true)}
                   <Link to="/auth" className="block py-2 px-3 rounded-md hover:bg-accent" onClick={() => setIsMobileMenuOpen(false)}>
                     <Button variant="outline" className="w-full">Login/Sign Up</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;