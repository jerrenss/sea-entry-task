import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Name',
    useCase:
      'The name of the hotel amenity that your hotel has within its premises',
    example: 'Orchid Ballroom',
  },
  {
    header: 'Category',
    useCase:
      'The category under which the specified hotel amenity falls under.',
    example: 'Ballroom',
  },
  {
    header: 'Description',
    useCase:
      'A brief description of the features and services that the specified hotel amenity provides. Please try to keep your description to one or two short sentences.',
    example:
      'High ceilings and wide space measuring up to 1000sqm. Perfect for weddings or big events.',
  },
  {
    header: 'Fees',
    useCase:
      'Any payment that is required to book or enter the specified amenity. If the fees differ from hotel guests and regular guests, please specify them clearly.',
    example: 'Free for all hotel guests.',
  },
  {
    header: 'Opening Hours',
    useCase: 'The time period whereby the amenity is usable.',
    example: '0900-2015/9.00a.m. - 8.15p.m',
  },
  {
    header: 'Location',
    useCase:
      'The location of the amenity within the hotel. The unit number of the amenity is preferred. If the unit number cannot be specified, please specify the floor on which the amenity can be accessed. If a block number/tower name is applicable, do include it as well.',
    example: 'North Tower, Level 4, #04-01',
  },
  {
    header: 'Contact No.',
    useCase:
      'The phone number that guests should contact should they have any queries with regards to the specified amenity. If a phone number is not applicable or unavailable, please put "NA" for this field.',
    example: '61234567',
  },
  {
    header: 'Email',
    useCase:
      'The email address that the guests should email should they have any queries with regards to the specified amenity. If an email address is not applicable or unavailable, please put "NA" for this field.',
    example: 'enquiry@emaildomain.com',
  },
  {
    header: 'Reservation Link',
    useCase:
      'The link that guests can access should they wish to reserve the amenity. If no reservation is required for the specified amenity, please put "NA" for this field.',
    example: 'https://www.reservation-link.com',
  },
  {
    header: 'Attire',
    useCase:
      'The required dress code that guests have to be in to enter or use the amenity. If no specific attire is required, please put "NA" for this field.',
    example: 'Smart Casual',
  },
]

const HOTEL_AMENITIES_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Hotel Amenities - Need Some Help?',
  modalInfo: MODAL_INFO,
}

export default HOTEL_AMENITIES_MODAL_DETAILS
