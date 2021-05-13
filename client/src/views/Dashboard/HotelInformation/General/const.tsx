import { HeaderDescription } from '../../../../types'

const GENERAL_MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Hotel Name',
    useCase:
      'This public name of your hotel, that will be displayed to guests upon query.',
    example: 'Hotel Vouch',
  },
  {
    header: 'Hotel Address',
    useCase: 'The address of your hotel',
    example: '123 Orchard Road, Singapore 123456',
  },
  {
    header: 'Number of Rooms',
    useCase: 'The total number of rooms in the hotel.',
    example: '500',
  },
  {
    header: 'Current POS System',
    useCase: 'The name of the POS System that you are using in your hotel.',
    example: 'Revel Systems',
  },
]

export default GENERAL_MODAL_INFO
