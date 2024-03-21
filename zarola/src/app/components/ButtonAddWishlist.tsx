'use client'

import { ObjectId } from "mongodb"
import { handleAddWishlist } from "../products/action"

export default function ButtonAddWishlist({prod}: {prod: ObjectId}) {
    // console.log(prod, 'ini prod');
    
    return (
        <>
              <button onClick={() => handleAddWishlist(prod)} className="bg-gray-400 text-black py-2 px-4 mt-4 rounded-md hover:bg-gray-200 w-full">Add to Wishlist</button>
        
        </>
    )
}