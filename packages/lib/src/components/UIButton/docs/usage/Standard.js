import UIButton from '../../../UIButton'

export default function Standard() {
    return (
        <div className="child-spaced">
            <UIButton caption="Standard" />
            <UIButton caption="Rounded" rounded />
            <UIButton caption="Outline" outline />
            <UIButton caption="Outline Rounded" rounded outline />
            <UIButton caption="Fill" fill/>
            <UIButton caption="Fill Color" fill color="black" />
            <UIButton caption="Color Red" color="red" />
            <UIButton caption="Raised" raised />
            <UIButton caption="Raised Fill" fill raised />
        </div>
    )
}