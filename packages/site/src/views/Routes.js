import React, { lazy } from "react"
import { Route, Redirect } from "react-router-dom"

function Lazy(promisse) {
    return lazy(promisse)
}

// const Test = Lazy(() => import("src/views/ComponentsView/UIButtonView"))

export const routes = [
    {
        exact: true,
        path: "/",
        component: lazy(() => import(/* webpackChunkName: "HomeView" */ "src/views/HomeView"))
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
        component: Lazy(() => import(/* webpackChunkName: "UIButtonView" */ "src/views/ComponentsView/UIButtonView"))
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
                //hack para githup pages
                //404.html redireciona com ?path=mypath/any
                //aqui a query é removida e a rota redirecionada para o valor de ?path
                if (route.path == '/') {
                    let p
                    let arr = window.location.search.replace('?','').split('=')

                    if (arr[0]=='path') {
                        p = arr[1].replaceAll('%2F', '/').replace('/uire/', '')
                        return <Redirect to={p} />
                    }
                }

                return (<route.component {...props} routes={route.routes} />)
            }}
        />
    )
}
