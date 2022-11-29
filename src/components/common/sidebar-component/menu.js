import {
    Anchor, Bell, Globe,
    Headphones,
    Home, Search, Send, Users,

} from 'react-feather';

export const MENUITEMS = [

    {
        title: 'Login', icon: Home, type: 'link', path: '/login', active: false
    },
    {
        title: 'Home', icon: Home, type: 'link', path: '/home', active: false
    },
    {
        title: 'Addresses', icon: Send, type: 'link', path: '/addresses', active: false
    },
    {
        title: 'Notifications', icon: Bell, type: 'link', path: '/notifications', active: false
    },
    {
        title: 'Research', icon: Search, type: 'link', path: '/research', active: false
    },
]
