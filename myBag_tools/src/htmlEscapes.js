//轉譯HTML字符
function htmlEscape(htmlStr) {
    return htmlStr.replace(/<|>|"|&/g, (match) => {
        switch (match) {
            case '<':
                
                return '&lt;'
        
            case '>':
            
                return '&gt;'
            
            case '"':
            
                return '&quot;'

            case '&':
            
                return '&amp;'
        
        }
    })
}

//還原HTML字符
function htmlUnescape(htmlStr) {
    return htmlStr.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
        switch (match) {
            case '&lt;':
                
                return '<'
        
            case '&gt;':
            
                return '>'
            
            case '&quot;':
            
                return '"'

            case '&amp;':
            
                return '&'
        
        }
    })
}

//向外共享
module.exports = {
    htmlEscape,
    htmlUnescape
}