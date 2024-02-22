import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

type PrivacyPolicyType = {
  title: string;
  description: string;
};

const privacySections: PrivacyPolicyType[] = [
  {
    title: "Information Collection",
    description:
      "Details the types of personal information collected by the website, including both information provided by users (such as names and email addresses) and information collected automatically (like cookies and usage data).",
  },
  {
    title: "Use of Information",
    description:
      "Explains how the collected information is used, such as for providing services, personalizing user experience, improving the website, customer service purposes, or sending periodic emails.",
  },
  {
    title: "Information Sharing",
    description:
      "Outlines the circumstances under which any collected information might be shared with third parties, emphasizing commitment to not selling or renting user information for marketing purposes.",
  },
  {
    title: "Data Security",
    description:
      "Provides assurances about the measures taken to protect the security of users' personal information, including both technical and organizational strategies.",
  },
  {
    title: "User Rights",
    description:
      "Describes users' rights regarding their personal information, such as the right to access, correct, or delete their data, and how they can exercise these rights.",
  },
  {
    title: "Cookies Policy",
    description:
      "Details the use of cookies on the website, what types of cookies are used, and how users can manage their cookie preferences.",
  },
  {
    title: "Third-Party Services",
    description:
      "Discloses information about third-party services that may collect information independently from the website, such as analytics or advertising services.",
  },
  {
    title: "Children's Privacy",
    description:
      "States the website's policy regarding children's privacy, emphasizing compliance with laws like the Children's Online Privacy Protection Act (COPPA).",
  },
  {
    title: "Policy Changes",
    description:
      "Informs users that the privacy policy may be updated from time to time and how users will be notified about these changes.",
  },
  {
    title: "Contact Information",
    description:
      "Provides contact details for users to get in touch with the website regarding privacy concerns or inquiries.",
  },
];

export function PrivacePolicy() {
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <h2 className="text-center text-xl font-bold p-4">Privacy Policy</h2>
      <ul className="max-w-xs sm:max-w-md w-full text-center space-y-2">
        {privacySections.map((section, index) => (
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
