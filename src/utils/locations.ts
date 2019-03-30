// TODO: Add type declarations (interfaces?)

export const geoObjToArray = object => [object.lng, object.lat];

export const geoArrayToObj = coordinatesArray => ({
  lng: coordinatesArray[0],
  lat: coordinatesArray[1],
});

/**
 * Converts a location object with GeoJSON Point to an object that matches Location GraphQL Type
 * @param {Object} location
 * @returns {Object} GraphQL Location type with "lat" and "lng" attributes
 */
export const formatLocationOutput = location => ({
  address: location.address,
  ...geoArrayToObj(location.point.coordinates),
});

/**
 * Converts a location object "lat" and "lng" attributes to an object containing a GeoJSON Point
 * @param {Object} location
 * @returns {Object} GraphQL Location type with a GeoJSON point
 */
export const formatLocationInput = location => ({
  address: location.address,
  point: {
    type: 'Point',
    coordinates: geoObjToArray(location),
  },
});
