import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test01 Gym',
        description: 'Test01 description.',
        phone: '1122222222',
        latitude: -25.4705664,
        longitude: -49.2929024,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test02 Gym',
        description: 'Test02 description.',
        phone: '1122222222',
        latitude: -25.4705664,
        longitude: -49.2929024,
      })
    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Test01',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Test01 Gym',
      }),
    ])
  })
})
