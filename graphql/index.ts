export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: {email: $email}) {
            id
            name
            email
            avatarUrl
            description
        }
    }
`;

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!) {
        userCreate(input: $input) {
            user {
                name
                email
                avatarUrl
                description
                id
            }
        }
    }
`;

export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
        genre
        episode
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const createCategoryMutation = `
	mutation CreateCategory($input: CategoryCreateInput!) {
		categoryCreate(input: $input) {
			category {
				id
				title
        description
        createdBy {
					email
					name
				}
			}
		}
	}
`;



export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
      


export const projectsQuery = `
  query getProjects($category: String, $endcursor: String) {
    projectSearch(first: 10, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          genre
          episode
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      liveSiteUrl
      genre
      episode
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 9) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
            genre
            category
            episode
          }
        }
      }
    }
  }
`;
