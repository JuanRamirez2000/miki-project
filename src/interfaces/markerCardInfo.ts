export default interface markerCardInfo extends google.maps.MarkerOptions{
    locationName?: string,
    locationDescription?: string,
    locationAddress?: string,
    locationCoordinates?: google.maps.LatLngLiteral,
    locationThumbnail?: string,
    locationWebPageURL?: string
}