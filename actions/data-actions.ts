"use server"

import { CountryData, ShippingLocationData, ShippingMethodData, ShippingZoneData, TaxtData } from "@/types/woocommerce";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || "https://axessories.store/headless",
    consumerKey: process.env.WC_CONSUMER_KEY! as string,
    consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
    version: "wc/v3",
});

export const getCountries = async (): Promise<CountryData[]> => {
    try {
        const response = await WooCommerce.get("data/countries");
        return response.data;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}

export const getTaxes = async (): Promise<TaxtData[]> => {
    try {
        const response = await WooCommerce.get("taxes");
        return response.data;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}

export const getShippingData = async (
    country: string,
    state: string
  ): Promise<ShippingMethodData> => {
    try {
      // Fetch all shipping zones
      const response = await WooCommerce.get('shipping/zones');
      const shippingZones: ShippingZoneData[] = response.data;
  
      let matchingZone: ShippingZoneData | null = null;
  
      // Iterate over zones to find a match
      for (const zone of shippingZones) {
        if (zone.id === 0) continue; // Skip "Locations not covered" zone initially
  
        // Fetch locations for the current zone
        const zoneLocationsResponse = await WooCommerce.get(`shipping/zones/${zone.id}/locations`);
        const zoneLocations: ShippingLocationData[] = zoneLocationsResponse.data;
  
        // Check if any location in the zone matches the provided country and state
        const isMatch = zoneLocations.some((location) => {
          if (location.type === 'country' && location.code === country) {
            return true; // Match country-only zones
          }
          if (location.type === 'state' && location.code === `${country}:${state}`) {
            return true; // Match state (e.g., "BD:BD-54")
          }
          // Add city or postcode matching if needed
          return false;
        });
  
        if (isMatch) {
          matchingZone = zone;
          console.log(`Matched Zone: ${zone.name} (ID: ${zone.id})`);
          break;
        }
      }
  
      // If no matching zone, fall back to zone ID 0
      const targetZoneId = matchingZone ? matchingZone.id : 0;
      const zoneName = matchingZone ? matchingZone.name : 'Locations not covered';
  
      // Fetch shipping methods for the selected zone
      const shippingMethodsResponse = await WooCommerce.get(`shipping/zones/${targetZoneId}/methods`);
      const shippingMethods: ShippingMethodData[] = shippingMethodsResponse.data;
  
      // Filter enabled methods and return the first one
      const enabledMethods = shippingMethods.filter((method) => method.enabled);
      if (enabledMethods.length > 0) {
        console.log(`Shipping method for zone ${zoneName}:`, enabledMethods[0]);
        return enabledMethods[0];
      } else {
        throw new Error(`No enabled shipping methods available for zone ${zoneName}`);
      }
    } catch (error) {
      console.error('Error fetching shipping data:', error);
      throw new Error(`Failed to fetch shipping data: ${error}`);
    }
  };