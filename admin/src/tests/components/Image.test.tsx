import { render } from "@testing-library/react";
import { Image } from "@/components/TableFields";

describe("Image component", () => {
    it("renders with default size and variant", () => {
        const { getByAltText } = render(<Image src="image.jpg" alt="image" />);
        expect(getByAltText("image")).toHaveClass("w-14 h-14");
        expect(getByAltText("image")).toHaveClass("rounded-none");
    });

    it("renders with small size and rounded variant", () => {
        const { getByAltText } = render(
            <Image src="image.jpg" alt="image" size="sm" variant="rounded" />
        );
        expect(getByAltText("image")).toHaveClass("w-12 h-12");
        expect(getByAltText("image")).toHaveClass("rounded-full");
    });

    it("renders with medium size and square variant", () => {
        const { getByAltText } = render(
            <Image src="image.jpg" alt="image" size="md" variant="square" />
        );
        expect(getByAltText("image")).toHaveClass("w-14 h-14");
        expect(getByAltText("image")).toHaveClass("rounded-none");
    });

    it("renders with large size and rounded variant", () => {
        const { getByAltText } = render(
            <Image src="image.jpg" alt="image" size="xl" variant="rounded" />
        );
        expect(getByAltText("image")).toHaveClass("w-24 h-24");
        expect(getByAltText("image")).toHaveClass("rounded-full");
    });

    it("renders with src and alt attributes", () => {
        const { getByAltText } = render(<Image src="image.jpg" alt="image" />);
        expect(getByAltText("image")).toHaveAttribute("src", "image.jpg");
        expect(getByAltText("image")).toHaveAttribute("alt", "image");
    });
});
