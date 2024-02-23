import {
  Avatar as ShadAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

export type AvatarProps = {
  src: string;
  alt: string;
  fallback: string;
  links?: LinkType[];
};

export type LinkType = {
  to: string;
  label: string;
  onClick?: () => void;
};

export function Avatar(props: AvatarProps) {
  const { src, alt, fallback, links } = props;

  const defaultLinks: LinkType[] = [
    { to: "/listings", label: "Listings" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ShadAvatar className="border cursor-pointer">
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </ShadAvatar>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ul>
          <li className="font-bold text-sm text-black/30 px-1">
            User Settings
          </li>
          <Separator />
          {defaultLinks.map((link) => (
            <li key={link.to} onClick={() => link?.onClick?.()}>
              <Link
                to={link.to}
                className="block py-1 px-2 text-md hover:bg-gray-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <div className="md:hidden">
            <li className="font-bold text-sm text-black/30 px-1">Navigation</li>
            <Separator />
            {links?.map((link) => (
              <li key={link.to} onClick={() => link?.onClick?.()}>
                <Link
                  to={link.to}
                  className="block py-1 px-2 text-md hover:bg-gray-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </div>
          <Separator />
          <li onClick={() => localStorage.clear()}>
            <Link
              to="/login"
              className="block py-1 px-2 text-md hover:bg-gray-200"
            >
              Logout
            </Link>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
