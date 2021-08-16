import MarkdownIt from 'markdown-it'
//用来解析markdown的库，它能够将markdown代码编译为html代码

export function formateDate(date, fmt){
    date = parseInt(date)
    let newDate = new Date(date)
    if(/(y+)/.test(fmt)){ //y+ +表示至少有一个y .test(fmt)是否符合匹配
      fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
      //(date.getFullYear() + '') 将数字转化为字符串
      //substr截取substr（length）截取几位，若是substr（2），把前两位截掉
      //RegExp.$1 好像是第一个捕获组
    }
    let o = {
      'M+': newDate.getMonth() + 1,
      'd+': newDate.getDate(),
      'h+': newDate.getHours(),  //h是12小时制 H是24小时制
      //'H+': date.toLocaleString('chinese', { hour12: false }),
      'm+': newDate.getMinutes(),
      's+': newDate.getSeconds()
    };
    for(let item in o){
      if(new RegExp(`(${item})`).test(fmt)){//RegExp(`(${item})`) 相当于 (/（M+）/) (/（d+）/)..
        let str = o[item] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));//这里的RegExp.$1.length是指fmt里的那个格式的长度，不是str！
      }
    }
    return fmt;
  }
  
  function padLeftZero(str){//若不足两位，补上00 ，这里是对了2位的来写的，若传进来的str只有1位
                            //例如 传进来的是月份M 为1 则先补上00  即001 然后截掉str.length 即1 截掉第一位 就变成了 01
    return ('00' + str).substr(str.length);
  }

  export function changeToSummary(content,len){
    if(content !== null){
      let md = new MarkdownIt()
      content = md.render(content)//将md文本转换成html
      content = content.replace(/<.*?>/g, '')
                       .replace(/&lt;.*?/g, '<')
                       .replace(/&gt;.*?/g, '>')
                       .replace(/\s/g, '')
       if (content.length * 2 <= len) {
        return content
      }
      let strlen = 0
      let s = ''
      for(let i = 0; i < content.length; i++){
        s = s + content[i]
        if(content.charCodeAt(i) > 128){
          //文字
          strlen += 2
          if(strlen >= len){
            return s.substring(0, s.length - 1) + '...'
          }
        }
        else{
          strlen += 1
          if(strlen >= len){
            return s.substring(0, s.length - 2) + '...'
          }
        }
      }
      return s
    }
  }