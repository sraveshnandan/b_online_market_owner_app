/* This file only exports all types declarations. */



// interface for Image object 
interface Iimage {
    public_id: string,
    url: string
}

interface ITimeStamps {
    createdAt: string,
    updatedAt: string
}

// interface for category 
export interface ICategory extends ITimeStamps {
    _id: string
    name: string,
    icon: Iimage
}

// interface for Banner
export interface IBanners extends ITimeStamps {
    _id: string
    name: string,
    icon: Iimage
}

// interface for User
export interface IUser extends ITimeStamps {
    _id: string
    name: string,
    avatar: Iimage
}

// interface for Shop
export interface IShop extends ITimeStamps {
    _id: string
    name: string,
    banners: Iimage[]
}

// interface for Product
export interface IProduct extends ITimeStamps {
    _id: string
    name: string,
    banners: Iimage[]
}

// interface for Order
export interface IOrder extends ITimeStamps {
    _id: string
    name: string,
    banners: Iimage[]
}


