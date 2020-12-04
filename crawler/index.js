const cheerio = require('cheerio')
const axios = require('axios')
const { getItemData } = require('./utils/getData')
const sizeof = require('object-sizeof')
const clawArticles = require('./utils/clawArtices')
axios.defaults.retry = 10
axios.defaults.retryDelay = 1000
const http = axios.create({ timeout: 10000, maxContentLength: Infinity })

http.interceptors.request.use(req => {
  req.headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFhMDZhMmQxODliMzY3NGRiYmI5OCIsImlhdCI6MTU5Njc1MzUwNH0.cVGuBl5a_7i_ORPxOMWkbYLbZrAl6qdWacO_N92PUBQ'

  return req
}, err => {
  console.log(err)
})

async function heroGpm () {
  const skill = ['all', 'pro', 'vh', 'h', 'n']
  const ladder = ['all', 'y', 'n']

  // 数据库英雄数据
  await http.get('http://localhost:3000/admin/api/rest/heros').then(async res => {
    console.log(res.data.length)
    for (let i = 0; i < res.data.length; i++) {
      if (res.data) {
        const gpm = {}

        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            gpm[skill[s]] = gpm[skill[s]] ? gpm[skill[s]] : gpm[skill[s]] = {}
            gpm[skill[s]][ladder[l]] = undefined
          }
        }
        const xpm = {}
        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            xpm[skill[s]] = xpm[skill[s]] ? xpm[skill[s]] : xpm[skill[s]] = {}
            xpm[skill[s]][ladder[l]] = undefined
          }
        }

        await _injectData(gpm, res.data[i], 'gpm')
        await _injectData(xpm, res.data[i], 'xpm')
        const heroId = res.data[i]._id // 获取单个英雄ID
        res.data[i].gpm = gpm
        res.data[i].xpm = xpm
        console.log(res.data[i])
        http.put('http://localhost:3000/admin/api/rest/heros/' + heroId, res.data[i])
      }
    }
  })

  async function _injectData (obj, heroData, token) {
    try {
      if (token === 'gpm') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/hero/gpm/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data// 英雄名称

                  if (heroName === heroData.name) {
                    const gpm = $(`tbody tr:nth-child(${z + 1}) td:nth-child(2) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const result = gpm ? gpm.data : '0'// 单个英雄胜率
                    let res = parseFloat(result)
                    if (isNaN(res)) res = 0
                    obj[skill[i]][ladder[y]] = res
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      } else if (token === 'xpm') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/hero/gpm/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data// 英雄名称
                  if (heroName === heroData.name) {
                    const xpm = $(`tbody tr:nth-child(${z + 1}) td:nth-child(3) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const result = xpm ? xpm.data : '0'// 单个英雄胜率
                    let res = parseFloat(result)
                    if (isNaN(res)) res = 0
                    obj[skill[i]][ladder[y]] = res
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      }
    } catch (err) {
      console.log('err', err)
    }
  }
}
async function heroKda () {
  const skill = ['all', 'pro', 'vh', 'h', 'n']
  const ladder = ['all', 'y', 'n']

  // 数据库英雄数据
  await http.get('http://localhost:3000/admin/api/rest/heros').then(async res => {
    console.log(res.data.length)
    for (let i = 0; i < res.data.length; i++) {
      if (res.data) {
        const kda = {}

        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            kda[skill[s]] = kda[skill[s]] ? kda[skill[s]] : kda[skill[s]] = {}
            kda[skill[s]][ladder[l]] = undefined
          }
        }

        await _injectData(kda, res.data[i], 'kda')

        const heroId = res.data[i]._id // 获取单个英雄ID
        res.data[i].kda = kda

        console.log(res.data[i])
        http.put('http://localhost:3000/admin/api/rest/heros/' + heroId, res.data[i])
      }
    }
  })

  async function _injectData (obj, heroData, token) {
    try {
      if (token === 'kda') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/hero/kda/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data// 英雄名称

                  if (heroName === heroData.name) {
                    const k = $(`tbody tr:nth-child(${z + 1}) td:nth-child(3) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const d = $(`tbody tr:nth-child(${z + 1}) td:nth-child(4) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const a = $(`tbody tr:nth-child(${z + 1}) td:nth-child(5) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const resultk = k ? k.data : '0'// 单个英雄胜率
                    const resultd = d ? d.data : '0'// 单个英雄胜率
                    const resulta = a ? a.data : '0'// 单个英雄胜率
                    let resk = parseFloat(resultk)
                    let resd = parseFloat(resultd)
                    let resa = parseFloat(resulta)
                    if (isNaN(resk)) resk = 0
                    if (isNaN(resd)) resd = 0
                    if (isNaN(resa)) resa = 0
                    const kda = {
                      k: resk,
                      d: resd,
                      a: resa

                    }
                    obj[skill[i]][ladder[y]] = kda
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      }
    } catch (err) {
      console.log('err', err)
    }
  }
}
async function heroCs () {
  const skill = ['all', 'pro', 'vh', 'h', 'n']
  const ladder = ['all', 'y', 'n']

  // 数据库英雄数据
  await http.get('http://localhost:3000/admin/api/rest/heros').then(async res => {
    console.log(res.data.length)
    for (let i = 0; i < res.data.length; i++) {
      if (res.data) {
        const cs = {}

        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            cs[skill[s]] = cs[skill[s]] ? cs[skill[s]] : cs[skill[s]] = {}
            cs[skill[s]][ladder[l]] = undefined
          }
        }

        await _injectData(cs, res.data[i], 'cs')

        const heroId = res.data[i]._id // 获取单个英雄ID
        res.data[i].cs = cs

        console.log(res.data[i])
        http.put('http://localhost:3000/admin/api/rest/heros/' + heroId, res.data[i])
      }
    }
  })

  async function _injectData (obj, heroData, token) {
    try {
      if (token === 'cs') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/hero/cs/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data// 英雄名称

                  if (heroName === heroData.name) {
                    const c = $(`tbody tr:nth-child(${z + 1}) td:nth-child(2) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const s = $(`tbody tr:nth-child(${z + 1}) td:nth-child(3) div:nth-child(1)`)[0].children[0]// 单个英雄胜率

                    const resultc = c ? c.data : '0'// 单个英雄胜率
                    const results = s ? s.data : '0'// 单个英雄胜率

                    let resc = parseFloat(resultc)
                    let ress = parseFloat(results)

                    if (isNaN(resc)) resc = 0
                    if (isNaN(ress)) ress = 0

                    const cs = {
                      c: resc,
                      s: ress

                    }
                    obj[skill[i]][ladder[y]] = cs
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      }
    } catch (err) {
      console.log('err', err)
    }
  }
}
async function heroDmg () {
  const skill = ['all', 'pro', 'vh', 'h', 'n']
  const ladder = ['all', 'y', 'n']

  // 数据库英雄数据
  await http.get('http://localhost:3000/admin/api/rest/heros').then(async res => {
    console.log(res.data.length)
    for (let i = 0; i < res.data.length; i++) {
      if (res.data) {
        const dmg = {}

        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            dmg[skill[s]] = dmg[skill[s]] ? dmg[skill[s]] : dmg[skill[s]] = {}
            dmg[skill[s]][ladder[l]] = undefined
          }
        }

        await _injectData(dmg, res.data[i], 'dmg')

        const heroId = res.data[i]._id // 获取单个英雄ID
        res.data[i].dmg = dmg

        console.log(res.data[i])
        http.put('http://localhost:3000/admin/api/rest/heros/' + heroId, res.data[i])
      }
    }
  })
  async function _injectData (obj, heroData, token) {
    try {
      if (token === 'dmg') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/hero/dmg/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data// 英雄名称

                  if (heroName === heroData.name) {
                    const d = $(`tbody tr:nth-child(${z + 1}) td:nth-child(2) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const h = $(`tbody tr:nth-child(${z + 1}) td:nth-child(3) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const bd = $(`tbody tr:nth-child(${z + 1}) td:nth-child(4) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const resultd = d ? d.data : '0'// 单个英雄胜率
                    const resulth = h ? h.data : '0'// 单个英雄胜率
                    const resultbd = bd ? bd.data : '0'// 单个英雄胜率
                    let resd = parseFloat(resultd)
                    let resh = parseFloat(resulth)
                    let resbd = parseFloat(resultbd)
                    if (isNaN(resd)) resd = 0
                    if (isNaN(resh)) resh = 0
                    if (isNaN(resbd)) resbd = 0

                    const dmg = {
                      d: resd,
                      h: resh,
                      bd: resbd

                    }
                    obj[skill[i]][ladder[y]] = dmg
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      }
    } catch (err) {
      console.log('err', err)
    }
  }
}
// 英雄胜率与使用率注册
async function heroRatePlayed () {
  const skill = ['all', 'pro', 'vh', 'h', 'n']
  const ladder = ['all', 'y', 'n']

  // 数据库英雄数据
  await http.get('http://localhost:3000/admin/api/rest/heros').then(async res => {
    for (let i = 0; i < res.data.length; i++) {
      if (res.data) {
        const rate = {}
        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            rate[skill[s]] = rate[skill[s]] ? rate[skill[s]] : rate[skill[s]] = {}
            rate[skill[s]][ladder[l]] = undefined
          }
        }
        const played = {}
        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            played[skill[s]] = played[skill[s]] ? played[skill[s]] : played[skill[s]] = {}
            played[skill[s]][ladder[l]] = undefined
          }
        }
        await _injectData(rate, res.data[i], 'rate')
        await _injectData(played, res.data[i], 'played')
        const heroId = res.data[i]._id // 获取单个英雄ID
        res.data[i].rate = rate
        res.data[i].played = played
        console.log(res.data[i])
        http.put('http://localhost:3000/admin/api/rest/heros/' + heroId, res.data[i])
      }
    }
  })

  async function _injectData (obj, heroData, token) {
    try {
      if (token === 'rate') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/hero/rate/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data// 英雄名称
                  if (heroName === heroData.name) {
                    const heroRate = $(`tbody tr:nth-child(${z + 1}) td:nth-child(2) div:nth-child(1)`)[0].children[0].data// 单个英雄胜率
                    let res = parseFloat(heroRate)
                    if (isNaN(res)) res = 0
                    obj[skill[i]][ladder[y]] = res
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      } else if (token === 'played') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/hero/rate/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data// 英雄名称
                  if (heroName === heroData.name) {
                    const heroPlayed = $(`tbody tr:nth-child(${z + 1}) td:nth-child(3) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const reslut = heroPlayed ? heroPlayed.data : '0'// 单个英雄胜率

                    let res = parseInt(reslut.split(',').join(''))
                    if (isNaN(res)) res = 0
                    obj[skill[i]][ladder[y]] = res
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      }
    } catch (err) {
      console.log('err', err)
    }
  }
}
// 英雄技能注册
async function heroReg () {
  await http.get('http://dotamax.com/hero/rate/').then(async res => {
    const $ = cheerio.load(res.data)
    const len = $('.hero-img-list').length
    for (let i = 0; i < len; i++) {
      const heroavatar = $(`tbody tr:nth-child(${i + 1}) .hero-img-list`).attr('src') // 英雄头像图片链接
      const heroName = $(`tbody tr:nth-child(${i + 1}) .hero-name-list`)[0].children[0].data// 英雄名称
      const heroDetailUrl = $(`tbody tr:nth-child(${i + 1})`).attr('onclick').match(/'\/.*'/g)[0].replace(/'/g, '')// 英雄详情页链接
      const result = { // 英雄设置参数(名称,技能)
        name: '',
        icon: '',
        scores: {
          difficult: 1,
          attack: 1,
          survive: 1,
          agile: 1
        },
        skills: null
      }
      await getItemData(result, heroavatar, heroName, http)
      const skillsList = []
      // 单个英雄技能图片、名称、以及描述的数据获取
      await http.get(heroDetailUrl, { baseURL: 'http://dotamax.com' }).then(async res => {
        const $ = cheerio.load(res.data)
        const skills = $("#accordion div[style='font-weight: bold;margin-left: 10px;margin-top:10px;width: 93%;height: 62px; line-height: 42px;font-size: 16px;font-weight: 500;']")
        for (let i = 0; i < skills.length; i++) {
          const skill = {}
          const skillIconUrl = 'http:' + $(skills[i].children[0]).attr('src')
          const skillName = skills[i].children[1].data.match(/[\u4e00-\u9fa5]+/g)[0]
          const descrition = $(skills[i]).next().text()
          await getItemData(skill, skillIconUrl, skillName, http)
          skill.descrition = descrition
          skillsList.push(skill)
        }
      }).catch(err => { console.log('ERR', err) })
      result.skills = skillsList
      http.post('http://localhost:3000/admin/api/rest/heros', result) // 最终上传数据
    }
  })
}
// 天赋注册
async function heroTalent () {
  await http.get('http://dotamax.com/hero/rate/').then(async res => {
    const $ = cheerio.load(res.data)
    const len = $('.hero-img-list').length
    for (let i = 0; i < len; i++) {
      const heroNames = $(`tbody tr:nth-child(${i + 1}) .hero-name-list`)[0].children[0].data
      const heroDetailUrl = $(`tbody tr:nth-child(${i + 1})`).attr('onclick').match(/'\/.*'/g)[0].replace(/'/g, '')// 英雄详情页链接
      const heroDatas = await http.get('http://localhost:3000/admin/api/rest/heros')

      const talent = []
      const heroData = heroDatas.data.filter(item => {
        return item.name === heroNames
      })

      await http.get(heroDetailUrl, { baseURL: 'http://dotamax.com' }).then(async res => {
        const $ = cheerio.load(res.data)
        const talentsl = $('.talent_self').children('.talent_text.talent_text_left')
        const talentsr = $('.talent_self').children('.talent_text.talent_text_right')

        for (let i = 0; i < 4; i++) {
          talent.push({
            l: talentsl[i].children[0].data,
            r: talentsr[i].children[0].data
          })
        }
      }).catch(err => { console.log('ERR', err) })
      if (!heroData[0]) { continue }
      heroData[0].talent = talent

      if (heroData[0]) {
        console.log(heroData[0]._id, heroData[0])
        http.put('http://localhost:3000/admin/api/rest/heros/' + heroData[0]._id, heroData[0]) // 最终上传数据
      }
    }
  })
}
// 装备信息注册
async function itemsReg () {
  await http.get('http://dotamax.com/item/').then(async res => {
    const $ = cheerio.load(res.data)
    const img = $('tr>td>.hero-img-list') // 装备图片链接
    const imgName = $('tr>td>.hero-name-list')// 装备名称
    for (let i = 0; i < img.length; i++) {
      const result = {}
      if ($(imgName[i]).parent().next().children('div:first-child')[0].children[0] && $(imgName[i]).parent().next().children('div:first-child')[0].children[0].data) {
        const src = $(img[i]).attr('src')
        await getItemData(result, src, imgName[i].children[0].data, http)
        http.post('http://localhost:3000/admin/api/rest/items', result) // 最终上传数据
      }
    }
  }).catch(err => {
    console.log('ERR', err)
  })
}

// 英雄关系注册
async function heroRel () {
  await http.get('http://dotamax.com/hero/rate/')

    .then(async res => {
      const $ = cheerio.load(res.data)
      const len = $('.hero-img-list').length
      const heroData = await http.get('http://localhost:3000/admin/api/rest/heros') // 数据库英雄数据
      const skill = ['all', 'pro', 'vh', 'h', 'n']
      const ladder = ['all', 'y', 'n']

      for (let i = 0; i < len; i++) { // 查询单个英雄的克制关系
        const OpponentsAndTeammates = {
          opp: {},

          team: {}
        }
        for (let i = 0; i < skill.length; i++) {
          OpponentsAndTeammates.opp[skill[i]] = {}
          OpponentsAndTeammates.team[skill[i]] = {}
          for (let y = 0; y < ladder.length; y++) {
            OpponentsAndTeammates.opp[skill[i]][ladder[y]] = []

            OpponentsAndTeammates.team[skill[i]][ladder[y]] = []
          }
        }
        const dbheroName = $(`tbody tr:nth-child(${i + 1}) .hero-name-list`)[0].children[0].data// 英雄名称
        const heroDetailUrl = $(`tbody tr:nth-child(${i + 1})`).attr('onclick').match(/'\/.*'/g)[0].replace(/'/g, '')// 英雄详情页链接
        var change = heroDetailUrl.split('/')
        change.splice(3, 0, 'match_up_anti')
        console.log(change)
        var newUrl = change.join('/')
        console.log(newUrl)
        // 15个赛制详情列表

        // 单个英雄15个赛制的敌对列表
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            try {
              // 不同分段
              const result = await http.get(`${newUrl}/?skill=${skill[i]}&ladder=${ladder[y]}`, { baseURL: 'http://dotamax.com' })
              const $ = cheerio.load(result.data)
              const heroNames = $('tbody tr .hero-name-list')
              const antiRates = $('tbody tr td:nth-child(2) div:nth-child(1)')
              const winRates = $('tbody tr td:nth-child(3) div:nth-child(1)')
              const playeds = $('tbody tr td:nth-child(4) div:nth-child(1)')

              // 单个分段中119个英雄数据

              for (let z = 0; z < heroNames.length; z++) {
                // console.log(heroNames[z].children[0].data, antiRates[z].children[0].data, winRates[z].children[0].data, playeds[z].children[0].data)
                const id = heroData.data.find(item => { return item.name === heroNames[z].children[0].data })._id
                const details = { hero: id, antiRate: antiRates[z].children[0].data, winRates: winRates[z].children[0].data, playeds: playeds[z].children[0].data }
                OpponentsAndTeammates.opp[skill[i]][ladder[y]].push(details)
              }
            } catch (err) {
              console.log('err', err)
            }
          }
        }
        var vchange = heroDetailUrl.split('/')
        vchange.splice(3, 0, 'match_up_comb')
        console.log(vchange)
        var vnewUrl = vchange.join('/')
        console.log(vnewUrl)
        // 单个英雄15个赛制的队友列表
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            try {
              // 不同分段
              const result = await http.get(`${vnewUrl}/?skill=${skill[i]}&ladder=${ladder[y]}`, { baseURL: 'http://dotamax.com' })
              const $ = cheerio.load(result.data)
              const heroNames = $('tbody tr .hero-name-list')
              const antiRates = $('tbody tr td:nth-child(2) div:nth-child(1)')
              const winRates = $('tbody tr td:nth-child(3) div:nth-child(1)')
              const playeds = $('tbody tr td:nth-child(4) div:nth-child(1)')
              // 单个英雄所有分段的每个敌对英雄数据
              for (let z = 0; z < heroNames.length; z++) {
                // console.log(heroNames[z].children[0].data, antiRates[z].children[0].data, winRates[z].children[0].data, playeds[z].children[0].data)
                const id = heroData.data.find(item => { return item.name === heroNames[z].children[0].data })._id
                const details = { hero: id, antiRate: antiRates[z].children[0].data, winRates: winRates[z].children[0].data, playeds: playeds[z].children[0].data }
                OpponentsAndTeammates.team[skill[i]][ladder[y]].push(details)
              }
            } catch (err) {
              console.log('err', err)
            }
          }
        }

        console.log(OpponentsAndTeammates)

        const updateData = heroData.data.find((v, i) => { return v.name === dbheroName })
        console.log(OpponentsAndTeammates.opp.all.all.length, OpponentsAndTeammates.team.all.all.length)
        updateData.OpponentsAndTeammates = OpponentsAndTeammates
        console.log(sizeof(updateData))
        require('fs').writeFile('./copy/.test.json', JSON.stringify(OpponentsAndTeammates), (data) => {
          var data = data
        })

        http.put('http://localhost:3000/admin/api/rest/heros/' + updateData._id, updateData)
      }
    })
}
// 装备推荐注册
async function itemrel () {
  await http.get('http://dotamax.com/hero/rate/')
    .then(async res => {
      const $ = cheerio.load(res.data)
      const len = $('.hero-img-list').length
      const heroData = await http.get('http://localhost:3000/admin/api/rest/heros') // 数据库英雄数据
      const itemData = await http.get('http://localhost:3000/admin/api/rest/items') // 数据库装备数据

      for (let i = 0; i < len; i++) { // 查询单个英雄的推荐出装
        const heroName = $(`tbody tr:nth-child(${i + 1}) .hero-name-list`)[0].children[0].data// 英雄名称
        const heroDetailUrl = $(`tbody tr:nth-child(${i + 1})`).attr('onclick').match(/'\/.*'/g)[0].replace(/'/g, '')// 英雄详情页链接
        console.log(heroName)
        try {
          const result = await http.get(heroDetailUrl, { baseURL: 'http://dotamax.com' })

          const $ = cheerio.load(result.data)
          const itemRels = $('.table.table-hover.table-striped.table-list')[0]// 单个英雄出装推荐列表
          const singleItem = $(itemRels).find('.hero-img-list').parent()
          const items = []
          for (let i = 0; i < singleItem.length; i++) {
            const itemName = $(singleItem[i]).text()
            const itemId = itemData.data.find((v, i) => {
              if (v.name.match(/[A-Za-z\u4e00-\u9fa5]+/g)[0] === itemName.match(/[A-Za-z\u4e00-\u9fa5]+/g)[0]) {
                return true
              }
            }
            )._id // 获取单个物品ID
            items.push(itemId)
          }

          const heroId = heroData.data.find((v, i) => v.name === heroName)._id // 获取单个英雄ID

          const updateData = heroData.data.find((v, i) => { return v.name === heroName })
          updateData.items = items

          http.put('http://localhost:3000/admin/api/rest/heros/' + heroId, updateData)
        } catch (err) {
          console.log('err', err)
        }
      }
    })
}
async function ItemRatePlayed () {
  const skill = ['all', 'pro', 'vh', 'h', 'n']
  const ladder = ['all', 'y', 'n']

  // 数据库英雄数据
  await http.get('http://localhost:3000/admin/api/rest/items').then(async res => {
    for (let i = 0; i < res.data.length; i++) {
      if (res.data) {
        // const rate = {}
        // for (let s = 0; s < skill.length; s++) {
        //   for (let l = 0; l < ladder.length; l++) {
        //     rate[skill[s]] = rate[skill[s]] ? rate[skill[s]] : rate[skill[s]] = {}
        //     rate[skill[s]][ladder[l]] = undefined
        //   }
        // }
        const played = {}
        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            played[skill[s]] = played[skill[s]] ? played[skill[s]] : played[skill[s]] = {}
            played[skill[s]][ladder[l]] = undefined
          }
        }
        // await _injectData(rate, res.data[i], 'rate')
        await _injectData(played, res.data[i], 'played')
        const heroId = res.data[i]._id // 获取单个英雄ID
        // res.data[i].rate = rate
        res.data[i].played = played
        console.log(res.data[i])
        http.put('http://localhost:3000/admin/api/rest/items/' + heroId, res.data[i])
      }
    }
  })

  async function _injectData (obj, heroData, token) {
    try {
      if (token === 'rate') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/item/rate/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0]
                    ? $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data : ''// 英雄名称
                  if (heroName === heroData.name) {
                    const heroRate = $(`tbody tr:nth-child(${z + 1}) td:nth-child(2) div:nth-child(1)`)[0].children[0].data// 单个英雄胜率
                    let res = parseFloat(heroRate)
                    if (isNaN(res)) res = 0
                    obj[skill[i]][ladder[y]] = res
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      } else if (token === 'played') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/item/rate/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0]
                    ? $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data : ''// 英雄名称
                  if (heroName === heroData.name) {
                    const heroPlayed = $(`tbody tr:nth-child(${z + 1}) td:nth-child(3) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const reslut = heroPlayed ? heroPlayed.data : '0'// 单个英雄胜率

                    let res = parseInt(reslut.split(',').join(''))
                    if (isNaN(res)) res = 0
                    obj[skill[i]][ladder[y]] = res
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      }
    } catch (err) {
      console.log('err', err)
    }
  }
}
async function ItemRatePlayedDetail () {
  await http.get('http://dotamax.com/item/rate')

    .then(async res => {
      console.log('a')
      const itemData = await http.get('http://localhost:3000/admin/api/rest/items') // 数据库英雄数据

      const $ = cheerio.load(res.data)
      const img = $('tr>td>.hero-img-list')
      const imgName = $('tr>td>.hero-name-list')

      for (let i = 0; i < img.length; i++) {
        if ($(imgName[i]).parent().next().children('div:first-child')[0].children[0] && $(imgName[i]).parent().next().children('div:first-child')[0].children[0].data !== '%') {
          // const src = $(img[i]).attr('src')
          const heroDetailUrl = $(`tbody tr:nth-child(${i + 1})`).attr('onclick').match(/'\/.*'/g)[0].replace(/'/g, '')// 英雄详情页链接
          console.log(heroDetailUrl)
          // 一个物品不同分段详情

          const singleItem = itemData.data.find(item => { return item.name === imgName.eq(i).text() })
          console.log(singleItem._id)

          await http.get(`${heroDetailUrl}`, { baseURL: 'http://dotamax.com' }).then(async res => {
            const $ = cheerio.load(res.data)
            const des = $('.items_txt').html()
            singleItem.description = des
            console.log(singleItem)
            const vali = {}
            vali.description = des
            console.log(typeof des)
            http.put('http://localhost:3000/admin/api/rest/items/' + singleItem._id, vali)
          })
        }
      }
    })
}
async function itemGpm () {
  const skill = ['all', 'pro', 'vh', 'h', 'n']
  const ladder = ['all', 'y', 'n']

  // 数据库英雄数据
  await http.get('http://localhost:3000/admin/api/rest/items').then(async res => {
    console.log(res.data.length)
    for (let i = 0; i < res.data.length; i++) {
      if (res.data) {
        const gpm = {}

        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            gpm[skill[s]] = gpm[skill[s]] ? gpm[skill[s]] : gpm[skill[s]] = {}
            gpm[skill[s]][ladder[l]] = undefined
          }
        }
        const xpm = {}
        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            xpm[skill[s]] = xpm[skill[s]] ? xpm[skill[s]] : xpm[skill[s]] = {}
            xpm[skill[s]][ladder[l]] = undefined
          }
        }

        await _injectData(gpm, res.data[i], 'gpm')
        await _injectData(xpm, res.data[i], 'xpm')
        const heroId = res.data[i]._id // 获取单个英雄ID
        res.data[i].gpm = gpm
        res.data[i].xpm = xpm
        console.log(res.data[i])
        http.put('http://localhost:3000/admin/api/rest/items/' + heroId, res.data[i])
      }
    }
  })

  async function _injectData (obj, heroData, token) {
    try {
      if (token === 'gpm') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/item/gpm/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0]
                    ? $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data : ''// 英雄名称
                  if (heroName === heroData.name) {
                    const gpm = $(`tbody tr:nth-child(${z + 1}) td:nth-child(2) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const result = gpm ? gpm.data : '0'// 单个英雄胜率
                    let res = parseFloat(result)
                    if (isNaN(res)) res = 0
                    obj[skill[i]][ladder[y]] = res
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      } else if (token === 'xpm') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/item/gpm/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0]
                    ? $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data : ''// 英雄名称
                  if (heroName === heroData.name) {
                    const xpm = $(`tbody tr:nth-child(${z + 1}) td:nth-child(3) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const result = xpm ? xpm.data : '0'// 单个英雄胜率
                    let res = parseFloat(result)
                    if (isNaN(res)) res = 0
                    obj[skill[i]][ladder[y]] = res
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      }
    } catch (err) {
      console.log('err', err)
    }
  }
}
async function itemKda () {
  const skill = ['all', 'pro', 'vh', 'h', 'n']
  const ladder = ['all', 'y', 'n']

  // 数据库英雄数据
  await http.get('http://localhost:3000/admin/api/rest/items').then(async res => {
    console.log(res.data.length)
    for (let i = 0; i < res.data.length; i++) {
      if (res.data) {
        const kda = {}

        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            kda[skill[s]] = kda[skill[s]] ? kda[skill[s]] : kda[skill[s]] = {}
            kda[skill[s]][ladder[l]] = undefined
          }
        }

        await _injectData(kda, res.data[i], 'kda')

        const heroId = res.data[i]._id // 获取单个英雄ID
        res.data[i].kda = kda

        console.log(res.data[i])
        http.put('http://localhost:3000/admin/api/rest/items/' + heroId, res.data[i])
      }
    }
  })

  async function _injectData (obj, heroData, token) {
    try {
      if (token === 'kda') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/item/kda/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0]
                    ? $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data : ''// 英雄名称
                  if (heroName === heroData.name) {
                    const k = $(`tbody tr:nth-child(${z + 1}) td:nth-child(3) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const d = $(`tbody tr:nth-child(${z + 1}) td:nth-child(4) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const a = $(`tbody tr:nth-child(${z + 1}) td:nth-child(5) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const resultk = k ? k.data : '0'// 单个英雄胜率
                    const resultd = d ? d.data : '0'// 单个英雄胜率
                    const resulta = a ? a.data : '0'// 单个英雄胜率
                    let resk = parseFloat(resultk)
                    let resd = parseFloat(resultd)
                    let resa = parseFloat(resulta)
                    if (isNaN(resk)) resk = 0
                    if (isNaN(resd)) resd = 0
                    if (isNaN(resa)) resa = 0
                    const kda = {
                      k: resk,
                      d: resd,
                      a: resa

                    }
                    obj[skill[i]][ladder[y]] = kda
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      }
    } catch (err) {
      console.log('err', err)
    }
  }
}
async function itemDmg () {
  const skill = ['all', 'pro', 'vh', 'h', 'n']
  const ladder = ['all', 'y', 'n']

  // 数据库英雄数据
  await http.get('http://localhost:3000/admin/api/rest/items').then(async res => {
    console.log(res.data.length)
    for (let i = 0; i < res.data.length; i++) {
      if (res.data) {
        const dmg = {}

        for (let s = 0; s < skill.length; s++) {
          for (let l = 0; l < ladder.length; l++) {
            dmg[skill[s]] = dmg[skill[s]] ? dmg[skill[s]] : dmg[skill[s]] = {}
            dmg[skill[s]][ladder[l]] = undefined
          }
        }

        await _injectData(dmg, res.data[i], 'dmg')

        const heroId = res.data[i]._id // 获取单个英雄ID
        res.data[i].dmg = dmg

        console.log(res.data[i])
        http.put('http://localhost:3000/admin/api/rest/items/' + heroId, res.data[i])
      }
    }
  })

  async function _injectData (obj, heroData, token) {
    try {
      if (token === 'dmg') {
        for (let i = 0; i < skill.length; i++) {
          for (let y = 0; y < ladder.length; y++) {
            await http.get(`http://dotamax.com/item/dmg/?skill=${skill[i]}&ladder=${ladder[y]}`)
              .then(async res => {
                const $ = cheerio.load(res.data)
                const len = $('.hero-img-list').length

                for (let z = 0; z < len; z++) { // 查询单个英雄的胜率
                  const heroName = $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0]
                    ? $(`tbody tr:nth-child(${z + 1}) .hero-name-list`)[0].children[0].data : ''// 英雄名称
                  if (heroName === heroData.name) {
                    const d = $(`tbody tr:nth-child(${z + 1}) td:nth-child(2) div:nth-child(1)`)[0].children[0]// 单个英雄胜率
                    const h = $(`tbody tr:nth-child(${z + 1}) td:nth-child(3) div:nth-child(1)`)[0].children[0]// 单个英雄胜率

                    const resultd = d ? d.data : '0'// 单个英雄胜率
                    const resulth = h ? h.data : '0'// 单个英雄胜率

                    let resd = parseFloat(resultd)
                    let resh = parseFloat(resulth)

                    if (isNaN(resd)) resd = 0
                    if (isNaN(resh)) resh = 0

                    const dmg = {
                      d: resd,
                      h: resh

                    }
                    obj[skill[i]][ladder[y]] = dmg
                    console.log(obj, heroName)
                  }
                }
              })
          }
        }
      }
    } catch (err) {
      console.log('err', err)
    }
  }
}
// 修改英雄技能描述
async function updateHeroReg () {
  try {
    const res = await http.get('http://localhost:3000/admin/api/rest/heros')
    var heroDatas = res.data
  } catch (error) {
    console.log('err')
  }

  await http.get('http://dotamax.com/hero/rate/').then(async res => {
    const $ = cheerio.load(res.data)
    const len = $('.hero-img-list').length
    for (let i = 0; i < len; i++) {
      const heroName = $(`tbody tr:nth-child(${i + 1}) .hero-name-list`)[0].children[0].data// 英雄名称
      const singelHero = heroDatas.find(item => { return item.name === heroName })
      const heroDetailUrl = $(`tbody tr:nth-child(${i + 1})`).attr('onclick').match(/'\/.*'/g)[0].replace(/'/g, '')// 英雄详情页链接
      console.log(heroDetailUrl)
      // 单个英雄技能图片、名称、以及描述的数据获取
      await http.get(heroDetailUrl, { baseURL: 'http://dotamax.com' }).then(async res => {
        const $ = cheerio.load(res.data)
        const skill = singelHero.skills
        const skills = $("#accordion div[style='font-weight: bold;margin-left: 10px;margin-top:10px;width: 93%;height: 62px; line-height: 42px;font-size: 16px;font-weight: 500;']")
        for (let i = 0; i < skills.length; i++) {
          const descrition = $(skills[i]).next().html()
          skill[i].descrition = descrition
        }
      }).catch(err => { console.log('ERR', err) })
      console.log(singelHero)
      http.put('http://localhost:3000/admin/api/rest/heros/' + singelHero._id, singelHero) // 最终上传数据
    }
  })
}
// 英雄加点
async function heroAddSkills () {
  await http.get('http://dotamax.com/hero/rate/').then(async res => {
    const $ = cheerio.load(res.data)
    const len = $('.hero-img-list').length
    for (let i = 0; i < len; i++) {
      const heroNames = $(`tbody tr:nth-child(${i + 1}) .hero-name-list`)[0].children[0].data
      const heroDetailUrl = $(`tbody tr:nth-child(${i + 1})`).attr('onclick').match(/'\/.*'/g)[0].replace(/'/g, '')// 英雄详情页链接
      const heroDatas = await http.get('http://localhost:3000/admin/api/rest/heros')

      const heroData = heroDatas.data.filter(item => {
        return item.name === heroNames
      })

      var change = heroDetailUrl.split('/')
      change.splice(3, 0, 'skills')
      var newUrl = change.join('/')

      const skill = ['all', 'pro', 'vh', 'h', 'n']
      const ladder = ['all', 'y', 'n']
      const addSkills = {}
      for (let s = 0; s < skill.length; s++) {
        for (let l = 0; l < ladder.length; l++) {
          addSkills[skill[s]] = addSkills[skill[s]] ? addSkills[skill[s]] : addSkills[skill[s]] = {}
          addSkills[skill[s]][ladder[l]] = undefined
        }
      }

      for (let i = 0; i < skill.length; i++) {
        for (let y = 0; y < ladder.length; y++) {
          await http.get(`${newUrl}?skill=${skill[i]}&ladder=${ladder[y]}`, { baseURL: 'http://dotamax.com' }).then(async res => {
            const $ = cheerio.load(res.data)
            const programme = $('.new-box .title-hori')
            // 当前分段的所有加点
            const subAdd = []
            for (let i = 0; i < programme.length; i++) {
              const details = programme.eq(i).children('span:nth-child(2)').text()
              const regx = details.match(/(\d)*\.(\d)*/g)
              const rate = parseFloat(regx[1])
              const utilization = parseFloat(regx[0])
              const addedLevel = []

              const tr = programme.eq(i).next('table').children('tbody').children('tr')
              for (let y = 0; y < tr.length; y++) {
                const res = tr.eq(y).children("td[style='text-align: center;width: 41px;padding:0;']")
                const perSkill = []
                if (y === (tr.length - 1)) {
                  const newR = tr.eq(y).children("td[style ='text-align: center;width: 41px;padding:0;position: relative;']")
                  const tnum = {}
                  for (let z = 0; z < newR.length; z++) {
                    const num = newR.eq(z).children('div:nth-child(1)').text()
                    const choose = newR.eq(z).children('div:nth-child(2)')
                    tnum[parseInt(num)] = choose.children('div').children('.talent_textColor').text()
                  }
                  perSkill.push(tnum)
                } else {
                  for (let z = 0; z < res.length; z++) {
                    perSkill.push(res.eq(z).text())
                  }
                }

                addedLevel.push(perSkill)
              }
              // 一套加点
              const addSkill = {
                rate,
                utilization,
                addedLevel
              }
              subAdd.push(addSkill)
            }
            addSkills[skill[i]][ladder[y]] = subAdd
          }).catch(err => { console.log('ERR', err) })
        }
      }

      heroData[0].addSkills = addSkills

      if (heroData[0]) {
        console.log(heroData[0]._id, heroData[0])
        http.put('http://localhost:3000/admin/api/rest/heros/' + heroData[0]._id, heroData[0]) // 最终上传数据
      }
    }
  })
}

const DOTA_NEWS = require('./utils/clawArtices').DOTA_NEWS
clawArticles.getArtices(DOTA_NEWS, 20)
