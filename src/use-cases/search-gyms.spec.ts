import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Test01 Gym',
      description: null,
      phone: null,
      latitude: -25.4705664,
      longitude: -49.2929024,
    })
    await gymsRepository.create({
      title: 'Test02 Gym',
      description: null,
      phone: null,
      latitude: -25.4705664,
      longitude: -49.2929024,
    })
    const { gyms } = await sut.execute({ query: 'Test', page: 1 })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Test01 Gym' }),
      expect.objectContaining({ title: 'Test02 Gym' }),
    ])
  })

  it('should be able to paginate gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `test-gym-${i}`,
        description: null,
        phone: null,
        latitude: -25.4705664,
        longitude: -49.2929024,
      })
    }
    const { gyms } = await sut.execute({ query: 'test', page: 2 })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'test-gym-21' }),
      expect.objectContaining({ title: 'test-gym-22' }),
    ])
  })
})
