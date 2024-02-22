import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

type TermsSectionType = {
  title: string;
  description: string;
};

const termsSections: TermsSectionType[] = [
  {
    title: "Acceptance of Terms",
    description:
      "Welcome to XEGR, a digital platform dedicated to renting and selling houses. By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you should not use our website.",
  },
  {
    title: "Services Description",
    description:
      "XEGR provides a digital marketplace for users to list, search for, rent, and purchase residential properties. Our services include property listings, search tools, and related content.",
  },
  {
    title: "User Registration",
    description:
      "To use certain features of our website, you may be required to register an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
  },
  {
    title: "User Conduct",
    description:
      "You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.",
  },
  {
    title: "Intellectual Property",
    description:
      "The content on our website, including but not limited to text, graphics, images, logos, and trademarks, is owned by XEGR or our licensors and is protected by copyright and other intellectual property laws.",
  },
  {
    title: "Links to Third-Party Websites",
    description:
      "Our website may contain links to third-party websites or services that are not owned or controlled by XEGR. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.",
  },
  {
    title: "Limitation of Liability",
    description:
      "XEGR shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the website; (ii) any conduct or content of any third party on the website; (iii) any content obtained from the website; and (iv) unauthorized access, use, or alteration of your transmissions or content.",
  },
  {
    title: "Changes to Terms",
    description:
      "XEGR reserves the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.",
  },
  {
    title: "Governing Law",
    description:
      "These Terms shall be governed and construed in accordance with the laws of Greece/Attika, without regard to its conflict of law provisions.",
  },
  {
    title: "Contact Us",
    description:
      "If you have any questions about these Terms, please contact us at 1234-567-890.",
  },
];

export function TermsOfServices() {
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <h2 className="text-center text-xl font-bold p-4">Terms of Services</h2>
      <ul className="max-w-xs sm:max-w-md w-full text-center space-y-2">
        {termsSections.map((section, index) => (
          <Collapsible className="bg-white p-2 rounded" key={index}>
            <CollapsibleTrigger className="font-bold text-lg" asChild>
              <li className="cursor-pointer" key={section.title}>
                {section.title}
              </li>
            </CollapsibleTrigger>
            <CollapsibleContent className="text-sm text-center p-2">
              <Separator className="my-2" />
              {section.description}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </ul>
      <Link to="/login" className="text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}
