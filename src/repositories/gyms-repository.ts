import { Gym, Prisma } from '@prisma/client'

export type FindManyNearbyParams = {
  latitude: number
  longitude: number
  page: number
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  findMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}
