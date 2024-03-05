export interface bloodbank{
    srNo: string;
  bloodbankname: string;
  state: string;
  city: string;
  address: string;
  pincode: number;
  contact: number;
  email: string;
  nodalofficer: string;
  operationalhours: string;
  latitude: number;
  longitude: number;
  bloodtypes: {
    A_p: number;
    B_p: number;
    AB_p: number;
    O_p: number;
    A_m: number;
    B_m: number;
    AB_m: number;
    O_m: number;
  };
  price: number;
}