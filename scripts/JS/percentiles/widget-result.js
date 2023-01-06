
var widget_result_spanish = function($, moment, widgetData, queryStr) {
	
	
	  //console.log("Results")
  //console.log(window.widgetData)
  
  function getWidgetDataField(key) {
	  	return widgetData[key]
		
	  }
	
$('#link_to_res').attr('href', 'https://www.cdc.gov/healthyweight/spanish/bmi/'+queryStr)

  // helper reads query string parameter
/*  function getQueryStrParamByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }// ./getQueryStrParamByName
  */

  var method = getWidgetDataField('method')
  var gender = getWidgetDataField('gender')

  // age was entered in years months
  var age_y = getWidgetDataField('age_y')
  var age_m = getWidgetDataField('age_m')
  // age was entered as dates
  var dob_Str_Y_M_D_ISO = getWidgetDataField('dob_Str_Y_M_D_ISO')
  var dom_Str_Y_M_D_ISO = getWidgetDataField('dom_Str_Y_M_D_ISO')


  // height was entered in inches direct
  var hinches = getWidgetDataField('hinches')
  // height was entered on dropdowns
  var height_feet = getWidgetDataField('hft')
  var height_inches = getWidgetDataField('hin')

  var totalWeightPounds = parseFloat(getWidgetDataField('twp'), 10)

  var hcm  = parseFloat(getWidgetDataField('hcm'), 10)
  var wkg  = parseFloat(getWidgetDataField('wkg'), 10)
//console.log(age_y, age_m, gender, hinches, method, totalWeightPounds)

  function isDataInQueryString() {
    dataIsValid = true

    if (method && gender) {
    } else { dataIsValid = false}
	
	//console.log("After method and gender")
	//console.log(dataIsValid)
	
	if (age_m  == 0) {
		age_m = '0'
	}

    if (age_y && age_m || dob_Str_Y_M_D_ISO && dom_Str_Y_M_D_ISO) {
    } else { dataIsValid = false}
	
	//console.log("After dob and dom")
	//console.log(dataIsValid)

    if (method==='metric' && hcm && wkg || method==='english' && hinches && totalWeightPounds ||  method==='english' && height_feet && height_inches && totalWeightPounds) {
    } else { dataIsValid = false}
	
	//console.log("After height and weight")
	//console.log(dataIsValid)

	//console.log(dataIsValid)
    return dataIsValid
	
  }// ./isDataInQueryString


  if ( isDataInQueryString() ) { // there are inputs

    // setting up session storage if back button to return to english respective metric entry form
    if (typeof(Storage) !== "undefined") { window.sessionStorage.setItem('eng_or_metr',method) }

    // display entered sex
    $('#sex_m_f').html(gender==='m'?'ni&ntilde;o':'ni&ntilde;a')


    if ( dob_Str_Y_M_D_ISO && dom_Str_Y_M_D_ISO ) { // age was entered as dates

        $('.age_by_dates').show()

        age_y = moment(dom_Str_Y_M_D_ISO, 'YYYY-MM-DD').diff(moment(dob_Str_Y_M_D_ISO, 'YYYY-MM-DD'), 'years')
        age_m = moment(dom_Str_Y_M_D_ISO, 'YYYY-MM-DD').diff(moment(dob_Str_Y_M_D_ISO, 'YYYY-MM-DD'), 'months') % 12
		
		//console.log('Troubleshoot: Calculated difference between dob and dom in years: ', age_y)
		//console.log('Troubleshoot: Calculated difference between dob and dom in months: ', age_m)

        $('#dob_full_str').text(moment(dob_Str_Y_M_D_ISO, 'YYYY-MM-DD').format('ll'))
        $('#dom_full_str').text(moment(dom_Str_Y_M_D_ISO, 'YYYY-MM-DD').format('ll'))
		//console.log($('#dob_full_str'))
		//console.log(dob_Str_Y_M_D_ISO)
    }// ./  if (age_y && age_m )

    age_y = parseInt(age_y, 10)
    age_m = parseInt(age_m, 10)

    if ( age_y > 0 ) { $('#age_years').html(age_y + ' a&ntilde;os') }

    var monthsTxt
    if ( age_m === 0 ) {
      monthsTxt = ''
    } else if ( age_m === 1 ){
      monthsTxt = ' 1 mes'
    } else {
      monthsTxt = ' ' + age_m + ' meses'
    }// ./if

    $('#age_months').text(monthsTxt)

    if ( age_y > 0 ) { $('.dom_years').html(age_y + '  a&ntilde;os') }
    $('.dom_months').text(monthsTxt)

    var agem = age_y * 12 + age_m

    var genderNoStr = gender==='m'?'1':'2'
    var bmiCalculatedObj

    if (method === 'english') {
		
		//console.log(hinches)

      if (hinches) {
        // height was entered in inches direct
        hinches = parseFloat(hinches, 10)
        $('#height_inches_r').text(hinches)

      } else {

        // height was entered on dropdowns
        $('#height_feet_r').text(height_feet + ' feet')
        $('#height_inches_r').text(height_inches)

        hinches = parseFloat(height_feet, 10) * 12 + parseFloat(height_inches, 10)
      }// ./if (hinches)


      $('#totalWeightPounds').text(totalWeightPounds)

      bmiCalculatedObj = bmi_calc.calcBMIandPerc_Eng(totalWeightPounds, hinches, genderNoStr, agem)

    } else { // method was metric
        $('.metric_inputs').show()
        $('.english_inputs').hide()


        $('#height_cm_r').text(hcm)
        $('#weight_kgs').text(wkg)

        bmiCalculatedObj = bmi_calc.calcBMIandPerc_Metr(wkg, hcm /100, genderNoStr, agem)

    }// ./if (method === 'english')

    /* warning for
    1)    (BMI / BMI_M) < 0.7, or
    2)    Perc_of_P95 â‰¥ 150
    */
    if ( (bmiCalculatedObj.bmi/bmiCalculatedObj.M < 0.7) || bmiCalculatedObj.overP95 >= 150 ) {
      //console.log(bmiCalculatedObj.bmi/bmiCalculatedObj.M, bmiCalculatedObj.overP95)
      $('.data_potential_err').show()
    }


    $('.bmi_no').text(bmiCalculatedObj.bmi)

    switch (bmiCalculatedObj.z_perc) {

      case 0:
        $('.bmi_percentile').html('menos que el percentil 1 ')
        break

      case 100:
        $('.bmi_percentile').html('m&aacute;s que el percentil 99 ')
        break

      default:
      $('.bmi_percentile').html('percentil ' + bmiCalculatedObj.z_perc + getOrdinalIndicator(bmiCalculatedObj.z_perc))
    }// ./switch bmiCalculatedObj.z_perc


   // $('img#bmi_chart').attr('src', getImageSrc(bmiCalculatedObj.z_perc))

    $('.bmi_conclusion').text(getBMIConclusion(bmiCalculatedObj.z_perc))


    if (bmiCalculatedObj.z_perc < 5) {
      $('.bmi_text').html(getBMI_text(bmiCalculatedObj.z_perc))
	  $('#yellowbox').addClass("highlight")
	  $('#greenbox').removeClass("highlight")
	  $('#orangebox').removeClass("highlight")
	  $('#redbox').removeClass("highlight")
    } else if ( 5 <= bmiCalculatedObj.z_perc && bmiCalculatedObj.z_perc <= 85 ) {
     // $('.normal_weight').show()
	  $('#greenbox').addClass("highlight")
	  $('#yellowbox').removeClass("highlight")
	  $('#orangebox').removeClass("highlight")
	  $('#redbox').removeClass("highlight")
	  $('.bmi_text').empty()
    } else if ( 85 <= bmiCalculatedObj.z_perc && bmiCalculatedObj.z_perc < 95 ) {
     // $('.over_weight').show()
   	  $('#orangebox').addClass("highlight")
	  $('#greenbox').removeClass("highlight")
	  $('#yellowbox').removeClass("highlight")
	  $('#redbox').removeClass("highlight")
	  $('.bmi_text').empty()
    } else if ( bmiCalculatedObj.z_perc >= 95) {
        $('.bmi_text').html(getBMI_text(bmiCalculatedObj.z_perc))
		$('#redbox').addClass("highlight")
	  	$('#orangebox').removeClass("highlight")
		$('#greenbox').removeClass("highlight")
		$('#yellowbox').removeClass("highlight")
    }


    if (bmiCalculatedObj.z_perc > 95) {
      $('.child_obesity_95_to_97').show()
	  $('#redbox').addClass("highlight")
	  $('#orangebox').removeClass("highlight")
	  $('#greenbox').removeClass("highlight")
	  $('#yellowbox').removeClass("highlight")
    }

    if (bmiCalculatedObj.z_perc > 97) {
      $('.child_obesity_over_97').show()
      $('#z_perc_over_97').text(bmiCalculatedObj.overP95)
	  $('#redbox').addClass("highlight")
  	  $('#orangebox').removeClass("highlight")
	  $('#greenbox').removeClass("highlight")
	  $('#yellowbox').removeClass("highlight")
    }

  } else {// there no are inputs
    // no data for the page, result page was possibly accessed directly, this would not happen regular case
    $('.noInfoForPage').show()
    $('.dataValidForPage').hide()
  }// ./if (method)


  // check class categories
  function getBMIConclusion(z_percentile) {

    if (z_percentile < 5) {
      return 'está en bajo peso'
    } else if ( 5 <= z_percentile && z_percentile < 85 ) {
      return 'tiene peso saludable'
    } else if ( 85 <= z_percentile && z_percentile < 95 ) {
      return 'está en sobrepeso'
    } else if ( z_percentile >= 95) {
      return 'tiene obesidad'
    }
  }// ./getBMIConclusion

  function getBMI_text(z_percentile) {

    if (z_percentile < 5) {
      return ' y se le recomienda consultar con un profesional de la salud para pueda averiguar las posibles causas de estar bajo peso'
    } else if ( 5 <= z_percentile && z_percentile < 85 ) {
      return ''
    } else if ( 85 <= z_percentile && z_percentile < 95 ) {
      return ''
    } else if ( z_percentile >= 95) {
      
	  var tempRetTxt = ' y puede terminar con problemas de salud y a '
      var tempGend = 'el'
      if (gender==='f') { tempGend = 'ella' }
      tempRetTxt += tempGend
      tempRetTxt += ' se le recomienda consultar con un profesional de la salud.'

      return tempRetTxt
	  
	  
    }
  }// ./getBMI_text

  function getImageSrc(z_percentile) {

    if (z_percentile < 5) {
      return './img/1_underweight.gif'
    } else if (5 <= z_percentile && z_percentile < 85 ) {
      return './img/2_healthy.gif'
    } else if ( 85 <= z_percentile && z_percentile < 95  ) {
      return './img/3_overweight.gif'
    } else if ( z_percentile >= 95) {
      return './img/4_obese.gif'
    }
  }// ./getImageSrc

  function getOrdinalIndicator(z_percentile) {
    switch (z_percentile) {
      case 0:
        return ''
        break;
      case 100:
        return ''
        break;
      case 1:
        return ''
        break;
      case 2:
        return ''
        break;
      case 3:
        return ''
        break;
      default:
        return ''
    }
  }// ./getOrdinalIndicator

	$('#calculator_result_wrapper').show();

}

