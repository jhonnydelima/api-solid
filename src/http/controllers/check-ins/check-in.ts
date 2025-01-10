import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function checkIn(request: FastifyRequest, reply: FastifyReply) {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const checkInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { gymId } = checkInParamsSchema.parse(request.params)
  const { latitude, longitude } = checkInBodySchema.parse(request.body)
  const checkInUseCase = makeCheckInUseCase()
  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return reply.status(201).send()
}
