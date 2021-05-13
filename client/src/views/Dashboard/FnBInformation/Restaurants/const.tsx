import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Restaurant Name',
    useCase:
      'The name of the restaurant or F&B establishment that is located as part of the hotel.',
    example: 'V-Cafe',
  },
  {
    header: 'Description',
    useCase:
      'A brief description highlighting the key details of the restaurant or F&B establishment. Please keep your descriptions to 2 to 3 short sentences as much as possible.',
    example:
      'Be treated to a theatrical dining experience that features the authentic tastes of Singapore, the region and the Pacific Rim. Seven open kitchens create a feast for the senses, as master chefs create a range of delicious cuisines including Singaporean, Chinese, Malay, Indian and Japanese.',
  },
  {
    header: 'Image',
    useCase:
      'An image capturing the key features of the restaurant or F&B establishment.',
    example: 'NA',
  },
  {
    header: 'Cuisine',
    useCase:
      'The main cuisine that the restaurant or F&B establishment serves. If it offers multiple cuisines, please enter the most significant one.',
    example: 'Western',
  },
  {
    header: 'Location In Hotel',
    useCase:
      'The location of the restaurant or F&B establishment within the hotel. The unit number is preferred. If the unit number cannot be specified, please specify the floor on which the restaurant or F&B establishment can be accessed. If a block number/tower name is applicable, do include it as well.',
    example: 'Main Tower, Level 3, #03-51',
  },
  {
    header: 'In-House',
    useCase:
      'Indicate whether or not the restaurant or F&B establishment is owned by the hotel itself.',
    example: 'NA',
  },
  {
    header: 'Halal/Vegetarian/Ala-Carte/Buffet',
    useCase:
      'For each of these options, please indicate whether they are available or not.',
    example: 'NA',
  },
  {
    header: 'Opening Hours',
    useCase:
      'The time period for which the restaurant or F&B establishment will be open. If there are multiple time periods, do indicate them.',
    example: `Usual: 9:00 a.m - 10:00 p.m

    Multiple time slots: 
    Breakfast: 9:00 a.m - 11.30 a.m
    Lunch: 12.30 p.m - 5.00 p.m
    Dinner: 6.30 p.m - 10.30 p.m`,
  },
  {
    header: 'Contact No.',
    useCase:
      'The phone number that guests should contact should they have any queries with regards to the specified restaurant or F&B establishment. If a phone number is not applicable or unavailable, please put "NA" for this field.',
    example: '61234567',
  },
  {
    header: 'Email',
    useCase:
      'The email address that the guests should email should they have any queries with regards to the specified restaurant or F&B establishment. If an email address is not applicable or unavailable, please put "NA" for this field.',
    example: 'enquiry@emaildomain.com',
  },
  {
    header: 'Reservation Link',
    useCase:
      'The link that guests can access should they wish to reserve the restaurant or F&B establishment. If no reservation is required for the specified restaurant or F&B establishment, please put "NA" for this field.',
    example: 'https://www.reservation-link.com',
  },
  {
    header: 'Attire',
    useCase:
      'The required dress code that guests have to be in to enter or use the restaurant or F&B establishment. If no specific attire is required, please put "NA" for this field.',
    example: 'Smart Casual',
  },
]

const FNB_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Food and Beverages - Need Some Help?',
  modalInfo: MODAL_INFO,
}

export default FNB_MODAL_DETAILS
