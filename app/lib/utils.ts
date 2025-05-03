import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jnavigate({
  path,
  query = null,
  target = '_self'
}: {
  path: string,
  query?: URLSearchParams | null,
  target?: '_self' | '_blank'
}) {
  const url = new URL(window.location.href)
  const origin = url.origin
  window.open(`${origin}${path}?${query ? query.toString() : ''}`, target)
}

export const ensure = {
  number: (value: string | number) => {
    if (typeof value === 'number') return value
    const parsed = Number(value)
    if (Number.isNaN(parsed)) {
      throw new Error(`Value "${value}" is not a valid number`)
    }
    return parsed
  },
  string: (value: string | number) => {
    if (typeof value === 'string') return value
    const parsed = String(value)
    if (parsed.trim() === '') {
      throw new Error(`Value "${value}" is not a valid string`)
    }
    return parsed
  },
  array: <T>(value: T[] | T) => {
    if (Array.isArray(value)) return value
    const parsed = [value]
    if (parsed.length === 0) {
      throw new Error(`Value "${value}" is not a valid array`)
    }
    return parsed
  },
  object: <T>(value: T | Record<string, unknown>) => {
    if (typeof value === 'object' && value !== null) return value
    throw new Error(`Value "${value}" is not a valid object`)
  },
  boolean: (value: boolean | string) => {
    if (typeof value === 'boolean') return value
    const parsed = value.toLowerCase() === 'true'
    if (parsed !== true && parsed !== false) {
      throw new Error(`Value "${value}" is not a valid boolean`)
    }
    return parsed
  },
  date: (value: string | Date) => {
    if (value instanceof Date) return value
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
      throw new Error(`Value "${value}" is not a valid date`)
    }
    return parsed
  },
  dateString: (value: string | Date) => {
    if (value instanceof Date) return value.toISOString()
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
      throw new Error(`Value "${value}" is not a valid date`)
    }
    return parsed.toISOString()
  }
}