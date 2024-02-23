import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export function About() {
  const navigate = useNavigate();

  const paragraphs: string[] = [
    "Welcome to XEGR, where your dream home awaits. Founded in 2002, our mission is to simplify the journey of finding your perfect home. Whether you're buying your first house, seeking a rental, or exploring investment opportunities, we provide comprehensive solutions tailored to your needs.",
    "Our team comprises experienced real estate professionals passionate about helping individuals and families find their ideal living spaces. We understand that each client's needs are unique, and we're dedicated to offering personalized service to ensure your requirements are met with the utmost attention and care.",
    "At XEGR, we pride ourselves on our user-friendly platform, offering an extensive range of listings that are constantly updated to reflect the latest market trends. Our website features advanced search tools that allow you to filter properties based on your specific preferences, making your search as efficient as possible.",
    "Beyond helping you find a property, we offer a wealth of resources to guide you through the buying, renting, or selling process. From market insights to legal advice, we're here to support you every step of the way.",
    "We are more than just a real estate website; we are a community dedicated to making your housing journey a success. Join us at XEGR and start your journey to finding your dream home today.",
  ];

  return (
    <div>
      <Container className="p-4">
        <img
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="house image"
          className="h-96 w-full object-cover rounded-lg shadow-lg"
        />
        <Separator className="bg-gray-300 my-4" />
        <Container className="p-4 max-w-4xl mx-auto text-center">
          <h1 className="font-bold text-3xl text-center pb-2">
            Your Trusted Partner in Real Estate
          </h1>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-black/70 my-4 text-justify">
              {paragraph}
            </p>
          ))}

          <Separator className="bg-gray-300 my-4" />
          <Button
            className="w-full max-w-64 mx-auto"
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            Get Started
          </Button>
        </Container>
      </Container>
    </div>
  );
}
