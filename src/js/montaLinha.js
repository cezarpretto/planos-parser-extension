// function montaLinha(tds) {
//   let destinatario = tds[9].innerText.split(' - ').filter((a, i) => i > 0).join(' - ')
//   let remetente = tds[8].innerText.split(' - ').filter((a, i) => i > 0).join(' - ')
//   let parsed = {
//     nrComprovante: ultimoComprovante,
//     tipoEmissao: tds[0].innerText,
//     numeroNota: tds[1].innerText,
//     serie: tds[3].innerText.replace(/\D/g, ''),
//     dtEmissao: tds[4].innerText,
//     modelo: tds[5].innerText.replace(/\,/g, '-'),
//     cfop: tds[6].innerText,
//     vlTotal: tds[7].innerText.replace(/\./g, '').replace(/\,/g, '.'),
//     remetente: tds[8].innerText.split(' - ').filter((a, i) => i > 0).join(' - '),
//     remetenteIe: tds[8].innerText.split(' - ')[0],
//     destinatario: tds[9].innerText.split(' - ').filter((a, i) => i > 0).join(' - '),
//     destinatarioIe: tds[9].innerText.split(' - ')[0]
//   }
//   return `${parsed.nrComprovante};${parsed.tipoEmissao};${parsed.numeroNota};${parsed.serie};${parsed.dtEmissao};${parsed.modelo};${parsed.cfop};${parsed.vlTotal};${parsed.remetente};${parsed.remetenteIe};${parsed.destinatario};${parsed.destinatarioIe}\n`
// }
