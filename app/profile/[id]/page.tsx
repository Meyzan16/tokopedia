import React from 'react'
import { getUserProjects,getUserCategory } from '@lib/actions'
import Image from 'next/image'
import { UserProfile } from '@common.types'
import ProfilePage from '@components/ProfilePage'
import { CategoryInterface } from '@common.types'

type Props = {
    params: {
        id:string
    }
}
type CategoryUser = {
    user : {
        id:string;
        name:string;
        email:string;
        category:{
            edges: {node: CategoryInterface}[];
        }
    }
}


const UserProfile = async ({params}: Props) => {
    const result = await getUserProjects(params.id, 100) as {user: UserProfile};
    const category = await getUserCategory(params.id, 100) as   CategoryUser;

    // const query = category?.user?.category?.edges  || [];

    // console.log(query);

    if(!result.user) {
        return <p className='no-result-text'>failed to fetch user info</p>
    }
    
  return <ProfilePage user={result?.user} category={category} />
}

export default UserProfile
