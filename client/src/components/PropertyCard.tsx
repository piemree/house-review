import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaHeartCircleCheck,
  FaHeartPulse,
  FaStar,
} from "react-icons/fa6";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import cx from "classnames";
import { trpc } from "@/utils/trpc";
import { Link } from "react-router-dom";

type PropertyCardProps = {
  propertyId: number;
  propertyImages: string[];
  xCoordinate: number;
  yCoordinate: number;
  avarageRating: number;
  isAddedToWishlist?: boolean;
  colSpan?: number;
  className?: string;
};

export default function PropertyCard({
  propertyId,
  propertyImages,
  xCoordinate,
  yCoordinate,
  avarageRating,
  isAddedToWishlist,
  className,
}: PropertyCardProps) {
  const addPropertyToWishlistMutation =
    trpc.addPropertyToWishlist.useMutation();
  const removePropertyFromWishlistMutation =
    trpc.removePropertyFromWishlist.useMutation();
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [isAdded, setIsAdded] = useState<boolean | undefined>(
    isAddedToWishlist
  );

  const addPropertyToWishlist = async (id: number) => {
    try {
      const isAdded = await addPropertyToWishlistMutation.mutateAsync({
        propertyId: id,
      });

      setIsAdded(isAdded.success);
    } catch (error) {
      console.log(error);
    }
  };
  const removePropertyFromWishlist = async (id: number) => {
    try {
      const isRemoved = await removePropertyFromWishlistMutation.mutateAsync({
        propertyId: id,
      });

      setIsAdded(!isRemoved.success);
    } catch (error) {
      console.log(error);
    }
  };

  const onWhishlistClick = () => {
    if (isAdded) {
      removePropertyFromWishlist(propertyId);
    } else {
      addPropertyToWishlist(propertyId);
    }
  };
  useEffect(() => {
    const getCountryAndCity = async () => {
      const data = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${xCoordinate},${yCoordinate}&key=AIzaSyBp8ctG3RuXKTKJd-2A0esiTFWGtmJDbRo`
      );
      const json = await data.json();
      const addressComponents = json.results[0].address_components;
      const country = addressComponents.find((component: any) =>
        component.types.includes("country")
      );

      const city = addressComponents.find((component: any) =>
        component.types.includes("administrative_area_level_1")
      );
      setCountry(country.long_name);
      setCity(city.long_name);
    };
    getCountryAndCity();
  }, []);
  return (
    <Link to={"/property/" + propertyId} className={" " + " " + className}>
      <Swiper
        className="rounded-lg relative"
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={1}
      >
        {propertyImages?.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} alt="property image" />
          </SwiperSlide>
        ))}
        <button
          onClick={onWhishlistClick}
          className="absolute top-2 right-2 text-2xl z-50"
        >
          <FaHeart
            className={cx(
              " hover:text-red-500 hover:opacity-100",
              { "text-red-500 opacity-100": isAdded },
              { "text-white opacity-30": !isAdded }
            )}
          />
        </button>
      </Swiper>
      <div className="mt-3 flex justify-between items-center">
        <p className="font-semibold">
          {country},{city}
        </p>
        <div className="flex items-center gap-2">
          <FaStar className="inline " />
          <span>{avarageRating}</span>
        </div>
      </div>
    </Link>
  );
}
