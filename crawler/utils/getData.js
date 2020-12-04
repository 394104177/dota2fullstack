var FormData = require('form-data')

module.exports = {

  getItemData: getItemData
}
function checkData (filedata, filename, http) { // 检测可读流资源完整性，完整时返回上传文件后的Url，缺失返回失败回调
  const formdata = new FormData()
  formdata.append('file', filedata, filename)
  filedata.resume()

  return new Promise((resolve, reject) => {
    filedata.on('end', async function endcb () {
      if (filedata.complete) {
        const contentype = formdata.getHeaders()['content-type']
        const imgRes = await http({
          method: 'post',
          url: 'http://localhost:3000/admin/api/upload',
          data: formdata,
          headers: {
            'content-type': contentype
          }
        })
        resolve(imgRes.data.url)
      } else if (filedata.complete === false) {
        reject(new Error('uncomplete'))
      }
    })
  })
}

async function getItemData (mouted, src, filename, http) { // 获得资源完整时的Url
  try {
    const result = await http.get(src, { responseType: 'stream' })
    const Url = await checkData(result.data, filename, http)
    mouted.name = filename
    mouted.icon = Url
  } catch (error) {
    if (error.message.includes('uncomplete')) {
      console.log('资源缺失1')
      return getItemData(mouted, src, filename, http)
    } else if (error.message.includes('timeout')) {
      console.log('链接超时')
      return getItemData(mouted, src, filename, http)
    } else {
      console.log('err', error)
    }
  }
}
