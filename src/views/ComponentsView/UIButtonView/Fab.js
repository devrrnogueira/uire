import UIButton from "src/components/UI/UIButton"

export default function Fab() {
    return (
        <div className="child-spaced">
            <UIButton icon="camera" type="fab" color="red"/>
            <UIButton icon="camera" type="fab" color="theme-gray"/>
            <UIButton icon="camera" type="fab"/>
        </div>
    )
}