import UIButton from "../../../UIButton"

export default function WithIcon() {
    return (
        <>
            <div className="child-spaced">
                <UIButton caption="camera" icon="camera" fill/>
                <UIButton caption="right" icon="camera" iconAlign="right"/>
                <UIButton caption="grey-20" icon="camera" rounded fill/>
            </div>
            <div className="child-spaced">
                <UIButton caption="top" icon="camera" fill iconAlign="top"/>
                <UIButton caption="alert-red" icon="camera" fill iconAlign="top" color="red"/>
            </div>
        </>
    )
}