import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }

  // async create(data: Prisma.GymCreateInput) {
  //   const gym = {
  //     id: randomUUID(),
  //     title: 'Test Gym',
  //   }
  //   this.items.push(gym)
  //   return gym
  // }
}
