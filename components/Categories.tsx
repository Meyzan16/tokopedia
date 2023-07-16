"use client"

import { usePathname, useRouter , useSearchParams } from 'next/navigation';
import { fecthAllCategories } from "@lib/actions";
import { CategoryInterface } from '@common.types';

import { categoryFilters } from '@constants';

type Category = {
  categoryCollection: {
    edges: {node: CategoryInterface}[];
  }
}


const Categories =  async () => {

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const category = searchParams.get("category");

    const handleTags = (filter: string) => {
      router.push(`${pathName}?category=${filter}`);
    };

    const data = await fecthAllCategories() as Category;

    const test = data?.categoryCollection?.edges || [];

    // console.log(test);



  return (
    <div className='flexBetween w-full gap-5 flew-wrap'>
      <ul className='flex gap-2 overflow-auto'>
        {
            test.map( ({node}: {node: CategoryInterface})  => (

                <button
                    key={node?.title}
                    type='button'
                    onClick={() => handleTags(node?.title)}
                    className={`${category === node?.title ? 'bg-light-white-300 font-medium' : 'font-normal'} px-4 py-3 rounded-lg capitalize whitespace-nowrap `}
                >
                    {node?.title}
                </button>
            
            ))
        }

      {/* {categoryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </button>
        ))} */}
        
      </ul>
    </div>
  )
}

export default Categories
