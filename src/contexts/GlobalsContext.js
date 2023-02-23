import { createContext, useContext } from "react"



export const GlobalsContext = createContext()

export const useGlobals = () => {
    return useContext(GlobalsContext)
}

export const GlobalsProvider = ({ children }) => {

    // const BASE_URL = `http://localhost:3000`

    // for production
    const BASE_URL = `http://${window.location.hostname}`

    const value = {
        BASE_URL
    }

    return (
        <GlobalsContext.Provider value={value}>
            {children}
        </GlobalsContext.Provider>
    )
}