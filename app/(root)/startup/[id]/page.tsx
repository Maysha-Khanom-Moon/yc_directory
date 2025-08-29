import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if(!post) return notFound();

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post?._createdAt)}</p>

        <h1 className='heading'>{post.title}</h1>

        <p className='sub-heading'>{post.description}</p>
      </section>

      <section className='section_container'>
        <img src={post.image} alt="thumbnail" className='w-full h-auto rounded-xl' />

        <div className='space-y-5 mt-10 max-w-4x mx-auto'>
          <div className='flex-between gap-5'>
            <Link href={`/user/${post.author._id}`} className='flex gap-2 items-center'>
              <Image src={post.author.image} alt="avatar" width={64} height={64} className='rounded-full border-gray-200 border-2' />

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-20-medium !text-gray-700">@{post.author.username}</p>
              </div>
            </ Link>

            p
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
