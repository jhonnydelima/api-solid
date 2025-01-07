import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

type FetchNearbyGymsUseCaseRequest = {
  userLatitude: number
  userLongitude: number
  page: number
}

type FetchNearbyGymsUseCaseResponse = {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
    page,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      page,
    })
    return {
      gyms,
    }
  }
}
