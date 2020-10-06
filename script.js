
// variaveis de controle de interface
let seuVotoPara = document.querySelector('.info-1-1 span')
let cargo = document.querySelector('.info-1-2 span')
let descricao = document.querySelector('.info-1-4')
let aviso = document.querySelector('.info-2')
let lateral = document.querySelector('.info-1-direita')
let numeros = document.querySelector('.info-1-3')


// variaveis de controle de ambiente
let etapaAtual = 0
let numero = ''
let votoBranco = false


function comecarEtapa() {
  let etapa = etapas[etapaAtual]

  let numeroHTML = ''
  numero = ''
  votoBranco = false

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHTML += '<div class="numero pisca"></div>'
    } else {
      numeroHTML += '<div class="numero"></div>'
    }

  }

  seuVotoPara.style.display = 'none'
  cargo.innerHTML = etapa.titulo
  descricao.innerHTML = ''
  aviso.style.display = 'none'
  lateral.innerHTML = ''
  numeros.innerHTML = numeroHTML

}


function atualizaInterface() {
  let etapa = etapas[etapaAtual]
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero == numero) {
      return true
    } else {
      return false
    }
  })

  if (candidato.length > 0) {
    candidato = candidato[0]
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    descricao.innerHTML = `Nome : ${candidato.nome} <br>Partido: ${candidato.partido}`
    lateral.innerHTML = `<div class="info-1-img"><img src="img/${candidato.foto}" alt="imagem">${candidato.legenda}</div>`
  } else {
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
  }

}


function clicou(n) {
  let elNumero = document.querySelector('.numero.pisca')

  if (elNumero != null) {
    elNumero.innerHTML = n
    numero = `${numero}${n}`

    elNumero.classList.remove('pisca')

    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add('pisca')
    } else {
      atualizaInterface()
    }

  }

}


function branco() {
  numero = ''
  votoBranco = true

  seuVotoPara.style.display = 'block'
  aviso.style.display = 'block'
  numeros.innerHTML = ''
  descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>'
  lateral.innerHTML = ''
}


function corrige() {
  comecarEtapa()
}


function confirma() {
  let etapa = etapas[etapaAtual]

  let votoConfirmado = false

  if (votoBranco === true) {
    console.log('voto em branco confirmado')
    votoConfirmado = true
  } else if (numero.length === etapa.numeros) {
    console.log('voto confirmado')
    votoConfirmado = true
  }

  if (votoConfirmado) {
    etapaAtual++
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa()
    } else {
      console.log('FIM')
    }
  }

}


comecarEtapa()
