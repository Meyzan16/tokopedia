
import React from "react";
import { ProjectInterface } from "@common.types";
import { fetchAllProjects } from "@lib/actions";
import ProjectCard from "@components/ProjectCard";
import Categories from "@components/Categories";
import LoadMore from "@components/LoadMore";



type SearchParams = {
    category?: string | null;
    endcursor?: string | null;
}

type Props = {
    searchParams: SearchParams;
}

type ProjectsSearch = {
    projectSearch: {
        edges: {node: ProjectInterface}[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        }
    }
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

// {searchParams: { category,endcursor }}: Props
const Home = async () => {

            // const data = await fetchAllProjects(category,endcursor) as ProjectsSearch;
            const data = await fetchAllProjects() as ProjectsSearch;

            const projectsToDisplay = data?.projectSearch?.edges || [];
        
            if(projectsToDisplay.length === 0) {
                
                return (
                    <section className="flexStart flex-col paddings">
                        <Categories />
        
                        <p className="no-result-text text-center">
                            No anime collection found, go create some first.
                        </p>
        
                    </section>
                )
        
            }

            const pagination = data?.projectSearch?.pageInfo;

            console.log(projectsToDisplay);

    return (
        <section className="flex-start flex-col paddings mb-16">
            <Categories />

            <section className="projects-grid">
                {
                    projectsToDisplay.map(
                        ({node}: {node: ProjectInterface}) => 
                    (
                        <ProjectCard 
                            key={node?.id}
                            id={node?.id}
                            image={node?.image}
                            genre={node?.genre}
                            episode={node?.episode}
                            title={node?.title}
                            name={node?.createdBy?.name}
                            avatarUrl={node?.createdBy?.avatarUrl}
                            userId={node?.createdBy?.id}

                        />
                    )
                    )
                }

            </section>

            <LoadMore 
                startCursor={pagination.startCursor}
                endCursor={pagination.endCursor}
                hasPreviousPage={pagination.hasPreviousPage}
                hasNextPage={pagination.hasNextPage}


            />

        </section>
    )
}

export default Home;
