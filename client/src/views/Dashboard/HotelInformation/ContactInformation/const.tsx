import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Area Of Concern',
    useCase:
      'A specific issue or area of concern that customers might have and enquire about.',
    example: 'Room Upgrade',
  },
  {
    header: 'Contact Stakeholder',
    useCase:
      'The department or the main person-in-charge of handling the specified Area Of Concern.',
    example: 'Operations',
  },
  {
    header: 'Contact No.',
    useCase:
      'The phone number to contact the specified Contact Stakeholder. If a phone number is not applicable or unavailable, please put "NA" for this field.',
    example: '6111 1234',
  },
  {
    header: 'Email',
    useCase:
      'The email address to email the specified Contact Stakeholder. If an email address is not applicable or unavailable, please put "NA" for this field.',
    example: 'operations@emaildomain.com',
  },
  {
    header: 'Details',
    useCase:
      'A short description to be displayed to customers to guide them on actions to be taken and whom to contact, in the event that they have any enquiries in the specified area of concern. Please keep your description to one short sentence as much as possible.',
    example:
      'If you need more assistance, or asked about room upgrade, call us here at the this number 6111 1234 or reach us via email at operations@emaildomain.com',
  },
]

const CONTACT_INFORMATION_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'Contact Information - Need Some Help?',
  modalInfo: MODAL_INFO,
}

export default CONTACT_INFORMATION_MODAL_DETAILS
