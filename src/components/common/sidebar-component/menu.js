import {
    Anchor, Bell, Globe,
    Headphones,
    Home, Send, Users,

} from 'react-feather';

export const MENUITEMS = [

    {
        title: 'Login', icon: Home, type: 'link', path: '/login', active: false
    },
    {
        title: 'Dashboard', icon: Home, type: 'link', path: '/dashboard', active: false
    },
    {
        title: 'Addresses', icon: Send, type: 'link', path: '/addresses', active: false
    },
    {
        title: 'Notifications', icon: Bell, type: 'link', path: '/notifications', active: false
    },
    {
        title: 'Users', icon: Users, type: 'link', path: '/users', active: false
    },
    {
        title: 'Transfers', icon: Globe, type: 'link', path: '/transfers', active: false
    },
]
