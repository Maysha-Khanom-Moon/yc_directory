import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link'; 
import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

type Post = {
  _id: string | number;
  _createdAt: string | Date;
  title: string;
  description: string;
  image: string;
  category: string;
  views: number;
  author: { _id: string | number, name: string };
};

const StartupCard = ({ post }: { post: Post }) => {

  const { _createdAt, views, author: { _id: authorId, name }, title, category, _id, image, description } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">
          {formatDate(_createdAt.toString())}
        </p>

        <div className='flex gap-1.5'>
          <EyeIcon className='w-6 h-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      <div className='flex-between gap-5 mt-5'>
        <div className='flex-1'>
          <Link href={`/user/${authorId}`}>
            <p className='text-16-medium line-clamp-1 text-black'>{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${authorId}`}>
          <Image src='https://placehold.co/48' alt='placeholder' width={48} height={48} className='rounded-full border-gray-200 border-2' />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>
          {description}
        </p>

        <img src={image} alt={title} className='startup-card_img' />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>

        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
