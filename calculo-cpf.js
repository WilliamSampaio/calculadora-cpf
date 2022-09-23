$("#digitos").submit(function (event) {
    event.preventDefault()
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

    sequenciaPossivel(digitosOcultos).forEach(element => {
        for (i = 0; i < 11; i++) {

        }
    });

    /*var add = 0
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i)
    }
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) {
        rev = 0
    }
    if (rev != parseInt(cpf.charAt(9)))
        return false;*/
    /* var cpfs = []
 
     var possivelCpf = digitos
     if (possivelCpf.d1 == '') {
         for (let i = 0; i <= 9; i++) {
             possivelCpf.d1 = i
 
         }
     }*/
    console.log(cpf)
    // console.log(validaCpf('03374801250'))
    sequenciaPossivel(6)
})

function validaCpf(cpf) {
    if (cpf == '' || cpf.length != 11) {
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