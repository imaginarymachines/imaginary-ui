import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";

export interface INavItem {
  label: string;
  href: string;
  active: boolean;
  disabled: boolean;
  id: string;
}
export type INavItems = INavItem[];

export function Breadcrumbs({
  links,
  onClick,
}: {
  links: INavItems;
  onClick: (link: INavItem) => void;
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
        {links.map((link) => (
          <li key={link.id}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <button
                onClick={() => onClick(link)}
                className={`${
                  link.active
                    ? "text-gray-900 hover:text-gray-700"
                    : `text-gray-500 hover:text-gray-700`
                }ml-4 text-sm font-medium`}
                aria-current={link.active ? "page" : undefined}
                disabled={link.disabled}
              >
                {link.label}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
