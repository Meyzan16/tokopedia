'use client'

import React, {useState} from 'react'
import Image from 'next/image'
import { deleteProject, fetchToken,deleteCategory } from '@lib/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { SessionInterface } from "@common.types";
import { CategoryInterface } from '@common.types'


type Props = {
  category?: CategoryInterface;
}

const CategoryActions =  ( { category }: Props) => {

    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const router = useRouter()

    const handleDeleteProject = async () => {
        setIsDeleting(true);
        
        const {token} =  await fetchToken() ;
        
        try {
            toast.success(`category ${category?.title} collection successfully`);
            await deleteCategory(category?.id as string, token);
            router.push('/');
        } catch (error) {
            throw error;
          } finally {
            setIsDeleting(false);
        }
    }

  return (
    <>

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

export default CategoryActions
