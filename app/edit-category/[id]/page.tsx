

import React from 'react'
import Modal from '@components/Modal';
import { getCurrentUser } from '@lib/session';
import { redirect } from 'next/navigation';
import { getCategoryDetails,fetchToken, } from '@lib/actions';
import { CategoryInterface } from '@common.types';
import CategoryForm from '@components/CategoryForm';
import CategoryActions from '@components/CategoryActions';


const EditProject = async ({params: {id}} : {params: {id:string}} ) => {
  const session = await getCurrentUser();

  if(!session?.user) redirect('/');

  const result = await getCategoryDetails(id) as {category?: CategoryInterface}

  // const categoryDetails = result?.category;

  // console.log(categoryDetails?.title);


  return (

    <Modal>
        <section className="flexBetween gap-y-8 max-w-4xl  w-full">
                <h3 className='modal-head-text'> Edit a collection </h3>
                
                <div className="flex justify-end items-center gap-2">
                        <CategoryActions 
                         category={result?.category}
                        />
                </div>
                
        </section>


        <CategoryForm type="edit" session={session} category={result?.category} />
    </Modal>
  )
}

export default EditProject
