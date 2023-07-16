import { UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";
import Link from "next/link";
import Image from "next/image";

type Props = {
    userId: string;
    projectId: string;
    // category:string;
}

const RelatedProjects = async ({userId, projectId} : Props) => {

    const result = await getUserProjects(userId) as {user?: UserProfile};

    const filteredProjects = result?.user?.projects?.edges?.
      filter(({ node } : {node: ProjectInterface  } ) => node?.id !== projectId);


      console.log(filteredProjects);

    if(filteredProjects?.length === 0) {
      return (
        <section className="flexStart flex-col paddings">
            <p className="no-result-text text-center">
                No anime collection found, go create some first.
            </p>

        </section>
    )

    } 

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {result?.user?.name}</p>
        <Link href={`/profile/${result?.user?.id}`} className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>
      <div className="related_projects-grid">
        {
          filteredProjects?.map(({node}: {node: ProjectInterface}) => (

            <div key={node?.id} className="flexCenter related_project-card drop-shadow-card">
              <Link href={`/project/${node?.id}`} className="flexCenter group relative w-full h-full">
                <Image 
                  src={node?.image} 
                  width={414} 
                  height={314} 
                  className="w-full h-full object-cover rounded-2xl" 
                  alt={`related project ${node?.title}`}
                />

                <div className="hidden group-hover:flex related_project-card_title">
                  <p className="w-full">{node?.title}</p>

                </div>
              </Link>
              <div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
                  
                  <p>episode {node?.episode} </p>
                  
                  <div className='flexCenter gap-4'>
                      <div className='flexCenter gap-2'>
                      <Image src="/hearth.svg" width={13} height={12} alt='heart' />
                          <p className='text-sm'>{node?.category}</p>
                      </div>
                      <div className='flexCenter gap-2'>
                          <Image src="/eye.svg" width={13} height={12} alt='eye' />
                          <p className='text-sm'>{node?.genre}</p>
                      </div>
                  </div>



              </div>
              
            </div>

          ))
        }
      </div>
    </section>
  )
}

export default RelatedProjects
