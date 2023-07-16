

import React from 'react'
import Modal from '@components/Modal';
import { getCurrentUser } from '@lib/session';
import { redirect } from 'next/navigation';
import { getCategoryDetails } from '@lib/actions';
import { CategoryInterface } from '@common.types';
import CategoryForm from '@components/CategoryForm';

const EditProject = async ({params: {id}} : {params: {id:string}} ) => {
  const session = await getCurrentUser();

  if(!session?.user) redirect('/')

  const result = await getCategoryDetails(id) as {category?: CategoryInterface}

  return (

    <Modal>
      <h3 className='modal-head-text'> Edit a collection </h3>

        <CategoryForm type="edit" session={session} category={result?.category} />
    </Modal>
  )
}

export default EditProject
