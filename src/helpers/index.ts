import md5 from 'crypto-js/md5'

export function getUtcDate() {
    const now = new Date()
    const year = now.getUTCFullYear()
    const month = String(now.getUTCMonth() + 1).padStart(2, '0')
    const day = String(now.getUTCDate()).padStart(2, '0')

    return `${year}${month}${day}` //NOTE - Формат 'yyyymmdd'
}

export function generateXAuthValue() {
    const timestamp = getUtcDate()
    return md5(`${process.env.API_PSWD}_${timestamp}`).toString() //NOTE - Значение к заголовку X-Auth
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 10) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages]
    }

    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
    }

    return [
        1,
        2,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages - 1,
        totalPages
    ]
}
