class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const reqQuery = this.queryString;
    const exculdedFields = ['page', 'sort', 'limit', ' fields'];
    exculdedFields.forEach((field) => delete reqQuery[field]);
    let queryString = JSON.stringify(reqQuery);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  sort(defaultSort) {
    let sortBy;
    if (this.queryString.sort)
      sortBy = this.queryString.sort.split(',').join(' ');
    else sortBy = defaultSort;
    this.query = this.query.sort(sortBy);
    return this;
  }
  select(defaultSelect) {
    let selectedFields;
    if (this.queryString.fields)
      selectedFields = this.queryString.fields.split(',').join(' ');
    else selectedFields = defaultSelect;
    this.query = this.query.select(selectedFields);
    return this;
  }
  paginate(defaultPagination) {
    const pagination = {
      page: this.queryString.page ?? defaultPagination.page,
      pageSize: this.queryString.pageSize ?? defaultPagination.pageSize,
    };

    this.query = this.query
      .skip((pagination.page - 1) * pagination.pageSize)
      .limit(pagination.pageSize);
    return this;
  }
}
module.exports = APIFeatures;
