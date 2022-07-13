import { MenuItem } from './menu.model';


export const MENU: MenuItem[] = [
   
    {
        label: 'Dashboard',
        icon: 'home',
        link: '/dashboard',
    },
    // {
    //     label: 'MASTER DATA',
    //     isTitle: true
    // },
    
    // {
    //     label: 'Manage Customer',
    //     icon: 'home',
    //     link: '/manage-customer',
    // },
    {
        label: 'Station Details',
        icon: 'home',
        link: '/station-details',
    },
    {
        label: 'Job No Details',
        icon: 'home',
        link: '/job-no-details',
    },
    {
        label: 'User Details',
        icon: 'home',
        link: '/user-details',
    },
    {
        label: 'Fault Type Details',
        icon: 'home',
        link: '/fault-details',
    },
    {
        label: 'Ticket Details',
        icon: 'home',
        link: '/ticket-details',
    },
    {
        label: 'Notification Details',
        icon: 'home',
        link: '/notification-details',
    },
    {
        label: 'Auto Calculation Lift',
        icon: 'home',
        link: '/autocalculator',
    },

    {
        label: 'Auto Calculation Esc',
        icon: 'home',
        link: '/esc_autocalculator',
    },


    {
        label: 'Delete Ticket',
        icon: 'home',
        link: '/deleteticket',
    },
    
   
];


export const CMRL: MenuItem[] = [
   
    {
        label: 'Dashboard',
        icon: 'home',
        link: '/dashboard',
    },
    {
        label: 'Ticket Details',
        icon: 'home',
        link: '/ticket-details',
    },


    {
        label: 'Auto Calculation Lift',
        icon: 'home',
        link: '/cmrl_autocalculator',
    },

    {
        label: 'Auto Calculation Esc',
        icon: 'home',
        link: '/cmrl_esc_autocalculator',
    },
];

