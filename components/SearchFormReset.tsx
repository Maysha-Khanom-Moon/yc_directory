'use client';
import React from 'react';
import Link from 'next/link';

const SearchFormReset = ({ query }: { query?: string }) => {

  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  }

  return (
    <div>
      <button type="reset" onClick={reset} className='search-btn'>
        <Link href="/" className='search-btn'>
          ✖
        </Link>
      </button>
    </div>
  )
}

export default SearchFormReset
