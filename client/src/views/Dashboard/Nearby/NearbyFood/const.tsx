import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Name',
    useCase:
      'The name of the F&B establishment that is located in a nearby vicinity to the hotel.',
    example: 'ASTONS Specialities @ The Cathay',
  },
  {
    header: 'Description',
    useCase:
      'A brief description highlighting the key details of the restaurant or F&B establishment. Please keep your descriptions to 2 to 3 short sentences as much as possible.',
    example:
      'Astons has a chic ambience and serves many Western delights such as steaks and salads. ',
  },
  {
    header: 'Image',
    useCase: 'An image capturing the key features of the F&B establishment.',
    example: 'NA',
  },
  {
    header: 'Cuisine',
    useCase:
      'The main cuisine that the F&B establishment serves. If it offers multiple cuisines, please enter the most significant one.',
    example: 'Western',
  },
  {
    header: 'Location',
    useCase: 'The address of the F&B establishment.',
    example: '2 Handy Road #04-03/04 The Cathay Building, 229233',
  },
  {
    header: 'Google Maps Direction URL',
    useCase:
      'The Google Maps URL that is shown when a search is done on the location of the F&B establishment. If such a URL is not applicable, please put "NA" for this field.',
    example:
      'https://www.google.com.sg/maps/place/ASTONS+Specialities+@+The+Cathay/@1.299503,103.845364,17z/data=!3m1!4b1!4m5!3m4!1s0x31da19bd213d070b:0x3fd39daad1cdc668!8m2!3d1.299503!4d103.8475527',
  },
  {
    header: 'Website',
    useCase:
      'The website of the F&B establishment for customers to access should they want to find out more information on the F&B establishment. If such a link is not applicable, please put "NA" for this field.',
    example: 'https://www.astons.com.sg',
  },
]

const NEARBY_FOOD_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Nearby Food - Need Some Help?',
  modalInfo: MODAL_INFO,
}

export default NEARBY_FOOD_MODAL_DETAILS
