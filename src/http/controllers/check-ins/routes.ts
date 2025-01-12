import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { checkIn } from './check-in'
import { validateCheckIn } from './validate-check-in'
import { fetchUserCheckInsHistory } from './fetch-user-check-ins-history'
import { getUserMetrics } from './get-user-metrics'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms/:gymId/check-ins', checkIn)
  app.get('/check-ins/history', fetchUserCheckInsHistory)
  app.get('/check-ins/metrics', getUserMetrics)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckIn,
  )
}
