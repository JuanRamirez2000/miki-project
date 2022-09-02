export default interface MapProps extends google.maps.MapOptions {
    onClick?: (e: google.maps.MapMouseEvent) => void;
    children?: React.ReactNode
}