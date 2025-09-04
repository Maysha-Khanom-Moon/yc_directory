import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import markdownit from 'markdown-it'

export const experimental_ppr = false;
const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if(!post) return notFound();

  const parsedContent = md.render(post?.pitch || "" )

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
              <Image src={post.author.image} alt="avatar" width={64} height={64} className='rounded-full border-gray-200 border-2 shadow-lg' />

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-20-medium !text-gray-700">@{post.author.username}</p>
              </div>
            </ Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold mt-10">Pitch Details</h3>

          {
            parsedContent ?
              <article
                className="prose max-w-4xl break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }} />
             : 
              <p className="no-result">No details provided</p>
          }
        </div>

        <hr className="divider" />

        {/* EDITOR SELECTED STARTUPS */}
      </section>
    </>
  )
}

export default Page
