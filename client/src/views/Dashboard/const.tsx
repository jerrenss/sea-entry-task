import FaceIcon from '@material-ui/icons/Face'
import InfoIcon from '@material-ui/icons/Info'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle'
import RoomServiceIcon from '@material-ui/icons/RoomService'
import HotelIcon from '@material-ui/icons/Hotel'
import PlaceIcon from '@material-ui/icons/Place'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import GroupIcon from '@material-ui/icons/Group'
import authenticationService from '../../services/authentication'
import PollIcon from '@material-ui/icons/Poll'

export const DASHBOARD_SECTIONS = [
  {
    title: 'Profile',
    url: '/profile',
    icon: <FaceIcon />,
    nestedItems: [],
  },
  {
    title: 'Hotel Information',
    url: '/hotel-information',
    icon: <InfoIcon />,
    nestedItems: [
      {
        title: 'General',
        url: '/general',
        icon: <InfoIcon />,
      },
      {
        title: 'Essentials',
        url: '/essentials',
        icon: <InfoIcon />,
      },
      {
        title: 'Hotel Amenities',
        url: '/hotel-amenities',
        icon: <InfoIcon />,
      },
      {
        title: 'Hotel Policies',
        url: '/hotel-policies',
        icon: <InfoIcon />,
      },
      {
        title: 'Contact Information',
        url: '/contact-information',
        icon: <InfoIcon />,
      },
    ],
  },
  {
    title: 'Rooms',
    url: '/rooms',
    icon: <HotelIcon />,
    nestedItems: [
      {
        title: 'Room Types',
        url: '/room-types',
        icon: <HotelIcon />,
      },
      {
        title: 'Room Amenities Description',
        url: '/room-amenities-description',
        icon: <HotelIcon />,
      },
      {
        title: 'Room Floor Plan',
        url: '/room-floor-plan',
        icon: <HotelIcon />,
      },
    ],
  },
  {
    title: 'MICE',
    url: '/mice',
    icon: <BusinessCenterIcon />,
    nestedItems: [
      {
        title: 'MICE Facilities',
        url: '/mice-facilities',
        icon: <BusinessCenterIcon />,
      },
      {
        title: 'Wedding Packages',
        url: '/wedding-packages',
        icon: <BusinessCenterIcon />,
      },
    ],
  },
  {
    title: 'F&B Information',
    url: '/food-and-beverages',
    icon: <RestaurantIcon />,
    nestedItems: [
      {
        title: 'Restaurants',
        url: '/restaurants',
        icon: <RestaurantIcon />,
      },
      {
        title: 'In-Room Dining',
        url: '/in-room-dining',
        icon: <RestaurantIcon />,
      },
    ],
  },
  {
    title: 'Housekeeping',
    url: '/housekeeping',
    icon: <RoomServiceIcon />,
    nestedItems: [],
  },
  {
    title: 'Nearby',
    url: '/nearby',
    icon: <PlaceIcon />,
    nestedItems: [
      {
        title: 'Nearby Amenities',
        url: '/nearby-amenities',
        icon: <PlaceIcon />,
      },
      {
        title: 'Nearby Food',
        url: '/nearby-food',
        icon: <PlaceIcon />,
      },
      {
        title: 'Nearby Attractions',
        url: '/nearby-attractions',
        icon: <PlaceIcon />,
      },
    ],
  },
  {
    title: 'Transport Information',
    url: '/transport-information',
    icon: <AirportShuttleIcon />,
    nestedItems: [],
  },
]

export const ADMIN_SECTIONS = [
  {
    id: '0',
    title: 'All Merchants',
    url: '/admin/all-merchants',
    icon: <GroupIcon />,
    nestedItems: [],
  },
  {
    id: '1',
    title: 'Add Merchant',
    url: '/admin/add-merchant',
    icon: <PersonAddIcon />,
    nestedItems: [],
  },
  {
    id: '2',
    title: 'Analytics',
    url: '/admin/analytics',
    icon: <PollIcon />,
    nestedItems: [],
  },
]

// export const VCPUserObjectID: string = '5f86f869a06e72c2c818b450'
export const VCPUserObjectID: string = authenticationService.getVCPUserObjectID()
