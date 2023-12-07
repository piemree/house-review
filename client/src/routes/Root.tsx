import { trpc } from "@/utils/trpc";
import Layout from "../layouts/index";
import PropertyCard from "@/components/PropertyCard";
export default function Root() {
  const propData = trpc.getAllPropertiesWithWishlist.useQuery();

  return (
    <Layout>
      <div className="grid grid-cols-12  gap-4 pt-5">
        {/* {propData.data?.properties?.map((property) => (
          <PropertyCard
            className="col-span-12 md:col-span-6 lg:col-span-4"
            key={property.id}
            propertyId={property.id}
            isAddedToWishlist={property.isAddedToWishlist}
            avarageRating={property.avarageRating}
            propertyImages={property.propertyImages}
            xCoordinate={property.xCoordinate}
            yCoordinate={property.yCoordinate}
          />
        ))} */}
        <iframe 
        width={1000}
        height={300}
        src="http://adres.nvi.gov.tr/VatandasIslemleri/AdresSorgu">
          <p>
            Tarayıcınız iframe öğesini desteklemiyor.
          </p>
        </iframe>
      </div>
    </Layout>
  );
}
