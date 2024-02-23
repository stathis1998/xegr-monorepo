import { Container } from "@/components/container";

export type AdViewProps = {};

export function AdView(props: AdViewProps) {
  const {} = props;

  return (
    <div>
      <div className="bg-gray-200/50 p-4 shadow text-center">
        <h1 className="font-bold">
          Home Sweet Home: Unveiling Your Next Chapter
        </h1>
        <p className="text-black/50 text-sm">
          Dive into the details of a place where memories await and every nook
          tells a story.
        </p>
      </div>
      <Container className="py-4">House</Container>
    </div>
  );
}
