import { ComponentSchema } from '@types';
import { PAGE_BLUEPRINT, REGISTERED_COMPONENTS } from './tags';

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

export async function getPageBlueprints(): Promise<
  ComponentSchema[] | undefined
> {
  const res = await fetch('http://localhost:8000/api/page-blueprint', {
    next: { tags: [PAGE_BLUEPRINT] },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch page blueprints');
  }

  return res.json();
}
