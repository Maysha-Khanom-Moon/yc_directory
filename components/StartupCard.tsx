import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import React from 'react';

type Post = {
  _id: string | number;
  _createdAt: string | Date;
  title: string;
  description: string;
  image: string;
  category: string;
  views: number;
  author: { _id: string | number };
};

const StartupCard = ({ post }: { post: Post }) => {
  return (
    <li className="startup-card">
      <div className="flex-between">
        <p className="startup-card_date">
          {formatDate(post._createdAt.toString())}
        </p>

        <div className='flex gap-1.5'>
          <EyeIcon className='w-6 h-6 text-primary' />
          <span className='text-16-medium'>{post.views}</span>
        </div>
      </div>
    </li>
  );
};

export default StartupCard;
