'use client';

import React, { useEffect,useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    id: string;
    image: string;
    genre: string;
    episode: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: string;
}

const ProjectCard = ({id,image,genre,episode,title,name,avatarUrl,userId}: Props) => {

    const [randomLikes, setRandomLikes] = useState(0);
    const [randomViews, setRandomViews] = useState('');

    useEffect(() => {
        setRandomLikes(Math.floor(Math.random() * 10000))
        setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'))
    },[]);


  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-card'>
        <Link href={`/project/${id}`} className='flexCenter group relative w-full h-full '>
            <Image 
                src={image}
                width={414}
                height={314}
                alt='project image'
                className='w-full h-full object-cover rounded-2xl'
            />

            <div className='hidden group-hover:flex profile_card-title'>
                <p className='w-full'>{title} {genre}</p>
            </div>
        </Link>
        <div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
            <Link href={`/profile/${userId}`}>
                <div className='flexCenter gap-4'>
                    <Image 
                        src={avatarUrl}
                        width={24}
                        height={24}
                        className='rounded-full'
                        alt='Profile Image'
                    />
                    <p>episode {episode}</p>
                </div>
            </Link>
    

            <div className='flexCenter gap-4'>
                <div className='flexCenter gap-2'>
                    <Image src="/hearth.svg" width={13} height={12} alt='heart' />
                    <p className='text-sm'>{randomLikes}</p>
                </div>
                <div className='flexCenter gap-2'>
                    <Image src="/eye.svg" width={13} height={12} alt='eye' />
                    <p className='text-sm'>{randomViews}</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ProjectCard
