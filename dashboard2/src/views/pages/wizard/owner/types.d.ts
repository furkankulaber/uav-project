import { VForm } from "vuetify/lib/components"

export interface OwnerDetails {
  idendityNumber: string
  firstName: string
  lastName: string
  email: string
  phone: string
  emailTwo: string
  phoneTwo: string
}

export interface OwnerAddress {
 address: string
 country: string
 city: string
 district: string
 neighbourhood: string
 companyName: string
 taxAdministration: string
 taxNumber: string
 status: boolean
}


export interface OwnerData {
  ownerDetail: OwnerDetails,
  ownerAddress: OwnerAddress,
  ownerForm: VForm
}
