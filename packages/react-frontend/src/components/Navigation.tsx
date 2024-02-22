import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Avatar } from "./Avatar";
import { LinkType } from "./Avatar";

export type NavigationProps = {};

const links: LinkType[] = [
  { to: "/", label: "Home" },
  { to: "/ads", label: "Ads" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
];

export function Navigation(props: NavigationProps) {
  const {} = props;

  const path = useLocation();

  return (
    <div className="flex justify-between py-4 px-10 bg-white shadow">
      <div className="flex justify-center items-center font-bold text-xl">
        <Link to="/">XEGR Demo</Link>
      </div>
      <nav className="hidden md:flex items-center">
        <ul className="flex">
          {links.map((link) => (
            <li
              key={link.to}
              className={cn(
                {
                  "font-bold": path.pathname === link.to,
                },
                "hover:font-bold w-20 text-center"
              )}
            >
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Avatar src="#" alt="Profile Picture" fallback="SS" links={links} />
      </div>
    </div>
  );
}
