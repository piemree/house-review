import Map from "@/components/Map";
import { GlobalContext } from "@/context/globalContext";
import Layout from "@/layouts";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaMagnifyingGlass, FaTrash } from "react-icons/fa6";

import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import { getCities } from "@/utils/addressList";
import { trpc } from "@/utils/trpc";
import { useNavigate } from "react-router-dom";

const defaultCenter = {
  lat: 41.015137,
  lng: 28.97953,
};

export default function NewProperty() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBp8ctG3RuXKTKJd-2A0esiTFWGtmJDbRo",
  });
  const { setLoading, setErrorMessages, setTRPCErrors } =
    useContext(GlobalContext);
  const [images, setImages] = useState<string[]>([]);
  const [contractImages, setContractImages] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[] | null>(null);
  const [zoom, setZoom] = useState<number>(10);
  const [propertyAddress, setPropertyAddress] = useState<string>("");
  const [floorNumber, setFloorNumber] = useState<number | null>(null);
  const [flatNumber, setFlatNumber] = useState<number | null>(null);
  const [center, setCenter] =
    useState<google.maps.LatLngLiteral>(defaultCenter);
  const [propertyType, setPropertyType] = useState<string>("");
  const navigate = useNavigate();

  const onLoad = (map: google.maps.Map) => {
    navigator.geolocation.getCurrentPosition((position) => {
      map.setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const locationToToAddress = (lat: number, lng: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status !== "OK") return reject(status);
        if (!Array.isArray(results)) return reject("No results found");
        return resolve(results[0].formatted_address);
      });
    });
  };
  const addressToLocation = (
    address: string
  ): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status !== "OK") return reject(status);
        if (!Array.isArray(results)) return reject("No results found");
        return resolve({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
      });
    });
  };

  const uploadMultipleFiles = async (fileList: any) => {
    const fileListAsArray = Array.from(fileList);
    console.log(fileListAsArray);

    const requests = fileListAsArray.map((item: any) => {
      const formData = new FormData();
      formData.append("upload_preset", "pid9wfmg");
      formData.append("api_key", "912145598789372");
      formData.append("file", item);
      return fetch("https://api.cloudinary.com/v1_1/dwhyenvtu/image/upload", {
        method: "POST",
        body: formData,
      });
    });
    const responses = await Promise.all(requests);
    const results = await Promise.all(responses.map((res) => res.json()));
    return results.flatMap((r) => r.secure_url) as string[];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const urls = await uploadMultipleFiles(e.currentTarget?.files?.files);
    if (urls.length > 0) {
      setImages(urls);
      setStep(3);
    }
    setLoading(false);
  };

  const handlePreviews = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      console.log(urls);

      setImages(urls);
    }
  };

  const onMapClick = async (e: any) => {
    const lat = e.latLng.lat() as number;
    const lng = e.latLng.lng() as number;
    const address = await locationToToAddress(lat, lng);
    setPropertyAddress(address);
    console.log(lat, lng);

    const marker = new google.maps.Marker({
      position: { lat, lng },
    });
    // remove old markers and add new one
    setMarkers((markers) => {
      if (markers) {
        markers.forEach((marker) => marker.setMap(null));
      }
      return [marker];
    });
  };

  const onAddressSearchSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("onAddressSearchSumbit");

    const { lat, lng } = await addressToLocation(propertyAddress);
    const address = await locationToToAddress(lat, lng);
    if (!lat || !lng) return;
    setPropertyAddress(address);
    setCenter({ lat, lng });
    const marker = new google.maps.Marker({
      position: { lat, lng },
    });
    setMarkers((markers) => {
      if (markers) {
        markers.forEach((marker) => marker.setMap(null));
      }
      return [marker];
    });
  };
  const handleContractFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    const urls = await uploadMultipleFiles(e.currentTarget?.files?.files);
    if (urls.length > 0) {
      setContractImages(urls);
      setStep(5);
    }
    setLoading(false);
  };

  const handleContactPreviews = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      console.log(urls);

      setContractImages(urls);
    }
  };

  const onClickPropertyType = () => {
    console.log(propertyType);

    if (propertyType === "owner") {
      setStep(2);
    } else if (propertyType === "tenant") {
      setStep(2);
    }
  };

  const crearePropertyMutation = trpc.createProperty.useMutation();
  const finishPropertyUpload = async () => {
    setLoading(true);
    const errorMessages: string[] = [];
    if (propertyType !== "owner" && propertyType !== "tenant") {
      errorMessages.push("please select property type");
    }
    // if images not uploaded show error
    if (!images.length && images.length === 0) {
      errorMessages.push("please upload property images");
    }
    // if property address not selected show error
    if (!propertyAddress) {
      errorMessages.push("please select property address");
    }
    // if contract images not uploaded show error
    if (!contractImages.length && contractImages.length === 0) {
      errorMessages.push("please upload contract images");
    }
    if (errorMessages.length > 0) {
      setErrorMessages(errorMessages);
      return;
    }

    try {
      if (floorNumber === null || flatNumber === null) return;
      const data = await crearePropertyMutation.mutateAsync({
        address: propertyAddress,
        floorNumber,
        flatNumber,
        contractImages: contractImages,
        propertyImages: images,
        isOwner: propertyType === "owner",
        isTenant: propertyType === "tenant",
        xCoordinate: center.lat,
        yCoordinate: center.lng,
      });
      if (data.success) {
        setImages([]);
        setContractImages([]);
        setPropertyAddress("");
        setFloorNumber(null);
        setFlatNumber(null);
        setCenter(defaultCenter);
        setMarkers(null);
        setZoom(10);
        navigate(`/property/${data.propertyId}`);
      }
    } catch (error: any) {
      setTRPCErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {step === 1 && (
        <div className="flex flex-col gap-4  items-stretch justify-center pt-10 ">
          <h4 className="text-2xl font-semibold text-gray-700">
            Are you the owner of the property or the tenant of the property?
          </h4>
          <select
            className="p-5 font-semibold text-xl border-2 border-gray-300 rounded-lg "
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">select the type of property</option>
            <option value="owner">I am the owner of this property</option>
            <option value="tenant">I am the tenant of this property</option>
          </select>
          <button
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded block"
            onClick={onClickPropertyType}
            type="button"
          >
            <span>Next</span>
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-4 items-stretch justify-center pt-10">
          <button
            className="text-2xl font-semibold text-gray-700"
            onClick={() => setStep(1)}
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-semibold text-gray-700">
            Upload property images
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="file"
              name="files"
              accept="image/*"
              onChange={handlePreviews}
              multiple
            />
            <div className="grid grid-cols-12">
              {images.map((image, i) => (
                <div className="col-span-6" key={i}>
                  <img
                    src={image}
                    alt="property"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            <button
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded block"
              type="submit"
            >
              <span>Upload</span>
            </button>
          </form>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col gap-4 items-stretch justify-center pt-10">
          <button
            className="text-2xl font-semibold text-gray-700"
            onClick={() => setStep(2)}
          >
            <FaArrowLeft />
          </button>
          <h4 className="text-2xl font-semibold text-gray-700">
            Please select the address of the property from the map
          </h4>
          <form
            className="flex flex-col gap-4"
            onSubmit={onAddressSearchSumbit}
          >
            <div className="flex items-center border-2 rounded-lg px-5">
              <FaMagnifyingGlass />
              <input
                required
                type="text"
                placeholder="Address"
                className="w-full p-5 outline-none "
                // defaultValue={propertyAddress}
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <input
                required
                className="border-2 rounded-lg p-5"
                value={floorNumber ?? ""}
                onChange={(e) => setFloorNumber(+e.target.value)}
                placeholder="Floor"
                type="number"
              />
              <input
                required
                className="border-2 rounded-lg p-5"
                value={flatNumber ?? ""}
                onChange={(e) => setFlatNumber(+e.target.value)}
                placeholder="Flat"
                type="number"
              />
            </div>
            <button
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded block"
              type="submit"
            >
              <span>Search</span>
            </button>
          </form>
          {isLoaded && (
            <GoogleMap
              mapContainerClassName="map-container"
              center={center}
              zoom={zoom}
              onClick={onMapClick}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {markers?.map((marker) => (
                <Marker
                  key={marker.getPosition()?.toJSON().lat}
                  position={marker.getPosition()!}
                  label={marker.getLabel()!}
                />
              ))}
            </GoogleMap>
          )}
          <button
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded block"
            type="button"
            onClick={() => setStep(4)}
          >
            <span>Next</span>
          </button>
        </div>
      )}
      {step === 4 && (
        <div className="flex flex-col gap-4 items-stretch justify-center pt-10">
          <button
            className="text-2xl font-semibold text-gray-700"
            onClick={() => setStep(3)}
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-semibold text-gray-700">
            Select your contract images for the prove of ownership or tenancy
          </h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleContractFormSubmit}
          >
            <input
              multiple
              type="file"
              accept="image/*"
              name="files"
              onChange={handleContactPreviews}
            />

            <div className="grid grid-cols-12">
              {contractImages.map((image, i) => (
                <div className="col-span-6" key={i}>
                  <img src={image} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
            <button
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded block"
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
      )}
      {step === 5 && (
        <div className="flex flex-col gap-4 items-stretch justify-center pt-10">
          <button
            onClick={finishPropertyUpload}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded block"
            type="button"
          >
            Finish and Publish
          </button>
        </div>
      )}
    </Layout>
  );
}
