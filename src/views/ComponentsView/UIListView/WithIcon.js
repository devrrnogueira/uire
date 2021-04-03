import UICard from "src/components/UI/UICard";
import UIList from "src/components/UI/UIList";

const list1 = [
    {
        icon: 'camera',
        label: 'Item 1',
        after: 'CEO'
    },
    {
        image: 'https://cdn.quasar.dev/img/boy-avatar.png',
        label: 'Item 2',
        after: After()
    },
    {
        icon: 'camera',
        label: 'Item 3'
    }
]

const list2 = [
    {
        icon: 'camera',
        label: 'Item 1',
        after: 'CEO',
        link: 1
    },
    {
        image: 'https://cdn.quasar.dev/img/boy-avatar.png',
        label: 'Link without arrow',
        after: After(),
        link: 2
    },
    {
        icon: 'camera',
        label: 'Item 3',
        link: true
    }
]

function After() {
    return <span className="badge">5</span>
}

export default function WithIcon() {
    return (
        <div>
            <UICard>
                <UIList list={list1} />
            </UICard>

            <UICard>
                <UIList list={list2}/>
            </UICard>
        </div>
    )
}