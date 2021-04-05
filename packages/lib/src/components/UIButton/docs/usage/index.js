import Demo from "src/components/Demo"

import Standard from "./Standard"
import StandardCode from "!!raw-loader!./Standard.js"

import WithIcon from "./WithIcon"
import WithIconCode from "!!raw-loader!./WithIcon.js"

import Fab from "./Fab"
import FabCode from "!!raw-loader!./Fab.js"

export default function UIButtonUsage() {
    return (<>
        <Demo title="Standard" code={StandardCode} Component={Standard} />
        <Demo title="With icon" code={WithIconCode} Component={WithIcon} />
        <Demo title="Fab" code={FabCode} Component={Fab} />
    </>)
}