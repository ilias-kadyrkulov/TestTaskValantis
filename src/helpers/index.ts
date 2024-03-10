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

export function generatePagination(
    currentPage: number,
    totalPages: number,
    windowWidth: number
) {
    let siblingCount = 1
    let boundaryCount = 1

    if (windowWidth > 1440) {
        siblingCount = 6
        boundaryCount = 6
    } else if (windowWidth > 925) {
        siblingCount = 4
        boundaryCount = 4
    } else if (windowWidth > 780) {
        siblingCount = 3
        boundaryCount = 3
    } else if (windowWidth > 550) {
        siblingCount = 2
        boundaryCount = 2
    } else if (windowWidth > 0) {
        siblingCount = 0
        boundaryCount =0
    }

    const totalPageNumbers = siblingCount * 2 + 5

    if (totalPages <= totalPageNumbers) {
        return range(1, totalPages)
    }

    const showLeftDots = currentPage > boundaryCount + siblingCount + 2
    const showRightDots =
        currentPage < totalPages - boundaryCount - siblingCount - 1

    const paginationRange: Array<number | string> = []

    paginationRange.push(1)
    if (showLeftDots) {
        paginationRange.push('...')
    }

    let startPage = showLeftDots ? currentPage - siblingCount : 2
    let endPage = showRightDots ? currentPage + siblingCount : totalPages - 1
    for (let i = startPage; i <= endPage; i++) {
        paginationRange.push(i)
    }

    if (showRightDots && currentPage + siblingCount + 1 < totalPages) {
        paginationRange.push('...')
    }
    if (currentPage + siblingCount + 1 !== totalPages || !showRightDots) {
        paginationRange.push(totalPages)
    }

    return paginationRange
}

function range(start: number, end: number) {
    let length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
}
