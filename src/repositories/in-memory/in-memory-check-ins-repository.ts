import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }
    this.items.push(checkIn)
    return checkIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')
    const checkIn = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isInTheSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
      return checkIn.user_id === userId && isInTheSameDate
    })
    if (!checkIn) {
      return null
    }
    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
    return checkIns
  }

  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findById(id: string) {
    const checkIn = this.items.find((checkIn) => checkIn.id === id)
    if (!checkIn) {
      return null
    }
    return checkIn
  }

  async save(data: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === data.id)
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = data
    }
    return data
  }
}
