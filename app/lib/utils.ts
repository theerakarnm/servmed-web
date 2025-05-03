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
  }
}