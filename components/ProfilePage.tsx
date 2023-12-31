

import { ProjectInterface, UserProfile } from '@common.types'
import Image from 'next/image';
import { fecthAllCategories } from "@lib/actions";
import { CategoryInterface } from '@common.types';
import Link from 'next/link';
import Button from "./Button";
import ProjectCard from './ProjectCard';
import Categoryrecent from './Categoryrecent';



type Props = {
    user: UserProfile;
    userId: string;
}
  

const ProfilePage = async ({ user, userId }: Props) => 
{
   
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

        <Categoryrecent 
            userId={userId}
        />

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