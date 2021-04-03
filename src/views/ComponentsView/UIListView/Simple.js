import UICard from "src/components/UI/UICard";
import UIList from "src/components/UI/UIList";

const list = [
    {
        label: 'Item 1'
    },
    {
        label: 'Item 2'
    },
    {
        label: 'Item 3'
    }
]

export default function Basic() {
    return (
        <div>
            <UICard>
                <UIList list={list} />
            </UICard>

            <UICard>
                <UIList list={list} link/>
            </UICard>
        </div>
    )
}