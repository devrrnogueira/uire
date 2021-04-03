import React, { lazy } from "react"
import { Route, Redirect } from "react-router-dom"

export const routes = [
    {
        exact: true,
        path: "/",
        component: lazy(() => import("src/views/HomeView"))
    },
    {
        exact: true,
        label: 'Colors',
        path: "/colors",
        component: lazy(() => import("src/views/ColorsView"))
    },
    {
        exact: true,
        label: 'UIButton',
        path: "/uibutton",
        component: lazy(() => import("src/views/ComponentsView/UIButtonView"))
    },
    {
        exact: true,
        label: 'UIPage',
        path: "/uipage",
        component: lazy(() => import("src/views/ComponentsView/UIPageView"))
    },
    {
        exact: true,
        label: 'UITabs',
        path: "/uitabs",
        component: lazy(() => import("src/views/ComponentsView/UITabsView"))
    },
    {
        exact: true,
        label: 'UIChat',
        path: "/uichat",
        component: lazy(() => import("src/views/ComponentsView/UIChatView"))
    },
    {
        exact: true,
        label: 'UIMenu',
        path: "/uimenu",
        component: lazy(() => import("src/views/ComponentsView/UIMenuView"))
    },
    {
        exact: true,
        label: 'UIList',
        path: "/uilist",
        component: lazy(() => import("src/views/ComponentsView/UIListView"))
    },
    {
        exact: true,
        label: 'UICard',
        path: "/uicard",
        component: lazy(() => import("src/views/ComponentsView/UICardView"))
    },
    {
        exact: true,
        label: 'UIRadio',
        path: "/uiradio",
        component: lazy(() => import("src/views/ComponentsView/UIRadioView"))
    },
    {
        exact: true,
        label: 'CSSTransition',
        path: "/csstransition",
        component: lazy(() => import("src/views/TransitionView"))
    }
]

export function RouteRender(route) {
    return (
        <Route
            path={route.path}
            render={props => {
                if (route.path == '/') {
                    let arr = window.location.search.replace('?','').split('=')

                    if (arr[0]=='path') {
                        return <Redirect to={arr[1]} />
                    }
                }

                return (<route.component {...props} routes={route.routes} />)
            }}
        />
    )
}
