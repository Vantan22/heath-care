import HTTP from "./axios-config.js";

export const getValueAPI = async (api) => {
    const response = await HTTP.get(api)
    return response
}
