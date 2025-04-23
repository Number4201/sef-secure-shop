
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getBlogPostBySlug, getRecentBlogPosts } from '@/data/blog-posts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const post = slug ? getBlogPostBySlug(slug) : null;
  const recentPosts = post ? getRecentBlogPosts(3).filter(p => p.id !== post.id) : [];
  
  // Redirect if post not found
  useEffect(() => {
    if (!post) {
      toast({
        title: "Článek nenalezen",
        description: "Požadovaný článek nebyl nalezen. Budete přesměrováni na seznam článků.",
        variant: "destructive"
      });
      setTimeout(() => navigate('/blog'), 2000);
    }
  }, [post, navigate, toast]);
  
  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Článek nenalezen</h1>
          <p>Požadovaný článek nebyl nalezen. Budete přesměrováni na seznam článků.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-esejfy-burgundy hover:text-esejfy-burgundy/80"
          >
            <ChevronLeft size={16} /> Zpět na všechny články
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              {post.image && (
                <div className="h-64 md:h-80 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-4">
                  <Badge className="bg-esejfy-burgundy text-white">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-6">{post.title}</h1>
                
                <div className="prose max-w-none">
                  <ReactMarkdown>
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
            </article>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Nejnovější články</h3>
                  <div className="space-y-4">
                    {recentPosts.map(recentPost => (
                      <div key={recentPost.id} className="border-b pb-4 last:border-b-0">
                        <Link 
                          to={`/blog/${recentPost.slug}`}
                          className="font-medium hover:text-esejfy-burgundy transition-colors"
                        >
                          {recentPost.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{recentPost.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Potřebujete poradit?</h3>
                  <p className="text-gray-600 mb-4">Nevíte si rady s výběrem správného trezoru? Naši odborníci vám rádi pomohou.</p>
                  <Link 
                    to="/kontakt"
                    className="block text-center bg-esejfy-burgundy hover:bg-esejfy-burgundy/90 text-white py-2 px-4 rounded transition-colors w-full"
                  >
                    Kontaktujte nás
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostPage;
