"use strict";
(() => {
    const examples_comision = ["COMISION POR  IVA",
        "COMISION POR  Recibo",
        "COMISION POR TEF Enviado",
        "COMISION POR Retiro",
        "COMISION POR DepÃ³sito",
        "COMISION POR Depósito",
        "ComisiÃ³n  Dispersion",
        "Comisión  Dispersion",
        "comisiÃ³n  por mensualidad",
        "Comisión  Por Mensualidad",
        "Camisión  Por Mensualidad",
        "COMISION POR  SPEI Enviado",
        "Comision por servicio Banca Electronica",
        "COM SERV BANCOMER",
        "COM SDO INFERIOR",
        "CaM SDO INFERIOR",
        "COMISI",
        "COMISION SPEI",
        "COMISION REGPR",
        "COMISION TOKEN 1"];
    let com_exp = '^com.*';
    test_regexp(com_exp, examples_comision);
    let com_men_exp = com_exp + 'mensualidad$';
    test_regexp(com_men_exp, examples_comision);
    function test_regexp(str_regexp, examples) {
        let regexp = new RegExp(str_regexp);
        examples.forEach(function (example) {
            console.log(str_regexp + ' - ' + example + ': ' + regexp.test(example.toLocaleLowerCase()));
        });
    }
})();
