import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Venue Name',
    useCase: 'The name of the particular MICE Facility in the hotel.',
    example: 'Grand Ballroom 1',
  },
  {
    header: 'Category',
    useCase: 'The category that the MICE Facility falls under.',
    example: 'Ballroom',
  },
  {
    header: 'Image',
    useCase:
      'A single image showcasing the main view or features of the MICE Facility',
    example: 'NA',
  },
  {
    header: 'Location In Hotel',
    useCase:
      'The location of the MICE facility within the hotel. The unit number of the facility is preferred. If the unit number cannot be specified, please specify the floor on which the amenity can be accessed. If a block number/tower name is applicable, do include it as well.',
    example: 'South Tower, Level 2, #02-11',
  },
  {
    header: 'Maximum Capacity',
    useCase:
      'The maximum number of people the facility can accomodate at any one time, for any event.',
    example: '500',
  },
  {
    header: 'Contact No.',
    useCase:
      'The phone number that guests should contact should they have any queries with regards to the specified MICE facility. If a phone number is not applicable or unavailable, please put "NA" for this field.',
    example: '61234567',
  },
  {
    header: 'Email',
    useCase:
      'The email address that the guests should email should they have any queries with regards to the specified MICE facility. If an email address is not applicable or unavailable, please put "NA" for this field.',
    example: 'enquiry@emaildomain.com',
  },
  {
    header: 'Information Link',
    useCase:
      'The link that guests can access if they wish to find out more details about the MICE facility. If the link is not applicable, please put "NA" for this field.',
    example: 'https://www.mice-info-link.com',
  },
  {
    header: 'Reservation Link',
    useCase:
      'The link that guests can access should they wish to reserve the MICE facility. If no reservation is required for the specified MICE facility, please put "NA" for this field.',
    example: 'https://www.mice-reservation-link.com',
  },
]

const MICE_FACILITIES_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'What are MICE Facilities?',
  modalInfo: MODAL_INFO,
}

export default MICE_FACILITIES_MODAL_DETAILS
