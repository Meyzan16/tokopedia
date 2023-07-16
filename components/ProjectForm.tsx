"use client"

import { ProjectInterface, SessionInterface } from "@/common.types"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters, genreFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createNewProject, updateProject } from "@/lib/actions";
import { fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from 'react-hot-toast'

type Props = {
  type: string,
  session: SessionInterface;
  project?: ProjectInterface;
}



const ProjectForm = ({type , session, project} : Props) => {

    const router = useRouter();
  
    const [submitting, setsubmitting] = useState(false);

    const [form,setform] = useState({
      title: project?.title || '',
      description: project?.description || '',
      image: project?.image || '',
      genre: project?.genre || '',
      episode: project?.episode || '',
      liveSiteUrl: project?.liveSiteUrl || '',
      category: project?.category || '',
    });


  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if(!file) return;
    if(!file.type.includes('image')) {
      return alert('Please upload an image file');
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange('image', result);
    }
  };

  const handleStateChange = (fieldName:string, value: string) => {
    setform((prevState) => ({...prevState, [fieldName]: value}))
  }


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setsubmitting(true);
    const {token} =  await fetchToken();
    try {
      if(type === 'create') {
        //create a new project
        await createNewProject(form, session?.user?.id, token);
        
        // router.push(`/profile/${session?.user?.id}`);
        router.push('/');
        toast.success(`collection anime created successfully`);
      }

      if(type === 'edit') {
        //edit a new project
        await updateProject(form, project?.id as string, token);

        router.push(`/project/${project?.id}`);
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
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
            {!form.image && 'Choose a new image anime'}
        </label>
        <input 
          id="image" type="file" accept="image/*" required={type === 'create'}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {
          form.image && (
            <Image
              src={form?.image}
              className="sm:p-10 object-contain z-20"
              alt="project poster"
              fill 
            />
          )
        }
      </div>  

      <FormField 
        title="title"
        state={form.title}
        placeholder="Flexanime"
        setState ={(value) => handleStateChange('title', value)}
      />
      <FormField 
        title="description"
        state={form.description}
        placeholder="Showcas and discover anime collection"
        setState ={(value) => handleStateChange('description', value)}
      />

      <FormField 
        title="episode"
        state={form.episode}
        placeholder="Showcas and discover anime collection"
        setState ={(value) => handleStateChange('episode', value)}
      />    
      
      <FormField
        type="url" 
        title="website URL"
        state={form.liveSiteUrl}
        placeholder="http://portopolio...."
        setState ={(value) => handleStateChange('liveSiteUrl', value)}
      />

      

      <div className="flex flex-row w-full gap-4">
        <CustomMenu 
            title="genre"
            state={form.genre || "select a genre"}
            filters={genreFilters}
            setState={(value) => handleStateChange('genre', value)}
        />

        <CustomMenu 
            title="category"
            state={form.category || "select a category"}
            filters={categoryFilters}
            setState={(value) => handleStateChange('category', value)}
        />
      </div>

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
        {
          type === 'edit' && (
            <Link href={`/project/${project?.id}`} className='flexCenter edit-action_btn hover:bg-red-600 hover:text-white'>
              Back
            </Link>
          )
        }

      </div>

    </form>
  )
}

export default ProjectForm
