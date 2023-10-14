import clsx from 'clsx';
import { getPageBlueprints } from '../../utils/api/fetchers';
import Link from 'next/link';
import { CONTENT_PAGE } from '../../utils/routes';

export const PageBlueprintsListing = async () => {
  const pageBlueprints = await getPageBlueprints();

  if (!pageBlueprints) return 'error with fetching';

  if (pageBlueprints.length === 0) return 'No blueprints to render';

  return (
    <div className="grid grid-cols-1 gap-2">
      {pageBlueprints.map((pageBlueprint) => (
        <Link
          href={`${CONTENT_PAGE}/${pageBlueprint.name}`}
          className={clsx(
            'flex items-center bg-slate-700 rounded-md px-4 h-[60px]',
            'text-m break-words text-slate-300 cursor-pointer'
          )}
          key={1}
        >
          {pageBlueprint.name}
        </Link>
      ))}
    </div>
  );
};