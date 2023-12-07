import React, { useEffect, useState } from 'react'
import {
    GoogleMap,
    Marker,
    OverlayView,
    useJsApiLoader,
} from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '700px',
}

const defaultCenter = {
    lat: 41.015137,
    lng: 28.97953,
}

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBp8ctG3RuXKTKJd-2A0esiTFWGtmJDbRo',
    })
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [markers, setMarkers] = useState<google.maps.Marker[] | null>(null)
    const [zoom, setZoom] = useState<number>(10)
    const [center, setCenter] =
        useState<google.maps.LatLngLiteral>(defaultCenter)

    const onLoad = (map: google.maps.Map) => {
        navigator.geolocation.getCurrentPosition((position) => {
            map.setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            })
        })
        setMap(map)
    }

    const onUnmount = () => {
        setMap(null)
    }

    const locationToToAddress = (lat: number, lng: number): Promise<string> => {
        return new Promise((resolve, reject) => {
            const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status !== 'OK') return reject(status)
                if (!Array.isArray(results)) return reject('No results found')
                return resolve(results[0].formatted_address)
            })
        })
    }
    const addressToLocation = (
        address: string,
    ): Promise<{ lat: number; lng: number }> => {
        return new Promise((resolve, reject) => {
            const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ address }, (results, status) => {
                if (status !== 'OK') return reject(status)
                if (!Array.isArray(results)) return reject('No results found')
                return resolve({
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                })
            })
        })
    }
    const onMapClick = async (e: any) => {
        setZoom(map?.getZoom()! + 1)
        setCenter(e.latLng.toJSON())

        const lat = e.latLng.lat() as number
        const lng = e.latLng.lng() as number
        const address = await locationToToAddress(lat, lng)

        const marker = new google.maps.Marker({
            position: { lat, lng },
        })
        // remove old markers and add new one
        setMarkers((markers) => {
            if (markers) {
                markers.forEach((marker) => marker.setMap(null))
            }
            return [marker]
        })
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            options={{
                minZoom: 5,
                zoom: zoom,
                maxZoom: 20,
                mapTypeControl: false,
                styles: [
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry',
                        stylers: [{ visibility: 'off' }],
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }],
                    },
                ],
            }}
            onClick={onMapClick}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {markers?.map((marker) => (
                <Marker
                    key={marker.getPosition()?.toJSON().lat}
                    position={marker.getPosition()!}
                    label={marker.getLabel()!}
                    onClick={() => setZoom(map?.getZoom()! + 1)}
                />
            ))}
            {/* {markers?.map((marker) => (
                <OverlayView
                    key={marker.getPosition()?.toJSON().lat}
                    position={marker.getPosition()!}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    zIndex={100}
                >
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                    >
                        {marker.getLabel()?.toString()}
                    </button>
                </OverlayView>
            ))} */}
        </GoogleMap>
    ) : (
        <></>
    )
}

export default React.memo(Map)
