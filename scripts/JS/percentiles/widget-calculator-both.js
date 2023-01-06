var widget_calculator_both = function($, moment){

  function isNumber(val) { return !isNaN(parseFloat(val)) && isFinite(val) }

  var delayInOut = 500

  // helper, checks if a date is valid
  function isValidDate(d, m, y) {
    m = parseInt(m, 10)
    d = parseInt(d, 10)
    y = parseInt(y, 10)

    var daysInMonth = function (m, y) {
        switch (m) {
            case 2 : return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28
            case 4 : case 6 : case 9 : case 11 : return 30
            default : return 31
        }
    }// ./isValidDate

    return m > 0 && m <= 12 && d > 0 && d <= daysInMonth(m, y) && y > 0
  }





  // initilize vars
  var all_form_check = $('#all_form_check')
  var dob_check = $('#dob_check')
  var div_dob = $('#div_dob')
  var dom_check = $('#dom_check')
  var div_dom = $('#div_dom')
  
  //my changes
  var calc_form_div = $('#calculator_form_wrapper')
  var results_div = $('#calculator_result_wrapper')
  
   //Hide results div
  results_div.hide();

  var sex_m_f_check = $('#sex_m_f_check')
  var div_sex_m_f = $('#div_sex_m_f')

  var height_check_eng = $('#height_check_eng')


  var weight_check_eng = $('#weight_check_eng')
  var div_weight_eng = $('#div_weight_eng')
  var div_weight_eng_direct = $('#div_weight_eng_direct')

  var div_height_metr = $('#div_height_metr')
  var div_weight_metr = $('#div_weight_metr')

  var weight_check_metr = $('#weight_check_metr')
  var height_check_metr = $('#height_check_metr')

  var age_under_2 = $('#age_under_2')
  var age_over_20 = $('#age_over_20')

  var div_dob_dom = $('#div_dob_dom')
  var div_age_y_m = $('#div_age_y_m')

  var age_check = $('#age_check')

  var linebreak_eng = $('#linebreak_eng')

  var input_age_ym_or_do = $('input[name="age_ym_or_do"]')
  var radio_en_drop_or_direct = $('#radio_en_drop_or_direct')

  var div_height_eng_direct = $('#div_height_eng_direct')
  var div_height_eng_drop = $('#div_height_eng_drop')
  var height_inch_direct = $('#height_inch_direct')
  var input_height_eng_drop_or_direct = $('input[name="height_eng_drop_or_direct"]')
  var height_check_eng_direct = $('#height_check_eng_direct')
  
  var radio_en_weight_direct_or_drop = $('#radio_en_weight_direct_or_drop')
  var input_weight_eng_direct_or_drop = $('input[name="weight_eng_direct_or_drop"]')
  var weight_lbs_direct = $('#weight_lbs_direct')
  var weight_check_eng_direct = $('#weight_check_eng_direct')



  if ($('input[name="age_ym_or_do"]:checked').val() === 'age_do') {
    div_age_y_m.hide()
    div_dob_dom.show()
  } else {
    div_age_y_m.show(delayInOut)
    div_dob_dom.hide(delayInOut)
  }


  function showMetricInputs(delay) {
    delay = delay || 0
    div_height_eng_drop.fadeOut(delay)
    div_height_eng_direct.fadeOut(delay)
    radio_en_drop_or_direct.fadeOut(delay)

    div_weight_eng.fadeOut(delay)
    linebreak_eng.fadeOut(delay)
    div_height_metr.fadeIn(delay)
    div_weight_metr.fadeIn(delay)
	radio_en_weight_direct_or_drop.fadeOut(delay)
  }// ./showMetricInputs

  function showEnglishInputs(delay) {
    delay = delay || 0
    div_height_metr.fadeOut(delay)
    div_weight_metr.fadeOut(delay)

   // div_weight_eng.fadeIn(delay)
    linebreak_eng.fadeIn(delay)
    radio_en_drop_or_direct.fadeIn(delay)
	radio_en_weight_direct_or_drop.fadeIn(delay)


    if ($('input[name="height_eng_drop_or_direct"]:checked').val() === 'height_eng_drop') {
      div_height_eng_drop.fadeIn(delay)
      div_height_eng_direct.fadeOut(delay)
    } else {
      div_height_eng_direct.fadeIn(delay)
      div_height_eng_drop.fadeOut(delay)
    }
	
	
	 if ($('input[name="weight_eng_direct_or_drop"]:checked').val() === 'weight_eng_direct') {
      div_weight_eng_direct.fadeIn(delay)
      div_weight_eng.fadeOut(delay)
    } else {
     // div_weight_eng.fadeIn(delay)
      div_weight_eng_direct.fadeOut(delay)
    }

  }// ./showEnglishInputs

  function getSessionStorage_eng_or_metr() {
    var eng_or_metr = 'english'
    if (typeof(Storage) !== "undefined") { eng_or_metr = window.sessionStorage.getItem('eng_or_metr', 'english') }
    if (eng_or_metr === 'metric') { return 'metric' }
    return 'english'
  }// ./getSessionStorage_eng_or_metr

  // english or metric page check
  var eng_or_metr = getSessionStorage_eng_or_metr()
  if (eng_or_metr === 'metric') {
    $('input[id="metric"]').prop('checked', true)
    showMetricInputs()
    // append to page title
    $('.pagetitle').append('<h3 id="pagetitle2">Metric Version</h3>')
  } else {
    $('input[id="english"]').prop('checked', true)
    showEnglishInputs()
    $('.pagetitle').append('<h3 id="pagetitle2">English Version</h3>')
  }// ./// english or metric page check


  // on user change english | metric
  $('input[name="metric"]').change(function(event) {
    eng_or_metr = $(this).val()
    if ( eng_or_metr === 'english') {

      showEnglishInputs(delayInOut)
      $('#pagetitle2').text('English Version')

    } else {
      showMetricInputs(delayInOut)
      $('#pagetitle2').text('Metric Version')
    }
  })// ./on user change english | metric

  // on user change age enter or dob, dom
  input_age_ym_or_do.change(function(event) {

    ym_or_do = $(this).val()

    if(ym_or_do === 'age_do') {
        div_age_y_m.hide(delayInOut)
        div_dob_dom.show(delayInOut)
    } else {
        div_age_y_m.show(delayInOut)
        div_dob_dom.hide(delayInOut)
    }
    age_under_2.hide()
    age_over_20.hide()
  })// ./on user change age enter or dob, dom

  // user changes height english type from direct to dropdowns
  input_height_eng_drop_or_direct.change(function(event){
    drop_or_direct = $(this).val()

    if (drop_or_direct === 'height_eng_drop') {

      div_height_eng_drop.show(delayInOut)
      div_height_eng_direct.hide(delayInOut)
    } else {

      div_height_eng_drop.hide(delayInOut)
      div_height_eng_direct.show(delayInOut)
    }
  })// .radio_en_drop_direct
  
  // user changes weight english direct or dropdowns
  input_weight_eng_direct_or_drop.change(function(event){

    if ($(this).val() === 'weight_eng_direct') {
      div_weight_eng_direct.show(delayInOut)
      div_weight_eng.hide(delayInOut)
    } else {
      div_weight_eng.show(delayInOut)
      div_weight_eng_direct.hide(delayInOut)
    }
  })// .radio_en_drop_direct

  var age_y_direct = $('#age_y_direct')
  var age_m_direct = $('#age_m_direct')
  var age_m_only_direct = $('#age_m_only_direct')


  $('#button_calculate').on('click', function(event) {

    var errorFree = true

    if ( $('input[name="age_ym_or_do"]:checked').val() === 'age_y_m' ) {

      var ageValidInMonthsDirect = false,
          ageValidInYandMDirect = false

      function checkAgeErrorDiscovered() {


          if ( (ageValidInYandMDirect && !ageValidInMonthsDirect) || (!ageValidInYandMDirect && ageValidInMonthsDirect) ) { return }

          all_form_check.show()
          div_age_y_m.addClass('errorBox')
          age_check.show()
          errorFree = false


      }// ./checkAgeErrorDiscovered

      var age_y_direct_val = parseFloat(age_y_direct.val(), 10)
      var age_m_direct_val = parseFloat(age_m_direct.val(), 10)
	  //console.log('Troubleshoot: What is age_m_direct_val? ', age_m_direct_val)
      var have_months_input =  0.0
	  
	  //console.log('Troubleshoot: What is have_months_input? ', have_months_input)

      var age_m_only_direct_val = parseFloat(age_m_only_direct.val(), 10)



      //age was entered as total number of months
      if ( (!isNumber(age_m_only_direct_val) || age_m_only_direct_val < 24 || age_m_only_direct_val > 239) ) {
        // not ok
        if ( age_m_only_direct_val < 24 ) { age_under_2.show() }
        if ( age_m_only_direct_val > 239 ) { age_over_20.show() }

      } else { ageValidInMonthsDirect = true }


      // years not valid
      if ( (!isNumber(age_y_direct_val) || age_y_direct_val < 2 || age_y_direct_val > 19) ) {

      } else if ( isNumber(age_m_direct_val) && ( age_m_direct_val < 0 || age_m_direct_val > 11 ) ) {

      } else {
        // years and months are ok

        var age_tot = age_y_direct_val * 12 + have_months_input

        if ( age_tot < 24 ) {
          age_under_2.show()
        } else if ( age_tot > 239 ) {
          age_over_20.show()

        } else {
          ageValidInYandMDirect = true
         }

      }// .// years and months are ok
      checkAgeErrorDiscovered()


    } else {

      var dob_day = $('#dob_day').val()
      var dob_month = $('#dob_month').val()
      var dob_year = $('#dob_year').val()
      var dob_Str_Y_M_D_ISO = dob_year + '-' + dob_month + '-' + dob_day
	  //console.log('Troubleshoot: dob on button click', dob_Str_Y_M_D_ISO);

      var dob_is_not_valid = !isValidDate(dob_day, dob_month, dob_year) || !moment(dob_Str_Y_M_D_ISO, "YYYY-MM-DD").isValid()
	  
	  //console.log('Troubleshoot: is dob valid? ', dob_is_not_valid);

      if ( dob_is_not_valid ) {
        all_form_check.show()
        dob_check.show()
        div_dob.addClass('errorBox')
        errorFree = false
      }// ./if ( dob_is_not_valid )

      var dom_day = $('#dom_day').val()
      var dom_month =$('#dom_month').val()
      var dom_year = $('#dom_year').val()
      var dom_Str_Y_M_D_ISO = dom_year + '-' + dom_month + '-' + dom_day
	  //console.log('Troubleshoot: dom on button click', dom_Str_Y_M_D_ISO)

      var dom_is_not_valid = !isValidDate(dom_day, dom_month, dom_year) || !moment(dom_Str_Y_M_D_ISO, "YYYY-MM-DD").isValid()
	  
	  //console.log('Troubleshoot: is dom valid? ', dom_is_not_valid);

      if ( dom_is_not_valid ) {
        all_form_check.show()
        dom_check.show()
        div_dom.addClass('errorBox')
        errorFree = false
      }// ./if ( dom_is_not_valid )

      // checking to see if age is between 2 and 19 for this teen bmi calc.
      var ageYears = moment(dom_Str_Y_M_D_ISO, 'YYYY-MM-DD').diff(moment(dob_Str_Y_M_D_ISO, 'YYYY-MM-DD'), 'years')


      if (!dob_is_not_valid && !dom_is_not_valid && ageYears < 2) {
        all_form_check.show()
        age_under_2.show()
        errorFree = false
      }
      if (!dob_is_not_valid && !dom_is_not_valid && ageYears >= 20) {
        all_form_check.show()
        age_over_20.show()
        errorFree = false
      }

    }// ./(age_ym_or_do==='age_y_m')



    var radio_sex_check = $("input[name='sex_m_f']:checked").val()
    if ( radio_sex_check !== 'sex_m' && radio_sex_check !== 'sex_f') {
      all_form_check.show()
      sex_m_f_check.show()
      div_sex_m_f.addClass('errorBox')
      errorFree = false
    }

    var height_feet = $('#height_feet').val()
    var height_inches =$('#height_inches').val()
    var height_fraction_inches = $('#height_fraction_inches').val()

    var weight_pounds = $('#weight_pounds').val()
    var weight_fractions_pounds =$('#weight_fractions_pounds').val()

    var weight_kg = $('#weight_kg').val()
    var height_cm = $('#height_cm').val()

    if (eng_or_metr === 'english') {

      // English system check

      // english height direct input
      if ($('input[name="height_eng_drop_or_direct"]:checked').val() === 'height_eng_direct' ) {

        var height_inch_direct_val = height_inch_direct.val()

        if ( (height_inch_direct_val == 0) || (!isNumber(height_inch_direct_val)) ) {
          all_form_check.show()
          height_check_eng_direct.show()
          div_height_eng_direct.addClass('errorBox')
          errorFree = false
        }
      } else {// english height dropdown input
        if ( (height_feet==0) ) {
          all_form_check.show()
          height_check_eng.show()
          div_height_eng_drop.addClass('errorBox')
          errorFree = false
        }
      }// /.if ($('input[name="height_eng_drop_or_direct"]').val() === 'height_inch_direct' )


      // english weight direct input

      if ($('input[name="weight_eng_direct_or_drop"]:checked').val() === 'weight_eng_direct' ) {



        var weight_lbs_direct_val = weight_lbs_direct.val()



        if ( (weight_lbs_direct_val == 0) || (!isNumber(weight_lbs_direct_val)) ) {

          all_form_check.show()

          weight_check_eng_direct.show()

          div_weight_eng_direct.addClass('errorBox')

          errorFree = false

        }

      } else {
         // english weight dropdown input
        if ( (weight_pounds==0) || (!isNumber(weight_pounds)) ) {
          all_form_check.show()
          weight_check_eng.show()
          div_weight_eng.addClass('errorBox')
          errorFree = false
        }
      }// ./ if ($('input[name="weight_eng_direct_or_drop"]:checked').val() === 'weight_eng_direct' ) 

    } else {
      // Metric check
      if ( (weight_kg==0) || (!isNumber(weight_kg)) ) {
        all_form_check.show()
        weight_check_metr.show()
        div_weight_metr.addClass('errorBox')
        errorFree = false
      }

      if ( (height_cm==0) || (!isNumber(height_cm)) ) {
        all_form_check.show()
        height_check_metr.show()
        div_height_metr.addClass('errorBox')
        errorFree = false
      }

    } //.metric check


    // send to results page
    if (errorFree) {
      all_form_check.hide()

      // ###### ROOT Server ######
      var queryStr = ''

      var gender = radio_sex_check === 'sex_m'? 'm':'f'

      function addAgeOrDates() {
        var addToQS = ''
        // age was entered as years + months
        if ( $('input[name="age_ym_or_do"]:checked').val() === 'age_y_m' ) {

          //TODO: change to new inputs!
          if (ageValidInYandMDirect) {

            addToQS += '&age_y=' + age_y_direct_val
            addToQS += '&age_m=' + have_months_input
			
			widgetData.age_y =  age_y_direct_val
		  widgetData.age_m = have_months_input

          } else if (ageValidInMonthsDirect) {
            addToQS += '&age_y=' + 0
            addToQS += '&age_m=' + age_m_only_direct_val
			
		widgetData.age_y =  '0'
   		widgetData.age_m = age_m_only_direct_val
			
          }


        } else {
          // age was entered as dates
          addToQS += '&dob=' + dob_Str_Y_M_D_ISO + '&dom=' + dom_Str_Y_M_D_ISO
		  widgetData.dob_Str_Y_M_D_ISO = dob_Str_Y_M_D_ISO
		  widgetData.dom_Str_Y_M_D_ISO = dom_Str_Y_M_D_ISO
        }
        return addToQS
      }

      if (eng_or_metr === 'english') {

        //var totalHeightInches = parseInt(height_feet, 10) * 12 + parseInt(height_inches, 10) + parseFloat(height_fraction_inches, 10)
        var height_in_inches = parseInt(height_inches, 10) + parseFloat(height_fraction_inches, 10)
       // var totalWeightPounds = parseInt(weight_pounds, 10) + parseFloat(weight_fractions_pounds, 10)
	   
	   // weight was entered direct
        console.log(weight_lbs_direct.val())
		
        var totalWeightPounds = parseFloat(weight_lbs_direct.val(), 10)
        console.log(totalWeightPounds)


        // weight was entered in dropdown
        if ($('input[name="weight_eng_direct_or_drop"]:checked').val() === 'weight_eng_drop') {
          totalWeightPounds = parseInt(weight_pounds, 10) + parseFloat(weight_fractions_pounds, 10)
        }// ./if ($('input[name="height_eng_drop_or_direct"]:checked').val() === 'height_eng_direct')



        queryStr += 'result.html?' + '&method=' + eng_or_metr + '&gender=' + gender
		widgetData.method = eng_or_metr
		widgetData.gender = gender

        queryStr += addAgeOrDates()


        if ($('input[name="height_eng_drop_or_direct"]:checked').val() === 'height_eng_direct' ) {
          // height was entered as direct input in inches

          queryStr += '&hinches=' + height_inch_direct.val()
		  widgetData.hinches = height_inch_direct.val()

        } else {
          // height was entered from dropdowns
          queryStr += '&hft=' + parseInt(height_feet, 10) + '&hin=' + height_in_inches
		  widgetData.hft = parseInt(height_feet, 10)
		  widgetData.hin = height_in_inches
        }

        queryStr += '&twp=' + totalWeightPounds
		widgetData.twp = totalWeightPounds

      } else {
        queryStr += 'result.html?' + '&method=' + eng_or_metr + '&gender=' + gender
		widgetData.method = eng_or_metr
		widgetData.gender = gender

		//console.log('before', queryStr)
        queryStr += addAgeOrDates()
		//console.log('after', queryStr)

        queryStr += '&hcm=' + height_cm + '&wkg=' + weight_kg
		widgetData.hcm = height_cm
		widgetData.wkg = weight_kg
      }



	  
	  
      //console.log(queryStr)

     // window.location = queryStr
	 
	 // console.log(queryStr)
	  window.widgetData = widgetData
  	  //console.log(window.widgetData)
	 
	  
	  
	  //Check which results script to run
		if ( $('#mount_spanish_english_switch').val() === 'spanish_inputs_val') {
		  
		  widget_result_spanish($, moment, widgetData, queryStr)
		  //cdcMetrics.trackEvent('CalculateButton','Calculate button clicked - spanish');
		
		} else {
		  
		  widget_result($, moment, widgetData, queryStr)
		 // cdcMetrics.trackEvent('CalculateButton','Calculate button clicked - english');
		
		}// ./Check which results script to run
	  
	  
	  
	  //Hide input form and show results div
	 calc_form_div.hide();
	 $('#lang-switch').hide();
	// results_div.show();
    }


  })// ./button_calculate click



  // reset error messages on changes
  div_dob.on('click', function(event) {
    dob_check.hide()
    div_dob.removeClass('errorBox')
    age_under_2.hide()
    age_over_20.hide()
  })
  div_dom.on('click', function(event) {
    dom_check.hide()
    div_dom.removeClass('errorBox')
    age_under_2.hide()
    age_over_20.hide()
  })
  div_sex_m_f.on('click', function(event) {
    sex_m_f_check.hide()
    div_sex_m_f.removeClass('errorBox')
  })
  div_height_eng_drop.on('click', function(event) {
    height_check_eng.hide()
    div_height_eng_drop.removeClass('errorBox')
  })
  div_weight_eng.on('click', function(event) {
    weight_check_eng.hide()
    div_weight_eng.removeClass('errorBox')
  })
  div_height_metr.on('click', function(event) {
    height_check_metr.hide()
    div_height_metr.removeClass('errorBox')
  })
  div_weight_metr.on('click', function(event) {
    weight_check_metr.hide()
    div_weight_metr.removeClass('errorBox')
  })
  div_age_y_m.on('click', function(event) {
    age_check.hide()
    div_age_y_m.removeClass('errorBox')
    age_under_2.hide()
    age_over_20.hide()
  })
  div_height_eng_direct.on('click', function(event) {
    height_check_eng_direct.hide()
    div_height_eng_direct.removeClass('errorBox')
  })
   div_weight_eng_direct.on('click', function(event) {
    weight_check_eng_direct.hide()
    div_weight_eng_direct.removeClass('errorBox')
  })



}
