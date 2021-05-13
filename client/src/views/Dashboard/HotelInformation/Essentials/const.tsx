import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Service',
    useCase:
      'The name of the essential and/or notable services that your hotel provides.',
    example: 'Shoe Shine Service',
  },
  {
    header: 'Details',
    useCase:
      'A brief description of the service. Please keep your description to one to two short sentences.',
    example:
      'Complimentary shoe shine service is available for our Orchid guests.',
  },
]

const ESSENTIALS_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Essentials - Need Some Help?',
  modalInfo: MODAL_INFO,
}

export default ESSENTIALS_MODAL_DETAILS
