export type Product = {

  quantity: number;
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description:string;
  rating:{
    rate:number;
    count:number;
  }
};

export type userType={
  email:string;
  id:string;
  name:string;
  username:string;
}