import { fetchJson } from '$utils/ajax';
import type { StorageConfig } from 'storage-helpers';
import { getStorageItem, setStorageItem } from 'storage-helpers';

export interface ReverseGeocoding {
  readonly place_id: string;
  readonly licence: string;
  readonly osm_type: string;
  readonly osm_id: string;
  readonly lat: string;
  readonly lon: string;
  readonly place_rank: string;
  readonly category: string;
  readonly type: string;
  readonly importance: string;
  readonly addresstype: string;
  readonly display_name: string;
  readonly name: string;
  readonly address: Readonly<Record<string, string>>;
  readonly boundingbox: ReadonlyArray<string>;
}

interface ReverseGeoStoragePayload {
  readonly reverseGeo: ReverseGeocoding;
  createdAt: string;
}

function createReverseGeoStoragePayload(reverseGeo: ReverseGeocoding) {
  return {
    reverseGeo,
    createdAt: new Date().toISOString(),
  };
}

export function supportsGeolocation(): boolean {
  return (
    'geolocation' in window.navigator &&
    typeof window.navigator.geolocation.getCurrentPosition === 'function'
  );
}

export function getCurrentPos(): Promise<GeolocationPosition> {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!supportsGeolocation()) {
      reject(new Error('geolocation not supported'));
      return;
    }

    window.navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export enum GeolocationPositionErrorCodes {
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3,
}

function fetchReverseGeocoding(coords: Pick<GeolocationCoordinates, 'latitude' | 'longitude'>) {
  const apiUrl = new URL('https://nominatim.openstreetmap.org/reverse');

  apiUrl.searchParams.set('lat', coords.latitude + '');
  apiUrl.searchParams.set('lon', coords.longitude + '');
  apiUrl.searchParams.set('format', 'json');

  return fetchJson<ReverseGeocoding>(apiUrl.href);
}

const reverseGeoKey = 'reverse-geo';
const reverseGeoStaleAfterMs = 120_000;
const reverseGeoStorageConfig: Readonly<StorageConfig<ReverseGeoStoragePayload>> = {
  version: 'v1',
  namespace: 'geo',
};

export function requestReverseGeocoding(
  coords: Pick<GeolocationCoordinates, 'latitude' | 'longitude'>,
): Promise<ReverseGeocoding> {
  const value = getStorageItem<ReverseGeoStoragePayload>(reverseGeoKey, reverseGeoStorageConfig);

  if (value) {
    const isStoredReverseGeoFresh =
      Math.abs(Date.now() - new Date(value.createdAt).getTime()) <= reverseGeoStaleAfterMs;

    if (isStoredReverseGeoFresh) {
      return Promise.resolve(value.reverseGeo);
    }
  }

  const request = fetchReverseGeocoding(coords);

  request.then((reverseGeo) => {
    setStorageItem(
      reverseGeoKey,
      createReverseGeoStoragePayload(reverseGeo),
      reverseGeoStorageConfig,
    );
  });

  return request;
}
