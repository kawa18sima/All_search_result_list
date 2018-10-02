window.onload = function(){
  let url = document.getElementsByClassName('pn')[0].getAttribute('href');
  let addResult = document.getElementsByClassName('srg');
  let lastResult = addResult[addResult.length - 1].lastChild;

  searchUrl(url, lastResult);
}

function searchUrl(url, lastResult){
  let req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(req.status === 200){
      let doc = req.responseXML;
      let array = [];
      if(doc){
        let getDate = doc.getElementsByClassName('g');
        for(let i=0; i<getDate.length; i++){
          array.push(getDate[i]);
        }
        let nextUrl = doc.getElementsByClassName('pn');
        if(nextUrl.length > 1){
            array.concat(searchUrl(nextUrl[1].getAttribute('href'), lastResult));
        }
        array.forEach(ele => lastResult.appendChild(ele));
      }
    }
  };

  req.open('GET', `https://www.google.co.jp${url}`, true);
  req.responseType = "document";
  req.send();
}
