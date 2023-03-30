import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

export interface IBreadLink {
  name: string;
  current: boolean;
  disabled: boolean;
}
export type TBreadLinks = IBreadLink[];
export function Breadcrumbs({ links, onClick }:{
  links: TBreadLinks;
  onClick: (link:IBreadLink) => void;
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {links.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <button
                onClick={() => onClick(page)}
                className={`${page.current ? 'text-gray-900 hover:text-gray-700' : `text-gray-500 hover:text-gray-700`}ml-4 text-sm font-medium`}
                aria-current={page.current ? 'page' : undefined}
                disabled={page.disabled}
              >
                {page.name}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </nav>

  )
}
