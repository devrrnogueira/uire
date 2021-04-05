import UIButtonUsage from './usage'

const UIButtonDocs = {
    name: 'UIButton',
    description: 'UIButton is a button with a few extra useful features',
    instalation: '',
    usage: <UIButtonUsage />,
    api: {
        props: [
            {
                name: 'color',
                type: 'String',
                default: '',
                description: 'Color name for component from the Color Palette',
                example: ['primary', 'red']
            }
        ],
        events: {
            description: 'All native events are being propagated',
            all: [
                // {
                //     name: 'onClick',
                //     description: '',
                //     params: {
                //         value: {
                //             type: Object,
                //             description: '',
                //             example: ''
                //         }
                //     }
                
                // }
            ]
        }
    }
}

export default  UIButtonDocs
