import { g, auth, config } from '@grafbase/sdk'

//@ts-ignore
const User = g.model('User', {
  name: g.string().length({min:2, max:20}),
  email: g.string().unique(),
  avatarUrl: g.string(),
  description: g.string().optional(),
  projects: g.relation(() => Project).list().optional(),  
}).auth((rules) => {
  rules.public().read()
})

//@ts-ignore
const Project = g.model('Project', {
  title: g.string().length({min:2}),
  description: g.string(),
  image: g.string(),
  genre: g.string(),
  episode: g.string(),
  liveSiteUrl: g.string(),
  category: g.string().search(),
  categoryBy: g.relation(() => Category),  
  createdBy: g.relation(() => User),  
}).auth((rules) => {
  rules.public().read()
  rules.private().create().update().delete
})

const Category = g.model('Category', {
  title: g.string(),
  description: g.string(),
  projects: g.relation(() => Project).list().optional(),  
  createdBy: g.relation(() => User),
})

const jwt = auth.JWT(
  {
    issuer: 'grafbase',
    secret: g.env('NEXTAUTH_SECRET'),
  }
)


export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  }
})
