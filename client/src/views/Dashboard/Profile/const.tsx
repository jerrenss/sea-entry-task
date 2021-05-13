import { HeaderDescription } from '../../../types'

const PROFILE_MODAL_INFO: HeaderDescription[] = [
  {
    header: 'Chat Persona Name',
    useCase:
      'This name will be used for virtual character which responds to the queries of the customers.',
    example: 'Lola, Corie, Fiona, etc.',
  },
  {
    header: 'Chat Avatar',
    useCase:
      'This image will be used for the virtual character which responds to the queries of the customers.',
    example: 'NA',
  },
  {
    header: 'Hotel Logo',
    useCase: 'This image will be used as reference when necessary.',
    example: 'NA',
  },
  {
    header: 'Brand Template Primary',
    useCase:
      "The primary colour which is used in the design of the Hotel's Digital Concierge. Please use CSS Hex Codes to represent the colour.",
    example: '#FAFAFA',
  },
  {
    header: 'Brand Template Secondary',
    useCase:
      "The secondary colour which is used in the design of the Hotel's Digital Concierge. Please use CSS Hex Codes to represent the colour.",
    example: '#000000',
  },
]

export default PROFILE_MODAL_INFO
