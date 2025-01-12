import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createGym } from './create-gym'
import { searchGyms } from './search-gyms'
import { fetchNearbyGyms } from './fetch-nearby-gyms'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGym)
  app.get('/gyms/search', searchGyms)
  app.get('/gyms/nearby', fetchNearbyGyms)
}
