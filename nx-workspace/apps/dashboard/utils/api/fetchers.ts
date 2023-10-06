import { ComponentSchema } from '@types';
import { REGISTERED_COMPONENTS } from './tags';

export async function getRegisteredComponents(): Promise<
  ComponentSchema[] | undefined
> {
  const res = await fetch('http://localhost:8000/api/register-component', {
    next: { tags: [REGISTERED_COMPONENTS] },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch registered components');
  }

  return res.json();
}