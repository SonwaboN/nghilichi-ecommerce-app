import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link to={`/blog/${post.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-[1.02]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#777A55] mb-2 group-hover:text-[#777A55]/80">
            {post.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            {post.content.substring(0, 150)}...
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{post.author}</span>
            <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
