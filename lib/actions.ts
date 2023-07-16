import { ProjectForm,CategoryForm } from '@/common.types';
import { createUserMutation,createCategoryMutation, getUserQuery, createProjectMutation, projectsQuery, getProjectByIdQuery, getProjectsOfUserQuery, deleteProjectMutation, updateProjectMutation } from '@/graphql';
import  { GraphQLClient} from 'graphql-request';


const isProduction = process.env.NODE_ENV  === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : '1234';

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);


export const fetchToken = async () => {
    try {
        const res = await fetch(`${serverUrl}/api/auth/token`);
        console.log(res);
        return res.json();
    } catch (error) {
        throw error;
    }
}

const makeGraphQLRequest = async (query: string, variables = {}) => {

    try {
        //client request
        return await client.request(query, variables);

    } catch (error) {   
         throw(error);
    }

}



//model get user untuk session
export const  getUser = (email:string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getUserQuery, {email})
};


//model create user terbaru
export const createUser = (name: string, email:string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            name , email , avatarUrl
        }
    }
    return makeGraphQLRequest(createUserMutation, variables)
}

export const  uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({path: imagePath})
        })
        return response.json();
    } catch (error) {
        throw error;

    }
}

//model create a new project
export const createNewProject = async (form:ProjectForm, creatorId: string, token:string) => {
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url){
        client.setHeader("Authorization", `Bearer ${token}`);
        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId,
                }
            }
        }
        return makeGraphQLRequest(createProjectMutation, variables);
    }
}


//model create a new category
export const createCategoryNew = async(form:CategoryForm, creatorId: string, token:string) => 
{
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
        input: {
            ...form,
            createdBy: {
                link: creatorId,
            }
        }
    }
    return makeGraphQLRequest(createCategoryMutation, variables);

}



// get all projects
export const fetchAllProjects = async (category?: string, endcursor?: string) => {
    client.setHeader('x-api-key', apiKey);  
    return makeGraphQLRequest(projectsQuery, {category,endcursor});
}

//get projects details
export const getProjectDetails = (id:string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getProjectByIdQuery, {id})

}


export const getUserProjects = (id:string, last?:number) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getProjectsOfUserQuery, {id, last})
}


export const deleteProject = (id: string, token: string) => {
    client.setHeader('x-api-key', apiKey);
    client.setHeader("Authorization", `Bearer ${token}`);
    return makeGraphQLRequest(deleteProjectMutation, { id });
};


export const updateProject = async (form: ProjectForm, projectId:string, token: string) => {

    function isBase64DataUrl(value:string) {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value)
    }

    let updateForm = {...form};

    const isUploadingNewImage = isBase64DataUrl(form.image);

    if(isUploadingNewImage){
        const imageUrl = await uploadImage(form.image);
        if(imageUrl){
            updateForm = {
                ...form,
                image: imageUrl.url,
            }
        }

    }

    const variables = {
        id : projectId,
        input : updateForm,
    }

  
    client.setHeader("Authorization", `Bearer ${token}`);
    return makeGraphQLRequest(updateProjectMutation, variables);
  };



