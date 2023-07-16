'use client'

import React, {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { deleteProject, fetchToken,getProjectDetails } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { SessionInterface } from "@/common.types";
import { ProjectInterface } from '@/common.types'


type Props = {
    projectId: string,
    session: SessionInterface,
    projectName?: string;
}

const ProjectActions =  ( { session,  projectId , projectName }: Props) => {

    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const router = useRouter()

    const handleDeleteProject = async () => {
        setIsDeleting(true);
        
        const {token} =  await fetchToken() ;
        
        
        try {
            toast.success(`anime ${projectName} deleted successfully`);

            await deleteProject(projectId,token);

            router.push(`/profile/${session?.user?.id}`);



        } catch (error) {
            throw error;
        } finally {
            setIsDeleting(false);
        }
    }

  return (
    <>
      <Link href={`/edit-project/${projectId}`} className='flexCenter edit-action_btn hover:bg-amber-500'>
        <Image 
            src='/pencile.svg' alt='edit' width={15} height={15}
        />
      </Link>

      <button
        type="button"
        className={`flexCenter delete-action_btn bg-gray ${isDeleting ? 'bg-red-500' : 'bg-gray'} `}
        onClick={handleDeleteProject}
     >
        <Image 
            src='/trash.svg' alt='delete' width={15} height={15}
        />


      </button>
    </>
  )
}

export default ProjectActions
