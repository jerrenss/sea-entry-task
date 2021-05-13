import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Name',
    useCase:
      'The name of the nearby amenity. Nearby amenities are amenities that are not located within the hotel premises or being handled by the hotel.',
    example: 'Tai Seng MRT',
  },
  {
    header: 'Category',
    useCase: 'The type of the amenity specified.',
    example: 'Train Station',
  },
  {
    header: 'Location Description',
    useCase:
      'A brief description about the key features and offerings of the nearby amenity.',
    example:
      'Train station that has a direct line to notable train stations such as Dhoby Gaut in town.',
  },
  {
    header: 'Google Maps Direction URL',
    useCase:
      'The Google Maps URL that is shown when a search is done on the location of the amenity. If such a URL is not applicable, please put "NA" for this field.',
    example:
      'https://www.google.com.sg/maps/place/Tai+Seng/@1.3358756,103.8855277,17z/data=!3m1!4b1!4m5!3m4!1s0x31da178d9df03bf1:0xa19895d8c3cde4dd!8m2!3d1.3358756!4d103.8877164',
  },
]

const NEARBY_AMENITIES_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Nearby Amenities - Need Some Help?',
  modalInfo: MODAL_INFO,
}

export default NEARBY_AMENITIES_MODAL_DETAILS
