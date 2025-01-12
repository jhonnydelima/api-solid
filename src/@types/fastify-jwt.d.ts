import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      role: 'ADMIN' | 'MEMBER'
    }
    payload: {
      role: 'ADMIN' | 'MEMBER'
    }
  }
}
