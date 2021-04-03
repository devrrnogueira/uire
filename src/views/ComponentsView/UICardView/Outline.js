import UICard from "src/components/UI/UICard"

export default function Outline() {
    return (
        <>
            <UICard outline>
                This is a simple card with plain text,
                but cards can also contain their own header,
                footer, list view, image, or any other element.
            </UICard>
            <UICard header="Card header" footer="Card Footer">
                This is a simple card with plain text,
                but cards can also contain their own header,
                footer, list view, image, or any other element.
            </UICard>
        </>
    )
}