import { RouteObject } from 'react-router-dom'
import Root from './Root'
import Profile from './Profile'
import PrivatePage from '@/components/PrivatePage'
import NewProperty from './NewProperty'
import PropertyDetails from './PropertyDetails'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Root />,
    },
    {
        path: '/profile',
        element: (
            <PrivatePage>
                <Profile />
            </PrivatePage>
        ),
    },
    {
        path: '/new-property',
        element: (
            <PrivatePage>
                <NewProperty />
            </PrivatePage>
        ),
    },
    {
        path: '/property/:propertyId',
        element: (
            <PrivatePage>
                <PropertyDetails/>
            </PrivatePage>
        ),
    },
]

export default routes
