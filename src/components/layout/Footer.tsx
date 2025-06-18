import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react'; // Example social icons

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterProps {
  siteName?: string;
  quickLinks?: FooterLink[];
  socialLinks?: { platform: 'twitter' | 'linkedin' | 'github'; url: string }[];
}

const defaultQuickLinks: FooterLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const defaultSocialLinks: FooterProps['socialLinks'] = [
  { platform: 'twitter', url: '#' },
  { platform: 'linkedin', url: '#' },
  { platform: 'github', url: '#' },
];

const Footer: React.FC<FooterProps> = ({
  siteName = "TechHub",
  quickLinks = defaultQuickLinks,
  socialLinks = defaultSocialLinks,
}) => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  const socialIconMap = {
    twitter: <Twitter className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    github: <Github className="h-5 w-5" />,
  };

  return (
    <footer className="bg-muted/50 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About/Brand */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">{siteName}</h3>
            <p className="text-sm text-muted-foreground">
              Your daily source for tech news, reviews, and insights.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.label}>
                  {link.isExternal ? (
                     <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:text-primary transition-colors">
                       {link.label}
                     </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
             <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Follow Us</h4>
             <div className="flex space-x-4">
               {socialLinks.map(social => (
                 <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                   <span className="sr-only">{social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}</span>
                   {socialIconMap[social.platform]}
                 </a>
               ))}
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;