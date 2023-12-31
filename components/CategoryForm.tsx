"use client"

import { SessionInterface,CategoryInterface } from "@common.types"
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import Button from "./Button";
import { createCategoryNew } from "@lib/actions";
import { fetchToken } from "@lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from 'react-hot-toast'
import { updateCategory } from "@lib/actions";


type Props = {
  type: string,
  session: SessionInterface;
  category?: CategoryInterface;
}


const CategoryForm = ({type , session, category} : Props) => {
  
    const router = useRouter();
  
    const [submitting, setsubmitting] = useState(false);

    const [form,setform] = useState({
      title: category?.title || '',
      description: category?.description || '',
    });


    const handleStateChange = (fieldName:string, value: string) => {
        setform((prevState) => ({...prevState, [fieldName]: value}))
    }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setsubmitting(true);
    const {token} =  await fetchToken();
    try {
      if(type === 'create') {
        //create a new category
        await createCategoryNew(form, session?.user?.id, token);
      
        router.push('/');
        toast.success(`a new collection successfully`);
      }

      if(type === 'edit') {
        //edit a new collection
        await updateCategory(form, category?.id as string, token);

        router.push('/');
        toast.success(`updated collection successfully`);
      }



    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    };
  };



  return (
    <form
      onSubmit={handleFormSubmit}
      className="flexStart form"
    >
      
      <FormField
        type="title" 
        title="Category new"
        state={form.title}
        placeholder="create a new category"
        setState ={(value) => handleStateChange('title', value)}
      />
      <FormField
        type="description" 
        title="description category new"
        state={form.description}
        placeholder="create a description"
        setState ={(value) => handleStateChange('description', value)}
      />

      <div className="flexStart w-full gap-4">
        <Button 
         title={
            submitting 
                ? `${type === "create" 
                ? "Creating" : "Editing"}` 
                : `${type === "create" 
                ? "Create" : "Edit"}`}

          type="submit"
          leftIcon={submitting ? "" : '/plus.svg'}
          submitting={submitting}
        />
       

      </div>

    </form>
  )
}

export default CategoryForm
