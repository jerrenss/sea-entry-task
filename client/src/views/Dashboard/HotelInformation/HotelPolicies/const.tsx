import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Policy',
    useCase:
      'The name of the key operational and service policies that your hotel has.',
    example: 'Check In Time',
  },
  {
    header: 'Details',
    useCase:
      'A short description of the policy. Please enter your descriptions as short phrases or sentences as much as possible.',
    example: 'The minimum check in age is 18 years old.',
  },
]

const HOTEL_POLICIES_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Hotel Policies - Need Some Help?',
  modalInfo: MODAL_INFO,
}

export default HOTEL_POLICIES_MODAL_DETAILS
