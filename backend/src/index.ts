import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.post('/api/v1/signup', async (c) => {
  const body = await c.req.json();

  try{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const user = await prisma.user.create ({
    data: {
      username: body.username,
      password: body.password,
      name: body.name
    }
  })

  const jwt = await sign({
    id: user.id,
  }, c.env.JWT_SECRET);

  return c.text(jwt)
  
} catch(e) {
  console.log(e);
  return c.text('Invalid', 411);
  }
})

app.post('/api/v1/signin', async (c) => {
  const body = await c.req.json();
  try{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const user = await prisma.user.findFirst ({
    where: {
      username: body.username,
      password: body.password
    }
  })

  if(!user){
    c.status(403);
    return c.text("Invalid creds")
  }

  const jwt = await sign({
    id: user.id,
  }, c.env.JWT_SECRET);

  return c.text(jwt)
} catch(e) {
  console.log(e);
  return c.text('Invalid', 411);
}
  return c.text('signin route')
})

app.get('/api/v1/blog:id', (c:any) => {
  const id = c.req.param('id');
  console.log(id);
  return c.text('get blog route')
})

app.post('api/v1/blog', (c) => {
  return c.text('signin route')
})

app.put('api/v1/blog', (c) => {
  return c.text('signin route')
})

app.get('api/v1/blogBulk', (c) => {
  return c.text('Hello HONo!')
})

export default app
