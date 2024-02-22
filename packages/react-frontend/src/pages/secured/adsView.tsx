import { FilterButton } from "@/components/FilterButton";
import { Container } from "@/components/container";

export type AdsViewProps = {};

export function AdsView(props: AdsViewProps) {
  const {} = props;

  return (
    <div>
      <Container>
        <section className="p-4">
          <h2 className="font-bold text-3xl">Find Your Perfect Home</h2>
          <p className="text-black/70">
            Search through our extensive list of properties to find the perfect
            home for you.
          </p>
        </section>
        <div className="flex gap-2">
          <FilterButton
            label="Price"
            subLabel1="From"
            subLabel2="To"
            onChange={(value) => console.log(value)}
          />
          <FilterButton
            label="Area"
            subLabel1="From"
            subLabel2="To"
            onChange={(value) => console.log(value)}
          />
          <FilterButton
            label="Bedrooms"
            subLabel1="From"
            subLabel2="To"
            onChange={(value) => console.log(value)}
          />
          <FilterButton
            label="Bathrooms"
            subLabel1="From"
            subLabel2="To"
            onChange={(value) => console.log(value)}
          />
        </div>
      </Container>
    </div>
  );
}
