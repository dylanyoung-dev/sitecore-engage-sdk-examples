import { FC, useEffect } from 'react';
import { useEngageTracker } from './useEngageTracker';
import { INestedObject } from '@sitecore/engage/types/lib/utils/flatten-object';

interface TrackPageViewProps {
    slug: string;
    children: React.ReactNode;
    extensionData?: INestedObject | undefined;
}

export const TrackPageView: FC<TrackPageViewProps> = (props) => {
    const engageTracker = useEngageTracker();

    useEffect(() => {
        if (engageTracker && engageTracker.context.isTrackerEnabled) {
            engageTracker.TrackPageView(props.slug, props.extensionData);
        }
    }, [engageTracker, engageTracker.context.isTrackerEnabled, props.slug, props.extensionData]);

    return <>{props.children}</>;
};