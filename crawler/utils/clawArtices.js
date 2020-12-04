const cheerio = require('cheerio')
const http = require('./dbAxios')
const dbData = require('./dbDatas')
const DOTA_NEWS = exports.DOTA_NEWS = ['https://www.dota2.com.cn/news/gamenews/index.htm', 'https://www.dota2.com.cn/news/competition/index.htm', 'https://www.dota2.com.cn/news/gamepost/news_update/index.htm']
exports.getArtices = async function getArtices (articles, clawPagesNum) {
  function _articleKind (artcleKind) {
    switch (artcleKind) {
      case DOTA_NEWS[0]:
        return '官方新闻'
      case DOTA_NEWS[1]:
        return '赛事新闻'
      case DOTA_NEWS[2]:
        return '更新日志'
      default:
        break
    }
  }
  const Articlecategories = await dbData.getCategories()

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]

    for (let y = 0; y < clawPagesNum; y++) {
      try {
        const page = await http.get(article.replace(/index/g, `index${y + 1}`))
        const $ = cheerio.load(page.data)
        const list = $('.pane.active a')
        var categoryID
        console.log(_articleKind(article))
        switch (_articleKind(article)) {
          case '官方新闻':
            categoryID = Articlecategories.find(i => { return i.name === '官方新闻' })._id
            break
          case '赛事新闻':
            categoryID = Articlecategories.find(i => { return i.name === '赛事新闻' })._id
            break
          case '更新日志':
            categoryID = Articlecategories.find(i => { return i.name === '更新日志' })._id
            break
          default:
            break
        }
        list.each(async function (i, k) {
          try {
            const detailPage = await http.get($(this).attr('href'))
            const subTitle = $(this).children('.news_msg').children('.content').text()
            const logo = $(this).children('.news_logo').children('img').attr('src')
            const $1 = cheerio.load(detailPage.data, { decodeEntities: false })
            const title = $1('.news_main').children('.title').children('h1').text()

            const content = $1('.news_main').children('.content').html()
            const addtime = $1('.news_main').children('.title').children('h3').text().match(/\d{4}-\d{2}-\d{2}/)[0]

            const article = {
              title: title,
              subTitle,
              logo,
              body: content,
              categories: categoryID,
              addTime: new Date(addtime)

            }
            await dbData.postArticle(article)
          } catch (error) {
            console.log('detailPageErr', error, $(this).attr('href'))
          }
        })
      } catch (error) {
        console.log('pageErr', error)
      }
    }
  }
}
