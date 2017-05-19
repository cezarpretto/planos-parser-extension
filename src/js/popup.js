const modifyDOM = () => {
  let body = window.frames['basefrm'].document.body
  // let input = body.querySelector('input[name="pagn"]')
  // input.setAttribute('type', 'file')
  let tables = Array.from(body.querySelectorAll('form center table'))
  tables = tables.filter((a, idx) => idx !== 0)
  let ultimoComprovante = ''
  let retorno = []

  const montaLinha = (tds) => {
    let destinatario = tds[9].innerText.split(' - ').filter((a, i) => i > 0).join(' - ')
    let remetente = tds[8].innerText.split(' - ').filter((a, i) => i > 0).join(' - ')
    let parsed = {
      nrComprovante: ultimoComprovante,
      tipoEmissao: tds[0].innerText,
      numeroNota: tds[1].innerText,
      serie: tds[3].innerText.replace(/\D/g, ''),
      dtEmissao: tds[4].innerText,
      modelo: tds[5].innerText.replace(/\,/g, '-'),
      cfop: tds[6].innerText,
      vlTotal: tds[7].innerText.replace(/\./g, '').replace(/\,/g, '.'),
      remetente: tds[8].innerText.split(' - ').filter((a, i) => i > 0).join(' - '),
      remetenteIe: tds[8].innerText.split(' - ')[0],
      destinatario: tds[9].innerText.split(' - ').filter((a, i) => i > 0).join(' - '),
      destinatarioIe: tds[9].innerText.split(' - ')[0]
    }
    return `${parsed.nrComprovante};${parsed.tipoEmissao};${parsed.numeroNota};${parsed.serie};${parsed.dtEmissao};${parsed.modelo};${parsed.cfop};${parsed.vlTotal};${parsed.remetente};${parsed.remetenteIe};${parsed.destinatario};${parsed.destinatarioIe}\n`
  }

  tables.forEach((table, idx) => {
    if(idx % 2 === 0) {
      ultimoComprovante = table.querySelector('input').value
    }else {
      let trs = Array.from(table.querySelectorAll('tr'))
      trs = trs.filter((tr, idx) => idx > 0 && idx < trs.length -2)
      trs = trs.map(tr => {
        let tds = tr.querySelectorAll('td')
        return montaLinha(tds)
      })
      retorno = retorno.concat(trs)
    }
  })
  return `nrComprovante;tipoEmissao;numeroNota;serie;dtEmissao;modelo;cfop;vlTotal;remetente;remetenteIe;destinatario;destinatarioIe\n${retorno.join('')}`
}

const downloadCsv = () => {
  chrome.tabs.getSelected(null, (tab) => {
    if(tab.url === 'https://www.sefaz.mt.gov.br/acessoweb/menu/ViewApp.jsp') {
      chrome.tabs.executeScript({
        code: `(${modifyDOM})()`
      }, (results) => {
        let blob = new Blob([results[0]], {type: 'text/csv'});
        let e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = 'parsed.csv'
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/csv', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
      })
    }else {
      let alertErr = document.querySelector('.alert-danger')
      alertErr.innerText = 'Esta Aba não pode ser convertida!'
      alertErr.className = alertErr.className.split(' ').filter(c => c !== 'hide').join(' ')
      setTimeout(() => {
        alertErr.className = alertErr.className + ' hide'
      }, 3000)
    }
  })
}

let btnTeste = document.querySelector('#btn-teste')
btnTeste.addEventListener('click', () => {
  downloadCsv()
})
