import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiCalendar } from '@react-icons/all-files/fi/FiCalendar';
import { FiUser } from '@react-icons/all-files/fi/FiUser';
import { FiTag } from '@react-icons/all-files/fi/FiTag';
import client from '../services/contentful';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  featuredImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  author: {
    fields: {
      name: string;
      avatar: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };
  };
  tags: string[];
  publishDate: string;
};

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, file } = node.data.target.fields;
      const mimeType = file.contentType;
      const src = file.url;
      const alt = title;

      if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
        return <img src={src} alt={alt} className="my-4 rounded-lg" />;
      }
      return null;
    },
  },
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'blogPost',
          order: ['-fields.publishDate'],
          include: 2,
        });

        const fetchedPosts = response.items.map((item: any) => ({
          id: item.sys.id,
          ...item.fields,
        }));

        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
        
        if (fetchedPosts.length > 0) {
          setFeaturedPost(fetchedPosts[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let results = posts;
    
    if (searchTerm) {
      results = results.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedTag) {
      results = results.filter(post => 
        post.tags.some(tag => tag === selectedTag));
    }
    
    setFilteredPosts(results);
  }, [searchTerm, selectedTag, posts]);

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading blog posts...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mental Health Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Insights, stories, and resources for mental wellness
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                !selectedTag
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              All Topics
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  tag === selectedTag
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && !searchTerm && !selectedTag && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/2">
                  <img
                    className="h-full w-full object-cover"
                    src={`https:${featuredPost.featuredImage.fields.file.url}`}
                    alt={featuredPost.title}
                  />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary dark:text-orange-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center mt-6">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={`https:${featuredPost.author.fields.avatar.fields.file.url}`}
                      alt={featuredPost.author.fields.name}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {featuredPost.author.fields.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(featuredPost.publishDate)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80"
                    >
                      Read full article
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              >
                <img
                  className="h-48 w-full object-cover"
                  src={`https:${post.featuredImage.fields.file.url}`}
                  alt={post.title}
                />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary dark:text-orange-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={`https:${post.author.fields.avatar.fields.file.url}`}
                        alt={post.author.fields.name}
                      />
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.author.fields.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(post.publishDate)}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-sm text-primary font-medium hover:text-primary/80"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiSearch className="mx-auto text-4xl text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm
                ? "Try a different search term"
                : selectedTag
                ? "No posts with this tag"
                : "No posts available"}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;
