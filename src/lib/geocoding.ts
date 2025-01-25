import { toast } from 'sonner';

const OPENCAGE_API_KEY = '9755a921f98e4eedbd76585e517814ca';

export interface GeocodingResult {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<GeocodingResult | null> {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();
    const components = data.results?.[0]?.components;

    if (!components) {
      return null;
    }

    return {
      street: components.road || '',
      city: components.city || components.town || '',
      state: components.state || '',
      postalCode: components.postcode || '',
      country: components.country || '',
    };
  } catch (error) {
    toast.error('Failed to get location details');
    return null;
  }
}

export async function getCurrentLocation(): Promise<GeolocationCoordinates | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => {
        toast.error('Unable to get your location');
        resolve(null);
      }
    );
  });
}
