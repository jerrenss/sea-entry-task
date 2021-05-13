import { HeaderDescription } from '../../../../types'

const IRD_MODAL_INFO: HeaderDescription[] = [
  {
    header: '--- Hours',
    useCase:
      'These hours will indicate to customers the time periods where the items from the corresponding menus will be available.',
    example: '0800-1130/8.00am - 11.30am/',
  },
  {
    header: '--- Menu',
    useCase:
      'This will be the digital file indicating what items are available for order during the set time period. Please upload the menus as a pdf file, if possible.',
    example: 'NA',
  },
  {
    header: 'Other Menu',
    useCase:
      'Any other menus that your hotel might have that are not covered in the above fields. If you have multiple, please upload the most pertinent one, and contact your Vouch liaison about any extra menus that you may have.',
    example: 'Pool Menu, Bar Menu',
  },
]

export default IRD_MODAL_INFO
