import { Engage, init } from '@sitecore/engage';
import { FC, createContext, useCallback, useEffect, useRef, useState } from 'react';
import { EngageConfiguration, IEngageConfiguration } from './Configuration';

export const EngageTrackerContext = createContext<EngageTrackerContextType>({} as EngageTrackerContextType);

export interface EngageTrackerContextType {
    engageTracker: Engage | undefined;
    configuration: IEngageConfiguration;
    isTrackerEnabled: boolean;
}

interface EngageProviderProps {
    children: React.ReactNode;
}

export const EngageProvider: FC<EngageProviderProps> = ({ children }) => {
    const [engageTracker, setEngageTracker] = useState<Engage | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const isTrackerEnabled = useRef<boolean>(true);

    const initEngageTracker = useCallback(async () => {
        setLoading(true);

        console.log('EngageConfiguration.SitecoreCdpClientKey: ', import.meta.env);

        if (!EngageConfiguration.SitecoreCdpClientKey || !EngageConfiguration.SitecoreCdpTargetUrl || !EngageConfiguration.SitecoreCdpPointOfSale) {
            isTrackerEnabled.current = false;
            console.log('Engage tracker is disabled because of missing configuration.');
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const initConfig: any = {
            clientKey: EngageConfiguration.SitecoreCdpClientKey,
            targetURL: EngageConfiguration.SitecoreCdpTargetUrl,
            pointOfSale: EngageConfiguration.SitecoreCdpPointOfSale,
            cookieExpiryDays: 365,
            forceServerCookieMode: false
            //webPersonalization: true,
        };

        if (EngageConfiguration.SitecoreCdpCookieDomain) {
            initConfig.cookieDomain = EngageConfiguration.SitecoreCdpCookieDomain;
        }

        if (isTrackerEnabled.current) {
            const engage = await init(initConfig);
            setEngageTracker(engage);
            setLoading(false);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        initEngageTracker();
    }, [initEngageTracker]);

    return (
        <EngageTrackerContext.Provider value={{ engageTracker, isTrackerEnabled: isTrackerEnabled.current, configuration: EngageConfiguration }}>
            {loading ? null : children}
        </EngageTrackerContext.Provider>
    );
};