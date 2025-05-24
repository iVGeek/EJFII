import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { FiCalendar } from '@react-icons/all-files/fi/FiCalendar';
import { FiUser } from '@react-icons/all-files/fi/FiUser';
import { FiArrowLeft } from '@react-icons/all-files/fi/FiArrowLeft';
import client from '../services/contentful';
import { Link } from 'react-router-dom';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: any;
  featuredImage: {
    fields: {
      file: {
        url: string;
      };
      title: string;
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
        return <img src={src} alt={alt} className="my-6 rounded-lg" />;
      }
      return null;
    },
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
        {children}
      </h3>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="mb-2">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 dark:text-gray-400 my-6">
        {children}
      </blockquote>
    ),
  },
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'blogPost',
          'fields.slug': slug,
          include: 3,
        });

        if (response.items.length > 0) {
          setPost({
            id: response.items[0].sys.id,
            ...response.items[0].fields,
          } as BlogPost);
        } else {
          setError('Post not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading post...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error}
            </h2>
            <Link
              to="/blog"
              className="inline-flex items-center text-primary font-medium hover:text-primary/80"
            >
              <FiArrowLeft className="mr-2" />
              Back to blog
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to blog
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <img
            className="w-full h-64 md:h-96 object-cover"
            src={`https:${post.featuredImage.fields.file.url}`}
            alt={post.featuredImage.fields.title}
          />
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary dark:text-orange-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center mb-8">
              <div className="flex items-center mr-6">
                <FiUser className="text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  {post.author.fields.name}
                </span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300">
                  {formatDate(post.publishDate)}
                </span>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              {documentToReactComponents(post.content, options)}
            </div>
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default BlogPost;
