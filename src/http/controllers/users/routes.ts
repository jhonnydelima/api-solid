import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { getUserProfile } from './get-user-profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refreshToken } from './refresh-token'

export async function usersRoutes(app: FastifyInstance) {
  // PUBLIC ROUTES
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refreshToken)

  // PRIVATE ROUTES
  app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)
}
