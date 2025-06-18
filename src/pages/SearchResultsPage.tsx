import React, { useEffect, useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import ArticleListItem from '@/components/ArticleListItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useLocation, Link, useNavigate } from 'react-router-dom'; // useNavigate to update URL on new search
import { Search } from 'lucide-react';

const allPlaceholderArticles = [
  // Same articles as CategoryListingPage for simplicity in this example
  { id: 'search-1', title: 'Best Smartphones Under $500 in 2024', slug: 'smartphones-under-500-2024', excerpt: 'Finding a budget-friendly smartphone that doesn\'t compromise on quality. We review the top contenders.', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Smartphones', authorName: 'Alex Ray', publishDate: 'Oct 24, 2023', readingTime: '6 min read' },
  { id: 'search-2', title: 'The Rise of Foldable Phones: A Trend or a Gimmick?', slug: 'foldable-phones-trend', excerpt: 'Foldable technology is maturing. We explore its practicality and future prospects in the smartphone market.', imageUrl: 'https://images.unsplash.com/photo-1610792564162-ea151b921794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Smartphones', authorName: 'Sarah Lin', publishDate: 'Oct 22, 2023', readingTime: '5 min read' },
  { id: 'search-3', title: 'iOS 18 vs Android 15: Which OS Reigns Supreme?', slug: 'ios18-vs-android15', excerpt: 'A detailed comparison of the latest mobile operating systems, focusing on features, performance, and privacy.', imageUrl: 'https://images.unsplash.com/photo-1607924093428-50e019350975?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Software', authorName: 'Mike P.', publishDate: 'Oct 20, 2023', readingTime: '9 min read' },
  { id: 'search-4', title: 'Top Antivirus Software for 2024', slug: 'top-antivirus-2024', excerpt: 'Protect your devices with our top picks for antivirus software, tested for performance and effectiveness.', imageUrl: 'https://images.unsplash.com/photo-1562822139-04919f29aba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Software', authorName: 'Chris Lee', publishDate: 'Oct 18, 2023', readingTime: '7 min read' },
  { id: 'search-5', title: 'Revolutionary AI Unveiled', slug: 'revolutionary-ai', excerpt: 'Discover the new AI that is changing the tech landscape.', imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Artificial Intelligence', authorName: 'AI News Desk', publishDate: 'Oct 27, 2023', readingTime: '3 min read' },
];

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [results, setResults] = useState<typeof allPlaceholderArticles>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';
    setSearchTerm(query);
    setCurrentSearchQuery(query);
    console.log(`SearchResultsPage loaded for query: ${query}`);

    if (query) {
      const filtered = allPlaceholderArticles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
    setCurrentPage(1); // Reset to first page on new search
  }, [location.search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };
  
  const totalPages = Math.ceil(results.length / articlesPerPage);
  const currentArticles = results.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0,0);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu siteName="SkyTech Clone" />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex mb-8">
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

          {currentSearchQuery && (
            <h1 className="text-2xl font-bold text-foreground mb-6">
              Search Results for "{currentSearchQuery}"
              <span className="text-base text-muted-foreground ml-2">({results.length} found)</span>
            </h1>
          )}
          
          {!currentSearchQuery && (
             <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">Enter a term above to search articles.</p>
             </div>
          )}

          {currentSearchQuery && currentArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentArticles.map(article => (
                <ArticleListItem key={article.id} article={article} />
              ))}
            </div>
          ) : currentSearchQuery ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No articles found matching your search criteria.</p>
              <Link to="/"><Button variant="link" className="mt-4">Back to Homepage</Button></Link>
            </div>
          ) : null}

          {currentSearchQuery && totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {e.preventDefault(); handlePageChange(Math.max(1, currentPage - 1))}}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {e.preventDefault(); handlePageChange(i + 1)}}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {e.preventDefault(); handlePageChange(Math.min(totalPages, currentPage + 1))}}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
      <Footer siteName="SkyTech Clone" />
    </div>
  );
};

export default SearchResultsPage;