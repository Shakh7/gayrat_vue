import {getAssetPath} from "@/core/helpers/assets";

export interface MenuItem {
    heading?: string;
    sectionTitle?: string;
    route?: string;
    pages?: Array<MenuItem>;
    svgIcon?: string;
    fontIcon?: string;
    sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
    {
        pages: [
            {
                heading: "dashboard",
                route: "/dashboard",
                svgIcon: getAssetPath("media/icons/duotune/art/art002.svg"),
                fontIcon: "bi-app-indicator",
            },
            {
                heading: "Quotes",
                route: "/quotes",
                svgIcon: getAssetPath("media/icons/duotune/general/gen019.svg"),
                fontIcon: "bi-layers",
            },
            {
                heading: "Clients",
                route: "/clients",
                svgIcon: getAssetPath("media/icons/duotune/general/gen019.svg"),
                fontIcon: "bi-layers",
            },
        ],
    },
    // {
    //     heading: "apps",
    //     route: "/apps",
    //     pages: [
    //         {
    //             sectionTitle: "customers",
    //             route: "/customers",
    //             svgIcon: getAssetPath("media/icons/duotune/finance/fin006.svg"),
    //             fontIcon: "bi-printer",
    //             sub: [
    //                 {
    //                     heading: "gettingStarted",
    //                     route: "/apps/customers/getting-started",
    //                 },
    //             ],
    //         },
    //         {
    //             heading: "calendarApp",
    //             route: "/apps/calendar",
    //             svgIcon: getAssetPath("media/icons/duotune/general/gen014.svg"),
    //             fontIcon: "bi-calendar3-event",
    //         },
    //     ],
    // },
];

export default MainMenuConfig;
