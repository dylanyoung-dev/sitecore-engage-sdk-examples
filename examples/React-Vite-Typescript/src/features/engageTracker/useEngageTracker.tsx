import { ICustomEventInput, IPageViewEventInput, IPersonalizerInput } from '@sitecore/engage';
import { INestedObject } from '@sitecore/engage/types/lib/utils/flatten-object';
import { useContext } from 'react';
import { EngageTrackerContext } from './EngageProvider';

/**
 * Custom hook for tracking page views, events, and running personalization flows using Sitecore Engage.
 * @returns An object containing the context, TrackPageView function, and TrackEvent function.
 */
export const useEngageTracker = () => {
    const context = useContext(EngageTrackerContext);
    const { configuration } = context;

    /**
     * Tracks a page view event.
     * @param pageSlug - The slug of the page being viewed.
     * @param extensionData - Additional data to be included with the event.
     */
    const TrackPageView = async (pageSlug: string, extensionData: INestedObject | undefined) => {
        if (!context.isTrackerEnabled) return;

        if (!context.engageTracker) {
            console.log("Engage tracker is not initialized or you haven't wrapped your app with <EngageProvider>.");
            return;
        }

        const pageViewData: IPageViewEventInput = {
            channel: 'WEB',
            currency: 'USD',
            pointOfSale: configuration.SitecoreCdpPointOfSale,
            language: 'EN',
            page: pageSlug
        };

        await context.engageTracker.pageView(pageViewData, extensionData);
    };

    /**
     * Tracks a custom event.
     * @param eventName - The name of the custom event.
     * @param extensionData - Additional data to be included with the event.
     */
    const TrackEvent = async (eventName: string, extensionData?: INestedObject | undefined) => {
        if (!context.isTrackerEnabled) return;

        if (!context.engageTracker === undefined) {
            console.log('engageTracker is undefined');
            return;
        }

        const eventData: ICustomEventInput = {
            channel: 'WEB',
            currency: 'USD',
            pointOfSale: configuration.SitecoreCdpPointOfSale,
            language: 'EN'
        };

        await context.engageTracker?.event(eventName, eventData, extensionData);
    };

    /**
     * Runs a personalization flow.
     * @param friendlyId - The friendly ID of the personalization flow.
     * @param data - Additional data to be included with the personalization flow.
     * @returns A promise that resolves to the response of the personalization flow.
     */
    const RunPersonalizationFlow = async <T,>(friendlyId: string, data?: INestedObject | undefined): Promise<T | undefined> => {
        if (!context.isTrackerEnabled) return;

        if (!context.engageTracker === undefined) {
            console.log('engageTracker is undefined');
            return;
        }

        const personalizationData: IPersonalizerInput = {
            channel: 'WEB',
            currency: 'USD',
            friendlyId,
            pointOfSale: configuration.SitecoreCdpPointOfSale
        };

        if (data) {
            personalizationData.params = data;
        }

        const response = await context.engageTracker?.personalize(personalizationData, 10000);

        return response as T;
    };

    return { context, TrackPageView, TrackEvent, RunPersonalizationFlow };
};