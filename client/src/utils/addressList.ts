const endpoint = 'https://www.axasigorta.com.tr/api/dask/Adres'

const addressRequest = async (postfix: string, body: Object) => {
    const url = `${endpoint}/${postfix}`
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}

export const getCities = async () => {
    return await addressRequest('IlList', { Ulke_Kod: 'TÜR' })
}

export const getDistricts = async (cityCode: string) => {
    return await addressRequest('IlceList', {
        Ulke: {
            Ulke_Kod: 'TÜR',
        },
        Il: {
            Il_Kod: cityCode,
        },
    })
}

export const getVillages = async (districtCode: number) => {
    return await addressRequest('KoyList', {
        Kod: districtCode?.toString(),
    })
}

export const getNeighborhoods = async (villageCode: number) => {
    return await addressRequest('MahalleList', {
        Kod: villageCode?.toString(),
    })
}

export const getStreets = async (neighborhoodCode: number) => {
    return await addressRequest('SokakList', {
        MahalleKod: neighborhoodCode,
    })
}

export const getBuildings = async (streetCode: number) => {
    return await addressRequest('BinaListFromSokak', {
        CSBMKod: streetCode,
    })
}

export const getApartments = async (buildingCode: number) => {
    return await addressRequest('BinaBagimsizBolumList', {
        BinaKod: buildingCode,
    })
}
