import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createGym } from './create-gym'
import { searchGyms } from './search-gyms'
import { fetchNearbyGyms } from './fetch-nearby-gyms'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms', createGym)
  app.get('/gyms/search', searchGyms)
  app.get('/gyms/nearby', fetchNearbyGyms)
}
