

import React from 'react'
import Modal from '@/components/Modal';
import CategoryForm from '@/components/CategoryForm';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

const CreateProject = async () => {
  const session = await getCurrentUser();

  if(!session?.user) redirect('/')

  return (

    <Modal>
      <h3 className='modal-head-text'> Create a new collection </h3>

        <CategoryForm type="create" session={session} />
    </Modal>
  )
}

export default CreateProject
