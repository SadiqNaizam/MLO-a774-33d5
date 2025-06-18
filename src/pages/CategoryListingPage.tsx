import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import ArticleListItem from '@/components/ArticleListItem';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useParams, Link } from 'react-router-dom';

const placeholderArticles = [
  { id: 'cat-1', title: 'Best Smartphones Under $500 in 2024', slug: 'smartphones-under-500-2024', excerpt: 'Finding a budget-friendly smartphone that doesn\'t compromise on quality. We review the top contenders.', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Smartphones', authorName: 'Alex Ray', publishDate: 'Oct 24, 2023', readingTime: '6 min read' },
  { id: 'cat-2', title: 'The Rise of Foldable Phones: A Trend or a Gimmick?', slug: 'foldable-phones-trend', excerpt: 'Foldable technology is maturing. We explore its practicality and future prospects in the smartphone market.', imageUrl: 'https://images.unsplash.com/photo-1610792564162-ea151b921794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Smartphones', authorName: 'Sarah Lin', publishDate: 'Oct 22, 2023', readingTime: '5 min read' },
  { id: 'cat-3', title: 'iOS 18 vs Android 15: Which OS Reigns Supreme?', slug: 'ios18-vs-android15', excerpt: 'A detailed comparison of the latest mobile operating systems, focusing on features, performance, and privacy.', imageUrl: 'https://images.unsplash.com/photo-1607924093428-50e019350975?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Software', authorName: 'Mike P.', publishDate: 'Oct 20, 2023', readingTime: '9 min read' },
  { id: 'cat-4', title: 'Top Antivirus Software for 2024', slug: 'top-antivirus-2024', excerpt: 'Protect your devices with our top picks for antivirus software, tested for performance and effectiveness.', imageUrl: 'https://images.unsplash.com/photo-1562822139-04919f29aba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', category: 'Software', authorName: 'Chris Lee', publishDate: 'Oct 18, 2023', readingTime: '7 min read' },
];

const CategoryListingPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  console.log(`CategoryListingPage loaded for category: ${categoryName}`);
  // In a real app, fetch articles for this category and handle pagination

  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState('date-desc');
  const articlesPerPage = 6;

  // Filter and sort articles (mock logic)
  const filteredArticles = placeholderArticles.filter(article => 
    categoryName === 'all' || article.category.toLowerCase().replace(/\s+/g, '-') === categoryName
  );
  
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
    if (sortBy === 'date-asc') {
      return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
    }
    if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title);
    }
    // Add more sorting options if needed
    return 0;
  });
  
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const currentArticles = sortedArticles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0,0);
  }

  const displayCategoryName = categoryName === 'all' ? 'All Articles' : categoryName?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu siteName="SkyTech Clone" />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{displayCategoryName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">{displayCategoryName}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                  {/* <SelectItem value="popularity">Popularity</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>

          {currentArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentArticles.map(article => (
                <ArticleListItem key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No articles found in this category.</p>
              <Link to="/"><Button variant="link" className="mt-4">Back to Homepage</Button></Link>
            </div>
          )}

          {totalPages > 1 && (
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
                 {/* Basic Ellipsis logic if many pages */}
                {/* {totalPages > 5 && currentPage < totalPages - 2 && <PaginationEllipsis />} */}
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

export default CategoryListingPage;