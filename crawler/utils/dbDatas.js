const http = require('./dbAxios')

exports.getHero = async function getHero () {
  const res = await http.get('http://localhost:3000/admin/api/rest/heros')
  return res
}
exports.postArticle = async function getHero (article) {
  await http.post('http://localhost:3000/admin/api/rest/articles', article)
}
exports.getCategories = async function getCategories () {
  const res = await http.get('http://localhost:3000/admin/api/rest/categories')
  return res.data
}
