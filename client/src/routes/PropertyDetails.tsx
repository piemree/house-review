import Layout from '@/layouts'
import { trpc } from '@/utils/trpc'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useParams } from 'react-router-dom'

export default function PropertyDetails() {
    // get property id from url
    const { propertyId } = useParams<{ propertyId: string }>()
    const propData = trpc.getMyPropertyById.useQuery(propertyId || '')
    

    return (
        <Layout>
            <Swiper
                className="rounded-lg"
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                spaceBetween={10}
                slidesPerView={1}
            >
                {propData.data?.property?.propertyImages?.map((image) => (
                    <SwiperSlide key={image}>
                        <img src={image} alt="property image" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Layout>
    )
}
