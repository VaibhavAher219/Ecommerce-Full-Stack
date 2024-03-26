class ApiFeatures {
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }
    search(){
        const keyword = this.querystr.keyword ? {
            name : {
                $regex:this.querystr.keyword,
                $options : 'i'
            },

        }:{}

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.querystr};
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);
        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resultPerPage){
        const currentpage = Number(this.querystr.page) || 1;
        const skip =resultPerPage * (currentpage-1)
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports= ApiFeatures