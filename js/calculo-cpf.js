$('.dig').mask('0')

$('.dig').on('focus', function () {
    $(this).val('')
})

$('#d1').on('keyup', function () {
    $('#d2').focus().val('')
})
$('#d2').on('keyup', function () {
    $('#d3').focus().val('')
})
$('#d3').on('keyup', function () {
    $('#d4').focus().val('')
})
$('#d4').on('keyup', function () {
    $('#d5').focus().val('')
})
$('#d5').on('keyup', function () {
    $('#d6').focus().val('')
})
$('#d6').on('keyup', function () {
    $('#d7').focus().val('')
})
$('#d7').on('keyup', function () {
    $('#d8').focus().val('')
})
$('#d8').on('keyup', function () {
    $('#d9').focus().val('')
})
$('#d9').on('keyup', function () {
    $('#dv1').focus().val('')
})
$('#dv1').on('keyup', function () {
    $('#dv2').focus().val('')
})

$('#btnReset').on('click', function (event) {
    event.preventDefault()
    $('#return').empty()
    $('#digitos').trigger("reset")
    $('#result').attr('style', 'display:none;')
})

$("#digitos").submit(function (event) {
    event.preventDefault()
    $("#cpfs").empty()
    var cpf = ''
    var digitosOcultos = 0
    $.each($(this).serializeArray(), function (i, field) {
        if (field.value == '') {
            cpf += '*'
            digitosOcultos++
        } else {
            cpf += field.value
        }
    })

    if (digitosOcultos > 6) {
        $("#return").empty().append("<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Erro!</strong> Pelo menos 5 digitos devem ser informados.<button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>")
        return
    }

    if (digitosOcultos == 0) {
        if (validaCpf(cpf)) {
            $("#return").empty().append("<div class='alert alert-success alert-dismissible fade show' role='alert'>O CPF " + cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4') + " é <strong>válido!</strong><button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>")
            return
        } else {
            $("#return").empty().append("<div class='alert alert-danger alert-dismissible fade show' role='alert'>O CPF " + cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4') + " é <strong>inválido!</strong><button type='button' class='btn-close' data-bs-dismiss='alert'></button></div>")
            return
        }
    }

    var cpfsValidos = []

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
        $("#cpfs").append("<li class='list-group-item d-flex justify-content-between align-items-center'>" + (document.getElementById('pontuacao').checked ? cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4') : cpf) + "</li>")
    })

    $('#return').empty()
    $('#total').empty().append(cpfsValidos.length + ' CPF(s) válidos.')
    $('#result').removeAttr('style')
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