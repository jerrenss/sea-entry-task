import { HeaderDescription, ModalDetails } from '../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'General Note',
    useCase:
      'Do note that all data entered into this table will highlight transport FROM the hotel TO the AIRPORT',
    example: 'NA',
  },
  {
    header: 'Mode',
    useCase: 'The mode of transport.',
    example: 'Bus',
  },
  {
    header: 'Category',
    useCase:
      'Whether the transport detailed is a public transport, or a private hire under the hotel.',
    example: 'Public',
  },
  {
    header: 'Estimated Travel Time',
    useCase:
      'The estimated time taken to travel from the hotel to the airport using this mode of transport.',
    example: '45 minutes',
  },
  {
    header: 'Details',
    useCase:
      'Instructions to guests and customers on how to go about using the specified mode of transport to get from the hotel to the airport.',
    example: 'Board from the bus stop right outside the hotel.',
  },
  {
    header: 'Cost',
    useCase:
      'The estimated total cost of the mode of transport from the hotel to the airport.',
    example: 'SGD $1.50 - $1.90',
  },
]

const TRANSPORT_INFORMATION_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Transport Information - Need Some Help?',
  modalInfo: MODAL_INFO,
}

export default TRANSPORT_INFORMATION_MODAL_DETAILS
