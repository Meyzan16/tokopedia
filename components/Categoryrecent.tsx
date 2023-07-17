import React from 'react'
import { usePathname, useRouter , useSearchParams } from 'next/navigation';
import { CategoryInterface, UserProfile } from '@common.types';
import Link from 'next/link';


import { getUserCategory } from '@lib/actions';

type Props = {
    userId: string;
}


const Categoryrecent = async ({userId} : Props) => {

    const result = await getUserCategory(userId) as {user: UserProfile};


    // const filtredCategory = result?.variabel?.category?.edges?.
    // filter(({ node } : {node: CategoryInterface  } ) => node?.id !== userId );


      console.log(result);

  return (
    
    <section className='flexStart flex-col lg:mt-28 mt-16 w-full'>
         <p className="w-full text-left text-lg font-semibold">Recent Category Collection</p>

        <div className='flexBetween w-full gap-5 flew-wrap mt-4'>
                <ul className='flex gap-2 overflow-auto pt-2'>
                    {
                        result?.user?.category?.edges?.map(
                            ({ node }: { node: CategoryInterface })   => (

                            <Link href={`/edit-category/${node?.id}`}>
                            
                                <button
                                    key={node?.id}
                                    type='button'
                                    className= 'font-medium hover:font-normal px-4 py-3 rounded-2xl bg-light-white-400 capitalize whitespace-nowrap hover:bg-primary-purple hover:text-white'
                                >
                                    {node?.title}
                                </button>
                            </Link>

                        
                        ))
                    }

                    
                </ul>
        </div>
</section>
  )
}

export default Categoryrecent
