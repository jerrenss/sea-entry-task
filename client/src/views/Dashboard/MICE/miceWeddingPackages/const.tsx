import { HeaderDescription, ModalDetails } from '../../../../types'

const MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Package Name',
    useCase: 'The name of the wedding package that your hotel provides.',
    example: 'Enchanted Dreams',
  },
  {
    header: 'Description',
    useCase:
      'A brief description of the main features that the wedding package offers. Please try to keep the description to 2 to 3 sentences as much as possible.',
    example:
      'Enchanted Dreams presents a whimsical atmosphere, decking out the main stage with fairy lights and using the combination of white and baby pink flowers against dark green foliage to give off an enchanting, dreamy vibe. ',
  },
  {
    header: 'Image',
    useCase:
      'A single image showcasing the main features and/or look of the wedding package offerings.',
    example: 'NA',
  },
  {
    header: 'Contact No.',
    useCase:
      'The phone number that guests should contact should they have any queries with regards to the specified wedding package. If a phone number is not applicable or unavailable, please put "NA" for this field.',
    example: '61234567',
  },
  {
    header: 'Email',
    useCase:
      'The email address that the guests should email should they have any queries with regards to the specified wedding package. If an email address is not applicable or unavailable, please put "NA" for this field.',
    example: 'enquiry@emaildomain.com',
  },
  {
    header: 'Information Link',
    useCase:
      'The link that guests can access if they wish to find out more details about the wedding package. If the link is not applicable, please put "NA" for this field.',
    example: 'https://www.wedding-package-info-link.com',
  },
  {
    header: 'Reservation Link',
    useCase:
      'The link that guests can access should they wish to reserve the wedding package. If no reservation is required for the specified wedding package, please put "NA" for this field.',
    example: 'https://www.wedding-package-reservation-link.com',
  },
]

const MICE_WEDDING_PACKAGES_MODAL_DETAILS: ModalDetails = {
  hasModal: true,
  modalButtonTitle: 'More Info',
  modalTitle: 'What are MICE Wedding Packages?',
  modalInfo: MODAL_INFO,
}

export default MICE_WEDDING_PACKAGES_MODAL_DETAILS
