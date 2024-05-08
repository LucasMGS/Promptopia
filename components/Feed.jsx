'use client';

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [prompts, setPrompts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompt',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);

      setPrompts(data);
    }

    fetchPrompts();
  }, []);

  return (
    <section className='feed'>
       <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'>
        </input>
       </form>

       <PromptCardList
        data= {prompts}>

       </PromptCardList>
    </section>
  )
}

export default Feed