import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Linkedin, Twitter, Globe } from 'lucide-react'; // Example social icons

interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'website' | string; // Allow custom platforms
  url: string;
}

interface AuthorInfoCardProps {
  author: {
    name: string;
    avatarUrl?: string;
    bio?: string;
    socialLinks?: SocialLink[];
  };
}

const AuthorInfoCard: React.FC<AuthorInfoCardProps> = ({ author }) => {
  console.log("Rendering AuthorInfoCard for:", author.name);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const socialIconMap: { [key: string]: React.ReactNode } = {
    twitter: <Twitter className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />,
    website: <Globe className="h-4 w-4" />,
  };

  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={author.avatarUrl} alt={author.name} />
          <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{author.name}</h3>
          {/* Optional: Author title or role */}
          {/* <p className="text-sm text-muted-foreground">Tech Enthusiast</p> */}
        </div>
      </CardHeader>
      {author.bio && (
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground mb-3">{author.bio}</p>
           {author.socialLinks && author.socialLinks.length > 0 && (
            <div className="flex space-x-3">
              {author.socialLinks.map(link => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${author.name}'s ${link.platform}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {socialIconMap[link.platform] || <Globe className="h-4 w-4" /> /* Fallback icon */}
                </a>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default AuthorInfoCard;