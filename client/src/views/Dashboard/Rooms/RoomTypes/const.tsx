import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Room Type',
    useCase: 'The name of the Room Type that your hotel has.',
    example: 'Deluxe Room',
  },
  {
    header: 'Room Description',
    useCase:
      'A brief description of the key feature of the specified room type. Please keep the description to one or two short sentences as much as possible.',
    example:
      'Rejuvenate your senses in our stylish fully-refurbished Deluxe Room, which features a rain shower, a generous work space and extensive entertainment.',
  },
  {
    header: 'Image',
    useCase:
      'A single image showcasing how the room looks like, or the key features of the room.',
    example: 'NA',
  },
  {
    header: 'Guest Count',
    useCase:
      'The maximum number of guests allowed to occupy the room. If a count which includes children is applicable, you can use it. ',
    example: `Usual: 2 Adults
    If children count is applicable: 2 Adults + 1 Child`,
  },
  {
    header: 'Bed Configuration',
    useCase:
      'The types of beds available in the room. Please specify if there are multiple options, or if there are multiple different types of beds per room.',
    example: `Usual: Double
    Multiple options: Double/Two Twin 
    Multiple types: Queen + Twin`,
  },
  {
    header: 'Room Size (Sq Meters)',
    useCase:
      'The size of the entire room, in square meters. Please provide the number only.',
    example: '35',
  },
]

const ROOM_TYPES_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Room Types - Need Some Help?',
  modalInfo: MODAL_INFO,
}

export default ROOM_TYPES_MODAL_DETAILS
