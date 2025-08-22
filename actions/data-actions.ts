"use server"

import { AttributesWithTermsType, AttributeTermType, CategorieType, CountryDataType, CurrencyType, ProductAttributeType, ProductBrandType, ShippingLocationDataType, ShippingMethodDataType, ShippingZoneDataType, StoreConfig, TagType, TaxDataType, } from "@/types/data-type";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL as string,
  consumerKey: process.env.WC_CONSUMER_KEY! as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
  version: "wc/v3",
});

export const getCountries = async (): Promise<CountryDataType[]> => {
  try {
    const [storeSettings, allCountriesResponse] = await Promise.all([
      getStoreSettings(),
      WooCommerce.get("data/countries", { caches: true })
    ]);

    if (!storeSettings || !allCountriesResponse?.data) {
      console.error("Could not retrieve store settings or country list.");
      return [];
    }

    const shippingLocations = storeSettings.shippingLocations;
    const allCountries: CountryDataType[] = allCountriesResponse.data;

    if (shippingLocations.length === 0) {
      return [];
    }

    // 4. Filter the full country list to include only the allowed shipping locations
    const filteredCountries = allCountries.filter(country =>
      shippingLocations.includes(country.code)
    );

    return filteredCountries;

  } catch (error) {
    console.error("Error fetching filtered countries:", error);
    return [];
  }
}

export const getAllCountries = async (): Promise<CountryDataType[]> => {
  try {
    const response = await WooCommerce.get("data/countries", { caches: true });

    if (!response?.data) {
      console.error("Could not retrieve country list.");
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    return [];
  }
}

export const getTaxes = async (): Promise<TaxDataType[]> => {
  try {
    const response = await WooCommerce.get("taxes", { caches: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

export async function getShippingZones(): Promise<ShippingZoneDataType[]> {
  try {
    const zonesResponse = await WooCommerce.get('shipping/zones', { caches: true });
    const zones: ShippingZoneDataType[] = zonesResponse.data.filter((zone: ShippingZoneDataType) => zone.id !== 0); // Exclude "Locations not covered"

    const zonesWithMethods = await Promise.all(
      zones.map(async (zone) => {
        const methodsResponse = await WooCommerce.get(`shipping/zones/${zone.id}/methods`, { caches: true });
        const methods: ShippingMethodDataType[] = methodsResponse.data.filter((method: ShippingMethodDataType) => method.enabled);
        return {
          ...zone,
          methods,
          locations: (await WooCommerce.get(`shipping/zones/${zone.id}/locations`, { caches: true })).data,
        };
      })
    );

    // Include zone ID 0 as fallback
    const defaultZoneMethods = await WooCommerce.get('shipping/zones/0/methods', { caches: true });
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
    const shippingMethodsResponse = await WooCommerce.get(`shipping/zones/${targetZoneId}/methods`, { caches: true });
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
    let allAttributes: ProductAttributeType[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const response = await WooCommerce.get('products/attributes', {
        per_page: 100,
        page: page,
        caches: true
      });

      if (response.data && Array.isArray(response.data)) {
        allAttributes = allAttributes.concat(response.data);
      }

      if (page === 1 && response.headers && response.headers['x-wp-totalpages']) {
        totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
      }

      page++;
    } while (page <= totalPages);


    // Fetch terms for each attribute
    const attributesWithTerms: AttributesWithTermsType[] = await Promise.all(allAttributes.map(async (attribute) => {
      const terms: AttributeTermType[] = await WooCommerce.get(`products/attributes/${attribute.id}/terms`, { per_page: 100, caches: true }).then(res => res.data);
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
    let allCategories: CategorieType[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const response = await WooCommerce.get('products/categories', {
        per_page: 100,
        page: page,
        caches: true
      });

      if (response.data && Array.isArray(response.data)) {
        allCategories = allCategories.concat(response.data);
      }

      // Get total pages from headers on the first request
      if (page === 1 && response.headers && response.headers['x-wp-totalpages']) {
        totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
      }

      page++;
    } while (page <= totalPages);

    return allCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export const getProductTags = async (): Promise<TagType[]> => {
  try {
    let allTags: TagType[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const response = await WooCommerce.get('products/tags', {
        per_page: 100,
        page: page,
        caches: true
      });

      if (response.data && Array.isArray(response.data)) {
        allTags = allTags.concat(response.data);
      }

      // Get total pages from headers on the first request
      if (page === 1 && response.headers && response.headers['x-wp-totalpages']) {
        totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
      }

      page++;
    } while (page <= totalPages);

    return allTags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}


export const getCurrentCurrency = async (): Promise<CurrencyType> => {
  try {
    const response = await WooCommerce.get('data/currencies/current', { caches: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching current currency:", error);
    throw new Error("Failed to fetch current currency");
  }
}

export const getBrands = async (): Promise<ProductBrandType[]> => {
  try {
    const brands = await WooCommerce.get('products/brands', { caches: true })
      .then(response => response.data)

    return brands
  } catch (e) {
    console.error("Error fetching brands:", e);
    return [];
  }
}

export const getStoreSettings = async (): Promise<StoreConfig | null> => {
  try {
    const { data: settings } = await WooCommerce.get("settings/general", { caches: true });

    if (!settings || !Array.isArray(settings)) {
      throw new Error("Invalid settings format received from API.");
    }

    // Helper to find a setting's value by its ID
    const findSettingValue = (id: string, defaultValue: string | string[] = '') => {
      const setting = settings.find((s) => s.id === id);
      return setting ? setting.value : defaultValue;
    };

    // Find the currency symbol from the options list
    const currencyCode = findSettingValue('woocommerce_currency');
    const currencyOptions = settings.find(s => s.id === 'woocommerce_currency')?.options || {};
    const currencyString = currencyOptions[currencyCode] || '';
    // Extract symbol from string like "United States (US) dollar (&#36;) — USD"
    const symbolMatch = currencyString.match(/\(([^)]+)\)/);
    const currencySymbol = symbolMatch ? symbolMatch[1].replace(/&#x20b9;/g, '₹').replace(/&[a-z]+;/g, '') : '$';

    const organizedSettings: StoreConfig = {
      address: {
        address1: findSettingValue('woocommerce_store_address'),
        address2: findSettingValue('woocommerce_store_address_2'),
        city: findSettingValue('woocommerce_store_city'),
        postcode: findSettingValue('woocommerce_store_postcode'),
        countryState: findSettingValue('woocommerce_default_country'),
        countryCode: String(findSettingValue('woocommerce_default_country')).split(':')[0],
      },
      currency: currencyCode,
      currencySymbol: currencySymbol,
      currencyPosition: findSettingValue('woocommerce_currency_pos'),
      thousandSeparator: findSettingValue('woocommerce_price_thousand_sep'),
      decimalSeparator: findSettingValue('woocommerce_price_decimal_sep'),
      numberOfDecimals: parseInt(findSettingValue('woocommerce_price_num_decimals', '2'), 10),
      isTaxesEnabled: findSettingValue('woocommerce_calc_taxes') === 'yes',
      areCouponsEnabled: findSettingValue('woocommerce_enable_coupons') === 'yes',
      sellingLocations: findSettingValue('woocommerce_specific_allowed_countries', []),
      shippingLocations: findSettingValue('woocommerce_specific_ship_to_countries', []),
    };

    return organizedSettings;

  } catch (error) {
    console.error("Error fetching store settings:", error);
    return null;
  }
};