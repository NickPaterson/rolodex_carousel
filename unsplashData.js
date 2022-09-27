
// get 10 images from Unsplash API
const getImages = async (id, amount) => {
    const url = `https://api.unsplash.com/photos/random?client_id=${id}&count=${amount}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export default getImages