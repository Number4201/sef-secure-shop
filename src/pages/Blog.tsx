
import React from 'react';
import Layout from '@/components/layout/Layout';
import { getAllBlogPosts } from '@/data/blog-posts';
import BlogGrid from '@/components/blog/BlogGrid';
import { Badge } from '@/components/ui/badge';

const BlogPage: React.FC = () => {
  const blogPosts = getAllBlogPosts();
  
  // Extract unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Náš Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aktuální informace, rady a tipy ze světa bezpečnosti, trezorů a zabezpečení cenností pro domácnosti i firmy.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map(category => (
              <Badge key={category} variant="outline" className="py-1 px-3">
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        <BlogGrid posts={blogPosts} />
      </div>
    </Layout>
  );
};

export default BlogPage;
