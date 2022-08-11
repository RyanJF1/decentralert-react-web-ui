import {
    Anchor, Bell, Globe,
    Headphones,
    Home, Send, Users,

} from 'react-feather';

export const MENUITEMS = [

    {
        title: 'Dashboard', icon: Home, type: 'link', path: '/dashboard/dashboard', active: false
    },
    {
        title: 'Addresses', icon: Send, type: 'link', path: '/addresses/addresses', active: false
    },
    {
        title: 'Notifications', icon: Bell, type: 'link', path: '/notifications/notifications', active: false
    },
    {
        title: 'Users', icon: Users, type: 'link', path: '/users/users', active: false
    },
    {
        title: 'Transfers', icon: Globe, type: 'link', path: '/transfers/transfers', active: false
    },
]
