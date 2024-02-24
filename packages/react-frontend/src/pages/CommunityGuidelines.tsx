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

const communityGuidelines: PrivacyPolicyType[] = [
  {
    title: "Respect and Courtesy",
    description:
      "Treat all members with respect and courtesy. No harassment, bullying, or hate speech is tolerated. Avoid using offensive or discriminatory language.",
  },
  {
    title: "Integrity and Honesty",
    description:
      "Provide accurate and honest information in your listings and interactions. Do not post deceptive or misleading content. Respect the privacy and intellectual property of others.",
  },
  {
    title: "Safe Transactions",
    description:
      "Engage in fair and transparent dealings. Do not use the platform for illegal activities or transactions. Report any suspicious or fraudulent activity immediately.",
  },
  {
    title: "Quality Content",
    description:
      "Ensure your listings are clear, detailed, and relevant. Do not post spam, irrelevant links, or repetitive content. Avoid explicit, obscene, or offensive imagery.",
  },
  {
    title: "Community Engagement",
    description:
      "Help foster a positive and supportive community. Share feedback constructively and respectfully. Participate in community initiatives and discussions when possible.",
  },
  {
    title: "Compliance with Laws",
    description:
      "Adhere to all local and national laws and regulations. Respect the terms of service and user agreements of the platform. Understand and comply with real estate and advertising laws where applicable.",
  },
];

export function CommunityGuidelines() {
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <h2 className="text-center text-xl font-bold p-4">
        Community Guidelines
      </h2>
      <ul className="max-w-xs sm:max-w-md w-full text-center space-y-2">
        {communityGuidelines.map((section, index) => (
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
