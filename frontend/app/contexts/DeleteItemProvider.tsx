import React, { createContext } from 'react'


interface DeleteContextType{
    invesetmentId: string
}
const DeleteItemProvider = () => {
    const context = createContext<DeleteContextType|undefined>(undefined)

}



export default DeleteItemProvider
