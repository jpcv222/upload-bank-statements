(()=>{

  const examples_comision: string[] = ["COMISION POR  IVA",
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

  const payments_examples: string[] = ["SPEI Enviado:",
  "Doc. Pagado por Camara de Compensacion",
  "Documento Pagado en Efectivo",
  "Pago de Servicios",
  "Retiro de Recursos",
  "Retiro para deposito en Otra Cuenta",
  "Retiro por Cheque Certificados",
  "Retiro por domiciliacion",
  "Retiro por operacion cambios",
  "Retiro X OperaciÃ³n de Mesa de Dinero",
  "Retiros miscelaneos",
  "SPEI Enviado",
  "Recibo #",
  "Pago de impuestos RFC",
  "PAGO DE NOMINA",
  "TRASPASO A TERCEROS",
  "PAGO DE AGUINALDO",
  "CARGO NOMINA",
  "PAGO -"]


  const dates_examples: string[] = ["2/4/2212","12/11/2122"]

  let com_exp= '^com.*'

  test_regexp(com_exp,examples_comision);

  let com_men_exp=com_exp+'mensualidad$'

  test_regexp(com_men_exp,examples_comision);

  let payments_exp='(pag(o|a))|(retiro)|(spei)|(recibo)|(traspaso)|(cargo)'

  test_regexp(payments_exp,payments_examples);  

  let dates_exp='^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$'

  exec_regexp(dates_exp,dates_examples);  

  function exec_regexp(str_regexp:string,examples:string[]) {
    let regexp = new RegExp(str_regexp);  
    examples.forEach(function (example) {
      console.log(str_regexp + ' - ' + example + ' : ' +regexp.exec(example.toLocaleLowerCase()));
    }); 
  }

  function test_regexp(str_regexp:string,examples:string[]) {
    let regexp = new RegExp(str_regexp);  
    examples.forEach(function (example) {
      console.log(str_regexp + ' - ' + example + ': ' +regexp.test(example.toLocaleLowerCase()));
    }); 
  }


})();