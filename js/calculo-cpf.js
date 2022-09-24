var returnElement = $('#return')
var formDigitos = $('#digitos')
var resultElement = $('#result')
var listElement = $('#cpfs')
var totalElement = $('#total')
var pontuacaoElement = $('#pontuacao')
var btnCalcular = $('#btnCalcular')
var btnReset = $('#btnReset')
var btnExemplo = $('#exemplo')
var digitos = []
digitos[1] = $('#d1')
digitos[2] = $('#d2')
digitos[3] = $('#d3')
digitos[4] = $('#d4')
digitos[5] = $('#d5')
digitos[6] = $('#d6')
digitos[7] = $('#d7')
digitos[8] = $('#d8')
digitos[9] = $('#d9')
digitos[10] = $('#dv1')
digitos[11] = $('#dv2')

$('.dig').mask('0')

$('.dig').on('focus', function () {
    $(this).val('')
})

digitos[1].on('keyup', function () {
    if (digitos[1].val() != '') {
        digitos[2].focus().val('')
    }
})
digitos[2].on('keyup', function () {
    if (digitos[2].val() != '') {
        digitos[3].focus().val('')
    }
})
digitos[3].on('keyup', function () {
    if (digitos[3].val() != '') {
        digitos[4].focus().val('')
    }
})
digitos[4].on('keyup', function () {
    if (digitos[4].val() != '') {
        digitos[5].focus().val('')
    }
})
digitos[5].on('keyup', function () {
    if (digitos[5].val() != '') {
        digitos[6].focus().val('')
    }
})
digitos[6].on('keyup', function () {
    if (digitos[6].val() != '') {
        digitos[7].focus().val('')
    }
})
digitos[7].on('keyup', function () {
    if (digitos[7].val() != '') {
        digitos[8].focus().val('')
    }
})
digitos[8].on('keyup', function () {
    if (digitos[8].val() != '') {
        digitos[9].focus().val('')
    }
})
digitos[9].on('keyup', function () {
    if (digitos[9].val() != '') {
        digitos[10].focus().val('')
    }
})
digitos[10].on('keyup', function () {
    if (digitos[10].val() != '') {
        digitos[11].focus().val('')
    }
})

btnExemplo.on('click', function (event) {
    digitos[1].val('0')
    digitos[2].val('3')
    digitos[3].val('')
    digitos[4].val('7')
    digitos[5].val('')
    digitos[6].val('8')
    digitos[7].val('')
    digitos[8].val('1')
    digitos[9].val('2')
    digitos[10].val('5')
    digitos[11].val('0')
    pontuacaoElement.attr('checked', 'true')
    btnCalcular.focus()
    returnElement.empty().append("<div class='alert alert-info alert-dismissible fade show' role='alert'>Ao clicar em <b>Calcular</b> todos os possiveis CPFs com os números informados na mesma posição serão listados.<button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>")
})

btnReset.on('click', function (event) {
    event.preventDefault()
    returnElement.empty()
    formDigitos.trigger("reset")
    resultElement.attr('style', 'display:none;')
})

formDigitos.submit(function (event) {
    event.preventDefault()
    resultElement.attr('style', 'display:none;')
    listElement.empty()
    var cpf = ''
    var digitosOcultos = 0
    var cpfsValidos = []

    digitos.forEach(digito => {
        if (digito.val() == '') {
            cpf += '*'
            digitosOcultos++
        } else {
            cpf += digito.val()
        }
    })

    if (digitosOcultos > 6) {
        returnElement.empty().append("<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Erro!</strong> Pelo menos 5 digitos devem ser informados.<button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>")
        return
    }

    if (digitosOcultos == 0) {
        if (validaCpf(cpf)) {
            returnElement.empty().append("<div class='alert alert-success alert-dismissible fade show' role='alert'>O CPF " + cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4') + " é <strong>válido!</strong><button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>")
            return
        } else {
            returnElement.empty().append("<div class='alert alert-danger alert-dismissible fade show' role='alert'>O CPF " + cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4') + " é <strong>inválido!</strong><button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>")
            return
        }
    }

    sequenciaPossivel(digitosOcultos).forEach(element => {
        var digPos = 0
        var possivelCpf = cpf
        for (i = 0; i < 11; i++) {
            if (possivelCpf.charAt(i) == '*') {
                possivelCpf = possivelCpf.substring(0, i) + element.charAt(digPos) + possivelCpf.substring(i + 1)
                digPos++
            }
        }
        if (validaCpf(possivelCpf)) {
            cpfsValidos.push(possivelCpf)
        }
    })

    cpfsValidos.forEach(cpf => {
        listElement.append("<li class='list-group-item d-flex justify-content-between align-items-center'>" + (document.getElementById('pontuacao').checked ? cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4') : cpf) + "</li>")
    })

    returnElement.empty()
    totalElement.empty().append(cpfsValidos.length + ' CPF(s) válidos.')
    resultElement.removeAttr('style')
})

function validaCpf(cpf) {
    if (cpf.length != 11) {
        return false
    }

    // Elimina CPFs invalidos conhecidos
    if (cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999") {
        return false
    }

    // Valida 1o digito	
    add = 0
    for (i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i)
    }
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) {
        rev = 0
    }
    if (rev != parseInt(cpf.charAt(9))) {
        return false
    }

    // Valida 2o digito	
    add = 0
    for (i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i)
    }
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) {
        rev = 0
    }
    if (rev != parseInt(cpf.charAt(10))) {
        return false
    }
    return true
}

function sequenciaPossivel(digitosOcultos) {
    var max = ''
    var sequencias = []
    for (i = 0; i < digitosOcultos; i++) {
        max += '9'
    }
    for (i = 0; i <= parseInt(max); i++) {
        sequencias[i] = ('0000000000' + i).slice(-digitosOcultos)
    }
    return sequencias
}