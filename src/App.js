import { useLayoutEffect, useState, Suspense, useEffect } from 'react'
import { useLocation } from "react-router"
import { Switch, useHistory, BrowserRouter as Router } from "react-router-dom"

import 'src/components/UI/css/f7.css'
import "src/components/UI/css/box.css"
import "src/components/UI/css/transition.css"

import UIPage from 'src/components/UI/UIPage'
import UIHeader from 'src/components/UI/UIHeader'
import UIDrawer from 'src/components/UI/UIDrawer'
import UIButton from 'src/components/UI/UIButton'

import './App.css'
import './CustomTheme.css'

import { routes, RouteRender } from "src/views/Routes"
import UIMenu from './components/UI/UIMenu'
import UIList, { UIListItem } from './components/UI/UIList'
import UIRadio from './components/UI/UIRadio'

import splash from 'src/libs/splash'
import Theme from 'src/libs/theme'

export default function App() {
    const [open, setOpen] = useState(true)
    const [show, showMenu] = useState(false)
    const [theme, setTheme] = useState(Theme.getTheme())
    const [dark, setDark] = useState(Theme.getDark())

    useLayoutEffect(()=>{
        let arr = window.location.search.replace('?','').split('=')

        if (arr[0]=='path') {
            window.history.replaceState({}, document.title, window.location.href.split('?')[0])
            setTimeout(()=>{splash.hide()}, 100)
        } else {
            splash.hide()
        }
    // eslint-disable-next-line
    }, [])

    useEffect(()=>{
        Theme.setTheme(theme).setDark(dark)
    }, [theme, dark])
    
    function openDrawer() {
        setOpen(!open)
    }

    function onMenuClick(id) {
        console.log(id)
    }
    
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="client hbox blue">
                <UIDrawer
                    behavior="desktop"
                    open={open}
                    onClose={()=>{setOpen(false)}}
                >
                    <div className="block-title">Left Panel</div>
                    <div className="block">
                        This is a left side panel. You can close it by clicking outsite or on item navigation.
                    </div>

                    <div className="block block-strong">
                        Here comes another text block with additional "block-strong" class. Praesent nec imperdiet diam.
                    </div>
                    
                    <div className="block-title">Main View Navigation</div>
                    <UIList style={{marginTop:0}}>
                        {routes.map((route, i) => (
                            route.label && <ItemLink key={i} label={route.label} to={route.path} />
                        ))}
                    </UIList>
                </UIDrawer>

                <UIPage
                    header={(
                        <UIHeader shadowOnScroll>
                            <UIButton
                                icon="menu"
                                rounded={true}
                                onClick={openDrawer}
                            />
                            <div className="ui-header-title">UI REact</div>
                            <UIButton
                                icon="more-vertical"
                                rounded={true}
                                onClick={()=>{showMenu(true)}}
                            >
                                <UIMenu
                                    anchor="right-bottom"
                                    show={show}
                                    onClose={()=>{showMenu(false)}}
                                >
                                    <UIList
                                        className='app-top-menu'
                                        onItemClick={onMenuClick}
                                    >
                                        <UIListItem link="2" divider="Mode"/>
                                        <UIListItem id="" link="2" label="Dark"
                                            onItemClick={()=>{setDark(true)}}
                                            after={<UIRadio value={true} checked={dark} />}/>
                                        <UIListItem link="2" label="White" divider="Theme"
                                            onItemClick={()=>{setDark(false)}}
                                            after={<UIRadio value={false} checked={!dark} />}/>

                                        <UIListItem link="2" label="Google Material"
                                            onItemClick={()=>{setTheme('md')}}
                                            after={<UIRadio value="md" checked={theme=='md'} />}/>
                                        <UIListItem link="2" label="IOS"
                                            onItemClick={()=>{setTheme('ios')}}
                                            after={<UIRadio value="ios" checked={theme=='ios'}/>}/>
                                    </UIList>
                                </UIMenu>
                            </UIButton>
                        </UIHeader>
                    )}
                >    
                    <Suspense fallback={<h1>loading...</h1>}>
                        <Switch>
                            {routes.map((route, i) => (
                                <RouteRender key={i} {...route} />
                            ))}
                        </Switch>
                    </Suspense>
                </UIPage>        
            </div>
        </Router>
    )
}

function ItemLink({label, to}) {
    const location = useLocation()
    const history = useHistory()
    
    function onClick(){
        history.push(to)
    }

    return (
        <UIListItem
            link
            active={location.pathname == to}
            label={label}
            onItemClick={onClick}
        />
    )
}