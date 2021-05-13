import { Dispatch } from 'react'

//Possible types of information contained in the table
export type IType =
  | 'string'
  | 'boolean'
  | 'numeric'
  | 'date'
  | 'datetime'
  | 'time'
  | 'currency'

export type IAlign = 'inherit' | 'left' | 'right' | 'center' | 'justify'

export type IRowAdd = 'first' | 'last'

export type ContentType = string | number | boolean

export interface ProfileFormProps {
  preLoadedData?: any
  photo?: any
}

export interface FormProps {
  preLoadedData?: any
  setContent?: Dispatch<any>
}

export interface TableData {
  content: Array<ContentType[]>
  headers: Array<HeaderComponents>
  user: string
  _id: string
}

export interface TableResponseData {
  amenity?: TableData
  facility?: TableData
  foodAndBeverage?: TableData
  hotelService?: TableData
  hotelPolicy?: TableData
  roomTypes?: TableData
  roomAmenitiesDescription?: TableData
  nearbyAmenity?: TableData
}

export interface HeaderComponents {
  title: string
  field: string
  type: IType
  align?: IAlign
  cellStyle?: Object
}

export interface HeaderDescription {
  header: string
  useCase: string
  example: string
}

export interface ModalDetails {
  hasModal: boolean
  modalButtonTitle?: string
  modalTitle?: string
  modalInfo?: HeaderDescription[]
}

export interface TableHeaders {
  profile?: string[]
  administration?: string[]
  amenities?: Array<HeaderComponents>
  hotelServices?: Array<HeaderComponents>
  hotelPolicies?: Array<HeaderComponents>
  roomTypes?: Array<HeaderComponents>
  facilities?: Array<HeaderComponents>
  nearbyAmenities?: Array<HeaderComponents>
  foodAndBeverages?: Array<HeaderComponents>
}

export interface Header {
  header: TableHeaders
}

export interface JWTResponse {
  token?: string
}

export interface FormDataField {
  title: string
  dataRef: string
}
