import UICard from "lib/src/components/UICard";
import UIList from "lib/src/components/UIList";

const list = [
    {
        image: 'https://cdn.quasar.dev/img/boy-avatar.png',
        header: 'name',
        label: 'Jonh Smith',
        after: 'Edit'
    },
    {
        icon: 'camera',
        header: 'Phone',
        label: '+55 41 91255 5415',
        after: 'Edit',
        divider: 'Divider Here'
    },
    {
        icon: 'camera',
        header: 'email',
        label: 'myemail@email.com',
        after: 'Edit',
        footer: 'Work'
    },
    {
        icon: 'camera',
        header: 'email',
        label: 'homeemail@email.com',
        after: 'Edit',
        footer: 'Home'
    }
]

export default function HeaderFooter() {
    
    return (
        <UICard>
            <UIList list={list} link/>
        </UICard>
    )
}