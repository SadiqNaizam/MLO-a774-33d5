import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import AuthorInfoCard from '@/components/AuthorInfoCard';
import StarRatingDisplay from '@/components/StarRatingDisplay';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Avatar is used by AuthorInfoCard, but can be used separately too
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams, Link } from 'react-router-dom'; // For potential slug usage

const placeholderArticle = {
  id: 'example-article',
  title: 'In-Depth Review: The FutureTech X1 Laptop',
  slug: 'futuretech-x1-review',
  category: 'Laptop Reviews',
  categorySlug: 'laptop-reviews',
  publishDate: 'October 27, 2023',
  readingTime: '8 min read',
  imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  content: `
    <p class="mb-4">The FutureTech X1 has been touted as a game-changer in the portable computing space. With its sleek design, powerful internals, and a stunning new display technology, it promises to deliver an unparalleled user experience. But does it live up to the hype? We spent a month with the X1 to find out.</p>
    <h3 class="text-xl font-semibold mt-6 mb-3">Design and Build Quality</h3>
    <p class="mb-4">Crafted from a single block of aerospace-grade aluminum, the X1 feels incredibly premium. It's surprisingly light for its size, making it an excellent companion for professionals on the go. The keyboard is a joy to type on, with good travel and satisfying tactile feedback.</p>
    <figure class="my-6">
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=70" alt="Laptop on a desk" class="rounded-lg shadow-md mx-auto" />
      <figcaption class="text-center text-sm text-muted-foreground mt-2">The FutureTech X1 boasts a minimalist design.</figcaption>
    </figure>
    <h3 class="text-xl font-semibold mt-6 mb-3">Performance</h3>
    <p class="mb-4">Under the hood, our review unit packed the latest Intel Core i9 processor, 32GB of RAM, and a 2TB NVMe SSD. Unsurprisingly, performance was stellar. It handled everything from 4K video editing to demanding games with ease. Battery life was also impressive, consistently lasting over 10 hours on a single charge with mixed usage.</p>
    <h3 class="text-xl font-semibold mt-6 mb-3">Display</h3>
    <p class="mb-4">The 15.6-inch Mini-LED display is simply breathtaking. Colors are vibrant, blacks are deep, and the 120Hz refresh rate makes everything feel incredibly smooth. It's one of the best displays we've seen on a laptop.</p>
    <h3 class="text-xl font-semibold mt-6 mb-3">Verdict</h3>
    <p>The FutureTech X1 is an outstanding machine that mostly justifies its premium price tag. If you're looking for a top-tier Windows laptop with no compromises, the X1 should be at the top of your list.</p>
  `,
  author: {
    name: 'Dr. Alex Chen',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Dr. Chen is a lead analyst at SkyTech, specializing in hardware reviews and emerging technologies. With over 15 years in the industry, Alex provides deep insights into the tech world.',
    socialLinks: [
      { platform: 'twitter', url: '#' },
      { platform: 'linkedin', url: '#' },
      { platform: 'website', url: '#' },
    ],
  },
  rating: 4.5, // Out of 5
  comments: [
    { id: 'c1', authorName: 'User123', avatarUrl: 'https://randomuser.me/api/portraits/women/45.jpg', date: 'Oct 28, 2023', text: 'Great review! I was thinking of buying this laptop.' },
    { id: 'c2', authorName: 'TechFan', avatarUrl: 'https://randomuser.me/api/portraits/men/50.jpg', date: 'Oct 29, 2023', text: 'Thanks for the detailed breakdown. The display sounds amazing.' },
  ]
};

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // Example: /articles/this-is-a-slug
  console.log(`ArticlePage loaded for slug: ${slug}`);
  // In a real app, you'd fetch article data based on the slug
  const article = placeholderArticle; // Using placeholder

  const [comment, setComment] = React.useState('');
  const [commenterName, setCommenterName] = React.useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Comment Submitted:', { commenterName, comment });
    // Add logic to post comment
    setComment('');
    setCommenterName('');
    // Potentially show a success message
  };

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
                <BreadcrumbLink asChild><Link to={`/category/${article.categorySlug}`}>{article.category}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="truncate max-w-xs md:max-w-md">{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <article className="max-w-3xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{article.title}</h1>
              <div className="text-sm text-muted-foreground flex items-center space-x-3">
                <span>Published on {article.publishDate}</span>
                <span>&bull;</span>
                <span>{article.readingTime}</span>
              </div>
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.title} className="w-full h-auto rounded-lg shadow-md my-6 object-cover aspect-video" />
              )}
            </header>

            <div className="mb-8">
              <AuthorInfoCard author={article.author} />
            </div>

            {typeof article.rating === 'number' && (
              <div className="mb-8 flex items-center space-x-2">
                <StarRatingDisplay rating={article.rating} size="lg" />
                <span className="text-lg font-semibold text-muted-foreground">({article.rating.toFixed(1)}/5.0)</span>
              </div>
            )}
            
            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12" dangerouslySetInnerHTML={{ __html: article.content }} />

            <Separator className="my-12" />

            {/* Comments Section */}
            <section id="comments">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Comments ({article.comments.length})</h2>
              <div className="space-y-6 mb-8">
                {article.comments.map(comment => (
                  <Card key={comment.id} className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src={comment.avatarUrl} alt={comment.authorName} />
                        <AvatarFallback>{comment.authorName.substring(0,2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{comment.authorName}</p>
                        <p className="text-xs text-muted-foreground mb-1">{comment.date}</p>
                        <p className="text-sm text-muted-foreground">{comment.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
                {article.comments.length === 0 && <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Leave a Comment</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div>
                      <Input 
                        placeholder="Your Name (Optional)" 
                        value={commenterName} 
                        onChange={(e) => setCommenterName(e.target.value)} 
                      />
                    </div>
                    <div>
                      <Textarea 
                        placeholder="Write your comment here..." 
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit">Submit Comment</Button>
                  </form>
                </CardContent>
              </Card>
            </section>
          </article>
        </div>
      </main>
      <Footer siteName="SkyTech Clone" />
    </div>
  );
};

export default ArticlePage;