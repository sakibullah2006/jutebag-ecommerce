"use server"

import { AttributesWithTermsType, AttributeTermType, CategorieType, CountryDataType, CurrencyType, ProductAttributeType, ProductBrandType, ShippingLocationDataType, ShippingMethodDataType, ShippingZoneDataType, TagType, TaxtDataType } from "@/types/data-type";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { error } from "console";

const WooCommerce = new WooCommerceRestApi({
    url: process.env.WORDPRESS_SITE_URL || "https://axessories.store/headless",
    consumerKey: process.env.WC_CONSUMER_KEY! as string,
    consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
    version: "wc/v3",
});

export const getCountries = async (): Promise<CountryDataType[]> => {
    try {
        const response = await WooCommerce.get("data/countries", {caches: true});
        return response.data;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}

export const getTaxes = async (): Promise<TaxtDataType[]> => {
    try {
        const response = await WooCommerce.get("taxes", {caches: true});
        return response.data;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}

export async function getShippingZones(): Promise<ShippingZoneDataType[]> {
  try {
    const zonesResponse = await WooCommerce.get('shipping/zones', {caches: true});
    const zones: ShippingZoneDataType[] = zonesResponse.data.filter((zone: ShippingZoneDataType) => zone.id !== 0); // Exclude "Locations not covered"

    const zonesWithMethods = await Promise.all(
      zones.map(async (zone) => {
        const methodsResponse = await WooCommerce.get(`shipping/zones/${zone.id}/methods`, {caches: true});
        const methods: ShippingMethodDataType[] = methodsResponse.data.filter((method: ShippingMethodDataType) => method.enabled);
        return {
          ...zone,
          methods,
          locations: (await WooCommerce.get(`shipping/zones/${zone.id}/locations`, {caches: true})).data,
        };
      })
    );

    // Include zone ID 0 as fallback
    const defaultZoneMethods = await WooCommerce.get('shipping/zones/0/methods',{caches: true});
    zonesWithMethods.push({
          id: 0,
          name: 'Locations not covered',
          methods: defaultZoneMethods.data.filter((method: ShippingMethodDataType) => method.enabled),
          locations: [],
          order: 0, // Add the missing 'order' property
        });

    return zonesWithMethods;
  } catch (error) {
    console.error('Error fetching shipping zones:', error);
    return [];
  }
}

export const getShippingData = async (
    country: string,
    state: string
  ): Promise<ShippingMethodDataType> => {
    try {
      // Fetch all shipping zones
      const response = await WooCommerce.get('shipping/zones', { caches: true });
      const shippingZones: ShippingZoneDataType[] = response.data;
  
      let matchingZone: ShippingZoneDataType | null = null;
  
      // Iterate over zones to find a match
      for (const zone of shippingZones) {
        if (zone.id === 0) continue; // Skip "Locations not covered" zone initially
  
        // Fetch locations for the current zone
        const zoneLocationsResponse = await WooCommerce.get(`shipping/zones/${zone.id}/locations`, { caches: true });
        const zoneLocations: ShippingLocationDataType[] = zoneLocationsResponse.data;
  
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
      const shippingMethodsResponse = await WooCommerce.get(`shipping/zones/${targetZoneId}/methods`, {caches: true});
      const shippingMethods: ShippingMethodDataType[] = shippingMethodsResponse.data;
  
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

  export const getAttributesWithTerms = async (): Promise<AttributesWithTermsType[]> => {
    try {
        const response = await WooCommerce.get('products/attributes', {caches: true});
        const attributes : ProductAttributeType[] = response.data;

        // Fetch terms for each attribute
        const attributesWithTerms: AttributesWithTermsType[] = await Promise.all(attributes.map(async (attribute) => {
            const terms: AttributeTermType[] = await WooCommerce.get(`products/attributes/${attribute.id}/terms`, {caches: true}).then(res => res.data);
            return {
                attribute: attribute,
                terms: terms,
            };
        }));

        return attributesWithTerms;
    } catch (error) {
        console.error("Error fetching attributes with terms:", error);
        return [];
    }
  }

  export const getProductCategories = async (): Promise<CategorieType[]> => {
    try {
        const response = await WooCommerce.get('products/categories', {caches: true});
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
  }

  export const getProductTags = async (): Promise<TagType[]> => {
    try {
        const response = await WooCommerce.get('products/tags', {caches: true});
        return response.data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
  }


  export const getCurrentCurrency = async (): Promise<CurrencyType> => {
    try {
        const response = await WooCommerce.get('data/currencies/current', {caches: true});
        return response.data;
    } catch (error) {
        console.error("Error fetching current currency:", error);
        throw new Error("Failed to fetch current currency");
    }
  }

export const getBrands =  async () : Promise<ProductBrandType[]> => {
  try {
    const brands =  await WooCommerce.get('products/brands', {caches: true})
    .then(response => response.data)
    
    return brands
  } catch (e) {
    console.error("Error fetching brands:", e);
    return [];    
  }  
}