import Link from "next/link";
import { useState } from "react";

interface IProps {
  imgUrl?: string;
  name: string;
  email: string;
  onSignout: () => void;
}

export default function AvatarDropdown({
  imgUrl,
  name,
  email,
  onSignout,
}: IProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative mr-6">
      <img
        id="avatarButton"
        data-dropdown-toggle="userDropdown"
        data-dropdown-placement="bottom-start"
        className="w-10 h-10 rounded-full cursor-pointer border-4 border-solid border-black-400"
        src={imgUrl || "/logo.png"}
        alt="User dropdown"
        typeof="button"
        onClick={() => setShow((prevState) => !prevState)}
      />
      {show && (
        <div
          id="userDropdown"
          className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute left-[-80px]"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{name}</div>
            <div className="font-medium truncate">{email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            {/* <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li> */}
            <li>
              <Link
                href={"/profile"}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </Link>
              {/* <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a> */}
            </li>
            {/* <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li> */}
          </ul>
          <div className="py-1">
            {/* <Link
              onClick={onSignout}
              href={"#"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </Link> */}
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                console.log("siiiiiignnnn ouuuututututututut");
                onSignout();
              }}
            >
              Sign out
            </button>
            {/* <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
}
