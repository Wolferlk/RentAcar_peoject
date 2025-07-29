const slugify = require('slugify');



/// this is use to short url for frontend per page or vehicle or owner
/// will explain it later

function shortTitleforSlug(title) {
    if(title){
    const slug = slugify(title, { lower: true, strict: true });
    return `${slug}-${Date.now()}`;
    }

}

module.exports = { shortTitleforSlug }