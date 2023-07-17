"use client";

import { ProjectInterface, UserProfile } from '@common.types'
import Image from 'next/image';
import { fecthAllCategories } from "@lib/actions";
import { CategoryInterface } from '@common.types';
import Link from 'next/link';
import Button from "./Button";
import ProjectCard from './ProjectCard';
import { usePathname, useRouter , useSearchParams } from 'next/navigation';


type Props = {
    user: UserProfile;
    category: CategoryUser;
}

// type Category = {
//     categoryCollection: {
//       edges: {node: CategoryInterface}[];
//     }
// }

type CategoryUser = {
    user : {
        id:string;
        name:string;
        email:string;
        category:{
            edges: {node: CategoryInterface}[];
        }
    }
}
  
  

const ProfilePage = async ({ user,category }: Props) => 
{
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const categoryy = searchParams.get("category");

    // const data = await fecthAllCategories() as Category;
    
    // const test = data?.categoryCollection?.edges  || [];

    const query = category?.user?.category?.edges  || [];

    const handleTags = (filter: string) => {
        router.push(`${pathName}?category=${filter}`);
    };

    return (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
        <section className="flexBetween max-lg:flex-col gap-10 w-full">
                <div className='flex items-start flex-col w-full'>
                    <Image src={user?.avatarUrl} width={100} height={100} className="rounded-full" alt="user image" />
                    <p className="text-4xl font-bold mt-10">{user?.name}</p>
                    <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg leading-normal">I’m developer collection  
                        <span>
                            {" "}
                            anime 👋
                        </span>
                    </p>
                    
                    <div className="flex mt-8 gap-5 w-full flex-wrap">
                        <Button 
                            title="Follow" 
                            leftIcon="/plus-round.svg" 
                            bgColor="bg-light-white-400 !w-max" 
                            textColor="text-black-100" 
                        />
                        <Link href={`mailto:${user?.email}`}>
                            <Button title="Collab Me" leftIcon="/email.svg" />
                        </Link>
                    </div>

                </div>

                {user?.projects?.edges?.length > 0 ? (
                    
                        <Image
                            src={user?.projects?.edges[0]?.node?.image}
                            alt="project image"
                            width={739}
                            height={554}
                            className='hidden md:flex rounded-xl object-contain'
                        />
                
                ) : (
                    <Image
                        src="/profile-post.png"
                        width={739}
                        height={554}
                        alt="project image"
                        className='rounded-xl'
                    />
                )}
        </section>

        <section className='flexStart flex-col lg:mt-28 mt-16 w-full'>
            <p className="w-full text-left text-lg font-semibold">Recent Category Collection</p>
                <div className='flexBetween w-full gap-5 flew-wrap mt-4'>
                        <ul className='flex gap-2 overflow-auto pt-2'>
                            {
                                query.map(({node}: {node: CategoryInterface})  => (

                                    <Link href={`/edit-category/${node?.id}`}>
                                      
                                        <button
                                            key={node?.id}
                                            type='button'
                                            onClick={() => handleTags(node?.title)}
                                            className={`${categoryy === node?.title ? 'bg-light-white-300 font-medium' : 'font-normal'} px-4 py-3 rounded-2xl capitalize whitespace-nowrap hover:bg-primary-purple hover:text-white`}
                                        >
                                            {node?.title}
                                        </button>
                                    </Link>

                                
                                ))
                            }

                            
                        </ul>
                </div>
        </section>

        <section className="flexStart flex-col lg:mt-12 mt-16 w-full">
            <p className="w-full text-left text-lg font-semibold">Recent Collection Anime</p>

            
            
            <div className="profile_projects">
                    {user?.projects?.edges?.map(
                        ({ node }: { node: ProjectInterface }) => (
                            <ProjectCard
                                key={`${node?.id}`}
                                id={node?.id}
                                image={node?.image}
                                genre={node?.genre}
                                episode={node?.episode}
                                title={node?.title}
                                name={user.name}
                                avatarUrl={user.avatarUrl}
                                userId={user.id}
                            />
                        )
                    )}
                </div>
        </section>
    </section>

    )
}


export default ProfilePage