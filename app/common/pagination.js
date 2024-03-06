module.exports = (totalItems) => (req, res, next) => {
    const pageAsNumber = Number.parseInt(req.query.page);

    let itemsPerPage = 4;
    let currentPage = 0;

    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        currentPage = pageAsNumber;
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;

    req.pagination = {
        currentPage,
        nextPage,
        previousPage,
        itemsPerPage,
        totalPages,
        totalItems
    }
    delete (req.query.page)

    next();
}
