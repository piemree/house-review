import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

export const imageToText = async (
    filePath: fs.PathLike,
    language: string = 'tur',
    OCREngine: '1' | '2' | '3' = '3',
): Promise<string> => {
    const formData = new FormData()
    formData.append('file', fs.createReadStream(filePath))
    formData.append('language', language)
    formData.append('OCREngine', OCREngine)
    const result = await axios.post(
        'https://api8.ocr.space/parse/image',
        formData,
        {
            headers: {
                Apikey: process.env.OCR_API_KEY,
            },
        },
    )
    return result.data?.ParsedResults[0]?.ParsedText
}
