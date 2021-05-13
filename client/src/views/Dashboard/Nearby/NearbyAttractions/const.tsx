import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Name',
    useCase:
      'The name of the attraction that is located in a nearby vicinity to the hotel.',
    example: 'ArtScience Museum',
  },
  {
    header: 'Description',
    useCase:
      'A brief description highlighting the key details of the attraction. Please keep your descriptions to 2 to 3 short sentences as much as possible.',
    example:
      'ArtScience Museum is a museum within the integrated resort of Marina Bay Sands in the Downtown Core of the Central Area in Singapore',
  },
  {
    header: 'Image',
    useCase: 'An image capturing the key features of the attraction.',
    example: 'NA',
  },
  {
    header: 'Location',
    useCase: 'The address of the attraction.',
    example: '6 Bayfront Ave, Singapore 018974',
  },
  {
    header: 'Google Maps Direction URL',
    useCase:
      'The Google Maps URL that is shown when a search is done on the location of the attraction. If such a URL is not applicable, please put "NA" for this field.',
    example:
      'https://www.google.com.sg/maps/place/ArtScience+Museum/@1.2862738,103.8570776,17z/data=!3m2!4b1!5s0x31da19042d79a381:0xd2f04a200de57dc0!4m5!3m4!1s0x31da19042950679d:0x81c847e129eec549!8m2!3d1.2862738!4d103.8592663',
  },
  {
    header: 'Opening Hours',
    useCase:
      'The time period for which the atttraction will be open. If there are multiple time periods, do indicate them.',
    example: `Mon-Thu: 9:00 a.m - 10:00 p.m
    Fri, Sat, and PH: 11:00 a.m - 9.00 p.m
    Closed on Sundays`,
  },
  {
    header: 'Website',
    useCase:
      'The website of the attraction for customers to access should they want to find out more information on the attraction. If such a link is not applicable, please put "NA" for this field.',
    example: 'https://www.marinabaysands.com/museum.html',
  },
]

const NEARBY_ATTRACTIONS_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Nearby Attractions - Need Some Help?',
  modalInfo: MODAL_INFO,
}

export default NEARBY_ATTRACTIONS_MODAL_DETAILS
