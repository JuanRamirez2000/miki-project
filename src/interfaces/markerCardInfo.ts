export default interface markerCardInfo extends google.maps.MarkerOptions{
    locationName?: string,
    locationDescription?: string,
    locationAddress?: string,
    locationCoordinates?: google.maps.LatLngLiteral,
    locationThumbnailFile?: File,
    locationThumbnailURL?: string,
    activeLocationID?: string,
    map?: google.maps.Map
}