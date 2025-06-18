import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Carousel from '@/components/Carousel';
import ArticleListItem from '@/components/ArticleListItem';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const placeholderCarouselSlides = [
  { id: 1, title: 'Revolutionary AI Unveiled', description: 'Discover the new AI that is changing the tech landscape.', imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', link: '/articles/revolutionary-ai', category: 'Artificial Intelligence' },
  { id: 2, title: 'Top 5 Laptops for Developers in 2024', description: 'Our comprehensive review of the best machines for coding.', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', link: '/articles/top-5-laptops-2024', category: 'Hardware Reviews' },
  { id: 3, title: 'The Future of Quantum Computing', description: 'A deep dive into what quantum computing holds for us.', imageUrl: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', link: '/articles/future-quantum-computing', category: 'Future Tech' },
];

const placeholderArticles = [
  { id: 'latest-1', title: 'Breaking: New Smartphone with Holographic Display', slug: 'new-smartphone-holographic', excerpt: 'Tech giant announces a groundbreaking smartphone featuring a true holographic display technology...', imageUrl: 'https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Mobile', authorName: 'Jane Doe', publishDate: 'Oct 26, 2023', readingTime: '4 min read' },
  { id: 'latest-2', title: 'Understanding Cloud Native Architectures', slug: 'cloud-native-architectures', excerpt: 'A beginner-friendly guide to understanding the principles and benefits of cloud-native systems.', imageUrl: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Cloud Computing', authorName: 'John Smith', publishDate: 'Oct 25, 2023', readingTime: '7 min read' },
  { id: 'popular-1', title: 'The Ultimate Guide to Cybersecurity in 2024', slug: 'cybersecurity-guide-2024', excerpt: 'Protect yourself and your business with these essential cybersecurity tips and tools.', imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Security', authorName: 'Alice Brown', publishDate: 'Oct 20, 2023', readingTime: '10 min read' },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results page, typically done with react-router's useNavigate hook
    // For now, just log
    console.log('Searching for:', searchTerm);
    // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu siteName="SkyTech Clone" />
      <main className="flex-grow">
        {/* Hero/Search Section */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Welcome to SkyTech</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your ultimate source for the latest in technology, insightful reviews, and breaking news.
            </p>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto flex">
              <Input
                type="search"
                placeholder="Search articles, reviews, news..."
                className="text-lg rounded-r-none focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" size="lg" className="rounded-l-none">
                <Search className="h-5 w-5 mr-2" /> Search
              </Button>
            </form>
          </div>
        </section>

        {/* Featured Content Carousel */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Featured Content</h2>
            <Carousel slides={placeholderCarouselSlides} />
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center md:text-left">Latest Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {placeholderArticles.slice(0, 3).map(article => (
                    <ArticleListItem key={article.id} article={article} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link to="/category/all">
                    <Button variant="outline">View More Articles</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Popular Reviews (Example Section) */}
         <section className="py-12">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Popular Reviews</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {placeholderArticles.filter(a => a.category?.toLowerCase().includes('review') || a.id.includes('popular')).slice(0,2).map(article => (
                    <ArticleListItem key={article.id} article={article} />
                  ))}
                 {placeholderArticles.filter(a => a.category?.toLowerCase().includes('review') || a.id.includes('popular')).length === 0 && <p className="text-muted-foreground col-span-2 text-center">No popular reviews to display currently.</p>}
            </div>
             <div className="text-center mt-8">
                  <Link to="/category/reviews">
                    <Button variant="outline">View More Reviews</Button>
                  </Link>
                </div>
          </div>
        </section>

      </main>
      <Footer siteName="SkyTech Clone" />
    </div>
  );
};

export default Homepage;