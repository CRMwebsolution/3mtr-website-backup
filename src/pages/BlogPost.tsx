import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blog';
import Header from '../components/Header';
import BlogHeader from '../components/blog/BlogHeader';
import BlogContent from '../components/blog/BlogContent';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { generateStructuredData } from '../utils/seo';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    navigate('/blog');
    return null;
  }

  const structuredData = generateStructuredData('blog', post);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.title} | 3M Trailer Rental Blog`}
        description={post.excerpt}
        keywords={`${post.category}, trailer rental tips, ${post.title.toLowerCase()}`}
        image={post.image}
        url={`https://3mtrailerrental.com/blog/${post.id}`}
        type="article"
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Header />
      <div className="container mx-auto px-4 py-8 pt-32">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-[#FF6600] hover:text-[#ff8533] mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Blog
        </Link>

        <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <BlogHeader 
            title={post.title}
            date={post.date}
            category={post.category}
            image={post.image}
          />
          <div className="p-8">
            <BlogContent content={post.content} />
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}