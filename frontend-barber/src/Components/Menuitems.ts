export interface MenuItem {
    title: string;
    url: string;
    cName: string;
    icon: string;
}
export const Menuitems : MenuItem[]= [
    {
        title : "Home",
        url : "/",
        cName : "nav-links",
        icon : "fa-solid fa-house-user pr-1"

    },
    {
        title : "About Us",
        url : "/aboutus",
        cName : "nav-links",
        icon : "fa-solid fa-address-card pr-1"

    },
    {
        title : "Features",
        url : "/features",
        cName : "nav-links",
        icon : "fa-solid fa-calendar-days pr-1"

    },
    {
        title : "Join Us",
        url : "/joinus",
        cName : "nav-links",
        icon : "fa-solid fa-user pr-1"

    },
    {
        title : "Pricing",
        url : "/pricing",
        cName : "nav-links",
        icon : "fa-solid fa-newspaper pr-1"

    },
]