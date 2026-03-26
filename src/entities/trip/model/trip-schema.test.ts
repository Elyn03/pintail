import { describe, it, expect } from 'vitest'
import { tripData } from './trip-schema.ts'

describe('TripData Schema', () => {
  it('accept if valid trip', () => {
    const validTrip = {
      id: 1,
      created_at: '2026-04-15T10:00:00Z',
      title: 'Paris Weekend',
      description: "Girls trip to Paris",
      start_date: '2026-04-15',
      end_date: '2026-04-17',
      budget_target: 600,
      budget_max: 1000,
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      expenses: 150,
    }

    const result = tripData.safeParse(validTrip)
    expect(result.success).toBe(true)
    expect(result.data).toMatchObject(validTrip)
  })

  it('reject if end_date < start_date', () => {
    const invalidTrip = {
      id: 1,
      created_at: '2026-04-15T10:00:00Z',
      title: 'Paris Weekend',
      description: 'Girls trip',
      start_date: '2026-04-17',
      end_date: '2026-04-15',
      budget_target: 600,
      budget_max: 1000,
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      expenses: 0,
    }

    const result = tripData.safeParse(invalidTrip)

    expect(result.success).toBe(false)
    expect(result.error?.message).toContain('End date must be on or after start date')
  })

  it('devrait accepter un UUID valide pour user_id', () => {
    const validUuidTrip = {
      id: 1,
      created_at: '2026-04-15T10:00:00Z',
      title: 'Valid UUID',
      description: 'Test',
      start_date: '2026-04-15',
      end_date: '2026-04-16',
      budget_target: 500,
      budget_max: 800,
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      expenses: 0,
    }

    const result = tripData.safeParse(validUuidTrip)
    expect(result.success).toBe(true)
  })

  it('accept if start_date = end_date', () => {
    const sameDayTrip = {
      id: 1,
      created_at: '2026-04-15T10:00:00Z',
      title: 'Day trip',
      description: 'Same day',
      start_date: '2026-04-15',
      end_date: '2026-04-15',
      budget_target: 100,
      budget_max: 200,
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      expenses: 0,
    }

    const result = tripData.safeParse(sameDayTrip)
    expect(result.success).toBe(true)
  })
})