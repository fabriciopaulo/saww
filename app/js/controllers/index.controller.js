(function(){
	'use strict';

	angular.module("atividade").controller("IndexController",IndexController);

	IndexController.$inject = [
    'ClimaService'
	];

	function IndexController(ClimaService) {
		
		var vm;

		vm = this;
		vm.start = true;
		vm.buscarCidade = buscarCidade;

    constructor();


		function constructor(){
			
		}

		function buscarCidade() {
      if(!vm.city){
        alert("Preencha o nome da cidade!");
        $('#inputCity').focus();
        return false;
      }

      vm.content = {};
      vm.start = false;


			ClimaService.obterClimaPorCidade(vm.city).then(function(data){
        	if(Number.parseInt(data.cod) == 404){
        		vm.notFound = true;
        		return false;
        	}else{
        		vm.notFound = false;
        	}

        	var days = [], itens = [];

        	data.list.forEach(function(day){

        		if(days.indexOf(moment.unix(day.dt).format("D")) == -1){
        			days.push(moment.unix(day.dt).format("D"));
        		}

        	});


        	days.forEach(function(day){

        		for(var i=0;i<data.list.length;i++){
        			if(moment.unix(data.list[i].dt).format("D") == day){
        				data.list[i]["dt_ext"] = moment.unix(data.list[i].dt).format('ddd');

        				if(itens.length<4){
		        			itens.push(data.list[i]);
        				}
		        		break;
        			}
        		}
       
        	});

        	var first = itens[0];

        	itens.forEach(function(item){
        		if( Number.parseInt(moment.unix(item.dt).format("D")) < Number.parseInt(moment.unix(first.dt).format("D")) ){
        			first = item;
        		}
        	});

        	vm.content["city"] 	= data.city;
        	vm.content["days"] 	= itens;
        	vm.content["first"] = first;

	        setBackground();
      }).catch(function(error){
      	console.dir(error);
      });	
    }

    function setBackground() {
    	switch(vm.content["first"].weather[0].main){
    		case "Clouds":
    			$('.content').fadeOut('slow', function(){
    				$('.content').css({'background-image':"url('img/backgrounds/clouds.png')"});
    				$('.content').fadeIn('slow');
    			});
    		break;
    		case "Rain":
      		$('.content').fadeOut('slow', function(){
      				$('.content').css({'background-image':"url('img/backgrounds/rain.png')"});
      				$('.content').fadeIn('slow');
      			});
    		break;
    		case "Clear":
    			$('.content').fadeOut('slow', function(){
    					$('.content').css({'background-image':"url('img/backgrounds/clear.png')"});
      				$('.content').fadeIn('slow');
      			});
    		break;
    		case "Snow":
    			$('.content').fadeOut('slow', function(){
    					$('.content').css({'background-image':"url('img/backgrounds/snow.png')"});
      				$('.content').fadeIn('slow');
      			});
    		break;
    	}
    }

		

	}
})();
