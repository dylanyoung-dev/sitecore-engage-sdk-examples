export interface IEngageConfiguration {
    SitecoreCdpClientKey: string;
    SitecoreCdpPointOfSale: string;
    SitecoreCdpCookieDomain?: string;
    SitecoreCdpTargetUrl: string;
}

export const EngageConfiguration: IEngageConfiguration = {
    SitecoreCdpClientKey: import.meta.env.VITE_SITECORE_CDP_CLIENT_KEY ?? '',
    SitecoreCdpPointOfSale: import.meta.env.VITE_SITECORE_CDP_POINT_OF_SALE ?? '',
    SitecoreCdpCookieDomain: import.meta.env.VITE_SITECORE_CDP_COOKIE_DOMAIN ?? '',
    SitecoreCdpTargetUrl: import.meta.env.VITE_SITECORE_CDP_TARGET_URL ?? ''
};