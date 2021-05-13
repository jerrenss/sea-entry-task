import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Item',
    useCase: 'The name of the room amenity item',
    example: 'Nespresso Capsule Machine',
  },
  {
    header: 'Instructions',
    useCase: 'Instructions on how to use the specified item',
    example: `1. Turn on the machine. 
    2. Make coffee.`,
  },
  {
    header: 'Image',
    useCase: 'A single image of the room amenity',
    example: 'NA',
  },
]

const ROOM_AMENITIES_DESCRIPTION_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Room Amenities Description - Need Help?',
  modalInfo: MODAL_INFO,
}

export default ROOM_AMENITIES_DESCRIPTION_MODAL_DETAILS
