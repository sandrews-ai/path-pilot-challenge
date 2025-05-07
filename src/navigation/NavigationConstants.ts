export default class NavigationConstants {
    static drawerWidthOpen = 250;
    static drawerWidthClosed = 64;
    static sidebarWidth = 335;
    static maxChatWidth = 1120;

    static logoLeadingPaddingClosed = () => {
        const logoWidth = 22;
        const halfLogo = logoWidth / 2.0;
        const halfDrawer = this.drawerWidthClosed / 2.0;
        return `${halfDrawer - halfLogo}px`;
    }
}